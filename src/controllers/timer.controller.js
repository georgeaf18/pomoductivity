/**
 * Timer Controller
 * Handles HTTP requests for timer operations
 */

const timerService = require('../services/timer.service');
const { SESSION_TYPES } = require('../config/constants');

class TimerController {
  /**
   * Get current timer status
   * GET /api/timer/status
   */
  getStatus(req, res) {
    try {
      const state = timerService.getState();
      res.json(state);
    } catch (error) {
      console.error('Error getting timer status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Toggle timer (start/stop)
   * POST /api/timer/start-stop
   */
  toggleTimer(req, res) {
    try {
      const state = timerService.toggle();
      res.json(state);
    } catch (error) {
      console.error('Error toggling timer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Start timer
   * POST /api/timer/start
   */
  startTimer(req, res) {
    try {
      const state = timerService.start();
      res.json(state);
    } catch (error) {
      console.error('Error starting timer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Stop timer
   * POST /api/timer/stop
   */
  stopTimer(req, res) {
    try {
      const state = timerService.stop();
      res.json(state);
    } catch (error) {
      console.error('Error stopping timer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Reset timer
   * POST /api/timer/reset
   */
  resetTimer(req, res) {
    try {
      const state = timerService.reset();
      res.json(state);
    } catch (error) {
      console.error('Error resetting timer:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Set session type
   * POST /api/timer/set-type
   * Body: { type: 'focus' | 'short_break' | 'long_break' }
   */
  setSessionType(req, res) {
    try {
      const { type } = req.body;

      if (!type) {
        return res.status(400).json({ error: 'Session type is required' });
      }

      if (!Object.values(SESSION_TYPES).includes(type)) {
        return res.status(400).json({
          error: 'Invalid session type. Must be one of: focus, short_break, long_break'
        });
      }

      const state = timerService.setSessionType(type);
      res.json(state);
    } catch (error) {
      console.error('Error setting session type:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get session history
   * GET /api/timer/history
   */
  getHistory(req, res) {
    try {
      const history = timerService.getHistory();
      res.json(history);
    } catch (error) {
      console.error('Error getting timer history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new TimerController();
