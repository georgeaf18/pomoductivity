/**
 * Application Constants
 */

export const NOTIFICATION_EVENT_TYPES = {
  TIMER_STARTED: 'timerStarted',
  TIMER_STOPPED: 'timerStopped',
  TIMER_COMPLETED: 'timerCompleted',
};

export const SESSION_TYPE_NAMES = {
  focus: 'Focus',
  short_break: 'Short Break',
  long_break: 'Long Break',
};

module.exports = {
  // Timer Durations (in seconds)
  FOCUS_DURATION: 25 * 60, // 25 minutes
  SHORT_BREAK_DURATION: 5 * 60, // 5 minutes
  LONG_BREAK_DURATION: 15 * 60, // 15 minutes

  // Session Types
  SESSION_TYPES: {
    FOCUS: 'focus',
    SHORT_BREAK: 'short_break',
    LONG_BREAK: 'long_break'
  },

  // Session Status
  SESSION_STATUS: {
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  },

  // Server Configuration
  DEFAULT_PORT: 3000,
  TIMER_TICK_INTERVAL: 1000 // 1 second
};
