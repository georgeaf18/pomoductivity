/**
 * Settings Service
 * Manages user-configurable timer settings
 */

import { FOCUS_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION } from '../config/constants.js';

class SettingsService {
  constructor() {
    this.settings = {
      focusDuration: FOCUS_DURATION,
      shortBreakDuration: SHORT_BREAK_DURATION,
      longBreakDuration: LONG_BREAK_DURATION
    };
    this.changeCallbacks = [];
  }

  /**
   * Get current settings
   * @returns {Object} Current settings
   */
  getSettings() {
    return { ...this.settings };
  }

  /**
   * Update settings
   * @param {Object} newSettings - New settings values
   * @returns {Object} Updated settings or null if invalid
   */
  updateSettings(newSettings) {
    const updates = {};

    // Validate and collect updates
    if (newSettings.focusDuration !== undefined) {
      if (!this.isValidDuration(newSettings.focusDuration)) {
        return null;
      }
      updates.focusDuration = newSettings.focusDuration;
    }

    if (newSettings.shortBreakDuration !== undefined) {
      if (!this.isValidDuration(newSettings.shortBreakDuration)) {
        return null;
      }
      updates.shortBreakDuration = newSettings.shortBreakDuration;
    }

    if (newSettings.longBreakDuration !== undefined) {
      if (!this.isValidDuration(newSettings.longBreakDuration)) {
        return null;
      }
      updates.longBreakDuration = newSettings.longBreakDuration;
    }

    // Apply updates
    this.settings = {
      ...this.settings,
      ...updates
    };

    // Notify listeners
    this.notifyChange();

    console.log('Settings updated:', this.settings);
    return this.getSettings();
  }

  /**
   * Reset settings to defaults
   * @returns {Object} Default settings
   */
  resetSettings() {
    this.settings = {
      focusDuration: FOCUS_DURATION,
      shortBreakDuration: SHORT_BREAK_DURATION,
      longBreakDuration: LONG_BREAK_DURATION
    };

    this.notifyChange();
    console.log('Settings reset to defaults');
    return this.getSettings();
  }

  /**
   * Get duration for a specific session type
   * @param {string} type - Session type
   * @returns {number} Duration in seconds
   */
  getDuration(type) {
    switch (type) {
      case 'focus':
        return this.settings.focusDuration;
      case 'short_break':
        return this.settings.shortBreakDuration;
      case 'long_break':
        return this.settings.longBreakDuration;
      default:
        return this.settings.focusDuration;
    }
  }

  /**
   * Validate duration value
   * @param {number} duration - Duration in seconds
   * @returns {boolean} True if valid
   */
  isValidDuration(duration) {
    return (
      typeof duration === 'number' &&
      duration > 0 &&
      duration <= 7200 && // Max 2 hours
      Number.isInteger(duration)
    );
  }

  /**
   * Register a callback for settings changes
   * @param {Function} callback - Function to call when settings change
   */
  onChange(callback) {
    this.changeCallbacks.push(callback);
  }

  /**
   * Notify all registered callbacks of settings change
   */
  notifyChange() {
    const settings = this.getSettings();
    this.changeCallbacks.forEach(callback => callback(settings));
  }
}

// Export singleton instance
export default new SettingsService();
