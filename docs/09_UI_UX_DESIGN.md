# 09 — UI/UX Design

## Design Philosophy

The UI is designed to feel modern, AI-inspired, and professional without relying on any external UI framework or heavy library. All visual effects are achieved with:

- **CSS3 custom properties** (variables)
- **CSS `@keyframes` animations**
- **CSS glassmorphism** (`backdrop-filter`, semi-transparent backgrounds)
- **CSS grid and flexbox** (layout)
- **CSS `clamp()`** (fluid typography)

No Three.js, Spline, WebGL, or JS animation library is used. This keeps the application:
- Lightweight (no large JS bundles)
- Reliable (no external CDN for visual effects)
- Easy to deploy (just open the HTML file)
- Maintainable (all styles in one CSS file)
- Performant (CSS animations are GPU-accelerated)

---

## Colour Palette

| Variable | Value | Usage |
|---|---|---|
| `--primary` | `#6366f1` (Indigo) | Buttons, accents, active states |
| `--primary-light` | `#818cf8` | Hover states, completed steps |
| `--primary-dark` | `#4f46e5` | Headings, strong text |
| `--accent-violet` | `#a855f7` | Gradient accents, selected states |
| `--accent-cyan` | `#06b6d4` | Secondary gradient elements |
| `--success` | `#10b981` | Strengths, checkmarks |
| `--warning` | `#f59e0b` | Timer warning, improvement areas |
| `--error` | `#ef4444` | Timer critical, missing concepts |
| `--bg-color` | `#f8f9ff` | Page background |
| `--text-primary` | `#0f172a` | Main body text |
| `--text-secondary` | `#475569` | Supporting text |

**Brand gradient:** `linear-gradient(135deg, #6366f1, #a855f7)` — used on buttons, score text, progress steps, and branding.

---

## Typography

- **Font:** Inter (Google Fonts CDN) with fallback to `system-ui, -apple-system, sans-serif`
- **Hero heading:** `clamp(2.8rem, 7vw, 4.5rem)` — fluid, scales with viewport
- **Question text:** `1.85rem` (reduced to `1.45rem` on screens <= 480px)
- **Body text:** `1rem` (1.1rem for textarea and buttons)
- **Weight:** 400 (body), 600 (buttons), 700-800 (headings, scores)

---

## Screen Descriptions

### Home Screen

- **Layout:** Hero content left-aligned (max 60% width on desktop); feature cards below
- **Heading:** "Practice smarter." + gradient text "Interview better."
- **Subtext:** Describes the tool in one sentence
- **CTA button:** "Start Interview →" with glow hover effect
- **Feature cards:** 3 glassmorphism cards ("3 Roles", "Instant Feedback", "Rule-Based Analysis")
- **Decorative elements:** Large floating orb (top-right), small orb (top-left), rotating orbit ring, floating geometric cube — all CSS animated, `aria-hidden="true"`

### Setup Screen

- **Layout:** Centered; role cards in responsive grid
- **Role cards:** Glassmorphism cards with SVG icon, role name; selected state shows violet ring + checkmark
- **Info strip:** Shows "5 Questions", "60 Seconds", "Instant Feedback" with icons
- **Begin button:** Disabled until role selected; enabled on role click

### Interview Screen

- **Container:** max-width 800px, centered
- **Header:** Role badge (pill shape) + "Question N/5" tracker
- **Progress bar:** 5 steps; completed = light indigo, active = gradient glow, upcoming = muted
- **Question text:** Large (1.85rem), bold, high contrast
- **Timer:** 100px circle with gradient border; shows seconds; colour changes at <=30s and <=10s
- **Textarea:** Full width, 200px min-height, resizable, focus glow ring
- **Word count:** Live display below textarea
- **Submit button:** Gradient primary; disabled when textarea empty

### Feedback Card (within Interview Screen)

- Appears below textarea with `slide-up` entry animation
- **Score display:** Large gradient number (e.g. "72") + "/100"
- **Feedback grid:** 2-column (1-column on mobile) — Strengths / Missing
- **Strengths:** Green checkmarks; items generated from actual analysis
- **Missing:** Red bullets; actual missing concept names
- **Improve:** Amber arrow; one actionable suggestion
- **Breakdown:** "Why this score?" — shows Concept%, Quality%, Structure%, Communication%
- **Next button:** "Next Question →" or "View Results →" on Q5

### Results Screen

- **Score ring:** 240px circle with 3D neumorphic appearance; overall score centered in large gradient text
- **Readiness label:** Large colored label below score ring
- **Results grid:** 2-column (1-column on mobile) — Performance Breakdown / Strengths & Improvements
- **Performance Breakdown:** Average scores for each of the 4 categories, formatted as "N / 100"
- **Question Review:** Expandable cards for Q1–Q5 showing question text, score, key finding
- **Controls:** "Try Again" (primary) + "Home" (secondary)

---

## Glassmorphism Cards

```css
.card-glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 10px 40px -10px rgba(99,102,241,0.12), inset 0 0 0 1px rgba(255,255,255,0.6);
}
```

Used on: role cards, feature cards, feedback card, results breakdown card, strengths card, question review section.

---

## Button Styles

| Class | Appearance | Usage |
|---|---|---|
| `.btn-primary .btn-glow` | Indigo-violet gradient + glow hover | Main CTAs |
| `.btn-secondary` | Semi-transparent white + subtle border | Home button on Results |
| `disabled` | 50% opacity, grayscale, no hover effect | Role Begin before selection; Submit when empty |

All buttons have `focus-visible` outlines (2px indigo) for keyboard accessibility.

---

## Decorative 3D Effects

All visual depth effects are pure CSS — no JavaScript, no WebGL:

| Element | CSS Technique |
|---|---|
| Orbs (spheres) | `radial-gradient` with highlight at 25% 25%; `inset box-shadow` for depth |
| Orbit rings | Semi-transparent border; `backdrop-filter: blur`; `rotateX/rotateZ` animation |
| Geometric cube | `rotate3d` + `translateY` animation; gradient fill |
| Ambient glows | Fixed `div` elements with `filter: blur(100px)`; `z-index: -2` |
| Score ring | Neumorphic `box-shadow` with light/dark sides; `::before` gradient glow |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `max-width: 900px` | Hero content full-width; orb opacity reduced; ring/geo elements hidden |
| `max-width: 768px` | Feedback and results grids collapse to 1 column; timer 80px; screen padding 1rem; setup strip stacks |
| `max-width: 480px` | Question text 1.45rem; hero heading re-clamped to smaller range |

---

## Accessibility

| Feature | Implementation |
|---|---|
| Keyboard navigation | All interactive elements are `<button>` or `<textarea>` — natively focusable |
| Focus indicator | `button:focus-visible { outline: 2px solid var(--primary); outline-offset: 3px; }` |
| Screen reader labels | `<label class="sr-only">` + `aria-label` on textarea |
| Live regions | `aria-live="polite"` on timer and feedback containers |
| Decorative elements hidden | `aria-hidden="true"` on all `.scene-container` divs |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` disables all CSS animations |
