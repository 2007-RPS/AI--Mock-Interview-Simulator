# 04 â€” Features and Functionality

This document describes every implemented feature of the AI-Style Mock Interview Simulator.

---

## 1. Home Screen

**Purpose:** Entry point of the application.  
**User interaction:** Click "Start Interview" button.  
**Internal logic:** `btn-start` click listener calls `ui.showScreen(ui.setupScreen)`.  
**Output:** Setup screen becomes visible.  
**Files:** `app.js`, `ui.js`, `index.html`

The home screen displays:
- Application branding ("AI Interviewer")
- Hero heading: "Practice smarter. Interview better."
- Subtext explaining the purpose
- Three feature cards: 3 Roles / Instant Feedback / Rule-Based Analysis
- Decorative 3D animated elements (CSS-driven)

---

## 2. Setup Screen — Role, Difficulty, and Mode

**Purpose:** Allow the user to choose an interview role before starting.  
**User interaction:** Select Role, Difficulty, and Interview Type, then click "Start Interview".  
**Internal logic:**
- Each `.role-card` button has a `data-role` attribute
- Click listener reads `event.currentTarget.getAttribute("data-role")` â†’ stores in `state.selectedRole`
- `ui.selectRoleCard(btn)` adds `.selected` class and enables the Begin button
- Begin button is disabled until a role is selected

**Roles available:**
- Software Engineer
- Data Analyst
- Marketing

**Files:** `app.js`, `ui.js`, `index.html`

---

## 3. Interview Start

**Purpose:** Initialize a new interview session.  
**Trigger:** Click "Start Interview" on Setup screen with a role selected.  
**Internal logic (`startInterview()` in `app.js`):**
- Loads `questionBank[state.selectedRole].slice(0, 5)` into `state.questions`
- Resets `currentQuestionIndex` to 0
- Clears `state.answers` and `state.results` arrays
- Calls `ui.showScreen(ui.interviewScreen)` and `loadCurrentQuestion()`

**Files:** `app.js`

---

## 4. Question Display

**Purpose:** Show the current question to the user.  
**Internal logic (`renderQuestion()` in `ui.js`):**
- Sets `roleLabel.textContent` to the role name
- Sets `questionTracker.textContent` to `Question N/5`
- Sets `questionText.textContent` to the question string
- Updates progress bar (5 steps: completed / active / upcoming)
- Clears textarea, resets word count, hides feedback card
- Resets timer circle CSS class

**Files:** `ui.js`

---

## 5. Progress Bar

**Purpose:** Visual indication of interview progress.  
**Implementation:** 5 `div.progress-step` elements in HTML; each receives `completed`, `active`, or no class based on `currentQuestionIndex`.  
**Files:** `ui.js`, `index.html`, `style.css`

---

## 6. 60-Second Timer

**Purpose:** Enforce a time limit per question and auto-submit when time expires.  
**Internal logic (`timer.js`):**
- `timer.start(60, tickCallback, timeoutCallback)` starts `setInterval` at 1000ms
- Each tick: `remaining--`, calls `tickCallback(remaining)` to update UI
- `tickCallback` = `ui.updateTimer(sec)` which updates the timer circle text and CSS class
- At `remaining <= 0`: calls `this.stop()` then `timeoutCallback()`
- `timeoutCallback` = `() => submitCurrentAnswer("timeout")`
- `stop()` always called before a new `start()` â€” prevents duplicate intervals

**Visual states:**
- Normal: indigo/cyan gradient border
- Warning (â‰¤ 30s): amber border and text
- Critical (â‰¤ 10s): red border and text

**Files:** `timer.js`, `app.js`, `ui.js`, `style.css`

---

## 7. Answer Input

**Purpose:** Capture the user's typed answer.  
**Implementation:** `<textarea id="answer-input">` with minimum height 200px.  
**Features:**
- Live word count displayed in real time via `input` event listener
- Submit button disabled when textarea is empty; enabled when text is present
- Textarea is disabled after submission (cannot edit submitted answer)

**Files:** `index.html`, `app.js`, `ui.js`, `style.css`

---

## 8. Manual Submission

**Purpose:** Allow the user to submit an answer before the timer expires.  
**Trigger:** Click "Submit Answer" button.  
**Guards:**
- Button is disabled if textarea is empty
- `if (ui.answerInput.value.trim() === "") return;` in click handler
- `state.answerSubmitted` race-condition guard prevents double-execution

**Files:** `app.js`

---

## 9. Timeout Submission

**Purpose:** Automatically submit when 60 seconds elapse.  
**Trigger:** `timer.js` calls `onTimeout()` when `remaining <= 0`.  
**Behaviour:**
- Calls `submitCurrentAnswer("timeout")` regardless of textarea content
- Empty answer is valid for timeout â€” stored as empty string, scores 0
- `state.answerSubmitted` guard still applies (prevents race with simultaneous manual click)

**Files:** `timer.js`, `app.js`

---

## 10. Race Condition Prevention

**Purpose:** Ensure an answer is submitted exactly once per question.  
**Implementation:**
- `state.answerSubmitted` is set to `false` at the start of each question
- `submitCurrentAnswer()` checks `if (state.answerSubmitted) return;` as its first line
- Then immediately sets `state.answerSubmitted = true`
- `timer.stop()` is called in the same function to halt the countdown

This ensures that even if the user clicks Submit at the exact moment the timer fires, only one submission occurs.

**Files:** `app.js`

---

## 11. Per-Question Feedback

**Purpose:** Show the user how their answer scored immediately after submission.  
**Trigger:** Called synchronously at the end of `submitCurrentAnswer()`.  
**Content displayed:**
- Numerical score (0-100) with gradient styling
- Strengths (up to 3 items)
- Missing concepts (up to 3 items)
- Improvement suggestion (1 item)
- "Why this score?" breakdown:
  - Concept Coverage %
  - Answer Quality %
  - Structure & Clarity %
  - Communication %
- Next Question button (or "View Results" for Q5)

**Files:** `app.js`, `ui.js`, `analyzer.js`, `feedback.js`

---

## 12. Question Progression

**Purpose:** Move from one question to the next.  
**Trigger:** Click "Next Question" button after feedback is shown.  
**Logic:**
```js
if (state.currentQuestionIndex < state.questions.length - 1) {
    state.currentQuestionIndex++;
    loadCurrentQuestion();
} else {
    finishInterview();
}
```
For Q5 (index 4), `finishInterview()` is called instead.

**Files:** `app.js`

---

## 13. Final Results Screen

**Purpose:** Display a complete summary of the interview session.  
**Trigger:** After Q5 feedback, user clicks "View Results".  
**Content:**
- Overall score: average of 5 `totalScore` values, rounded
- Readiness level label (one of four thresholds)
- Performance Breakdown: average Concept / Quality / Structure / Communication scores
- Strengths: category-level items that exceeded thresholds
- Areas to Improve: 1 or 2 lowest-scoring categories
- Question Review: for each Q1-Q5, shows question text, score, and key strength or missing concept

**Files:** `ui.js`, `feedback.js`, `app.js`

---

## 14. Readiness Level

**Purpose:** Provide a qualitative summary of interview preparedness.  
**Source:** `feedbackEngine.getReadinessLevel(finalScore)` in `feedback.js`.  
**Thresholds:**

| Score | Level |
|---|---|
| >= 90 | Interview Ready |
| >= 75 | Nearly Ready |
| >= 60 | Needs Practice |
| < 60 | More Preparation Needed |

**Files:** `feedback.js`, `ui.js`

---

## 15. Retry / Reset

**Purpose:** Allow the user to start a completely new interview.  
**Triggers:** "Try Again" button or "Home" button on Results screen.  
**Both call `resetApp()` which:**
- Resets `state.selectedRole`, `state.questions`, `state.currentQuestionIndex`, `state.answers`, `state.results`, `state.answerSubmitted`
- Calls `timer.stop()`
- Removes `.selected` class from role cards
- Disables Begin button
- Calls `ui.showScreen(ui.homeScreen)`

**Files:** `app.js`, `ui.js`, `timer.js`

---

## 16. Responsive Design

**Purpose:** Ensure usability across device sizes.  
**Breakpoints implemented in `style.css`:**

| Breakpoint | Rules Applied |
|---|---|
| `max-width: 900px` | Orb opacity reduced; home orb repositioned; ring and geo hidden |
| `max-width: 768px` | Feedback/results grid collapses to 1-column; timer shrinks to 80px; setup-info-strip stacks vertically |
| `max-width: 480px` | Question text reduces to 1.45rem; hero heading re-clamped |

**Files:** `style.css`

---

## 17. CSS Animations

**Purpose:** Create an AI-inspired, modern visual experience without heavy libraries.  
**Implementation:** All animations use CSS `@keyframes`.  
**Animations present:**

| Animation | Applied To | Description |
|---|---|---|
| `float-slow` | Main orbs | Gentle vertical float (12-15s) |
| `float-slower` | Small orbs | Slower float with slight scale |
| `rotate-ring` | Orbit rings | Full 360-degree rotation (20-25s) |
| `float-geo` | Geometric cube | 3D rotate + float |
| `subtle-pulse` | Timer circle, score ring | Gentle scale pulse |
| `slide-up` | Feedback card | Entry animation |
| `bg-gradient-flow` | Body background | Slow gradient shift (25s) |

**`prefers-reduced-motion`:** All animations are disabled via media query for users who prefer reduced motion.  
**Files:** `style.css`, `animations.js` (placeholder for future JS animations)



## 18. Assessment Modes & Difficulty

**Purpose:** Allow users to tailor the interview.
**Implementation:** User selects Easy, Intermediate, or Hard, and Subjective or Coding mode. Marketing role is restricted to Subjective mode only.
**Files:** `app.js`, `ui.js`


## 19. Coding Challenge Mode

**Purpose:** Evaluate technical coding skills.
**Implementation:** 5-question loop executing inside a Web Worker. Separate pools for SE (Algorithms) and DA (Data processing). Evaluates against hidden test cases and generates a Final Coding Report Card.
**Files:** `codingEngine.js`, `codingUI.js`, `codingProblems.js`


## 20. Optional AI Question Generation

**Purpose:** Generate dynamic subjective questions.
**Implementation:** Uses `questionGenerator.js` to call the Gemini API if a key is provided. Validates response and falls back to local question bank if it fails.
**Files:** `questionGenerator.js`


## 21. Weak Area Recommendations

**Purpose:** Suggest study topics based on subjective performance.
**Implementation:** `recommendationEngine.js` aggregates missing concepts and classifies them into priority areas.
**Files:** `recommendationEngine.js`
