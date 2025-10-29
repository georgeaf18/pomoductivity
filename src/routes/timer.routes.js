/**
 * Timer Routes
 * Defines all timer-related API endpoints
 */

import express from 'express';
import timerController from '../controllers/timer.controller.js';

const router = express.Router();

// Timer status
router.get('/status', timerController.getStatus.bind(timerController));

// Timer controls
router.post('/start-stop', timerController.toggleTimer.bind(timerController));
router.post('/start', timerController.startTimer.bind(timerController));
router.post('/stop', timerController.stopTimer.bind(timerController));
router.post('/reset', timerController.resetTimer.bind(timerController));

// Session type
router.post('/set-type', timerController.setSessionType.bind(timerController));

// History
router.get('/history', timerController.getHistory.bind(timerController));

export default router;
