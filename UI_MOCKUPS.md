# Pomoductivity UI Mockups

## Color Reference

```
Primary:    #6366F1 (Indigo)
Success:    #10B981 (Emerald)
Purple:     #8B5CF6 (Purple)
Background: #FAFAF9 (Warm Gray 50)
Text:       #292524 (Gray 800)
Subtle:     #78716C (Gray 500)
Border:     #E7E5E4 (Gray 200)
```

---

## 1. Timer Page (Desktop) - Default State

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  Pomoductivity                                        [History] [⚙️]   │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                                                                        │
│                           ╭─────────────╮                             │
│                           │  ⏱️ FOCUS   │                             │
│                           ╰─────────────╯                             │
│                                                                        │
│                                                                        │
│                                                                        │
│                          ╭─────────────╮                              │
│                         ╱               ╲                             │
│                        │                 │                            │
│                        │                 │                            │
│                        │      25:00      │                            │
│                        │                 │                            │
│                        │                 │                            │
│                         ╲               ╱                             │
│                          ╰─────────────╯                              │
│                                                                        │
│                         [  ▶️  START  ]                                │
│                                                                        │
│                                                                        │
│              ╭─────────╮   ╭─────────╮   ╭─────────╮                 │
│              │ ● Focus │   │ ○ Short │   │ ○ Long  │                 │
│              │  25 min │   │  5 min  │   │ 15 min  │                 │
│              ╰─────────╯   ╰─────────╯   ╰─────────╯                 │
│                                                                        │
│                                                                        │
│                     Session #1 • 0 completed today                    │
│                                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Timer Page - Running State

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  Pomoductivity                                        [History] [⚙️]   │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                                                                        │
│                      ╭───────────────────╮                            │
│                      │  ⏱️ FOCUS SESSION │                            │
│                      ╰───────────────────╯                            │
│                                                                        │
│                                                                        │
│                         ╭─────────────╮                               │
│                        ╱ ▓▓▓▓▓░░░░░░  ╲                               │
│                       │  ▓▓▓       ░░  │                              │
│                       │  ▓▓         ░░ │      [45% complete]          │
│                       │  ▓▓  13:45  ░░ │  ← Pulsing animation         │
│                       │  ▓▓         ░░ │                              │
│                       │  ▓▓▓       ░░  │                              │
│                        ╲ ▓▓▓▓▓░░░░░░  ╱                               │
│                         ╰─────────────╯                               │
│                                                                        │
│                  [ ⏸️  PAUSE ]   [ 🔄 RESET ]                         │
│                                                                        │
│                                                                        │
│              ╭─────────╮   ╭─────────╮   ╭─────────╮                 │
│              │ ● Focus │   │   Short │   │   Long  │                 │
│              │  25 min │   │  5 min  │   │ 15 min  │                 │
│              ╰─────────╯   ╰─────────╯   ╰─────────╯                 │
│                                                                        │
│                                                                        │
│                     Session #1 • 0 completed today                    │
│                   Time remaining: 13 minutes 45 seconds               │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Timer Page - Break Mode

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  Pomoductivity                                        [History] [⚙️]   │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                                                                        │
│                      ╭────────────────────╮                           │
│                      │  ☕ SHORT BREAK    │  ← Green color            │
│                      ╰────────────────────╯                           │
│                                                                        │
│                  🎉 Great work! Time for a break                      │
│                                                                        │
│                         ╭─────────────╮                               │
│                        ╱               ╲                              │
│                       │                 │                             │
│                       │                 │                             │
│                       │      05:00      │  ← Green glow               │
│                       │                 │                             │
│                       │                 │                             │
│                        ╲               ╱                              │
│                         ╰─────────────╯                               │
│                                                                        │
│                         [  ▶️  START  ]                                │
│                                                                        │
│                                                                        │
│              ╭─────────╮   ╭─────────╮   ╭─────────╮                 │
│              │   Focus │   │ ● Short │   │   Long  │                 │
│              │  25 min │   │  5 min  │   │ 15 min  │                 │
│              ╰─────────╯   ╰─────────╯   ╰─────────╯                 │
│                                                                        │
│                                                                        │
│                     Session #2 • 1 completed today                    │
│                                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. History Page

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ← Back to Timer                   Session History                    │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ╭──────────────────────────────────────────────────────────────────╮ │
│  │  📊 Today's Statistics                                           │ │
│  │                                                                  │ │
│  │  ╭──────────────╮  ╭──────────────╮  ╭──────────────╮          │ │
│  │  │   2h 15min   │  │  5 sessions  │  │  88% focus   │          │ │
│  │  │  Total Time  │  │  Completed   │  │     rate     │          │ │
│  │  ╰──────────────╯  ╰──────────────╯  ╰──────────────╯          │ │
│  ╰──────────────────────────────────────────────────────────────────╯ │
│                                                                        │
│  ┌─ Today ─────────────────────────────────────────────────────┐     │
│  │                                                              │     │
│  │  ╭──────────────────────────────────────────────────────╮   │     │
│  │  │  🔵 Focus Session                        ✓ Completed │   │     │
│  │  │  25:00 minutes                                       │   │     │
│  │  │  09:00 AM - 09:25 AM                                 │   │     │
│  │  ╰──────────────────────────────────────────────────────╯   │     │
│  │                                                              │     │
│  │  ╭──────────────────────────────────────────────────────╮   │     │
│  │  │  🟢 Short Break                          ✓ Completed │   │     │
│  │  │  5:00 minutes                                        │   │     │
│  │  │  09:25 AM - 09:30 AM                                 │   │     │
│  │  ╰──────────────────────────────────────────────────────╯   │     │
│  │                                                              │     │
│  │  ╭──────────────────────────────────────────────────────╮   │     │
│  │  │  🔵 Focus Session                        ✓ Completed │   │     │
│  │  │  25:00 minutes                                       │   │     │
│  │  │  09:30 AM - 09:55 AM                                 │   │     │
│  │  ╰──────────────────────────────────────────────────────╯   │     │
│  │                                                              │     │
│  │  ╭──────────────────────────────────────────────────────╮   │     │
│  │  │  🟢 Short Break                          ✓ Completed │   │     │
│  │  │  5:00 minutes                                        │   │     │
│  │  │  09:55 AM - 10:00 AM                                 │   │     │
│  │  ╰──────────────────────────────────────────────────────╯   │     │
│  │                                                              │     │
│  │  ╭──────────────────────────────────────────────────────╮   │     │
│  │  │  🔵 Focus Session                     ⏸️ In Progress  │   │     │
│  │  │  13:45 / 25:00 minutes                               │   │     │
│  │  │  Started at 10:00 AM                                 │   │     │
│  │  ╰──────────────────────────────────────────────────────╯   │     │
│  │                                                              │     │
│  └──────────────────────────────────────────────────────────────┘     │
│                                                                        │
│  ┌─ Yesterday ──────────────────────────────────────────────────┐    │
│  │  3 Focus • 2 Breaks • 1h 45min total                         │    │
│  │  [Show Details ▼]                                            │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                        │
│  ┌─ This Week ──────────────────────────────────────────────────┐   │
│  │  █████████░░░░░ 18 / 25 sessions                             │   │
│  │  [View Weekly Report →]                                      │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Settings Page

```
┌────────────────────────────────────────────────────────────────────────┐
│                                                                        │
│  ← Back to Timer                        Settings                      │
│                                                                        │
├────────────────────────────────────────────────────────────────────────┤
│                                                                        │
│                                                                        │
│  ╭──────────────────────────────────────────────────────────────────╮ │
│  │  ⏱️  Timer Durations                                             │ │
│  │                                                                  │ │
│  │                                                                  │ │
│  │  Focus Duration                                                  │ │
│  │  ┌────────────────────────────────────────────────────────────┐ │ │
│  │  │  [  -  ]          25 minutes           [  +  ]            │ │ │
│  │  └────────────────────────────────────────────────────────────┘ │ │
│  │  Recommended: 25 minutes (classic Pomodoro)                     │ │
│  │                                                                  │ │
│  │                                                                  │ │
│  │  Short Break Duration                                            │ │
│  │  ┌────────────────────────────────────────────────────────────┐ │ │
│  │  │  [  -  ]           5 minutes           [  +  ]            │ │ │
│  │  └────────────────────────────────────────────────────────────┘ │ │
│  │  Recommended: 5 minutes                                          │ │
│  │                                                                  │ │
│  │                                                                  │ │
│  │  Long Break Duration                                             │ │
│  │  ┌────────────────────────────────────────────────────────────┐ │ │
│  │  │  [  -  ]          15 minutes           [  +  ]            │ │ │
│  │  └────────────────────────────────────────────────────────────┘ │ │
│  │  Recommended: 15-30 minutes                                      │ │
│  │                                                                  │ │
│  │                                                                  │ │
│  │  ┌──────────────────────┐         ┌──────────────────────┐     │ │
│  │  │  Reset to Defaults   │         │   Save Changes  ✓   │     │ │
│  │  └──────────────────────┘         └──────────────────────┘     │ │
│  │                                                                  │ │
│  ╰──────────────────────────────────────────────────────────────────╯ │
│                                                                        │
│                                                                        │
│  ╭──────────────────────────────────────────────────────────────────╮ │
│  │  🔔 Notifications                                    [ Toggle ]  │ │
│  │                                                                  │ │
│  │  Desktop notifications when timer completes          [   ✓   ]  │ │
│  │  Sound alert                                         [   ✓   ]  │ │
│  │  Browser tab notification                            [   ✓   ]  │ │
│  │                                                                  │ │
│  ╰──────────────────────────────────────────────────────────────────╯ │
│                                                                        │
│                                                                        │
│  ╭──────────────────────────────────────────────────────────────────╮ │
│  │  🎨 Appearance                                                   │ │
│  │                                                                  │ │
│  │  Theme                                                           │ │
│  │  [  Light  ]  [  Dark  ]  [  Auto  ]                            │ │
│  │                                                                  │ │
│  │  Minimal mode (hide history stats)                  [       ]  │ │
│  │                                                                  │ │
│  ╰──────────────────────────────────────────────────────────────────╯ │
│                                                                        │
│                                                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Mobile View - Timer (Portrait)

```
┌──────────────────────────┐
│                          │
│  ☰  Pomoductivity    ⚙️  │
│                          │
├──────────────────────────┤
│                          │
│                          │
│   ╭──────────────╮       │
│   │   ⏱️ FOCUS   │       │
│   ╰──────────────╯       │
│                          │
│                          │
│      ╭──────────╮        │
│     ╱            ╲       │
│    │              │      │
│    │              │      │
│    │    25:00     │      │
│    │              │      │
│    │              │      │
│     ╲            ╱       │
│      ╰──────────╯        │
│                          │
│                          │
│   ┌──────────────────┐   │
│   │   ▶️  START      │   │
│   └──────────────────┘   │
│                          │
│                          │
│   ╭────────╮             │
│   │● Focus │             │
│   │ 25 min │             │
│   ╰────────╯             │
│                          │
│   ╭────────╮             │
│   │○ Short │             │
│   │ 5 min  │             │
│   ╰────────╯             │
│                          │
│   ╭────────╮             │
│   │○ Long  │             │
│   │ 15 min │             │
│   ╰────────╯             │
│                          │
│                          │
│  Session #1              │
│  0 completed today       │
│                          │
│                          │
└──────────────────────────┘
```

---

## 7. Mobile View - Running Timer

```
┌──────────────────────────┐
│                          │
│  ☰  Pomoductivity    ⚙️  │
│                          │
├──────────────────────────┤
│                          │
│   ╭───────────────╮      │
│   │ ⏱️ FOCUS       │      │
│   ╰───────────────╯      │
│                          │
│                          │
│      ╭──────────╮        │
│     ╱ ▓▓▓▓░░░░  ╲       │
│    │  ▓▓    ░░   │      │
│    │  ▓▓    ░░   │      │
│    │  ▓ 13:45 ░  │      │ ← Pulsing
│    │  ▓▓    ░░   │      │
│    │  ▓▓    ░░   │      │
│     ╲ ▓▓▓▓░░░░  ╱       │
│      ╰──────────╯        │
│                          │
│      45% complete        │
│                          │
│                          │
│   ┌──────┐  ┌──────┐    │
│   │ PAUSE│  │RESET │    │
│   └──────┘  └──────┘    │
│                          │
│                          │
│   Session #1             │
│   13:45 remaining        │
│                          │
│                          │
│ ────────────────────     │
│                          │
│ [Timer] [History] [⚙️]   │
│                          │
└──────────────────────────┘
      Bottom Nav
```

---

## 8. Component Details

### Button Styles

```
Primary Button:
┌─────────────────────┐
│   ▶️  START TIMER   │  ← bg-primary-500, text-white
└─────────────────────┘    hover: bg-primary-600
                           shadow-sm, rounded-lg


Secondary Button:
┌─────────────────────┐
│   🔄  RESET         │  ← bg-white, text-gray-700
└─────────────────────┘    border: gray-300
                           hover: bg-gray-50


Ghost Button:
┌─────────────────────┐
│   Settings →        │  ← transparent, text-primary-600
└─────────────────────┘    hover: bg-primary-50
```

### Session Type Pills

```
Active:
╭─────────────╮
│ ● Focus     │  ← bg-primary-500, text-white
│   25 min    │    font-semibold
╰─────────────╯    shadow-md


Inactive:
╭─────────────╮
│ ○ Short     │  ← bg-gray-100, text-gray-600
│   5 min     │    hover: bg-gray-200
╰─────────────╯
```

### Progress Circle (CSS/SVG)

```
<svg viewBox="0 0 200 200">
  <!-- Background circle -->
  <circle cx="100" cy="100" r="90"
          stroke="#E7E5E4"
          stroke-width="8"
          fill="none" />

  <!-- Progress circle -->
  <circle cx="100" cy="100" r="90"
          stroke="#6366F1"
          stroke-width="8"
          fill="none"
          stroke-dasharray="565"
          stroke-dashoffset="calc(565 - (565 * progress / 100))"
          transform="rotate(-90 100 100)"
          class="transition-all duration-300" />
</svg>
```

---

## 9. Animations

### Timer Pulse (Running State)

```scss
@keyframes pulse-timer {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
    opacity: 0.9;
  }
}

.timer-running {
  animation: pulse-timer 2s ease-in-out infinite;
}
```

### Progress Circle Animation

```scss
.progress-circle {
  transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Slide In (Page Transitions)

```scss
@keyframes slide-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.page-enter {
  animation: slide-in 0.3s ease-out;
}
```

### Button Ripple Effect

```scss
.button-ripple {
  position: relative;
  overflow: hidden;
}

.button-ripple::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.button-ripple:active::after {
  width: 300px;
  height: 300px;
}
```

---

## 10. Responsive Breakpoints

### Mobile (320px - 639px)
- Single column layout
- Full-width timer
- Stacked session type buttons
- Bottom navigation
- Larger touch targets (44px min)

### Tablet (640px - 1023px)
- Centered content with max-width
- Side-by-side session types
- Larger timer display
- Top navigation bar

### Desktop (1024px+)
- Max width container (1200px)
- Generous padding and spacing
- Hover states on all interactive elements
- Keyboard navigation support

---

## 11. Accessibility Features

### Keyboard Navigation
- Tab through all interactive elements
- Space/Enter to activate buttons
- Arrow keys for session type selection
- Esc to close modals

### Screen Reader Support
- ARIA labels on all buttons
- ARIA live regions for timer updates
- ARIA roles for semantic structure
- Alt text for icons

### Focus States
```scss
.focus-visible {
  outline: 2px solid #6366F1;
  outline-offset: 2px;
  border-radius: 0.375rem;
}
```

### Color Contrast
- All text meets WCAG AA standards
- Minimum 4.5:1 contrast for normal text
- Minimum 3:1 contrast for large text
- Focus indicators have 3:1 contrast

---

**This completes the visual mockups! Ready for implementation.**
