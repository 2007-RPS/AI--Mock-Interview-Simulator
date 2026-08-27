# 02 — Requirements Traceability Matrix

This document maps every requirement from the original assignment specification to its implementation in the current codebase.

**Status codes:**
- `PASS` — Fully implemented and verified
- `PARTIAL` — Partially implemented
- `OPTIONAL/STRETCH` — Stretch goal; may or may not be implemented
- `NOT IMPLEMENTED` — Not implemented (documented honestly)

---

## A. Problem Statement Requirements

| Requirement | Source | Implementation | File/Module | Status |
|---|---|---|---|---|
| Role-specific questions | Assignment | `questionBank[state.selectedRole]` loads role dataset | `questions.js`, `app.js` | PASS |
| Questions displayed one at a time | Assignment | `loadCurrentQuestion()` renders one question; feedback replaces textarea view | `app.js`, `ui.js` | PASS |
| Timed responses | Assignment | 60-second `setInterval` countdown per question | `timer.js` | PASS |
| Student can type answer | Assignment | `<textarea id="answer-input">` with live word count | `index.html`, `app.js` | PASS |
| Rule-based feedback | Assignment | Deterministic evaluation in `analyzer.js`; text generation in `feedback.js` | `analyzer.js`, `feedback.js` | PASS |
| Answer-length analysis | Assignment | `calculateLengthScore()` with 5-band scoring against `idealLength` | `analyzer.js` | PASS |
| Expected keyword/concept analysis | Assignment | `matchConcepts()` using `\b` word-boundary regex matching | `analyzer.js` | PASS |
| Session score | Assignment | `state.results[]` array aggregated in `renderResults()` | `app.js`, `ui.js` | PASS |
| DOM manipulation | Assignment | `textContent`, `createElement`, `appendChild`, `classList` throughout | `ui.js` | PASS |
| Event handling | Assignment | `addEventListener` for click and input events | `app.js` | PASS |
| No page reload during interview | Assignment | Single-page application; no `window.location` or form POST | All files | PASS |

---

## B. Learning Objectives

| Learning Objective | Implementation | File | Status |
|---|---|---|---|
| JavaScript variables and state | `const state = {...}` in `app.js` | `app.js` | PASS |
| `const`/`let` / appropriate scope | Consistent ES6+ usage; no `var` anywhere | All JS files | PASS |
| Functions | `startInterview`, `loadCurrentQuestion`, `submitCurrentAnswer`, `finishInterview`, `resetApp` | `app.js` | PASS |
| Event handlers | `addEventListener("click")`, `addEventListener("input")` | `app.js` | PASS |
| Timer events | `setInterval` / `clearInterval` | `timer.js` | PASS |
| DOM manipulation | All screen rendering via `ui.*` methods | `ui.js` | PASS |
| String methods | `.toLowerCase()`, `.trim()`, `.split()`, `.join()`, `.replace()`, `.slice()` | `analyzer.js`, `ui.js` | PASS |
| Array methods | `.forEach()`, `.map()`, `.push()`, `.some()`, `.sort()`, `.slice()` | Multiple files | PASS |
| Conditionals | Extensive `if/else` in scoring, feedback, and flow control | `analyzer.js`, `feedback.js`, `app.js` | PASS |
| Reusable functions/modules | 6 distinct module objects: `analyzer`, `feedbackEngine`, `timer`, `ui`, `questionBank` | All JS files | PASS |

---

## C. Key Modules

| Module | Required | Implementation | File | Status |
|---|---|---|---|---|
| Question Bank | Required | `const questionBank = {...}` with 3 roles x 5 questions | `questions.js` | PASS |
| Timed Response Module | Required | `timer` object with `start()`/`stop()`/`reset()` | `timer.js` | PASS |
| Instant Feedback Engine | Required | `analyzer` + `feedbackEngine` objects | `analyzer.js`, `feedback.js` | PASS |
| Session Summary Module | Required | `ui.renderResults()` computes and displays aggregated results | `ui.js` | PASS |

---

## D. Technologies

| Technology | Required | Status |
|---|---|---|
| HTML5 | Required | PASS — semantic elements, `<!DOCTYPE html>` |
| CSS3 | Required | PASS — custom properties, `@keyframes`, grid, media queries |
| Vanilla JavaScript ES6+ | Required | PASS — arrow functions, template literals, `const`/`let` |
| `setInterval` / `setTimeout` | Required | PASS — timer.js (setInterval) and ui.js (setTimeout for screen transitions) |
| String/array methods | Required | PASS — extensively used in analyzer.js |
| Browser-compatible (no build step) | Required | PASS — plain HTML/CSS/JS, open index.html directly |

---

## E. Implementation Tasks / Milestones

| Task | Implementation | Status |
|---|---|---|
| Interview UI | `screen-interview` section with all controls | PASS |
| Question display | `renderQuestion()` → `textContent` on `#current-question-text` | PASS |
| Timer | 100px circle element with second countdown | PASS |
| Timer visual (countdown bar) | 5-step progress bar + colour states (warning/critical) | PASS |
| Text answer box | `<textarea id="answer-input">` with 200px min-height | PASS |
| Next/Submit interaction | `#btn-submit-answer` + `#btn-next-question` | PASS |
| JavaScript question dataset | `questionBank` constant in `questions.js` | PASS |
| Expected keywords per question | `concepts[].keywords[]` array on each question | PASS |
| Role metadata | `role`, `id`, `idealLength`, `structure` fields on each question | PASS |
| Countdown from 60 | Timer starts at 60, decrements every second | PASS |
| Timeout auto-submission | `onTimeout` callback -> `submitCurrentAnswer("timeout")` | PASS |
| click/input event handling | All primary actions are event-driven | PASS |
| Rule-based feedback logic | Weighted scoring + threshold-based feedback text | PASS |
| Dynamic DOM rendering | All feedback/results built with `createElement`/`textContent` | PASS |
| Final summary screen | Results screen with overall score, categories, Q-review | PASS |
| Per-question feedback | Inline feedback card shown immediately after submit | PASS |
| Overall score | Average of 5 `totalScore` values | PASS |
| Retry/Reset | `resetApp()` clears all state and returns to Home | PASS |

---

## F. Expected Outcomes

| Outcome | Implementation | Status |
|---|---|---|
| Working timed simulator | End-to-end flow verified | PASS |
| Instant feedback | Shown synchronously after submit/timeout | PASS |
| No page reload during normal flow | SPA pattern confirmed | PASS |
| Timer-driven event handling | `setInterval` drives countdown; timeout drives submission | PASS |
| Click-driven event handling | All primary actions are click events | PASS |
| Feedback varies meaningfully by answer | Score 0-100 with concept/length/structure/communication breakdown | PASS |
| Code demonstrates feedback-rule design | Transparent formula documented in `analyzer.js` comments | PASS |
| Code demonstrates DOM strategy | `createElement`/`textContent`/`classList` throughout `ui.js` | PASS |
| Code demonstrates timer strategy | `timer` object with `start`/`stop` and interval management | PASS |

---

## G. Stretch Goals

| Stretch Goal | Status | Evidence |
|---|---|---|
| Role-specific selectable question sets | OPTIONAL/STRETCH — IMPLEMENTED | 3 separate role keys in `questionBank`; role card selection loads correct set |
| Filler-word counter | OPTIONAL/STRETCH — IMPLEMENTED | `analyzeCommunication()` counts 7 filler words using word-boundary regex |

---

## H. Features Explicitly NOT Required by Assignment

| Feature | Status | Note |
|---|---|---|
| Voice recording / speech recognition | NOT IMPLEMENTED | Not in mandatory milestones; typed input satisfies all requirements. Future V2 scope. |
| LLM / real AI model | NOT IMPLEMENTED | Not required; rule-based evaluation is the assignment requirement |
| Backend / database | NOT IMPLEMENTED | Client-side project; not required |
| Authentication | NOT IMPLEMENTED | Not required |
| localStorage persistence | NOT IMPLEMENTED | Intentionally excluded per specification |
