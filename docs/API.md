# Pomoductivity REST API Documentation

Version: 2.0.0

Base URL: `http://localhost:3000/api`

## Overview

The Pomoductivity API provides a complete REST API for managing Pomodoro timer sessions. It includes real-time updates via WebSocket and persistent session history tracking.

## Authentication

Currently, this API does not require authentication. For production use, consider adding authentication middleware.

## CORS Configuration

The API is configured to accept requests from Angular development server running on `http://localhost:4200` by default. Update the `CORS_ORIGIN` environment variable to match your frontend URL.

---

## API Endpoints

### Health Check

#### GET `/api/health`

Check API health status.

**Response:** `200 OK`

```json
{
  "status": "ok",
  "uptime": 1234.56,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### Timer Operations

#### GET `/api/timer/status`

Get the current timer state including session history.

**Response:** `200 OK`

```json
{
  "isRunning": false,
  "timeRemaining": 1500,
  "sessionType": "focus",
  "sessionCount": 0,
  "startTime": null,
  "history": []
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `isRunning` | boolean | Whether the timer is currently running |
| `timeRemaining` | number | Seconds remaining in current session |
| `sessionType` | string | Current session type: `"focus"`, `"short_break"`, or `"long_break"` |
| `sessionCount` | number | Number of completed focus sessions |
| `startTime` | string \| null | ISO timestamp when session started, null if not running |
| `history` | array | Array of completed session history entries |

---

#### POST `/api/timer/start`

Start the timer.

**Response:** `200 OK`

Returns the updated timer state (same structure as GET `/api/timer/status`).

---

#### POST `/api/timer/stop`

Stop the timer.

**Response:** `200 OK`

Returns the updated timer state.

---

#### POST `/api/timer/start-stop`

Toggle the timer (start if stopped, stop if running).

**Response:** `200 OK`

Returns the updated timer state.

---

#### POST `/api/timer/reset`

Reset the timer to the current session type's default duration.

**Response:** `200 OK`

Returns the updated timer state.

---

#### POST `/api/timer/set-type`

Set the session type and reset the timer to that type's duration.

**Request Body:**

```json
{
  "type": "focus"
}
```

**Valid Session Types:**
- `"focus"` - 25 minutes (1500 seconds)
- `"short_break"` - 5 minutes (300 seconds)
- `"long_break"` - 15 minutes (900 seconds)

**Response:** `200 OK`

```json
{
  "isRunning": false,
  "timeRemaining": 1500,
  "sessionType": "focus",
  "sessionCount": 0,
  "startTime": null,
  "history": []
}
```

**Error Response:** `400 Bad Request`

```json
{
  "error": "Invalid session type. Must be one of: focus, short_break, long_break"
}
```

---

#### GET `/api/timer/history`

Get the complete session history.

**Response:** `200 OK`

```json
[
  {
    "type": "focus",
    "startTime": "2024-01-01T12:00:00.000Z",
    "endTime": "2024-01-01T12:25:00.000Z",
    "duration": 1500,
    "status": "completed"
  },
  {
    "type": "short_break",
    "startTime": "2024-01-01T12:25:00.000Z",
    "endTime": "2024-01-01T12:30:00.000Z",
    "duration": 300,
    "status": "completed"
  }
]
```

**History Entry Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | Session type: `"focus"`, `"short_break"`, or `"long_break"` |
| `startTime` | string | ISO timestamp when session started |
| `endTime` | string | ISO timestamp when session ended |
| `duration` | number | Duration of the session in seconds |
| `status` | string | Session status: `"completed"` or `"cancelled"` |

---

### Settings Operations

#### GET `/api/settings`

Get current timer duration settings.

**Response:** `200 OK`

```json
{
  "focusDuration": 1500,
  "shortBreakDuration": 300,
  "longBreakDuration": 900
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `focusDuration` | number | Duration for focus sessions in seconds (default: 1500) |
| `shortBreakDuration` | number | Duration for short break sessions in seconds (default: 300) |
| `longBreakDuration` | number | Duration for long break sessions in seconds (default: 900) |

---

#### PUT `/api/settings`

Update timer duration settings. All fields are optional - provide only the durations you want to change.

**Request Body:**

```json
{
  "focusDuration": 1800,
  "shortBreakDuration": 360,
  "longBreakDuration": 1080
}
```

**Validation Rules:**
- Duration must be a positive integer
- Duration must be between 1 and 7200 seconds (2 hours max)
- At least one field must be provided

**Response:** `200 OK`

```json
{
  "focusDuration": 1800,
  "shortBreakDuration": 360,
  "longBreakDuration": 1080
}
```

**Error Response:** `400 Bad Request`

```json
{
  "error": "Invalid duration value. Duration must be a positive integer between 1 and 7200 seconds"
}
```

---

#### POST `/api/settings/reset`

Reset all settings to default values.

**Response:** `200 OK`

```json
{
  "focusDuration": 1500,
  "shortBreakDuration": 300,
  "longBreakDuration": 900
}
```

---

## WebSocket Connection

### Connection URL

`ws://localhost:3000`

### Usage

Connect to the WebSocket endpoint to receive real-time timer updates.

**Example (JavaScript):**

```javascript
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('Connected to timer');
};

ws.onmessage = (event) => {
  const timerState = JSON.parse(event.data);
  console.log('Timer update:', timerState);
  // timerState has the same structure as GET /api/timer/status
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected from timer');
};
```

**Message Format:**

The server sends the complete timer state on every update:

```json
{
  "isRunning": true,
  "timeRemaining": 1485,
  "sessionType": "focus",
  "sessionCount": 0,
  "startTime": "2024-01-01T12:00:00.000Z",
  "history": []
}
```

**Events that trigger updates:**
- Timer tick (every second when running)
- Timer start/stop
- Timer reset
- Session type change
- Session completion

---

## Error Responses

### 400 Bad Request

Invalid request parameters.

```json
{
  "error": "Invalid session type"
}
```

### 404 Not Found

Endpoint does not exist.

```json
{
  "error": "Not Found",
  "message": "Cannot GET /api/invalid-endpoint",
  "availableEndpoints": "/api"
}
```

### 500 Internal Server Error

Server error.

```json
{
  "error": "Internal server error"
}
```

In development mode, error responses may include a `stack` field with the error stack trace.

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment mode |
| `CORS_ORIGIN` | `http://localhost:4200` | Allowed CORS origin (Angular dev server) |

---

## TypeScript Definitions

The API contracts are defined with JSDoc in `src/models/timer.model.js`. You can use these to generate TypeScript interfaces for your Angular frontend:

```typescript
// TypeScript interfaces for Angular
export type SessionType = 'focus' | 'short_break' | 'long_break';
export type SessionStatus = 'completed' | 'cancelled';

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  sessionType: SessionType;
  sessionCount: number;
  startTime: string | null;
}

export interface SessionHistoryEntry {
  type: SessionType;
  startTime: string;
  endTime: string;
  duration: number;
  status: SessionStatus;
}

export interface TimerStatusResponse extends TimerState {
  history: SessionHistoryEntry[];
}

export interface SetTypeRequest {
  type: SessionType;
}

export interface HealthCheckResponse {
  status: string;
  uptime: number;
  timestamp: string;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}

export interface SettingsResponse {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export interface SettingsUpdateRequest {
  focusDuration?: number;
  shortBreakDuration?: number;
  longBreakDuration?: number;
}
```

---

## Example Usage with Angular

### Service Example

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

const API_BASE = 'http://localhost:3000/api';
const WS_URL = 'ws://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private ws$: WebSocketSubject<TimerStatusResponse>;
  private timerUpdates$ = new Subject<TimerStatusResponse>();

  constructor(private http: HttpClient) {
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    this.ws$ = webSocket(WS_URL);
    this.ws$.subscribe(
      (state) => this.timerUpdates$.next(state),
      (err) => console.error('WebSocket error:', err),
      () => console.log('WebSocket connection closed')
    );
  }

  getTimerUpdates(): Observable<TimerStatusResponse> {
    return this.timerUpdates$.asObservable();
  }

  getStatus(): Observable<TimerStatusResponse> {
    return this.http.get<TimerStatusResponse>(`${API_BASE}/timer/status`);
  }

  start(): Observable<TimerStatusResponse> {
    return this.http.post<TimerStatusResponse>(`${API_BASE}/timer/start`, {});
  }

  stop(): Observable<TimerStatusResponse> {
    return this.http.post<TimerStatusResponse>(`${API_BASE}/timer/stop`, {});
  }

  toggle(): Observable<TimerStatusResponse> {
    return this.http.post<TimerStatusResponse>(`${API_BASE}/timer/start-stop`, {});
  }

  reset(): Observable<TimerStatusResponse> {
    return this.http.post<TimerStatusResponse>(`${API_BASE}/timer/reset`, {});
  }

  setType(type: SessionType): Observable<TimerStatusResponse> {
    return this.http.post<TimerStatusResponse>(`${API_BASE}/timer/set-type`, { type });
  }

  getHistory(): Observable<SessionHistoryEntry[]> {
    return this.http.get<SessionHistoryEntry[]>(`${API_BASE}/timer/history`);
  }

  // Settings operations
  getSettings(): Observable<SettingsResponse> {
    return this.http.get<SettingsResponse>(`${API_BASE}/settings`);
  }

  updateSettings(settings: SettingsUpdateRequest): Observable<SettingsResponse> {
    return this.http.put<SettingsResponse>(`${API_BASE}/settings`, settings);
  }

  resetSettings(): Observable<SettingsResponse> {
    return this.http.post<SettingsResponse>(`${API_BASE}/settings/reset`, {});
  }
}
```

---

## Mock Data for Development

For Angular frontend development without the backend running, you can use this mock data:

```typescript
// mock-timer.service.ts
export const MOCK_TIMER_STATE: TimerStatusResponse = {
  isRunning: false,
  timeRemaining: 1500,
  sessionType: 'focus',
  sessionCount: 2,
  startTime: null,
  history: [
    {
      type: 'focus',
      startTime: '2024-01-01T12:00:00.000Z',
      endTime: '2024-01-01T12:25:00.000Z',
      duration: 1500,
      status: 'completed'
    },
    {
      type: 'short_break',
      startTime: '2024-01-01T12:25:00.000Z',
      endTime: '2024-01-01T12:30:00.000Z',
      duration: 300,
      status: 'completed'
    }
  ]
};
```

---

## Testing the API

### Using cURL

```bash
# Get timer status
curl http://localhost:3000/api/timer/status

# Start timer
curl -X POST http://localhost:3000/api/timer/start

# Set session type
curl -X POST http://localhost:3000/api/timer/set-type \
  -H "Content-Type: application/json" \
  -d '{"type": "short_break"}'

# Get history
curl http://localhost:3000/api/timer/history

# Health check
curl http://localhost:3000/api/health
```

### Using HTTPie

```bash
# Get timer status
http GET :3000/api/timer/status

# Start timer
http POST :3000/api/timer/start

# Set session type
http POST :3000/api/timer/set-type type=short_break

# Get history
http GET :3000/api/timer/history

# Get settings
http GET :3000/api/settings

# Update settings
http PUT :3000/api/settings focusDuration:=1800 shortBreakDuration:=360

# Reset settings
http POST :3000/api/settings/reset
```
