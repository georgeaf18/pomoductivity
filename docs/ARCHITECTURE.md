# Pomoductivity API Architecture

## Project Structure

```
pomoductivity/
├── server.js                 # Main entry point
├── src/
│   ├── app.js               # Express app configuration
│   ├── config/              # Configuration files
│   │   ├── constants.js     # Application constants
│   │   └── environment.js   # Environment configuration
│   ├── controllers/         # Request handlers
│   │   ├── timer.controller.js
│   │   └── health.controller.js
│   ├── services/            # Business logic
│   │   ├── timer.service.js
│   │   └── websocket.service.js
│   ├── routes/              # API routes
│   │   ├── index.js         # Main router
│   │   ├── timer.routes.js
│   │   └── health.routes.js
│   ├── models/              # Data models and type definitions
│   │   └── timer.model.js
│   └── utils/               # Utility functions (empty for now)
├── docs/                    # Documentation
│   ├── API.md              # API documentation
│   └── ARCHITECTURE.md     # This file
└── package.json

```

## Architecture Overview

This is a REST API built with **Node.js** and **Express**, following a modular, layered architecture pattern.

### Layers

1. **Server Layer** (`server.js`)
   - Creates HTTP and WebSocket servers
   - Initializes services
   - Starts the application

2. **Application Layer** (`src/app.js`)
   - Configures Express middleware
   - Mounts routes
   - Handles errors and 404s

3. **Routes Layer** (`src/routes/`)
   - Defines API endpoints
   - Routes requests to appropriate controllers
   - Validates request parameters

4. **Controller Layer** (`src/controllers/`)
   - Handles HTTP requests
   - Validates input
   - Calls service layer
   - Formats responses

5. **Service Layer** (`src/services/`)
   - Contains business logic
   - Manages application state
   - Handles timer operations
   - Broadcasts WebSocket updates

6. **Configuration Layer** (`src/config/`)
   - Environment variables
   - Application constants
   - CORS configuration

7. **Model Layer** (`src/models/`)
   - Type definitions (JSDoc)
   - Data structures
   - Validation rules

## Data Flow

### REST API Request Flow

```
HTTP Request
    ↓
Express App (app.js)
    ↓
Routes (routes/*.js)
    ↓
Controller (controllers/*.js)
    ↓
Service (services/*.js)
    ↓
Controller Response
    ↓
HTTP Response
```

### WebSocket Update Flow

```
Timer Service State Change
    ↓
State Change Callback
    ↓
WebSocket Service
    ↓
Broadcast to All Connected Clients
```

## Key Components

### Timer Service (`src/services/timer.service.js`)

**Responsibilities:**
- Manage timer state
- Handle timer operations (start, stop, reset)
- Track session history
- Notify listeners of state changes

**State Management:**
- Singleton pattern
- In-memory state (can be extended to use a database)
- Callbacks for state change notifications

**Key Methods:**
- `start()` - Start the timer
- `stop()` - Stop the timer
- `toggle()` - Toggle timer state
- `reset()` - Reset to default duration
- `setSessionType(type)` - Change session type
- `onStateChange(callback)` - Register state change listener

### WebSocket Service (`src/services/websocket.service.js`)

**Responsibilities:**
- Manage WebSocket connections
- Broadcast state updates to all clients
- Send initial state to new connections

**Key Methods:**
- `initialize(wss)` - Initialize with WebSocket server
- `broadcast(state)` - Send state to all connected clients
- `sendInitialState(ws, state)` - Send state to specific client

### Controllers

**Responsibilities:**
- Handle HTTP request/response
- Validate input
- Call service methods
- Format responses
- Handle errors

**Pattern:**
- Each controller method corresponds to one API endpoint
- Controllers are thin - business logic is in services
- Singleton pattern for easy dependency injection

### Routes

**Responsibilities:**
- Define API endpoints
- Map URLs to controller methods
- Group related endpoints

**Pattern:**
- Modular route files for each domain
- Main router (`routes/index.js`) combines all route modules
- RESTful naming conventions

## Configuration

### Environment Variables

Defined in `src/config/environment.js`:

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | `http://localhost:4200` | Allowed CORS origin |

### Constants

Defined in `src/config/constants.js`:

- Timer durations
- Session types
- Session statuses
- Tick interval

## State Management

### Current Implementation

- **In-memory state** stored in Timer Service
- **Singleton services** ensure single source of truth
- **State changes** broadcast via WebSocket to all clients

### Extensibility

To add database persistence:

1. Create a repository layer in `src/repositories/`
2. Inject repository into Timer Service
3. Modify Timer Service to persist state changes
4. Load initial state from database on startup

Example:

```javascript
// src/repositories/timer.repository.js
class TimerRepository {
  async saveState(state) { /* ... */ }
  async loadState() { /* ... */ }
  async saveHistory(entry) { /* ... */ }
  async loadHistory() { /* ... */ }
}
```

## Error Handling

### Pattern

1. Try-catch blocks in controllers
2. Return appropriate HTTP status codes
3. Consistent error response format
4. Development mode includes stack traces

### Error Response Format

```json
{
  "error": "Error message",
  "message": "Additional context (optional)"
}
```

## CORS Configuration

Configured for Angular frontend development:

- Default origin: `http://localhost:4200` (Angular dev server)
- Credentials enabled
- Configurable via `CORS_ORIGIN` environment variable

## WebSocket Protocol

### Connection Lifecycle

1. Client connects to `ws://localhost:3000`
2. Server sends initial timer state
3. Server broadcasts updates on every state change
4. Client receives real-time updates

### Message Format

All messages are JSON strings with the timer state:

```json
{
  "isRunning": boolean,
  "timeRemaining": number,
  "sessionType": "focus" | "short_break" | "long_break",
  "sessionCount": number,
  "startTime": string | null,
  "history": SessionHistoryEntry[]
}
```

## Testing Strategy

### Unit Tests (Recommended)

- Test services in isolation
- Mock dependencies
- Test controllers with mocked services
- Test routes with supertest

### Integration Tests (Recommended)

- Test full API endpoints
- Test WebSocket connection and updates
- Test error scenarios

### Example Test Structure

```
tests/
├── unit/
│   ├── services/
│   │   └── timer.service.test.js
│   └── controllers/
│       └── timer.controller.test.js
└── integration/
    ├── api/
    │   └── timer.test.js
    └── websocket/
        └── connection.test.js
```

## Future Enhancements

### Potential Improvements

1. **Database Integration**
   - PostgreSQL or MongoDB for persistence
   - Session history storage
   - User authentication

2. **User Management**
   - Multiple users
   - User-specific timers
   - User preferences

3. **Authentication**
   - JWT tokens
   - OAuth integration
   - API key support

4. **Analytics**
   - Productivity statistics
   - Session completion rates
   - Time tracking

5. **Notifications**
   - Email/SMS notifications
   - Push notifications
   - Webhook support

6. **Customization**
   - Custom timer durations
   - Custom session types
   - Theme preferences

## Deployment Considerations

### Environment Setup

1. Set `NODE_ENV=production`
2. Configure `CORS_ORIGIN` for production frontend URL
3. Set appropriate `PORT` if not using 3000
4. Use process manager (PM2, systemd)

### Production Checklist

- [ ] Add authentication
- [ ] Add rate limiting
- [ ] Add request logging (Morgan, Winston)
- [ ] Add monitoring (Prometheus, New Relic)
- [ ] Enable HTTPS
- [ ] Configure proper CORS
- [ ] Add input validation (Joi, express-validator)
- [ ] Add API versioning
- [ ] Set up error tracking (Sentry)
- [ ] Configure reverse proxy (nginx)
- [ ] Set up database connection pooling
- [ ] Add health check endpoints for orchestrators

## Development Workflow

### Starting the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

### Project Scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `node server.js` | Start server |
| `dev` | `node --watch server.js` | Start with auto-reload |
| `test` | (to be added) | Run tests |

## Dependencies

### Core Dependencies

- **express** (^5.1.0) - Web framework
- **ws** (^8.18.3) - WebSocket server
- **cors** (^2.8.5) - CORS middleware

### Why These Choices?

- **Express**: Industry standard, mature, extensive ecosystem
- **ws**: Fast, lightweight WebSocket implementation
- **cors**: Simple, configurable CORS handling

## API Design Principles

1. **RESTful**: Standard HTTP methods and status codes
2. **Consistent**: Uniform response formats
3. **Documented**: Comprehensive API documentation
4. **Versioned**: Ready for API versioning (via `/api` prefix)
5. **Stateless**: No session state in HTTP layer
6. **Real-time**: WebSocket for live updates
7. **Error-friendly**: Clear error messages

## Code Style Guidelines

1. **Modular**: One responsibility per module
2. **DRY**: Don't repeat yourself
3. **SOLID**: Follow SOLID principles
4. **Documented**: JSDoc comments for all public methods
5. **Consistent**: Uniform naming conventions
6. **Readable**: Clear, self-documenting code

## Resources

- [Express Documentation](https://expressjs.com/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [REST API Best Practices](https://restfulapi.net/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

## Notification System

A new notification service has been added to handle sending notifications for timer events using the Pushover API.

### Architecture
- **Notification Service:** Located in `src/services/notification.service.js`
  - Sends notifications for timer start, stop, and complete events
  - Uses native fetch for HTTP requests

### Event Flow
1. **Timer Event Triggered**
   - When the timer starts, stops, or completes, the event is caught in the `TimerService`.
2. **Call Notification Service**
   - `TimerService` calls the appropriate method on `NotificationService` with event details.
3. **Send Notification via Pushover**
   - `NotificationService` formats the message and makes an API call to Pushover.

### Extensibility
- More event types and notification channels can be added easily by extending the constants and NotificationService methods.
