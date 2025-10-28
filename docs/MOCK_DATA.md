# Mock Data for Angular Development

This file provides mock data that matches the API contracts, allowing you to develop your Angular frontend without running the backend server.

## Mock Timer State

```typescript
// src/app/mocks/timer.mock.ts

import { TimerStatusResponse, SessionHistoryEntry } from '../models/timer.model';

export const MOCK_TIMER_STATE: TimerStatusResponse = {
  isRunning: false,
  timeRemaining: 1500,
  sessionType: 'focus',
  sessionCount: 2,
  startTime: null,
  history: [
    {
      type: 'focus',
      startTime: '2024-01-01T09:00:00.000Z',
      endTime: '2024-01-01T09:25:00.000Z',
      duration: 1500,
      status: 'completed'
    },
    {
      type: 'short_break',
      startTime: '2024-01-01T09:25:00.000Z',
      endTime: '2024-01-01T09:30:00.000Z',
      duration: 300,
      status: 'completed'
    },
    {
      type: 'focus',
      startTime: '2024-01-01T09:30:00.000Z',
      endTime: '2024-01-01T09:55:00.000Z',
      duration: 1500,
      status: 'completed'
    },
    {
      type: 'short_break',
      startTime: '2024-01-01T09:55:00.000Z',
      endTime: '2024-01-01T10:00:00.000Z',
      duration: 300,
      status: 'completed'
    }
  ]
};

export const MOCK_RUNNING_STATE: TimerStatusResponse = {
  isRunning: true,
  timeRemaining: 1234,
  sessionType: 'focus',
  sessionCount: 0,
  startTime: '2024-01-01T12:00:00.000Z',
  history: []
};

export const MOCK_BREAK_STATE: TimerStatusResponse = {
  isRunning: false,
  timeRemaining: 300,
  sessionType: 'short_break',
  sessionCount: 1,
  startTime: null,
  history: [
    {
      type: 'focus',
      startTime: '2024-01-01T12:00:00.000Z',
      endTime: '2024-01-01T12:25:00.000Z',
      duration: 1500,
      status: 'completed'
    }
  ]
};

export const MOCK_HISTORY: SessionHistoryEntry[] = [
  {
    type: 'focus',
    startTime: '2024-01-01T08:00:00.000Z',
    endTime: '2024-01-01T08:25:00.000Z',
    duration: 1500,
    status: 'completed'
  },
  {
    type: 'short_break',
    startTime: '2024-01-01T08:25:00.000Z',
    endTime: '2024-01-01T08:30:00.000Z',
    duration: 300,
    status: 'completed'
  },
  {
    type: 'focus',
    startTime: '2024-01-01T08:30:00.000Z',
    endTime: '2024-01-01T08:55:00.000Z',
    duration: 1500,
    status: 'completed'
  },
  {
    type: 'short_break',
    startTime: '2024-01-01T08:55:00.000Z',
    endTime: '2024-01-01T09:00:00.000Z',
    duration: 300,
    status: 'completed'
  },
  {
    type: 'focus',
    startTime: '2024-01-01T09:00:00.000Z',
    endTime: '2024-01-01T09:25:00.000Z',
    duration: 1500,
    status: 'completed'
  },
  {
    type: 'short_break',
    startTime: '2024-01-01T09:25:00.000Z',
    endTime: '2024-01-01T09:30:00.000Z',
    duration: 300,
    status: 'completed'
  },
  {
    type: 'focus',
    startTime: '2024-01-01T09:30:00.000Z',
    endTime: '2024-01-01T09:55:00.000Z',
    duration: 1500,
    status: 'completed'
  },
  {
    type: 'long_break',
    startTime: '2024-01-01T09:55:00.000Z',
    endTime: '2024-01-01T10:10:00.000Z',
    duration: 900,
    status: 'completed'
  }
];
```

## Mock Service

Create a mock service that simulates the API behavior:

```typescript
// src/app/services/mock-timer.service.ts

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, interval } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  TimerStatusResponse,
  SessionHistoryEntry,
  SessionType
} from '../models/timer.model';
import { MOCK_TIMER_STATE, MOCK_HISTORY } from '../mocks/timer.mock';

@Injectable({
  providedIn: 'root'
})
export class MockTimerService {
  private state$ = new BehaviorSubject<TimerStatusResponse>(MOCK_TIMER_STATE);

  constructor() {
    // Simulate timer ticking
    interval(1000).subscribe(() => {
      const currentState = this.state$.value;
      if (currentState.isRunning && currentState.timeRemaining > 0) {
        this.state$.next({
          ...currentState,
          timeRemaining: currentState.timeRemaining - 1
        });
      }
    });
  }

  getTimerUpdates(): Observable<TimerStatusResponse> {
    return this.state$.asObservable();
  }

  getStatus(): Observable<TimerStatusResponse> {
    return of(this.state$.value).pipe(delay(100)); // Simulate network delay
  }

  start(): Observable<TimerStatusResponse> {
    const newState: TimerStatusResponse = {
      ...this.state$.value,
      isRunning: true,
      startTime: new Date().toISOString()
    };
    this.state$.next(newState);
    return of(newState).pipe(delay(100));
  }

  stop(): Observable<TimerStatusResponse> {
    const newState: TimerStatusResponse = {
      ...this.state$.value,
      isRunning: false,
      startTime: null
    };
    this.state$.next(newState);
    return of(newState).pipe(delay(100));
  }

  toggle(): Observable<TimerStatusResponse> {
    if (this.state$.value.isRunning) {
      return this.stop();
    } else {
      return this.start();
    }
  }

  reset(): Observable<TimerStatusResponse> {
    const duration = this.getDuration(this.state$.value.sessionType);
    const newState: TimerStatusResponse = {
      ...this.state$.value,
      isRunning: false,
      timeRemaining: duration,
      startTime: null
    };
    this.state$.next(newState);
    return of(newState).pipe(delay(100));
  }

  setType(type: SessionType): Observable<TimerStatusResponse> {
    const duration = this.getDuration(type);
    const newState: TimerStatusResponse = {
      ...this.state$.value,
      sessionType: type,
      timeRemaining: duration,
      isRunning: false,
      startTime: null
    };
    this.state$.next(newState);
    return of(newState).pipe(delay(100));
  }

  getHistory(): Observable<SessionHistoryEntry[]> {
    return of(MOCK_HISTORY).pipe(delay(100));
  }

  private getDuration(type: SessionType): number {
    switch (type) {
      case 'focus':
        return 1500;
      case 'short_break':
        return 300;
      case 'long_break':
        return 900;
    }
  }
}
```

## Using the Mock Service

### Option 1: Provider Replacement

Replace the real service with the mock in development:

```typescript
// src/app/app.config.ts or app.module.ts

import { environment } from '../environments/environment';
import { TimerService } from './services/timer.service';
import { MockTimerService } from './services/mock-timer.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    {
      provide: TimerService,
      useClass: environment.production ? TimerService : MockTimerService
    }
  ]
};
```

### Option 2: HTTP Interceptor

Use Angular's HTTP interceptor to return mock data:

```typescript
// src/app/interceptors/mock.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_TIMER_STATE, MOCK_HISTORY } from '../mocks/timer.mock';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only mock in development
    if (!req.url.includes('/api/')) {
      return next.handle(req);
    }

    // Mock timer status
    if (req.url.endsWith('/timer/status')) {
      return of(new HttpResponse({
        status: 200,
        body: MOCK_TIMER_STATE
      })).pipe(delay(100));
    }

    // Mock history
    if (req.url.endsWith('/timer/history')) {
      return of(new HttpResponse({
        status: 200,
        body: MOCK_HISTORY
      })).pipe(delay(100));
    }

    // Mock timer operations (start, stop, reset, etc.)
    if (req.method === 'POST') {
      return of(new HttpResponse({
        status: 200,
        body: MOCK_TIMER_STATE
      })).pipe(delay(100));
    }

    return next.handle(req);
  }
}

// Register in app.config.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... other providers
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockInterceptor,
      multi: true
    }
  ]
};
```

### Option 3: Feature Flag

Use a feature flag to switch between mock and real data:

```typescript
// src/app/services/timer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MockTimerService } from './mock-timer.service';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private useMock = environment.useMockData;
  private mockService: MockTimerService;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    if (this.useMock) {
      this.mockService = new MockTimerService();
    }
  }

  getStatus(): Observable<TimerStatusResponse> {
    if (this.useMock) {
      return this.mockService.getStatus();
    }
    return this.http.get<TimerStatusResponse>(`${this.apiUrl}/timer/status`);
  }

  // ... other methods follow the same pattern
}

// environment.ts
export const environment = {
  production: false,
  useMockData: true, // Set to false to use real API
  apiUrl: 'http://localhost:3000/api'
};
```

## Mock WebSocket

Simulate WebSocket updates:

```typescript
// src/app/services/mock-websocket.service.ts

import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimerStatusResponse } from '../models/timer.model';
import { MOCK_TIMER_STATE } from '../mocks/timer.mock';

@Injectable({
  providedIn: 'root'
})
export class MockWebSocketService {
  private state$ = new BehaviorSubject<TimerStatusResponse>(MOCK_TIMER_STATE);

  getUpdates(): Observable<TimerStatusResponse> {
    // Simulate updates every second
    return interval(1000).pipe(
      map(() => {
        const currentState = this.state$.value;
        if (currentState.isRunning && currentState.timeRemaining > 0) {
          return {
            ...currentState,
            timeRemaining: currentState.timeRemaining - 1
          };
        }
        return currentState;
      })
    );
  }

  updateState(state: TimerStatusResponse): void {
    this.state$.next(state);
  }
}
```

## Testing with Mock Data

Use mock data in your component tests:

```typescript
// src/app/components/timer/timer.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TimerComponent } from './timer.component';
import { TimerService } from '../../services/timer.service';
import { MOCK_TIMER_STATE } from '../../mocks/timer.mock';

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  let timerService: jasmine.SpyObj<TimerService>;

  beforeEach(async () => {
    const timerServiceSpy = jasmine.createSpyObj('TimerService', [
      'getStatus',
      'start',
      'stop',
      'reset'
    ]);

    await TestBed.configureTestingModule({
      imports: [TimerComponent],
      providers: [
        { provide: TimerService, useValue: timerServiceSpy }
      ]
    }).compileComponents();

    timerService = TestBed.inject(TimerService) as jasmine.SpyObj<TimerService>;
    timerService.getStatus.and.returnValue(of(MOCK_TIMER_STATE));

    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display timer state', () => {
    expect(component.timerState).toEqual(MOCK_TIMER_STATE);
  });
});
```

## Environment Configuration

Configure mock usage in environment files:

```typescript
// src/environments/environment.development.ts
export const environment = {
  production: false,
  useMockData: true,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000'
};

// src/environments/environment.ts
export const environment = {
  production: true,
  useMockData: false,
  apiUrl: 'https://api.yourapp.com/api',
  wsUrl: 'wss://api.yourapp.com'
};
```

## Best Practices

1. **Keep mocks in sync** - Update mock data when API contracts change
2. **Use realistic data** - Mock data should represent real scenarios
3. **Simulate delays** - Add network delay to make mocks realistic
4. **Test both modes** - Test with both mock and real API
5. **Feature flags** - Use environment variables to toggle mocks
6. **Type safety** - Ensure mocks match TypeScript interfaces
7. **Error scenarios** - Create mocks for error states too

## Additional Mock Scenarios

```typescript
// Error state
export const MOCK_ERROR_STATE: TimerStatusResponse = {
  isRunning: false,
  timeRemaining: 0,
  sessionType: 'focus',
  sessionCount: 0,
  startTime: null,
  history: []
};

// Completed session state
export const MOCK_COMPLETED_STATE: TimerStatusResponse = {
  isRunning: false,
  timeRemaining: 1500,
  sessionType: 'focus',
  sessionCount: 4,
  startTime: null,
  history: [...MOCK_HISTORY]
};

// Long break state (after 4 focus sessions)
export const MOCK_LONG_BREAK_STATE: TimerStatusResponse = {
  isRunning: false,
  timeRemaining: 900,
  sessionType: 'long_break',
  sessionCount: 4,
  startTime: null,
  history: [...MOCK_HISTORY]
};
```
