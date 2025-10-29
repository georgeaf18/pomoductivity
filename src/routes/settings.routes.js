/**
 * Settings Routes
 * Defines all settings-related API endpoints
 */

import express from 'express';
import settingsController from '../controllers/settings.controller.js';

const router = express.Router();

// Get settings
router.get('/', settingsController.getSettings.bind(settingsController));

// Update settings
router.put('/', settingsController.updateSettings.bind(settingsController));

// Reset settings
router.post('/reset', settingsController.resetSettings.bind(settingsController));

export default router;
