# Pomoductivity REST API

A modular REST API server for Pomodoro timer management with real-time WebSocket updates. Built with Node.js and Express, designed to work with Angular frontends.

## Features

- Complete REST API for timer operations
- **Customizable timer durations** via settings API
- Real-time updates via WebSocket
- Session history tracking
- **90+ unit and integration tests** for reliability
- CORS enabled for Angular frontend
- Modular, maintainable architecture
- Comprehensive API documentation
- TypeScript-ready with JSDoc type definitions

## Quick Start

### Prerequisites

- Node.js 14+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

Base URL: `http://localhost:3000/api`

### Health Check
- `GET /api/health` - Check API health

### Timer Operations
- `GET /api/timer/status` - Get current timer state
- `GET /api/timer/history` - Get session history
- `POST /api/timer/start` - Start timer
- `POST /api/timer/stop` - Stop timer
- `POST /api/timer/start-stop` - Toggle timer
- `POST /api/timer/reset` - Reset timer
- `POST /api/timer/set-type` - Set session type

### Settings Operations
- `GET /api/settings` - Get timer duration settings
- `PUT /api/settings` - Update timer durations
- `POST /api/settings/reset` - Reset to default durations

### WebSocket
- `WS ws://localhost:3000` - Real-time timer updates

## Documentation

- **[API Documentation](docs/API.md)** - Complete API reference with examples
- **[Architecture Documentation](docs/ARCHITECTURE.md)** - System design and structure
- **[Testing Guide](docs/TESTING.md)** - Comprehensive testing documentation
- **[Mock Data Guide](docs/MOCK_DATA.md)** - Mock data for Angular development

## Project Structure

```
pomoductivity/
├── server.js              # Entry point
├── src/
│   ├── app.js            # Express app setup
│   ├── config/           # Configuration
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   └── models/           # Type definitions
├── tests/                # Unit & integration tests
│   ├── unit/             # Unit tests
│   └── integration/      # API integration tests
├── docs/                 # Documentation
└── package.json
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | `http://localhost:4200` | Allowed CORS origin |

### Example

Create a `.env` file:

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:4200
```

## Session Types & Customization

### Default Durations

- **Focus** - 25 minutes (1500 seconds)
- **Short Break** - 5 minutes (300 seconds)
- **Long Break** - 15 minutes (900 seconds)

### Customizing Durations

You can customize timer durations via the Settings API:

```bash
# Update focus duration to 30 minutes
curl -X PUT http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{"focusDuration": 1800}'

# Update multiple durations
curl -X PUT http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{"focusDuration": 1800, "shortBreakDuration": 360, "longBreakDuration": 1080}'

# Reset to defaults
curl -X POST http://localhost:3000/api/settings/reset
```

Settings persist in memory during server runtime and affect all new timer sessions.

## Using with Angular

### Install HttpClient

The API is designed to work seamlessly with Angular's HttpClient.

### Example Angular Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from 'rxjs/webSocket';

@Injectable({ providedIn: 'root' })
export class TimerService {
  private apiUrl = 'http://localhost:3000/api';
  private ws$ = webSocket('ws://localhost:3000');

  constructor(private http: HttpClient) {}

  getStatus() {
    return this.http.get(`${this.apiUrl}/timer/status`);
  }

  start() {
    return this.http.post(`${this.apiUrl}/timer/start`, {});
  }

  getRealtimeUpdates() {
    return this.ws$;
  }
}
```

See [API Documentation](docs/API.md) for complete Angular integration examples.

## TypeScript Support

Type definitions are provided via JSDoc. Extract them for your Angular frontend:

```typescript
export type SessionType = 'focus' | 'short_break' | 'long_break';

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  sessionType: SessionType;
  sessionCount: number;
  startTime: string | null;
  history: SessionHistoryEntry[];
}

export interface SessionHistoryEntry {
  type: SessionType;
  startTime: string;
  endTime: string;
  duration: number;
  status: 'completed' | 'cancelled';
}
```

## Testing the API

### Using cURL

```bash
# Get status
curl http://localhost:3000/api/timer/status

# Start timer
curl -X POST http://localhost:3000/api/timer/start

# Set session type
curl -X POST http://localhost:3000/api/timer/set-type \
  -H "Content-Type: application/json" \
  -d '{"type": "short_break"}'
```

### Using HTTPie

```bash
http GET :3000/api/timer/status
http POST :3000/api/timer/start
http POST :3000/api/timer/set-type type=short_break
```

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- **90+ tests** covering all endpoints and business logic
- Unit tests for services
- Integration tests for API endpoints
- Comprehensive validation testing

See [Testing Guide](docs/TESTING.md) for detailed testing documentation.

## Development

### Auto-reload

Use `npm run dev` to start the server with auto-reload on file changes:

```bash
npm run dev
```

### Adding New Endpoints

1. Create controller method in `src/controllers/`
2. Add route in `src/routes/`
3. Update documentation in `docs/API.md`

### Adding New Features

1. Add business logic to `src/services/`
2. Create controller methods
3. Add routes
4. **Write tests** in `tests/`
5. Update models if needed
6. Document in API docs

## Architecture

This project follows a modular, layered architecture:

- **Server Layer** - HTTP/WebSocket server initialization
- **Application Layer** - Express middleware and configuration
- **Routes Layer** - Endpoint definitions
- **Controller Layer** - Request/response handling
- **Service Layer** - Business logic
- **Configuration Layer** - Environment and constants
- **Model Layer** - Type definitions

See [Architecture Documentation](docs/ARCHITECTURE.md) for details.

## API Design

- **RESTful** - Standard HTTP methods and status codes
- **Real-time** - WebSocket for live updates
- **Consistent** - Uniform response formats
- **Well-documented** - Comprehensive API docs
- **CORS-enabled** - Ready for frontend integration
- **Type-safe** - JSDoc type definitions

## Contributing

1. Follow the existing code style
2. Add JSDoc comments for new functions
3. **Write tests for all new features**
4. Ensure tests pass: `npm test`
5. Update documentation
6. Ensure backward compatibility

## Future Enhancements

Potential improvements (see [Architecture docs](docs/ARCHITECTURE.md)):

- Database persistence (PostgreSQL/MongoDB)
- User authentication (JWT)
- Multi-user support
- Analytics and statistics
- ~~Customizable timer durations~~ ✅ **Implemented**
- Push notifications
- Rate limiting
- API versioning

## License

ISC

## Author

Built for use with Angular frontends.

## Support

For issues and questions:
- Check [API Documentation](docs/API.md)
- Check [Architecture Documentation](docs/ARCHITECTURE.md)
- Review examples in the docs

---

**Happy Productivity!** 🍅⏱️
# Test branch protection
