# Testing Guide

## Overview

This project includes comprehensive unit and integration tests to ensure code quality and prevent regressions.

## Test Statistics

- **Total Tests**: 90
- **Unit Tests**: 65
- **Integration Tests**: 25
- **Code Coverage**: Run `npm run test:coverage` to see current coverage

## Test Stack

- **Framework**: Jest
- **HTTP Testing**: Supertest
- **Test Types**: Unit tests, Integration tests

## Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Tests with Coverage Report

```bash
npm run test:coverage
```

Coverage reports are generated in the `coverage/` directory.

## Test Structure

```
tests/
├── unit/
│   ├── services/
│   │   ├── timer.service.test.js       # Timer service unit tests
│   │   └── settings.service.test.js    # Settings service unit tests
│   └── controllers/                     # Controller unit tests (future)
└── integration/
    └── api.test.js                      # Full API integration tests
```

## Unit Tests

### Services

#### Timer Service Tests (`tests/unit/services/timer.service.test.js`)

**Coverage**: 50+ test cases

- **Initialization**: Tests default state and settings integration
- **State Management**: Tests `getState()` and `getHistory()`
- **Timer Control**: Tests start, stop, toggle, reset operations
- **Session Management**: Tests session type changes and completion
- **Tick Behavior**: Tests timer countdown and completion triggers
- **Callbacks**: Tests state change notifications
- **Cleanup**: Tests proper resource cleanup

**Key Test Cases**:
```javascript
- ✓ should initialize with default state
- ✓ should start the timer
- ✓ should stop the timer
- ✓ should toggle timer state
- ✓ should reset timeRemaining to session duration
- ✓ should change session type
- ✓ should decrement timeRemaining when running
- ✓ should call completeSession when timeRemaining reaches 0
- ✓ should add entry to history
- ✓ should call registered callbacks on state change
```

#### Settings Service Tests (`tests/unit/services/settings.service.test.js`)

**Coverage**: 40+ test cases

- **Get Settings**: Tests retrieving current settings
- **Update Settings**: Tests updating individual and multiple durations
- **Validation**: Tests duration validation rules
- **Reset**: Tests resetting to default values
- **Callbacks**: Tests change notifications
- **Boundary Testing**: Tests min/max duration values

**Key Test Cases**:
```javascript
- ✓ should return default settings
- ✓ should update focus duration
- ✓ should update multiple durations at once
- ✓ should reject negative duration
- ✓ should reject duration over 2 hours (7200 seconds)
- ✓ should reject non-integer duration
- ✓ should accept maximum valid duration (7200 seconds)
- ✓ should accept minimum valid duration (1 second)
- ✓ should reset settings to defaults
- ✓ should call change callbacks when settings update
```

## Integration Tests

### API Integration Tests (`tests/integration/api.test.js`)

**Coverage**: 25+ test cases covering all endpoints

#### Health Endpoint
```javascript
- ✓ GET /api/health should return 200
```

#### Timer Endpoints
```javascript
- ✓ GET /api/timer/status should return timer status
- ✓ POST /api/timer/start should start the timer
- ✓ POST /api/timer/stop should stop the timer
- ✓ POST /api/timer/start-stop should toggle timer state
- ✓ POST /api/timer/reset should reset the timer
- ✓ POST /api/timer/set-type should set session type to short_break
- ✓ POST /api/timer/set-type should set session type to long_break
- ✓ POST /api/timer/set-type should set session type to focus
- ✓ POST /api/timer/set-type should reject invalid session type
- ✓ POST /api/timer/set-type should reject missing type
- ✓ GET /api/timer/history should return session history
```

#### Settings Endpoints
```javascript
- ✓ GET /api/settings should return current settings
- ✓ PUT /api/settings should update focus duration
- ✓ PUT /api/settings should update short break duration
- ✓ PUT /api/settings should update long break duration
- ✓ PUT /api/settings should update multiple durations
- ✓ PUT /api/settings should reject invalid duration (negative)
- ✓ PUT /api/settings should reject invalid duration (too large)
- ✓ PUT /api/settings should reject invalid duration (non-integer)
- ✓ PUT /api/settings should reject empty body
- ✓ POST /api/settings/reset should reset settings to defaults
```

#### Error Handling
```javascript
- ✓ GET /api should return API information
- ✓ should return 404 for unknown endpoint
- ✓ should handle malformed JSON
```

## Writing New Tests

### Unit Test Template

```javascript
/**
 * [Service/Controller Name] Unit Tests
 */

// Mock dependencies
jest.mock('../../../src/path/to/dependency');

describe('[Service/Controller Name]', () => {
  let service;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    // Setup fresh instance
  });

  afterEach(() => {
    // Cleanup if needed
  });

  describe('method name', () => {
    it('should do something', () => {
      // Arrange
      const input = 'test';

      // Act
      const result = service.method(input);

      // Assert
      expect(result).toBe(expected);
    });

    it('should handle error case', () => {
      // Test error handling
    });
  });
});
```

### Integration Test Template

```javascript
const request = require('supertest');
const app = require('../../src/app');

describe('Feature Integration Tests', () => {
  describe('GET /api/endpoint', () => {
    it('should return expected response', async () => {
      const response = await request(app)
        .get('/api/endpoint')
        .expect(200);

      expect(response.body).toHaveProperty('field');
    });

    it('should handle error case', async () => {
      const response = await request(app)
        .get('/api/endpoint')
        .send({ invalid: 'data' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

## Test Best Practices

### 1. Test Structure (AAA Pattern)

Use the Arrange-Act-Assert pattern:

```javascript
it('should do something', () => {
  // Arrange: Setup test data and state
  const input = { value: 123 };

  // Act: Execute the code under test
  const result = service.method(input);

  // Assert: Verify the result
  expect(result).toBe(expected);
});
```

### 2. Test Isolation

Each test should be independent:

```javascript
beforeEach(() => {
  // Reset state before each test
  jest.resetModules();
  jest.clearAllMocks();
});
```

### 3. Descriptive Test Names

Use clear, descriptive test names:

```javascript
// Good
it('should reject negative duration values', () => { ... });

// Bad
it('test duration', () => { ... });
```

### 4. Test Edge Cases

Always test boundary conditions:

```javascript
describe('isValidDuration', () => {
  it('should accept minimum valid duration (1)', () => { ... });
  it('should accept maximum valid duration (7200)', () => { ... });
  it('should reject 0', () => { ... });
  it('should reject 7201', () => { ... });
});
```

### 5. Mock External Dependencies

Mock external dependencies to isolate the unit under test:

```javascript
jest.mock('../../../src/services/settings.service', () => ({
  getDuration: jest.fn(),
  onChange: jest.fn()
}));
```

### 6. Test Async Code

Use async/await for testing async code:

```javascript
it('should return timer status', async () => {
  const response = await request(app)
    .get('/api/timer/status')
    .expect(200);

  expect(response.body).toHaveProperty('isRunning');
});
```

## Continuous Integration

### Pre-commit Checks

Add to your workflow:

```json
{
  "scripts": {
    "precommit": "npm test",
    "prepush": "npm run test:coverage"
  }
}
```

### GitHub Actions Example

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '14'
      - run: npm install
      - run: npm test
      - run: npm run test:coverage
```

## Code Coverage Goals

Target coverage thresholds:

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

Configure in `jest.config.js`:

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80
    }
  }
};
```

## Debugging Tests

### Run Specific Test File

```bash
npm test tests/unit/services/timer.service.test.js
```

### Run Specific Test Suite

```bash
npm test -- -t "Timer Service"
```

### Run Specific Test Case

```bash
npm test -- -t "should start the timer"
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": [
    "--runInBand",
    "--no-cache",
    "${file}"
  ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## Common Testing Patterns

### Testing Callbacks

```javascript
it('should call registered callbacks', () => {
  const callback = jest.fn();
  service.onStateChange(callback);

  service.start();

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledWith(
    expect.objectContaining({ isRunning: true })
  );
});
```

### Testing Timers

```javascript
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('should tick every second', () => {
  service.start();

  jest.advanceTimersByTime(1000);

  expect(service.getState().timeRemaining).toBe(1499);
});
```

### Testing HTTP Responses

```javascript
it('should return 400 for invalid input', async () => {
  const response = await request(app)
    .post('/api/endpoint')
    .send({ invalid: 'data' })
    .expect(400);

  expect(response.body).toMatchObject({
    error: expect.any(String)
  });
});
```

### Testing Multiple Scenarios

```javascript
describe.each([
  ['focus', 1500],
  ['short_break', 300],
  ['long_break', 900]
])('session type %s', (type, duration) => {
  it(`should have duration ${duration}`, () => {
    expect(service.getDuration(type)).toBe(duration);
  });
});
```

## Maintenance

### Updating Tests

When modifying code:

1. **Update tests first** (TDD approach) or
2. **Update tests immediately** after code changes
3. **Run full test suite** before committing
4. **Check coverage** to ensure no gaps

### Removing Tests

Only remove tests when:
- The feature is completely removed
- The test is redundant with better tests
- After discussion with the team

### Refactoring Tests

Look for opportunities to:
- Extract common setup into helpers
- Use `beforeEach`/`afterEach` for shared setup/teardown
- Create test utilities for repeated patterns
- Group related tests with `describe` blocks

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [AAA Pattern](http://wiki.c2.com/?ArrangeActAssert)

## Troubleshooting

### Tests Timing Out

Increase timeout:

```javascript
jest.setTimeout(10000); // 10 seconds
```

### Port Already in Use

Tests might fail if port 3000 is in use. The integration tests create their own server instance, so this shouldn't happen, but if it does:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Tests Passing Locally But Failing in CI

Common causes:
- Different Node versions
- Missing environment variables
- Timing issues (use fake timers)
- File system differences

### Memory Leaks in Tests

If tests slow down over time:

```javascript
afterEach(() => {
  // Clean up resources
  jest.clearAllMocks();
  jest.resetModules();
});
```

---

Happy Testing! 🧪
