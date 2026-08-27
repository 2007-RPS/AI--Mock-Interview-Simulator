# 05 — Application Flow

## Overview

This document describes the complete runtime flow of the AI-Style Mock Interview Simulator from page load to results display and reset.

---

## 1. Startup (Page Load)

When `index.html` opens in the browser:

1. CSS (`style.css`) loads and applies all styles
2. JS files load in order: `animations.js` → `questions.js` → `analyzer.js` → `feedback.js` → `timer.js` → `ui.js` → `app.js`
3. Each JS file defines a module object (`questionBank`, `analyzer`, `feedbackEngine`, `timer`, `ui`) as top-level constants
4. `ui.js` initializes all DOM element references (cached at load time)
5. `app.js` defines `const state = {...}` and registers all event listeners
6. The Home screen is visible (`class="screen active"`); all other screens have `class="screen hidden"`

**No data is loaded from a server. No API calls are made. No localStorage is read.**

---

## 2. Role Selection

```
User clicks role card (e.g. "Software Engineer")
    |
    v
app.js: card.addEventListener("click") fires
    |
    v
state.selectedRole = btn.getAttribute("data-role")  // "Software Engineer"
    |
    v
ui.selectRoleCard(btn)
    - removes .selected from all cards
    - adds .selected to clicked card
    - enables btnBegin (removes disabled)
```

`state.selectedRole` now holds the role string. The Begin button is enabled.

---

## 3. Interview Start

```
User clicks "Start Interview"
    |
    v
app.js: btnBegin.addEventListener("click") fires
    |
    v
if (!state.selectedRole) return;   // guard
    |
    v
startInterview()
    - state.questions = questionBank[state.selectedRole].slice(0, 5)
    - state.currentQuestionIndex = 0
    - state.answers = []
    - state.results = []
    - ui.showScreen(ui.interviewScreen)
    - loadCurrentQuestion()
```

`state.questions` now contains exactly 5 question objects for the selected role.

---

## 4. Question Rendering

```
loadCurrentQuestion()
    |
    v
state.answerSubmitted = false          // reset guard for this question
    |
    v
const q = state.questions[state.currentQuestionIndex]
    |
    v
ui.renderQuestion(q, index, total)
    - roleLabel.textContent = q.role
    - questionTracker.textContent = "Question N/5"
    - questionText.textContent = q.question
    - progress bar steps updated (completed / active)
    - answerInput.value = ""
    - answerInput.disabled = false
    - wordCountDisplay.textContent = "0 words"
    - feedbackContainer.classList.add("hidden")
    - timerCircle.className = "timer-circle"
    - timerText.textContent = "60s"
    |
    v
ui.btnSubmit.disabled = true           // starts disabled until user types
    |
    v
timer.start(60, tickCallback, timeoutCallback)
    - calls stop() to clear any previous interval
    - sets remaining = 60
    - calls tickCallback(60) immediately (initial display)
    - starts setInterval every 1000ms
```

---

## 5. Answer Input

```
User types in textarea
    |
    v
app.js: answerInput.addEventListener("input") fires
    |
    v
const count = analyzer.countWords(e.target.value)
ui.updateWordCount(count)    // updates "N words" display
    |
    v
if (text.trim() === "") btnSubmit.disabled = true
else                        btnSubmit.disabled = false
```

The submit button only becomes active when the textarea contains non-whitespace text.

---

## 6. Timer Countdown

Every 1000ms inside `timer.js`:

```
setInterval callback fires
    |
    v
this.remaining--
    |
    v
this.onTick(this.remaining)   // ui.updateTimer(sec)
    - updates timerText.textContent
    - sets timerCircle class:
        remaining <= 10  →  "timer-circle critical"  (red)
        remaining <= 30  →  "timer-circle warning"   (amber)
        remaining > 30   →  "timer-circle"            (normal)
    |
    v
if (remaining <= 0)
    this.stop()              // clears interval
    this.onTimeout()         // submitCurrentAnswer("timeout")
```

---

## 7. Submission — Manual

```
User clicks "Submit Answer"
    |
    v
btnSubmit.addEventListener("click") fires
    |
    v
if (ui.answerInput.value.trim() === "") return;   // guard
    |
    v
submitCurrentAnswer("manual")
```

## 8. Submission — Timeout

```
timer.js: remaining reaches 0
    |
    v
timer.stop() called internally
    |
    v
onTimeout() fires  →  submitCurrentAnswer("timeout")
    (no empty-answer check — timeout submits regardless)
```

## 9. submitCurrentAnswer() — Core Submission Logic

```
submitCurrentAnswer(reason)
    |
    v
if (state.answerSubmitted) return;    // RACE CONDITION GUARD
state.answerSubmitted = true;
    |
    v
timer.stop();                          // halt countdown immediately
    |
    v
const answerText = ui.answerInput.value;
const question = state.questions[state.currentQuestionIndex];
state.answers.push(answerText);        // store raw answer in order
    |
    v
const analysis = analyzer.analyzeAnswer(answerText, question);
    // Returns: { isEmpty, wordCount, conceptScore, qualityScore,
    //   structureScore, communicationScore, matchedConcepts,
    //   missingConcepts, fillerCount, score, totalScore }
    |
    v
const feedbackStrs = feedbackEngine.generateFeedback(analysis, question);
    // Returns: { strengths[], missing[], suggestions[] }
    |
    v
state.results.push(analysis);
    |
    v
const isLast = (currentQuestionIndex === questions.length - 1);
ui.showFeedback(analysis, feedbackStrs, isLast);
```

---

## 10. Question Progression

```
User clicks "Next Question" (or "View Results" on Q5)
    |
    v
btnNext.addEventListener("click") fires
    |
    v
if (currentQuestionIndex < questions.length - 1)
    currentQuestionIndex++
    loadCurrentQuestion()          // go to next question
else
    finishInterview()              // last question done
```

---

## 11. Final Results

```
finishInterview()
    |
    v
ui.renderResults(state.results, state.questions)
    - computes average of all 5 totalScore values
    - computes average of conceptScore, qualityScore, structureScore, communicationScore
    - calls feedbackEngine.getReadinessLevel(finalScore)
    - populates: overall score, readiness label, category breakdown
    - builds strengths list from category averages vs thresholds
    - builds improvements list (sorted by lowest score)
    - builds Q1-Q5 review cards
    |
    v
ui.showScreen(ui.resultsScreen)
```

---

## 12. Retry / Reset

```
User clicks "Try Again" or "Home"
    |
    v
resetApp()
    - state.selectedRole = null
    - state.questions = []
    - state.currentQuestionIndex = 0
    - state.answers = []
    - state.results = []
    - state.answerSubmitted = false
    - timer.stop()
    - role cards: remove .selected
    - btnBegin.disabled = true
    - ui.showScreen(ui.homeScreen)
```

The application returns to the Home screen with a completely clean state. No data persists.

---

## Flow Diagram

```
[Home]
   |
   | click Start
   v
[Setup] -- select role + click Start
   |
   v
[Interview: Q1]
   |-- 60s timer starts
   |-- user types
   |-- submit (manual OR timeout)
   |
   v
[Feedback: Q1] -- click Next
   |
   v
[Interview: Q2] ... [Interview: Q5]
   |
   v
[Feedback: Q5] -- click View Results
   |
   v
[Results]
   |-- Try Again --> [Home] (full reset)
   |-- Home -------> [Home] (full reset)
```
