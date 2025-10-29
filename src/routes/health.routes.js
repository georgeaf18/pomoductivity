/**
 * Health Routes
 * Defines health check endpoints
 */

import express from 'express';
import healthController from '../controllers/health.controller.js';

const router = express.Router();

router.get('/', healthController.check.bind(healthController));

export default router;
