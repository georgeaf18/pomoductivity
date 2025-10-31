/**
 * Jest Configuration (ESM)
 */

export default {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js',
    // Exempt services that require external dependencies
    '!src/services/notification.service.js',
    '!src/services/websocket.service.js',
    // Exempt models (simple data structures)
    '!src/models/*.js'
  ],
  coverageThreshold: {
    global: {
      statements: 65
    }
  },
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
    '**/tests/**/*.test.mjs',
    '**/tests/**/*.spec.mjs'
  ],
  verbose: true,
  testTimeout: 10000,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.js']
};
