/**
 * Timer Service Unit Tests (ESM)
 */
import { jest } from '@jest/globals';

describe('Timer Service', () => {
  let timerService;
  let mockSettingsService;
  let mockNotificationService;

  beforeEach(async () => {
    jest.resetModules();
    jest.clearAllMocks();
    jest.useFakeTimers();

    await jest.unstable_mockModule('../../../src/config/constants.js', () => ({
      SESSION_TYPES: {
        FOCUS: 'focus',
        SHORT_BREAK: 'short_break',
        LONG_BREAK: 'long_break'
      },
      SESSION_STATUS: {
        COMPLETED: 'completed',
        CANCELLED: 'cancelled'
      },
      TIMER_TICK_INTERVAL: 1000,
      NOTIFICATION_EVENT_TYPES: {
        TIMER_STARTED: 'timerStarted',
        TIMER_STOPPED: 'timerStopped',
        TIMER_COMPLETED: 'timerCompleted'
      }
    }));

    mockSettingsService = {
      getDuration: jest.fn((type) => {
        switch (type) {
          case 'focus': return 1500;
          case 'short_break': return 300;
          case 'long_break': return 900;
          default: return 1500;
        }
      }),
      onChange: jest.fn()
    };

    await jest.unstable_mockModule('../../../src/services/settings.service.js', () => ({
      default: mockSettingsService
    }));

    mockNotificationService = {
      sendTimerNotification: jest.fn().mockResolvedValue()
    };

    await jest.unstable_mockModule('../../../src/services/notification.service.js', () => ({
      default: mockNotificationService
    }));

    ({ default: timerService } = await import('../../../src/services/timer.service.js'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with default state', () => {
      const state = timerService.getState();

      expect(state).toMatchObject({
        isRunning: false,
        timeRemaining: 1500,
        sessionType: 'focus',
        sessionCount: 0,
        startTime: null,
        history: []
      });
    });

    it('should register settings change callback', () => {
      expect(mockSettingsService.onChange).toHaveBeenCalled();
    });
  });

  describe('getState', () => {
    it('should return current state with history', () => {
      const state = timerService.getState();

      expect(state).toHaveProperty('isRunning');
      expect(state).toHaveProperty('timeRemaining');
      expect(state).toHaveProperty('sessionType');
      expect(state).toHaveProperty('sessionCount');
      expect(state).toHaveProperty('startTime');
      expect(state).toHaveProperty('history');
    });
  });

  describe('getHistory', () => {
    it('should return empty history initially', () => {
      expect(timerService.getHistory()).toEqual([]);
    });

    it('should return a copy of history', () => {
      const history1 = timerService.getHistory();
      const history2 = timerService.getHistory();

      expect(history1).not.toBe(history2);
    });
  });

  describe('start', () => {
    it('should start the timer', async () => {
      const state = await timerService.start();

      expect(state.isRunning).toBe(true);
      expect(state.startTime).toBeTruthy();
    });

    it('should not start if already running', async () => {
      await timerService.start();
      const firstStartTime = timerService.getState().startTime;

      await timerService.start();
      const secondStartTime = timerService.getState().startTime;

      expect(firstStartTime).toBe(secondStartTime);
    });

    it('should start interval', async () => {
      await timerService.start();
      expect(timerService.interval).toBeTruthy();
    });
  });

  describe('stop', () => {
    it('should stop the timer', async () => {
      await timerService.start();
      const state = await timerService.stop();

      expect(state.isRunning).toBe(false);
      expect(state.startTime).toBeNull();
    });

    it('should clear interval', async () => {
      await timerService.start();
      await timerService.stop();

      expect(timerService.interval).toBeNull();
    });

    it('should do nothing if already stopped', async () => {
      const state1 = await timerService.stop();
      const state2 = await timerService.stop();

      expect(state1).toEqual(state2);
    });
  });

  describe('toggle', () => {
    it('should start timer when stopped', async () => {
      const state = await timerService.toggle();
      expect(state.isRunning).toBe(true);
    });

    it('should stop timer when running', async () => {
      await timerService.start();
      const state = await timerService.toggle();
      expect(state.isRunning).toBe(false);
    });
  });

  describe('reset', () => {
    it('should reset timeRemaining to session duration', () => {
      timerService.timerState.timeRemaining = 500;
      const state = timerService.reset();

      expect(state.timeRemaining).toBe(1500);
    });

    it('should stop timer if running', async () => {
      await timerService.start();
      const state = timerService.reset();

      expect(state.isRunning).toBe(false);
      expect(state.startTime).toBeNull();
    });

    it('should clear interval', async () => {
      await timerService.start();
      timerService.reset();

      expect(timerService.interval).toBeNull();
    });
  });

  describe('setSessionType', () => {
    it('should change session type to short_break', () => {
      const state = timerService.setSessionType('short_break');

      expect(state.sessionType).toBe('short_break');
      expect(state.timeRemaining).toBe(300);
    });

    it('should change session type to long_break', () => {
      const state = timerService.setSessionType('long_break');

      expect(state.sessionType).toBe('long_break');
      expect(state.timeRemaining).toBe(900);
    });

    it('should return null for invalid type', () => {
      const state = timerService.setSessionType('invalid');
      expect(state).toBeNull();
    });

    it('should stop timer when changing type', async () => {
      await timerService.start();
      const state = timerService.setSessionType('short_break');

      expect(state.isRunning).toBe(false);
      expect(state.startTime).toBeNull();
    });
  });

  describe('tick', () => {
    it('should decrement timeRemaining when running', async () => {
      await timerService.start();
      const initialTime = timerService.getState().timeRemaining;

      timerService.tick();

      expect(timerService.getState().timeRemaining).toBe(initialTime - 1);
    });

    it('should not decrement when stopped', () => {
      const initialTime = timerService.getState().timeRemaining;

      timerService.tick();

      expect(timerService.getState().timeRemaining).toBe(initialTime);
    });

    it('should call completeSession when timeRemaining reaches 0', async () => {
      const completeSpy = jest.spyOn(timerService, 'completeSession');
      await timerService.start();
      timerService.timerState.timeRemaining = 1;

      timerService.tick();

      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('completeSession', () => {
    it('should add entry to history', async () => {
      await timerService.start();
      await timerService.completeSession();

      const history = timerService.getHistory();
      expect(history).toHaveLength(1);
      expect(history[0]).toMatchObject({
        type: 'focus',
        duration: 1500,
        status: 'completed'
      });
    });

    it('should increment sessionCount for focus sessions', async () => {
      await timerService.start();
      await timerService.completeSession();

      expect(timerService.getState().sessionCount).toBe(1);
    });

    it('should not increment sessionCount for break sessions', async () => {
      timerService.setSessionType('short_break');
      await timerService.start();
      await timerService.completeSession();

      expect(timerService.getState().sessionCount).toBe(0);
    });

    it('should stop timer', async () => {
      await timerService.start();
      await timerService.completeSession();

      expect(timerService.getState().isRunning).toBe(false);
    });

    it('should reset timeRemaining to session duration', async () => {
      await timerService.start();
      timerService.timerState.timeRemaining = 0;
      await timerService.completeSession();

      expect(timerService.getState().timeRemaining).toBe(1500);
    });
  });

  describe('onStateChange', () => {
    it('should call registered callbacks on state change', async () => {
      const callback = jest.fn();
      timerService.onStateChange(callback);

      await timerService.start();

      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(expect.objectContaining({
        isRunning: true
      }));
    });

    it('should support multiple callbacks', async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      timerService.onStateChange(callback1);
      timerService.onStateChange(callback2);

      await timerService.start();

      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();
    });
  });

  describe('getDuration', () => {
    it('should get duration from settings service', () => {
      timerService.getDuration('focus');
      expect(mockSettingsService.getDuration).toHaveBeenCalledWith('focus');
    });

    it('should return correct duration for each type', () => {
      expect(timerService.getDuration('focus')).toBe(1500);
      expect(timerService.getDuration('short_break')).toBe(300);
      expect(timerService.getDuration('long_break')).toBe(900);
    });
  });

  describe('destroy', () => {
    it('should clear interval', async () => {
      await timerService.start();
      timerService.destroy();

      expect(timerService.interval).toBeNull();
    });

    it('should clear callbacks', () => {
      timerService.onStateChange(jest.fn());
      timerService.destroy();

      expect(timerService.stateChangeCallbacks).toEqual([]);
    });
  });
});


