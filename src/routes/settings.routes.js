/**
 * Settings Routes
 * Defines all settings-related API endpoints
 */

const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settings.controller');

// Get settings
router.get('/', settingsController.getSettings.bind(settingsController));

// Update settings
router.put('/', settingsController.updateSettings.bind(settingsController));

// Reset settings
router.post('/reset', settingsController.resetSettings.bind(settingsController));

module.exports = router;
