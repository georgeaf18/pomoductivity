# Pomoductivity Angular Frontend - Implementation Plan (Updated)

## 📋 Project Overview

**Goal**: Build a modern, maintainable Angular frontend for the Pomoductivity API with focus on clean architecture, testing, and developer experience.

**Tech Stack**:
- Angular 18+ (Standalone components)
- TypeScript (Strict mode)
- Tailwind CSS + SCSS
- RxJS for reactive state management
- **Jest + Testing Library** for unit testing
- Mock backend for development

**Key Principles**:
- ✅ Clean, non-distracting UI
- ✅ Mobile-first responsive design
- ✅ Modular, maintainable architecture
- ✅ Comprehensive testing with Jest
- ✅ Well-documented code
- ✅ AI-friendly structure
- ✅ Easy for developers to extend
- ✅ Strict linting with ESLint

---

## 🧪 Testing Configuration - Jest

### Install Jest for Angular

```bash
# Remove Karma/Jasmine
npm uninstall karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter @types/jasmine jasmine-core

# Install Jest and related packages
npm install -D jest @types/jest jest-preset-angular @testing-library/angular @testing-library/jest-dom @testing-library/user-event
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.ts',
    '!src/app/**/*.spec.ts',
    '!src/app/**/*.mock.ts',
    '!src/app/**/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@shared/(.*)': '<rootDir>/src/app/shared/$1',
    '@features/(.*)': '<rootDir>/src/app/features/$1',
    '@environments/(.*)': '<rootDir>/src/environments/$1',
  },
  transform: {
    '^.+\\.(ts|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
```

```typescript
// setup-jest.ts
import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom';

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console errors in tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
```

### Updated tsconfig.spec.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest", "node"],
    "esModuleInterop": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
```

### Updated Testing Examples

**Component Test with Jest & Testing Library**

```typescript
// timer-display.component.spec.ts
import { render, screen } from '@testing-library/angular';
import { TimerDisplayComponent } from './timer-display.component';
import { TimeFormatPipe } from '@shared/pipes/time-format.pipe';

describe('TimerDisplayComponent', () => {
  it('should display time in MM:SS format', async () => {
    await render(TimerDisplayComponent, {
      imports: [TimeFormatPipe],
      componentProperties: {
        timeRemaining: 1500,
        isRunning: false,
        sessionType: 'focus',
        totalDuration: 1500,
      },
    });

    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('should show running state with pulsing animation', async () => {
    await render(TimerDisplayComponent, {
      imports: [TimeFormatPipe],
      componentProperties: {
        timeRemaining: 1485,
        isRunning: true,
        sessionType: 'focus',
        totalDuration: 1500,
      },
    });

    const timeElement = screen.getByText('24:45');
    expect(timeElement).toHaveClass('running');
  });

  it('should calculate progress percentage correctly', async () => {
    const component = await render(TimerDisplayComponent, {
      componentProperties: {
        timeRemaining: 750,
        isRunning: false,
        sessionType: 'focus',
        totalDuration: 1500,
      },
    });

    expect(component.fixture.componentInstance.progress).toBe(50);
  });
});
```

**Service Test with Jest**

```typescript
// timer.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TimerService } from './timer.service';
import { environment } from '@environments/environment';

describe('TimerService', () => {
  let service: TimerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TimerService],
    });

    service = TestBed.inject(TimerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start timer and return updated state', (done) => {
    const mockResponse = {
      isRunning: true,
      timeRemaining: 1500,
      sessionType: 'focus',
      sessionCount: 0,
      startTime: '2024-01-01T12:00:00.000Z',
      history: [],
    };

    service.start().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.isRunning).toBe(true);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/timer/start`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle errors gracefully', (done) => {
    service.start().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/api/timer/start`);
    req.error(new ProgressEvent('Network error'));
  });
});
```

**Facade Test with Jest**

```typescript
// timer.facade.spec.ts
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TimerFacade } from './timer.facade';
import { TimerService } from '@core/services/timer.service';
import { TimerState } from './timer.state';
import { WebSocketService } from '@core/services/websocket.service';

describe('TimerFacade', () => {
  let facade: TimerFacade;
  let timerService: jest.Mocked<TimerService>;
  let timerState: TimerState;
  let websocketService: jest.Mocked<WebSocketService>;

  const mockTimerState = {
    isRunning: false,
    timeRemaining: 1500,
    sessionType: 'focus' as const,
    sessionCount: 0,
    startTime: null,
    history: [],
  };

  beforeEach(() => {
    const timerServiceMock = {
      start: jest.fn(),
      stop: jest.fn(),
      toggle: jest.fn(),
      reset: jest.fn(),
      getStatus: jest.fn(),
      setType: jest.fn(),
    };

    const websocketServiceMock = {
      connect: jest.fn(),
      disconnect: jest.fn(),
      getMessages: jest.fn(() => of(mockTimerState)),
    };

    TestBed.configureTestingModule({
      providers: [
        TimerFacade,
        TimerState,
        { provide: TimerService, useValue: timerServiceMock },
        { provide: WebSocketService, useValue: websocketServiceMock },
      ],
    });

    facade = TestBed.inject(TimerFacade);
    timerService = TestBed.inject(TimerService) as jest.Mocked<TimerService>;
    timerState = TestBed.inject(TimerState);
    websocketService = TestBed.inject(WebSocketService) as jest.Mocked<WebSocketService>;
  });

  it('should start timer successfully', (done) => {
    timerService.start.mockReturnValue(of(mockTimerState));

    facade.startTimer();

    facade.timerState$.subscribe((state) => {
      if (state) {
        expect(timerService.start).toHaveBeenCalled();
        done();
      }
    });
  });

  it('should handle errors when starting timer', (done) => {
    const error = new Error('Network error');
    timerService.start.mockReturnValue(throwError(() => error));

    facade.startTimer();

    facade.error$.subscribe((err) => {
      if (err) {
        expect(err).toBe('Failed to start timer');
        done();
      }
    });
  });
});
```

---

## 🔒 ESLint Configuration

### Install ESLint Packages

```bash
npm install -D @angular-eslint/builder @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/schematics @angular-eslint/template-parser @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-import eslint-plugin-rxjs eslint-plugin-rxjs-angular
```

### Comprehensive ESLint Configuration

```json
// .eslintrc.json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:rxjs/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "plugins": [
        "@typescript-eslint",
        "@angular-eslint",
        "rxjs",
        "rxjs-angular",
        "import",
        "prettier"
      ],
      "rules": {
        // TypeScript
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          {
            "allowExpressions": true,
            "allowTypedFunctionExpressions": true,
            "allowHigherOrderFunctions": true
          }
        ],
        "@typescript-eslint/explicit-member-accessibility": [
          "error",
          {
            "accessibility": "explicit",
            "overrides": {
              "constructors": "no-public"
            }
          }
        ],
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_"
          }
        ],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            "selector": "default",
            "format": ["camelCase"]
          },
          {
            "selector": "variable",
            "format": ["camelCase", "UPPER_CASE", "PascalCase"]
          },
          {
            "selector": "parameter",
            "format": ["camelCase"],
            "leadingUnderscore": "allow"
          },
          {
            "selector": "typeLike",
            "format": ["PascalCase"]
          },
          {
            "selector": "enumMember",
            "format": ["UPPER_CASE"]
          },
          {
            "selector": "property",
            "format": ["camelCase", "UPPER_CASE", "PascalCase"],
            "leadingUnderscore": "allow"
          }
        ],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/no-misused-promises": "error",
        "@typescript-eslint/await-thenable": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-nullish-coalescing": "error",
        "@typescript-eslint/prefer-optional-chain": "error",

        // Angular
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/no-empty-lifecycle-method": "error",
        "@angular-eslint/prefer-on-push-component-change-detection": "warn",
        "@angular-eslint/use-lifecycle-interface": "error",
        "@angular-eslint/use-injectable-provided-in": "error",

        // RxJS
        "rxjs/no-async-subscribe": "error",
        "rxjs/no-ignored-observable": "error",
        "rxjs/no-implicit-any-catch": "error",
        "rxjs/no-nested-subscribe": "error",
        "rxjs/no-unbound-methods": "error",
        "rxjs/throw-error": "error",
        "rxjs-angular/prefer-takeuntil": "error",

        // Import
        "import/order": [
          "error",
          {
            "groups": [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index"
            ],
            "pathGroups": [
              {
                "pattern": "@angular/**",
                "group": "external",
                "position": "before"
              },
              {
                "pattern": "@app/**",
                "group": "internal"
              },
              {
                "pattern": "@core/**",
                "group": "internal"
              },
              {
                "pattern": "@shared/**",
                "group": "internal"
              },
              {
                "pattern": "@features/**",
                "group": "internal"
              }
            ],
            "pathGroupsExcludedImportTypes": ["@angular"],
            "newlines-between": "always",
            "alphabetize": {
              "order": "asc",
              "caseInsensitive": true
            }
          }
        ],
        "import/no-unresolved": "off",
        "import/no-duplicates": "error",

        // General
        "no-console": [
          "warn",
          {
            "allow": ["warn", "error"]
          }
        ],
        "no-debugger": "error",
        "prefer-const": "error",
        "no-var": "error",
        "eqeqeq": ["error", "always"],
        "curly": "error",
        "prettier/prettier": "error"
      }
    },
    {
      "files": ["*.html"],
      "extends": [
        "plugin:@angular-eslint/template/recommended",
        "plugin:@angular-eslint/template/accessibility",
        "prettier"
      ],
      "rules": {
        "@angular-eslint/template/no-negated-async": "error",
        "@angular-eslint/template/use-track-by-function": "error",
        "@angular-eslint/template/alt-text": "error",
        "@angular-eslint/template/elements-content": "error",
        "@angular-eslint/template/label-has-associated-control": "error",
        "@angular-eslint/template/table-scope": "error",
        "@angular-eslint/template/valid-aria": "error"
      }
    },
    {
      "files": ["*.spec.ts"],
      "rules": {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-member-access": "off"
      }
    }
  ]
}
```

### ESLint Scripts

```json
// package.json
{
  "scripts": {
    "lint": "eslint \"src/**/*.{ts,html}\"",
    "lint:fix": "eslint \"src/**/*.{ts,html}\" --fix",
    "format": "prettier --write \"src/**/*.{ts,html,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,scss,json}\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Updated Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    }
  ]
}
```

### .prettierignore

```
node_modules
dist
coverage
.angular
*.md
```

---

## 🎨 Visual UI Mockups

I'll create detailed visual mockups in the next response to keep this organized.

---

## 📦 Updated Package.json

```json
{
  "name": "pomoductivity-client",
  "version": "0.1.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "start:mock": "ng serve --configuration=mock",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint \"src/**/*.{ts,html}\"",
    "lint:fix": "eslint \"src/**/*.{ts,html}\" --fix",
    "format": "prettier --write \"src/**/*.{ts,html,scss,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,scss,json}\"",
    "analyze": "ng build --configuration production --stats-json && webpack-bundle-analyzer dist/pomoductivity-client/stats.json"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^18.0.0",
    "@angular/common": "^18.0.0",
    "@angular/compiler": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/forms": "^18.0.0",
    "@angular/platform-browser": "^18.0.0",
    "@angular/platform-browser-dynamic": "^18.0.0",
    "@angular/router": "^18.0.0",
    "rxjs": "^7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^18.0.0",
    "@angular-eslint/builder": "^18.0.0",
    "@angular-eslint/eslint-plugin": "^18.0.0",
    "@angular-eslint/eslint-plugin-template": "^18.0.0",
    "@angular-eslint/schematics": "^18.0.0",
    "@angular-eslint/template-parser": "^18.0.0",
    "@angular/cli": "^18.0.0",
    "@angular/compiler-cli": "^18.0.0",
    "@testing-library/angular": "^16.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@types/jest": "^29.5.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.0",
    "eslint-plugin-prettier": "^5.1.0",
    "eslint-plugin-rxjs": "^5.0.0",
    "eslint-plugin-rxjs-angular": "^2.0.0",
    "jest": "^29.7.0",
    "jest-preset-angular": "^14.0.0",
    "postcss": "^8.4.0",
    "prettier": "^3.2.0",
    "tailwindcss": "^3.4.0",
    "typescript": "~5.4.0",
    "webpack-bundle-analyzer": "^4.10.0"
  }
}
```

---

**Continue to UI mockups in the next section...**
