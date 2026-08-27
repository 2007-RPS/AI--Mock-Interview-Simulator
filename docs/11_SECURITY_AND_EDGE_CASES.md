# 11 — Security and Edge Cases

## Overview

This document covers the security considerations, edge cases handled, and the decisions made to ensure safe and predictable application behavior.

---

## DOM Safety — XSS Prevention

### The Risk

Cross-Site Scripting (XSS) occurs when user-controlled text is injected into the DOM as HTML. If a user types `<script>alert(1)</script>` as an answer and that string is rendered via `innerHTML`, the script executes.

### How the Project Prevents XSS

**User input (textarea content) is NEVER passed to `innerHTML`.** The data flow is:

```
ui.answerInput.value
    → state.answers.push(answerText)
    → analyzer.analyzeAnswer(answerText, question)
    → feedbackEngine.generateFeedback(analysis, question)
    → ui.showFeedback(analysis, feedbackStrs, isLast)
```

At no point is `answerText` rendered as HTML. All user-visible content is set with `textContent` or `createTextNode()`.

### innerHTML Usage Audit (Final State After Audit Fix)

| Location | Content | User Input? | Risk |
|---|---|---|---|
| `feedbackStrengths.innerHTML = ""` | Clears element | No | None |
| `feedbackMissing.innerHTML = ""` | Clears element | No | None |
| `resStrengths.innerHTML = ""` | Clears element | No | None |
| `resImprovements.innerHTML = ""` | Clears element | No | None |
| `resQuestionReview.innerHTML = ""` | Clears element | No | None |
| `btnNext.innerHTML = "Next Question →"` | Static string | No | None |
| Q-review Strength/Missing label | Uses createElement + textContent | No | None |

The audit fix (M1) replaced the two `innerHTML` template literals in the question review cards with `createElement("strong")` + `createTextNode()`. This ensures future safety even if data sources change.

### Safe Pattern Used Throughout

```js
// SAFE — used in feedback lists
const li = document.createElement("li");
li.textContent = feedbackString;   // feedbackString is from static templates
parent.appendChild(li);

// SAFE — used in question review
const label = document.createElement("strong");
label.textContent = "Strength: ";
const detail = document.createTextNode(conceptText);  // from static questions.js
feedback.appendChild(label);
feedback.appendChild(detail);
```

---

## Race Condition — Double Submission Prevention

### The Problem

If a user clicks "Submit" at the exact millisecond the timer fires, two calls to `submitCurrentAnswer()` could occur simultaneously — storing two answers for the same question and corrupting the results array.

### The Solution

```js
function submitCurrentAnswer(reason) {
    if (state.answerSubmitted) return;   // GUARD: exit immediately if already submitted
    state.answerSubmitted = true;         // Set flag before any async operations
    timer.stop();                          // Halt timer immediately
    ...
}
```

- `state.answerSubmitted` is set to `false` at the start of `loadCurrentQuestion()`
- The first caller (manual or timeout) sets it to `true` and proceeds
- Any subsequent caller returns immediately
- JavaScript is single-threaded — there is no actual race between the guard check and the assignment

---

## Empty Answer Handling

### Manual Submission

Manual submission of an empty answer is prevented at two levels:

1. **Button state:** Submit button is disabled (`disabled` attribute) when textarea is empty. The `input` event listener checks `text.trim() === ""` and sets `btnSubmit.disabled = true`.
2. **Click guard:** `if (ui.answerInput.value.trim() === "") return;` in the click handler.

### Timeout Submission (Empty Allowed)

When the timer expires, the answer is submitted regardless of content:

```js
const answerText = ui.answerInput.value;  // may be ""
state.answers.push(answerText);            // empty string stored
const analysis = analyzer.analyzeAnswer(answerText, question);
```

Inside `analyzeAnswer()`, an empty-string trigger activates the hard override:
```js
if (isEmpty || wordCount === 0) {
    return { ..., score: 0, totalScore: 0 };
}
```

Result: timeout with empty answer stores `""`, produces score 0, interview continues. No crash, no skip.

---

## Long Answers

Very long answers (200+ words) are scored 50 on Answer Quality ("Too long" band). Concept matching and structure detection still run normally. There is no crash, no truncation, and no character limit enforced in the textarea.

---

## Special Characters in Answers

All answer text passes through `normalizeText()` which strips punctuation before keyword matching:

```js
.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
```

This means:
- `"DOM manipulation."` → `"dom manipulation"` → keyword "manipulation" matches correctly
- Special characters cannot inject into regex patterns because keywords come from `questions.js` (static data), not user input. User text is the target of regex tests, not the pattern itself.

---

## Page Refresh

Refreshing the browser discards the entire session. This is intentional:
- No `localStorage` or `sessionStorage` is used
- No session restoration on load
- Refreshing returns to the Home screen (index.html initial state)

This is documented as a known limitation, not a bug.

---

## Retry / Full Reset

`resetApp()` clears every state property:
```js
state.selectedRole = null;
state.questions = [];
state.currentQuestionIndex = 0;
state.answers = [];
state.results = [];
state.answerSubmitted = false;
timer.stop();
```

After reset, the application is in the same state as a fresh page load. A completely new interview can begin.

---

## Timer Cleanup

The timer is stopped in three situations:
1. Manual submission (`submitCurrentAnswer()` calls `timer.stop()`)
2. Timeout (timer stops itself before firing the callback)
3. Reset (`resetApp()` calls `timer.stop()`)

`timer.stop()` is idempotent — calling it when no interval is running does nothing:
```js
stop() {
    if (this.interval) {          // safe null check
        clearInterval(this.interval);
        this.interval = null;
    }
}
```

---

## Duplicate Submission

Covered by the `state.answerSubmitted` guard (see Race Condition section). Additionally, after submission:
- The textarea is disabled (`answerInput.disabled = true`)
- The submit button is disabled (`btnSubmit.disabled = true`)
- These visual/interaction guards reinforce the logical guard

---

## Score Bounds

All scores are mathematically bounded:

| Score | Bounding Method |
|---|---|
| `conceptScore` | `(score/maxScore)*100` where 0 ≤ score ≤ maxScore → always 0–100 |
| `qualityScore` | Returns fixed values {0, 25, 50, 75, 100} only |
| `structureScore` | `(detected/expected)*100` → always 0–100 |
| `communicationScore` | `Math.max(0, Math.min(100, 100 - penalties))` |
| `finalScore` | `Math.max(0, Math.min(100, Math.round(weighted sum)))` |

No `NaN`, no `Infinity`, no negative scores, no scores above 100 are possible.

---

## Audit Status

A full independent code audit was completed before documentation. The audit found:
- **0 CRITICAL issues**
- **0 HIGH issues**
- **2 MEDIUM issues** (both fixed during audit)
- **3 LOW issues** (2 fixed; 1 not applicable — Google Fonts CDN)

The project was marked **READY FOR TESTING** by the audit.
