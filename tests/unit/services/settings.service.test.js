/**
 * Settings Service Unit Tests
 */

// Mock the constants module before requiring the service
jest.mock('../../../src/config/constants', () => ({
  FOCUS_DURATION: 1500,
  SHORT_BREAK_DURATION: 300,
  LONG_BREAK_DURATION: 900,
  SESSION_TYPES: {
    FOCUS: 'focus',
    SHORT_BREAK: 'short_break',
    LONG_BREAK: 'long_break'
  },
  SESSION_STATUS: {
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  },
  TIMER_TICK_INTERVAL: 1000
}));

describe('Settings Service', () => {
  let SettingsService;
  let settingsService;

  beforeEach(() => {
    // Clear module cache to get a fresh instance
    jest.resetModules();

    // Require the service after mocking
    const SettingsServiceClass = require('../../../src/services/settings.service').constructor;
    settingsService = new SettingsServiceClass();
  });

  describe('getSettings', () => {
    it('should return default settings', () => {
      const settings = settingsService.getSettings();

      expect(settings).toEqual({
        focusDuration: 1500,
        shortBreakDuration: 300,
        longBreakDuration: 900
      });
    });

    it('should return a copy of settings, not the original', () => {
      const settings1 = settingsService.getSettings();
      const settings2 = settingsService.getSettings();

      expect(settings1).not.toBe(settings2);
      expect(settings1).toEqual(settings2);
    });
  });

  describe('updateSettings', () => {
    it('should update focus duration', () => {
      const result = settingsService.updateSettings({ focusDuration: 2000 });

      expect(result).toEqual({
        focusDuration: 2000,
        shortBreakDuration: 300,
        longBreakDuration: 900
      });
    });

    it('should update short break duration', () => {
      const result = settingsService.updateSettings({ shortBreakDuration: 600 });

      expect(result).toEqual({
        focusDuration: 1500,
        shortBreakDuration: 600,
        longBreakDuration: 900
      });
    });

    it('should update long break duration', () => {
      const result = settingsService.updateSettings({ longBreakDuration: 1200 });

      expect(result).toEqual({
        focusDuration: 1500,
        shortBreakDuration: 300,
        longBreakDuration: 1200
      });
    });

    it('should update multiple durations at once', () => {
      const result = settingsService.updateSettings({
        focusDuration: 2500,
        shortBreakDuration: 400,
        longBreakDuration: 1000
      });

      expect(result).toEqual({
        focusDuration: 2500,
        shortBreakDuration: 400,
        longBreakDuration: 1000
      });
    });

    it('should reject negative duration', () => {
      const result = settingsService.updateSettings({ focusDuration: -100 });
      expect(result).toBeNull();
    });

    it('should reject zero duration', () => {
      const result = settingsService.updateSettings({ focusDuration: 0 });
      expect(result).toBeNull();
    });

    it('should reject duration over 2 hours (7200 seconds)', () => {
      const result = settingsService.updateSettings({ focusDuration: 7201 });
      expect(result).toBeNull();
    });

    it('should reject non-integer duration', () => {
      const result = settingsService.updateSettings({ focusDuration: 1500.5 });
      expect(result).toBeNull();
    });

    it('should reject non-number duration', () => {
      const result = settingsService.updateSettings({ focusDuration: 'invalid' });
      expect(result).toBeNull();
    });

    it('should accept maximum valid duration (7200 seconds)', () => {
      const result = settingsService.updateSettings({ focusDuration: 7200 });
      expect(result.focusDuration).toBe(7200);
    });

    it('should accept minimum valid duration (1 second)', () => {
      const result = settingsService.updateSettings({ focusDuration: 1 });
      expect(result.focusDuration).toBe(1);
    });

    it('should call change callbacks when settings update', () => {
      const callback = jest.fn();
      settingsService.onChange(callback);

      settingsService.updateSettings({ focusDuration: 2000 });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({
        focusDuration: 2000,
        shortBreakDuration: 300,
        longBreakDuration: 900
      });
    });
  });

  describe('resetSettings', () => {
    it('should reset settings to defaults', () => {
      settingsService.updateSettings({ focusDuration: 2000 });
      const result = settingsService.resetSettings();

      expect(result).toEqual({
        focusDuration: 1500,
        shortBreakDuration: 300,
        longBreakDuration: 900
      });
    });

    it('should call change callbacks when resetting', () => {
      const callback = jest.fn();
      settingsService.onChange(callback);

      settingsService.updateSettings({ focusDuration: 2000 });
      callback.mockClear();

      settingsService.resetSettings();

      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDuration', () => {
    it('should return focus duration for "focus" type', () => {
      expect(settingsService.getDuration('focus')).toBe(1500);
    });

    it('should return short break duration for "short_break" type', () => {
      expect(settingsService.getDuration('short_break')).toBe(300);
    });

    it('should return long break duration for "long_break" type', () => {
      expect(settingsService.getDuration('long_break')).toBe(900);
    });

    it('should return focus duration for invalid type', () => {
      expect(settingsService.getDuration('invalid')).toBe(1500);
    });

    it('should return updated durations after settings change', () => {
      settingsService.updateSettings({ focusDuration: 2000 });
      expect(settingsService.getDuration('focus')).toBe(2000);
    });
  });

  describe('isValidDuration', () => {
    it('should validate positive integer', () => {
      expect(settingsService.isValidDuration(1500)).toBe(true);
    });

    it('should reject negative number', () => {
      expect(settingsService.isValidDuration(-100)).toBe(false);
    });

    it('should reject zero', () => {
      expect(settingsService.isValidDuration(0)).toBe(false);
    });

    it('should reject number over 7200', () => {
      expect(settingsService.isValidDuration(7201)).toBe(false);
    });

    it('should reject non-integer', () => {
      expect(settingsService.isValidDuration(1500.5)).toBe(false);
    });

    it('should reject non-number', () => {
      expect(settingsService.isValidDuration('1500')).toBe(false);
    });

    it('should accept 7200 (boundary)', () => {
      expect(settingsService.isValidDuration(7200)).toBe(true);
    });

    it('should accept 1 (boundary)', () => {
      expect(settingsService.isValidDuration(1)).toBe(true);
    });
  });

  describe('onChange', () => {
    it('should register callback', () => {
      const callback = jest.fn();
      settingsService.onChange(callback);

      settingsService.updateSettings({ focusDuration: 2000 });

      expect(callback).toHaveBeenCalled();
    });

    it('should support multiple callbacks', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      settingsService.onChange(callback1);
      settingsService.onChange(callback2);

      settingsService.updateSettings({ focusDuration: 2000 });

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });
});
