/**
 * Settings Controller
 * Handles HTTP requests for timer settings operations
 */

const settingsService = require('../services/settings.service');

class SettingsController {
  /**
   * Get current settings
   * GET /api/settings
   */
  getSettings(req, res) {
    try {
      const settings = settingsService.getSettings();
      res.json(settings);
    } catch (error) {
      console.error('Error getting settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update settings
   * PUT /api/settings
   * Body: { focusDuration?, shortBreakDuration?, longBreakDuration? }
   */
  updateSettings(req, res) {
    try {
      const { focusDuration, shortBreakDuration, longBreakDuration } = req.body;

      // Validate at least one field is provided
      if (
        focusDuration === undefined &&
        shortBreakDuration === undefined &&
        longBreakDuration === undefined
      ) {
        return res.status(400).json({
          error: 'At least one duration field must be provided',
          validFields: ['focusDuration', 'shortBreakDuration', 'longBreakDuration']
        });
      }

      const settings = settingsService.updateSettings(req.body);

      if (!settings) {
        return res.status(400).json({
          error: 'Invalid duration value. Duration must be a positive integer between 1 and 7200 seconds'
        });
      }

      res.json(settings);
    } catch (error) {
      console.error('Error updating settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Reset settings to defaults
   * POST /api/settings/reset
   */
  resetSettings(req, res) {
    try {
      const settings = settingsService.resetSettings();
      res.json(settings);
    } catch (error) {
      console.error('Error resetting settings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new SettingsController();
