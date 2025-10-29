/**
 * Routes Index
 * Main router that combines all route modules
 */

import express from 'express';
import timerRoutes from './timer.routes.js';
import healthRoutes from './health.routes.js';
import settingsRoutes from './settings.routes.js';

const router = express.Router();

// Mount route modules
router.use('/timer', timerRoutes);
router.use('/health', healthRoutes);
router.use('/settings', settingsRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    name: 'Pomoductivity API',
    version: '2.0.0',
    description: 'REST API for Pomodoro timer management',
    endpoints: {
      health: 'GET /api/health',
      timer: {
        status: 'GET /api/timer/status',
        history: 'GET /api/timer/history',
        startStop: 'POST /api/timer/start-stop',
        start: 'POST /api/timer/start',
        stop: 'POST /api/timer/stop',
        reset: 'POST /api/timer/reset',
        setType: 'POST /api/timer/set-type'
      },
      settings: {
        get: 'GET /api/settings',
        update: 'PUT /api/settings',
        reset: 'POST /api/settings/reset'
      },
      websocket: 'WS /'
    }
  });
});

export default router;
