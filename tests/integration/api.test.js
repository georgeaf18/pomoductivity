/**
 * API Integration Tests
 */

const request = require('supertest');
const app = require('../../src/app');

describe('API Integration Tests', () => {
  describe('Health Endpoint', () => {
    it('GET /api/health should return 200', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Timer Endpoints', () => {
    describe('GET /api/timer/status', () => {
      it('should return timer status', async () => {
        const response = await request(app)
          .get('/api/timer/status')
          .expect(200);

        expect(response.body).toHaveProperty('isRunning');
        expect(response.body).toHaveProperty('timeRemaining');
        expect(response.body).toHaveProperty('sessionType');
        expect(response.body).toHaveProperty('sessionCount');
        expect(response.body).toHaveProperty('startTime');
        expect(response.body).toHaveProperty('history');
      });
    });

    describe('POST /api/timer/start', () => {
      it('should start the timer', async () => {
        const response = await request(app)
          .post('/api/timer/start')
          .expect(200);

        expect(response.body.isRunning).toBe(true);
        expect(response.body.startTime).toBeTruthy();
      });
    });

    describe('POST /api/timer/stop', () => {
      it('should stop the timer', async () => {
        // Start first
        await request(app).post('/api/timer/start');

        // Then stop
        const response = await request(app)
          .post('/api/timer/stop')
          .expect(200);

        expect(response.body.isRunning).toBe(false);
        expect(response.body.startTime).toBeNull();
      });
    });

    describe('POST /api/timer/start-stop', () => {
      it('should toggle timer state', async () => {
        // Toggle to start
        const response1 = await request(app)
          .post('/api/timer/start-stop')
          .expect(200);

        expect(response1.body.isRunning).toBe(true);

        // Toggle to stop
        const response2 = await request(app)
          .post('/api/timer/start-stop')
          .expect(200);

        expect(response2.body.isRunning).toBe(false);
      });
    });

    describe('POST /api/timer/reset', () => {
      it('should reset the timer', async () => {
        const response = await request(app)
          .post('/api/timer/reset')
          .expect(200);

        expect(response.body.isRunning).toBe(false);
        expect(response.body.timeRemaining).toBeGreaterThan(0);
      });
    });

    describe('POST /api/timer/set-type', () => {
      it('should set session type to short_break', async () => {
        const response = await request(app)
          .post('/api/timer/set-type')
          .send({ type: 'short_break' })
          .expect(200);

        expect(response.body.sessionType).toBe('short_break');
      });

      it('should set session type to long_break', async () => {
        const response = await request(app)
          .post('/api/timer/set-type')
          .send({ type: 'long_break' })
          .expect(200);

        expect(response.body.sessionType).toBe('long_break');
      });

      it('should set session type to focus', async () => {
        const response = await request(app)
          .post('/api/timer/set-type')
          .send({ type: 'focus' })
          .expect(200);

        expect(response.body.sessionType).toBe('focus');
      });

      it('should reject invalid session type', async () => {
        const response = await request(app)
          .post('/api/timer/set-type')
          .send({ type: 'invalid' })
          .expect(400);

        expect(response.body).toHaveProperty('error');
      });

      it('should reject missing type', async () => {
        const response = await request(app)
          .post('/api/timer/set-type')
          .send({})
          .expect(400);

        expect(response.body).toHaveProperty('error');
      });
    });

    describe('GET /api/timer/history', () => {
      it('should return session history', async () => {
        const response = await request(app)
          .get('/api/timer/history')
          .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });

  describe('Settings Endpoints', () => {
    describe('GET /api/settings', () => {
      it('should return current settings', async () => {
        const response = await request(app)
          .get('/api/settings')
          .expect(200);

        expect(response.body).toHaveProperty('focusDuration');
        expect(response.body).toHaveProperty('shortBreakDuration');
        expect(response.body).toHaveProperty('longBreakDuration');
      });
    });

    describe('PUT /api/settings', () => {
      it('should update focus duration', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({ focusDuration: 2000 })
          .expect(200);

        expect(response.body.focusDuration).toBe(2000);
      });

      it('should update short break duration', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({ shortBreakDuration: 400 })
          .expect(200);

        expect(response.body.shortBreakDuration).toBe(400);
      });

      it('should update long break duration', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({ longBreakDuration: 1000 })
          .expect(200);

        expect(response.body.longBreakDuration).toBe(1000);
      });

      it('should update multiple durations', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({
            focusDuration: 1800,
            shortBreakDuration: 360,
            longBreakDuration: 1080
          })
          .expect(200);

        expect(response.body.focusDuration).toBe(1800);
        expect(response.body.shortBreakDuration).toBe(360);
        expect(response.body.longBreakDuration).toBe(1080);
      });

      it('should reject invalid duration (negative)', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({ focusDuration: -100 })
          .expect(400);

        expect(response.body).toHaveProperty('error');
      });

      it('should reject invalid duration (too large)', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({ focusDuration: 10000 })
          .expect(400);

        expect(response.body).toHaveProperty('error');
      });

      it('should reject invalid duration (non-integer)', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({ focusDuration: 1500.5 })
          .expect(400);

        expect(response.body).toHaveProperty('error');
      });

      it('should reject empty body', async () => {
        const response = await request(app)
          .put('/api/settings')
          .send({})
          .expect(400);

        expect(response.body).toHaveProperty('error');
      });
    });

    describe('POST /api/settings/reset', () => {
      it('should reset settings to defaults', async () => {
        // First change settings
        await request(app)
          .put('/api/settings')
          .send({ focusDuration: 2000 });

        // Then reset
        const response = await request(app)
          .post('/api/settings/reset')
          .expect(200);

        expect(response.body.focusDuration).toBe(1500);
        expect(response.body.shortBreakDuration).toBe(300);
        expect(response.body.longBreakDuration).toBe(900);
      });
    });
  });

  describe('API Info Endpoint', () => {
    it('GET /api should return API information', async () => {
      const response = await request(app)
        .get('/api')
        .expect(200);

      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
      expect(response.body.endpoints).toHaveProperty('health');
      expect(response.body.endpoints).toHaveProperty('timer');
      expect(response.body.endpoints).toHaveProperty('settings');
    });
  });

  describe('404 Handling', () => {
    it('should return 404 for unknown endpoint', async () => {
      const response = await request(app)
        .get('/api/nonexistent')
        .expect(404);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON', async () => {
      const response = await request(app)
        .post('/api/timer/set-type')
        .set('Content-Type', 'application/json')
        .send('{"type": invalid}')
        .expect(400);
    });
  });
});
