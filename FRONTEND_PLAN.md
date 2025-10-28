# Pomoductivity Angular Frontend - Implementation Plan

## 📋 Project Overview

**Goal**: Build a modern, maintainable Angular frontend for the Pomoductivity API with focus on clean architecture, testing, and developer experience.

**Tech Stack**:
- Angular 18+ (Standalone components)
- TypeScript (Strict mode)
- Tailwind CSS + SCSS
- RxJS for reactive state management
- Jasmine + Karma for unit testing
- Mock backend for development

**Key Principles**:
- ✅ Clean, non-distracting UI
- ✅ Mobile-first responsive design
- ✅ Modular, maintainable architecture
- ✅ Comprehensive testing
- ✅ Well-documented code
- ✅ AI-friendly structure
- ✅ Easy for developers to extend

---

## 🏗️ Project Structure

```
pomoductivity-client/
├── src/
│   ├── app/
│   │   ├── core/                      # Core module (singletons)
│   │   │   ├── services/
│   │   │   │   ├── api.service.ts     # HTTP client wrapper
│   │   │   │   ├── timer.service.ts   # Timer API integration
│   │   │   │   ├── settings.service.ts # Settings API integration
│   │   │   │   └── websocket.service.ts # WebSocket connection
│   │   │   ├── models/
│   │   │   │   ├── timer.model.ts     # TypeScript interfaces
│   │   │   │   └── settings.model.ts
│   │   │   ├── guards/
│   │   │   │   └── (future auth guards)
│   │   │   ├── interceptors/
│   │   │   │   ├── mock.interceptor.ts # Mock API responses
│   │   │   │   └── error.interceptor.ts
│   │   │   └── constants/
│   │   │       └── api.constants.ts
│   │   │
│   │   ├── shared/                    # Shared module (reusable)
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.component.ts
│   │   │   │   │   ├── button.component.html
│   │   │   │   │   ├── button.component.scss
│   │   │   │   │   └── button.component.spec.ts
│   │   │   │   ├── card/
│   │   │   │   ├── icon-button/
│   │   │   │   └── modal/
│   │   │   ├── directives/
│   │   │   │   └── (custom directives)
│   │   │   ├── pipes/
│   │   │   │   ├── time-format.pipe.ts # Format seconds to MM:SS
│   │   │   │   └── duration-format.pipe.ts
│   │   │   └── utils/
│   │   │       ├── time.util.ts
│   │   │       └── validators.util.ts
│   │   │
│   │   ├── features/                  # Feature modules
│   │   │   ├── timer/
│   │   │   │   ├── components/
│   │   │   │   │   ├── timer-display/
│   │   │   │   │   │   ├── timer-display.component.ts
│   │   │   │   │   │   ├── timer-display.component.html
│   │   │   │   │   │   ├── timer-display.component.scss
│   │   │   │   │   │   └── timer-display.component.spec.ts
│   │   │   │   │   ├── timer-controls/
│   │   │   │   │   ├── session-type-selector/
│   │   │   │   │   └── timer-progress/
│   │   │   │   ├── pages/
│   │   │   │   │   └── timer-page/
│   │   │   │   │       ├── timer-page.component.ts
│   │   │   │   │       ├── timer-page.component.html
│   │   │   │   │       ├── timer-page.component.scss
│   │   │   │   │       └── timer-page.component.spec.ts
│   │   │   │   └── state/
│   │   │   │       ├── timer.state.ts  # RxJS state management
│   │   │   │       └── timer.facade.ts # Business logic layer
│   │   │   │
│   │   │   ├── history/
│   │   │   │   ├── components/
│   │   │   │   │   ├── session-list/
│   │   │   │   │   ├── session-card/
│   │   │   │   │   └── statistics-panel/
│   │   │   │   └── pages/
│   │   │   │       └── history-page/
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── components/
│   │   │       │   ├── duration-input/
│   │   │       │   └── settings-form/
│   │   │       └── pages/
│   │   │           └── settings-page/
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── header/
│   │   │   ├── footer/
│   │   │   └── main-layout/
│   │   │
│   │   ├── app.component.ts          # Root component
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.config.ts             # App configuration
│   │   └── app.routes.ts             # Route definitions
│   │
│   ├── assets/
│   │   ├── icons/                    # SVG icons
│   │   ├── images/
│   │   └── fonts/
│   │
│   ├── styles/
│   │   ├── _variables.scss           # SCSS variables
│   │   ├── _mixins.scss              # SCSS mixins
│   │   ├── _typography.scss
│   │   ├── _animations.scss
│   │   └── styles.scss               # Global styles
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   ├── environment.development.ts
│   │   └── environment.production.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
│
├── docs/
│   ├── ARCHITECTURE.md               # Architecture documentation
│   ├── COMPONENTS.md                 # Component documentation
│   ├── TESTING.md                    # Testing guide
│   ├── STYLING.md                    # Styling guide
│   └── AI_GUIDE.md                   # Guide for AI agents
│
├── .vscode/
│   ├── settings.json                 # VS Code settings
│   ├── extensions.json               # Recommended extensions
│   └── launch.json                   # Debug configurations
│
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── tailwind.config.js
├── .prettierrc
├── .eslintrc.json
└── README.md
```

---

## 🎨 UI/UX Design Plan

### Design Philosophy
- **Minimalist & Calm**: Soft colors, generous whitespace, no distractions
- **Focus-First**: Timer is the hero element
- **Smooth Animations**: Gentle transitions and micro-interactions
- **Accessibility**: WCAG 2.1 AA compliant

### Color Palette (Soft & Calming)

```scss
// Primary - Soft Indigo
$primary-50:  #EEF2FF;
$primary-100: #E0E7FF;
$primary-200: #C7D2FE;
$primary-300: #A5B4FC;
$primary-400: #818CF8;
$primary-500: #6366F1;  // Main
$primary-600: #4F46E5;
$primary-700: #4338CA;

// Semantic Colors (Soft)
$success:  #10B981;  // Emerald
$warning:  #F59E0B;  // Amber
$error:    #EF4444;  // Red
$info:     #3B82F6;  // Blue

// Neutrals (Warm Gray)
$gray-50:  #FAFAF9;
$gray-100: #F5F5F4;
$gray-200: #E7E5E4;
$gray-300: #D6D3D1;
$gray-400: #A8A29E;
$gray-500: #78716C;
$gray-600: #57534E;
$gray-700: #44403C;
$gray-800: #292524;
$gray-900: #1C1917;

// Session Type Colors
$focus-color: #6366F1;        // Indigo
$short-break-color: #10B981;  // Emerald
$long-break-color: #8B5CF6;   // Purple
```

### Typography

```scss
// Font Stack
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', monospace;

// Font Sizes (Tailwind-inspired)
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px
$text-5xl: 3rem;      // 48px
$text-6xl: 3.75rem;   // 60px
$text-7xl: 4.5rem;    // 72px (Timer display)
```

### Component Specifications

#### 1. Timer Display
```
┌─────────────────────────────────────┐
│                                     │
│         ⏱️ Focus Session            │
│                                     │
│            25:00                    │
│        ────────────                 │
│        Progress: 45%                │
│                                     │
│     [Start]  [Reset]  [Settings]   │
│                                     │
│     [Focus] [Short] [Long]         │
│                                     │
└─────────────────────────────────────┘

Features:
- Large, readable timer (72px font)
- Circular progress indicator
- Smooth countdown animation
- Pulsing effect when running
- Session type badges with colors
- Control buttons with icons
```

#### 2. Session Type Selector
```
┌─────────────────────────────────────┐
│  ●━━━━━  ○━━━━━  ○━━━━━            │
│  Focus   Short   Long               │
│  25m     5m      15m                │
└─────────────────────────────────────┘

Features:
- Pill-shaped buttons
- Active state highlight
- Duration display below
- Smooth transitions
```

#### 3. History View
```
┌─────────────────────────────────────┐
│  Session History                    │
│                                     │
│  Today - 4 sessions                │
│  ┌───────────────────────────────┐ │
│  │ 🔵 Focus      25:00   ✓       │ │
│  │ 09:00 - 09:25                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ 🟢 Short Break 5:00   ✓       │ │
│  │ 09:25 - 09:30                 │ │
│  └───────────────────────────────┘ │
│                                     │
│  Statistics                         │
│  Total: 8h 45m  |  Sessions: 21    │
└─────────────────────────────────────┘
```

#### 4. Settings Panel
```
┌─────────────────────────────────────┐
│  Timer Settings                     │
│                                     │
│  Focus Duration                     │
│  ┌─────────────┐  [- 25 +] minutes │
│                                     │
│  Short Break Duration               │
│  ┌─────────────┐  [- 5 +]  minutes │
│                                     │
│  Long Break Duration                │
│  ┌─────────────┐  [- 15 +] minutes │
│                                     │
│  [Reset to Defaults]  [Save]       │
└─────────────────────────────────────┘
```

### Mobile Layout
- Stack vertically
- Larger touch targets (44px minimum)
- Swipeable history cards
- Bottom navigation
- Full-screen timer option

---

## 🔧 Technical Implementation Plan

### Phase 1: Project Setup & Configuration

#### 1.1 Initialize Angular Project
```bash
cd /Users/george/side-projects/pomoductivity
ng new pomoductivity-client --standalone --routing --style=scss --skip-git
cd pomoductivity-client
```

#### 1.2 Install Dependencies
```bash
# Core
npm install rxjs@^7.8.0

# UI
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# Testing
npm install -D @angular/cdk

# Development
npm install -D prettier eslint-config-prettier
```

#### 1.3 Configure Tailwind CSS
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EEF2FF',
          // ... full palette
          500: '#6366F1',
        },
        // ... rest of palette
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

#### 1.4 Configure TypeScript (Strict Mode)
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### 1.5 Configure ESLint & Prettier
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

---

### Phase 2: Core Architecture

#### 2.1 Type Definitions
```typescript
// src/app/core/models/timer.model.ts
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

export interface SettingsResponse {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}
```

#### 2.2 Services Architecture

**API Service** (HTTP wrapper)
```typescript
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  get<T>(endpoint: string): Observable<T> { }
  post<T>(endpoint: string, body?: any): Observable<T> { }
  put<T>(endpoint: string, body?: any): Observable<T> { }
}
```

**Timer Service** (API integration)
```typescript
@Injectable({ providedIn: 'root' })
export class TimerService {
  getStatus(): Observable<TimerStatusResponse> { }
  start(): Observable<TimerStatusResponse> { }
  stop(): Observable<TimerStatusResponse> { }
  toggle(): Observable<TimerStatusResponse> { }
  reset(): Observable<TimerStatusResponse> { }
  setType(type: SessionType): Observable<TimerStatusResponse> { }
  getHistory(): Observable<SessionHistoryEntry[]> { }
}
```

**WebSocket Service** (Real-time updates)
```typescript
@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private ws$: WebSocketSubject<TimerStatusResponse>;

  connect(): Observable<TimerStatusResponse> { }
  disconnect(): void { }
  getMessages(): Observable<TimerStatusResponse> { }
}
```

**Settings Service** (Settings API)
```typescript
@Injectable({ providedIn: 'root' })
export class SettingsService {
  getSettings(): Observable<SettingsResponse> { }
  updateSettings(settings: Partial<SettingsResponse>): Observable<SettingsResponse> { }
  resetSettings(): Observable<SettingsResponse> { }
}
```

#### 2.3 State Management (RxJS BehaviorSubject Pattern)

```typescript
// src/app/features/timer/state/timer.state.ts
@Injectable({ providedIn: 'root' })
export class TimerState {
  private readonly _timerState$ = new BehaviorSubject<TimerStatusResponse | null>(null);
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  private readonly _error$ = new BehaviorSubject<string | null>(null);

  readonly timerState$ = this._timerState$.asObservable();
  readonly loading$ = this._loading$.asObservable();
  readonly error$ = this._error$.asObservable();

  // Computed observables
  readonly isRunning$ = this.timerState$.pipe(map(state => state?.isRunning ?? false));
  readonly timeRemaining$ = this.timerState$.pipe(map(state => state?.timeRemaining ?? 0));
  readonly sessionType$ = this.timerState$.pipe(map(state => state?.sessionType ?? 'focus'));

  setState(state: TimerStatusResponse): void {
    this._timerState$.next(state);
  }

  setLoading(loading: boolean): void {
    this._loading$.next(loading);
  }

  setError(error: string | null): void {
    this._error$.next(error);
  }
}
```

**Facade Pattern** (Business logic layer)
```typescript
// src/app/features/timer/state/timer.facade.ts
@Injectable({ providedIn: 'root' })
export class TimerFacade {
  constructor(
    private timerService: TimerService,
    private timerState: TimerState,
    private websocketService: WebSocketService
  ) {
    this.initWebSocket();
  }

  // State observables (read-only)
  readonly timerState$ = this.timerState.timerState$;
  readonly loading$ = this.timerState.loading$;
  readonly error$ = this.timerState.error$;
  readonly isRunning$ = this.timerState.isRunning$;
  readonly timeRemaining$ = this.timerState.timeRemaining$;

  // Actions
  startTimer(): void { }
  stopTimer(): void { }
  toggleTimer(): void { }
  resetTimer(): void { }
  setSessionType(type: SessionType): void { }
  loadStatus(): void { }

  private initWebSocket(): void { }
  private handleError(error: any): void { }
}
```

#### 2.4 Mock Backend Interceptor

```typescript
// src/app/core/interceptors/mock.interceptor.ts
@Injectable()
export class MockInterceptor implements HttpInterceptor {
  private useMock = environment.useMockApi;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.useMock) {
      return next.handle(req);
    }

    // Mock GET /api/timer/status
    if (req.url.includes('/timer/status')) {
      return of(new HttpResponse({
        status: 200,
        body: MOCK_TIMER_STATE
      })).pipe(delay(300));
    }

    // Mock other endpoints...

    return next.handle(req);
  }
}
```

---

### Phase 3: Component Development

#### 3.1 Shared Components (Reusable)

**Button Component**
```typescript
@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled"
      [type]="type"
      (click)="handleClick($event)">
      <ng-content></ng-content>
    </button>
  `,
  styles: [/* Tailwind + SCSS */]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clicked = new EventEmitter<void>();

  get buttonClasses(): string { }
  handleClick(event: Event): void { }
}
```

**Card Component**
```typescript
@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class.elevated]="elevated">
      <ng-content></ng-content>
    </div>
  `
})
export class CardComponent {
  @Input() elevated = false;
}
```

#### 3.2 Feature Components

**Timer Display Component**
```typescript
@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [CommonModule, TimeFormatPipe],
  template: `
    <div class="timer-display">
      <div class="session-type">{{ sessionType | titlecase }}</div>
      <div class="time" [class.running]="isRunning">
        {{ timeRemaining | timeFormat }}
      </div>
      <div class="progress-ring">
        <svg><!-- SVG progress circle --></svg>
      </div>
    </div>
  `
})
export class TimerDisplayComponent {
  @Input() timeRemaining!: number;
  @Input() isRunning!: boolean;
  @Input() sessionType!: SessionType;
  @Input() totalDuration!: number;

  get progress(): number {
    return ((this.totalDuration - this.timeRemaining) / this.totalDuration) * 100;
  }
}
```

**Timer Controls Component**
```typescript
@Component({
  selector: 'app-timer-controls',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="timer-controls">
      <app-button
        variant="primary"
        size="lg"
        (clicked)="onToggle()">
        {{ isRunning ? 'Pause' : 'Start' }}
      </app-button>

      <app-button
        variant="secondary"
        (clicked)="onReset()">
        Reset
      </app-button>
    </div>
  `
})
export class TimerControlsComponent {
  @Input() isRunning!: boolean;
  @Output() toggle = new EventEmitter<void>();
  @Output() reset = new EventEmitter<void>();

  onToggle(): void { this.toggle.emit(); }
  onReset(): void { this.reset.emit(); }
}
```

**Timer Page Component** (Smart component)
```typescript
@Component({
  selector: 'app-timer-page',
  standalone: true,
  imports: [
    CommonModule,
    TimerDisplayComponent,
    TimerControlsComponent,
    SessionTypeSelectorComponent
  ],
  template: `
    <div class="timer-page" *ngIf="timerState$ | async as state">
      <app-timer-display
        [timeRemaining]="state.timeRemaining"
        [isRunning]="state.isRunning"
        [sessionType]="state.sessionType"
        [totalDuration]="getDuration(state.sessionType)">
      </app-timer-display>

      <app-timer-controls
        [isRunning]="state.isRunning"
        (toggle)="onToggle()"
        (reset)="onReset()">
      </app-timer-controls>

      <app-session-type-selector
        [currentType]="state.sessionType"
        (typeSelected)="onTypeChange($event)">
      </app-session-type-selector>
    </div>
  `
})
export class TimerPageComponent implements OnInit, OnDestroy {
  constructor(private timerFacade: TimerFacade) {}

  timerState$ = this.timerFacade.timerState$;
  loading$ = this.timerFacade.loading$;

  ngOnInit(): void {
    this.timerFacade.loadStatus();
  }

  onToggle(): void {
    this.timerFacade.toggleTimer();
  }

  onReset(): void {
    this.timerFacade.resetTimer();
  }

  onTypeChange(type: SessionType): void {
    this.timerFacade.setSessionType(type);
  }

  getDuration(type: SessionType): number { }
}
```

---

### Phase 4: Testing Strategy

#### 4.1 Unit Testing Approach

**Component Tests**
```typescript
describe('TimerDisplayComponent', () => {
  let component: TimerDisplayComponent;
  let fixture: ComponentFixture<TimerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimerDisplayComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TimerDisplayComponent);
    component = fixture.componentInstance;
  });

  it('should display time in MM:SS format', () => {
    component.timeRemaining = 1500;
    fixture.detectChanges();

    const timeElement = fixture.nativeElement.querySelector('.time');
    expect(timeElement.textContent).toContain('25:00');
  });

  it('should show running state', () => {
    component.isRunning = true;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('.time');
    expect(element.classList.contains('running')).toBe(true);
  });
});
```

**Service Tests**
```typescript
describe('TimerService', () => {
  let service: TimerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimerService]
    });

    service = TestBed.inject(TimerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should start timer', () => {
    service.start().subscribe(response => {
      expect(response.isRunning).toBe(true);
    });

    const req = httpMock.expectOne(environment.apiUrl + '/timer/start');
    expect(req.request.method).toBe('POST');
    req.flush({ isRunning: true, timeRemaining: 1500 });
  });
});
```

**Facade Tests**
```typescript
describe('TimerFacade', () => {
  let facade: TimerFacade;
  let timerService: jasmine.SpyObj<TimerService>;

  beforeEach(() => {
    const timerServiceSpy = jasmine.createSpyObj('TimerService', [
      'start', 'stop', 'toggle', 'reset'
    ]);

    TestBed.configureTestingModule({
      providers: [
        TimerFacade,
        { provide: TimerService, useValue: timerServiceSpy }
      ]
    });

    facade = TestBed.inject(TimerFacade);
    timerService = TestBed.inject(TimerService) as jasmine.SpyObj<TimerService>;
  });

  it('should start timer', () => {
    timerService.start.and.returnValue(of(MOCK_TIMER_STATE));
    facade.startTimer();
    expect(timerService.start).toHaveBeenCalled();
  });
});
```

#### 4.2 Test Coverage Goals
- Components: 80%+
- Services: 90%+
- Pipes: 100%
- Utils: 100%

---

### Phase 5: Styling & Animations

#### 5.1 Global Styles Structure
```scss
// styles/_variables.scss
:root {
  --color-primary: #6366F1;
  --color-background: #FAFAF9;
  --spacing-unit: 0.25rem;
  --border-radius: 0.5rem;
  --transition-fast: 150ms;
  --transition-normal: 300ms;
}
```

#### 5.2 Animation Library
```scss
// styles/_animations.scss
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

@keyframes slideIn {
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
.animate-slide-in { animation: slideIn 0.3s ease-out; }
```

#### 5.3 Responsive Breakpoints
```scss
// Mobile first approach
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

---

### Phase 6: Documentation

#### 6.1 Documentation Structure

**ARCHITECTURE.md**
- Project structure explanation
- Design patterns used
- State management flow
- Component hierarchy

**COMPONENTS.md**
- Component catalog
- Props documentation
- Usage examples
- Accessibility notes

**TESTING.md**
- Testing philosophy
- Running tests
- Writing new tests
- Test utilities

**STYLING.md**
- Color palette
- Typography system
- Spacing system
- Component styling guide

**AI_GUIDE.md**
- How to add new features
- File structure conventions
- Naming conventions
- Common patterns

---

### Phase 7: Development Workflow

#### 7.1 Scripts
```json
{
  "scripts": {
    "start": "ng serve",
    "start:mock": "ng serve --configuration=mock",
    "build": "ng build",
    "test": "ng test",
    "test:coverage": "ng test --code-coverage",
    "lint": "ng lint",
    "format": "prettier --write \"src/**/*.{ts,html,scss}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,scss}\""
  }
}
```

#### 7.2 VS Code Configuration
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

#### 7.3 Recommended Extensions
```json
// .vscode/extensions.json
{
  "recommendations": [
    "angular.ng-template",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "syler.sass-indented"
  ]
}
```

---

## 📦 Implementation Phases

### Alpha Version - Phase 1 (Core Features)
**Timeline**: 2-3 days
- ✅ Project setup & configuration
- ✅ Core services (Timer, Settings, WebSocket)
- ✅ Timer display component
- ✅ Timer controls
- ✅ Session type selector
- ✅ Basic styling with Tailwind
- ✅ Mock backend
- ✅ Basic tests

### Alpha Version - Phase 2 (Enhanced Features)
**Timeline**: 2-3 days
- ✅ History view
- ✅ Settings page
- ✅ Animations & polish
- ✅ Mobile responsiveness
- ✅ Comprehensive tests
- ✅ Documentation

### Future Enhancements (Post-Alpha)
- Notifications (browser/push)
- Sound effects
- Themes (light/dark/custom)
- Statistics & charts
- User accounts
- Cloud sync

---

## 🎯 Success Criteria

### Alpha Version Must Have:
- ✅ Fully functional timer (start/stop/reset)
- ✅ Session type switching
- ✅ Settings management
- ✅ Session history display
- ✅ Mobile responsive
- ✅ Clean, distraction-free UI
- ✅ Works with mock backend
- ✅ 70%+ test coverage
- ✅ Comprehensive documentation
- ✅ Easy for others to contribute

### Code Quality Metrics:
- TypeScript strict mode enabled
- ESLint passes with no errors
- Prettier formatting enforced
- All components documented
- Clear file organization
- Consistent naming conventions

---

## 🚀 Next Steps

1. **Review this plan** - Make sure architecture meets your needs
2. **Approve structure** - Confirm component breakdown and state management approach
3. **Begin implementation** - Start with Phase 1 setup
4. **Iterate and refine** - Adjust based on feedback

---

## 📝 Notes for AI Agents

When working on this codebase:

1. **Follow the established structure** - Don't create new patterns
2. **Update tests** - Always update/create tests for changes
3. **Document changes** - Update relevant .md files
4. **Use TypeScript strictly** - No `any` types unless absolutely necessary
5. **Follow naming conventions**:
   - Components: `noun.component.ts` (e.g., `timer-display.component.ts`)
   - Services: `noun.service.ts` (e.g., `timer.service.ts`)
   - Models: `noun.model.ts`
   - Pipes: `adjective.pipe.ts`
6. **Component design**:
   - Small, focused components
   - Smart components in pages/, dumb components in components/
   - Use @Input/@Output for communication
   - Prefer OnPush change detection
7. **State management**:
   - Use facade pattern for business logic
   - Keep state in dedicated state classes
   - Never mutate state directly
   - Use RxJS operators properly

---

**Ready to implement? Let me know if you'd like any adjustments to this plan!**
