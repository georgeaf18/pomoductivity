/**
 * Application Constants
 */

export const NOTIFICATION_EVENT_TYPES = {
  TIMER_STARTED: 'timerStarted',
  TIMER_STOPPED: 'timerStopped',
  TIMER_COMPLETED: 'timerCompleted'
};

export const SESSION_TYPE_NAMES = {
  focus: 'Focus',
  short_break: 'Short Break',
  long_break: 'Long Break'
};

// Timer Durations (in seconds)
export const FOCUS_DURATION = 25 * 60; // 25 minutes
export const SHORT_BREAK_DURATION = 5 * 60; // 5 minutes
export const LONG_BREAK_DURATION = 15 * 60; // 15 minutes

// Session Types
export const SESSION_TYPES = {
  FOCUS: 'focus',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break'
};

// Session Status
export const SESSION_STATUS = {
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Server Configuration
export const DEFAULT_PORT = 3000;
export const TIMER_TICK_INTERVAL = 1000; // 1 second
