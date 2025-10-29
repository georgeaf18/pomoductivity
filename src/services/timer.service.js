/**
 * Timer Service
 * Handles all timer business logic including state management,
 * session tracking, and history management
 */

import {
  SESSION_TYPES,
  SESSION_STATUS,
  TIMER_TICK_INTERVAL,
  NOTIFICATION_EVENT_TYPES
} from '../config/constants.js';
import settingsService from './settings.service.js';
import notificationService from './notification.service.js';

class TimerService {
  constructor() {
    this.timerState = {
      isRunning: false,
      timeRemaining: settingsService.getDuration(SESSION_TYPES.FOCUS),
      sessionType: SESSION_TYPES.FOCUS,
      sessionCount: 0,
      startTime: null
    };
    this.sessionHistory = [];
    this.interval = null;
    this.stateChangeCallbacks = [];

    // Listen for settings changes
    settingsService.onChange((settings) => {
      this.handleSettingsChange(settings);
    });
  }

  /**
   * Handle settings changes
   * @param {Object} settings - New settings
   */
  handleSettingsChange(settings) {
    // If timer is not running, update timeRemaining if it matches the old duration
    if (!this.timerState.isRunning) {
      const currentDuration = settingsService.getDuration(this.timerState.sessionType);
      // Only update if the timer was at the full duration (hasn't been started yet)
      if (this.timerState.timeRemaining === this.getDuration(this.timerState.sessionType)) {
        this.timerState.timeRemaining = currentDuration;
        this.notifyStateChange();
      }
    }
  }

  /**
   * Get duration for a session type
   * @param {string} type - Session type
   * @returns {number} Duration in seconds
   */
  getDuration(type) {
    return settingsService.getDuration(type);
  }

  /**
   * Get current timer state
   * @returns {Object} Current timer state
   */
  getState() {
    return {
      ...this.timerState,
      history: this.sessionHistory
    };
  }

  /**
   * Get session history
   * @returns {Array} Session history
   */
  getHistory() {
    return [...this.sessionHistory];
  }

  /**
   * Register a callback for state changes
   * @param {Function} callback - Function to call when state changes
   */
  onStateChange(callback) {
    this.stateChangeCallbacks.push(callback);
  }

  /**
   * Notify all registered callbacks of state change
   */
  notifyStateChange() {
    const state = this.getState();
    this.stateChangeCallbacks.forEach(callback => callback(state));
  }

  /**
   * Timer tick function
   */
  tick() {
    if (this.timerState.isRunning && this.timerState.timeRemaining > 0) {
      this.timerState.timeRemaining--;
      this.notifyStateChange();

      // Timer completed
      if (this.timerState.timeRemaining === 0) {
        this.completeSession();
      }
    }
  }

  /**
   * Complete the current session
   */
  async completeSession() {
    const endTime = new Date().toISOString();
    const duration = this.getDuration(this.timerState.sessionType);

    // Save session to history
    this.sessionHistory.push({
      type: this.timerState.sessionType,
      startTime: this.timerState.startTime,
      endTime: endTime,
      duration: duration,
      status: SESSION_STATUS.COMPLETED
    });

    this.timerState.isRunning = false;

    // Increment session count for focus sessions
    if (this.timerState.sessionType === SESSION_TYPES.FOCUS) {
      this.timerState.sessionCount++;
    }

    // Reset timer but don't auto-switch session type
    this.timerState.timeRemaining = duration;
    this.timerState.startTime = null;

    this.stopInterval();
    this.notifyStateChange();
    await notificationService.sendTimerNotification(
      NOTIFICATION_EVENT_TYPES.TIMER_COMPLETED,
      this.timerState.sessionType,
      this.getDuration(this.timerState.sessionType)/60
    );
    console.log(`${this.timerState.sessionType} session completed!`);
  }

  /**
   * Start the timer
   * @returns {Object} Updated timer state
   */
  async start() {
    if (!this.timerState.isRunning) {
      this.timerState.isRunning = true;
      this.timerState.startTime = new Date().toISOString();

      if (!this.interval) {
        this.interval = setInterval(() => this.tick(), TIMER_TICK_INTERVAL);
      }

      this.notifyStateChange();
      await notificationService.sendTimerNotification(
        NOTIFICATION_EVENT_TYPES.TIMER_STARTED,
        this.timerState.sessionType,
        this.getDuration(this.timerState.sessionType)/60
      );
      console.log('Timer started');
    }
    return this.getState();
  }

  /**
   * Stop the timer
   * @returns {Object} Updated timer state
   */
  async stop() {
    if (this.timerState.isRunning) {
      this.timerState.isRunning = false;
      this.timerState.startTime = null;
      this.stopInterval();
      this.notifyStateChange();
      await notificationService.sendTimerNotification(
        NOTIFICATION_EVENT_TYPES.TIMER_STOPPED,
        this.timerState.sessionType,
        this.getDuration(this.timerState.sessionType)/60
      );
      console.log('Timer stopped');
    }
    return this.getState();
  }

  /**
   * Toggle timer (start if stopped, stop if running)
   * @returns {Object} Updated timer state
   */
  toggle() {
    if (this.timerState.isRunning) {
      return this.stop();
    } else {
      return this.start();
    }
  }

  /**
   * Reset the timer to current session type duration
   * @returns {Object} Updated timer state
   */
  reset() {
    this.stopInterval();
    this.timerState.isRunning = false;
    this.timerState.timeRemaining = this.getDuration(this.timerState.sessionType);
    this.timerState.startTime = null;
    this.notifyStateChange();
    console.log('Timer reset');
    return this.getState();
  }

  /**
   * Set session type
   * @param {string} type - Session type (focus, short_break, long_break)
   * @returns {Object} Updated timer state or null if invalid type
   */
  setSessionType(type) {
    if (!Object.values(SESSION_TYPES).includes(type)) {
      return null;
    }

    // Stop current timer if running
    this.stopInterval();

    this.timerState.sessionType = type;
    this.timerState.timeRemaining = this.getDuration(type);
    this.timerState.isRunning = false;
    this.timerState.startTime = null;

    this.notifyStateChange();
    console.log(`Session type changed to: ${type}`);
    return this.getState();
  }

  /**
   * Stop the interval timer
   */
  stopInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Cleanup resources
   */
  destroy() {
    this.stopInterval();
    this.stateChangeCallbacks = [];
  }
}

// Export singleton instance
export default new TimerService();
