/**
 * Timer Model - TypeScript-style JSDoc type definitions for API contracts
 * These definitions can be used for both the backend and to generate mock data for Angular
 */

/**
 * @typedef {'focus' | 'short_break' | 'long_break'} SessionType
 * Represents the type of pomodoro session
 */

/**
 * @typedef {'completed' | 'cancelled'} SessionStatus
 * Represents the completion status of a session
 */

/**
 * @typedef {Object} TimerState
 * @property {boolean} isRunning - Whether the timer is currently running
 * @property {number} timeRemaining - Seconds remaining in current session
 * @property {SessionType} sessionType - Current session type
 * @property {number} sessionCount - Number of completed focus sessions
 * @property {string|null} startTime - ISO timestamp when session started, null if not running
 */

/**
 * @typedef {Object} SessionHistoryEntry
 * @property {SessionType} type - Type of session that was completed
 * @property {string} startTime - ISO timestamp when session started
 * @property {string} endTime - ISO timestamp when session ended
 * @property {number} duration - Duration of the session in seconds
 * @property {SessionStatus} status - Whether session was completed or cancelled
 */

/**
 * @typedef {Object} TimerStatusResponse
 * @property {boolean} isRunning
 * @property {number} timeRemaining
 * @property {SessionType} sessionType
 * @property {number} sessionCount
 * @property {string|null} startTime
 * @property {SessionHistoryEntry[]} history
 */

/**
 * @typedef {Object} SetTypeRequest
 * @property {SessionType} type - The session type to set
 */

/**
 * @typedef {Object} ErrorResponse
 * @property {string} error - Error message
 */

/**
 * @typedef {Object} HealthCheckResponse
 * @property {string} status - Health status ('ok' or 'error')
 * @property {number} uptime - Server uptime in seconds
 */

export const SESSION_TYPES = ['focus', 'short_break', 'long_break'];
export const SESSION_STATUSES = ['completed', 'cancelled'];
