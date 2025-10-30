import { jest } from '@jest/globals';

// Stub global fetch to avoid real network calls during tests
global.fetch = jest.fn().mockResolvedValue({ ok: true, statusText: 'OK' });
