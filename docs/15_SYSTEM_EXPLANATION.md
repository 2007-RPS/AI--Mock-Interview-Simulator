# 15 — System Explanation

> This document explains the complete system step-by-step, as if teaching someone unfamiliar with the project. It covers every significant event from page load to results display.

---

## What Happens When the User Opens the Website?

When `index.html` is opened in a browser:

1. The browser parses the HTML file
2. It finds `<link rel="stylesheet" href="css/style.css">` and loads the stylesheet
3. It finds the `<script>` tags at the bottom of `<body>` and loads JS files in order
4. The application is ready — no server calls, no loading spinner needed

---

## Step 1: HTML Structure Loads

**File:** `index.html`

The HTML file contains 4 `<section>` elements, one for each screen:

```html
<section id="screen-home"      class="screen active">  <!-- visible -->
<section id="screen-setup"     class="screen hidden">  <!-- hidden -->
<section id="screen-interview" class="screen hidden">  <!-- hidden -->
<section id="screen-results"   class="screen hidden">  <!-- hidden -->
```

All 4 screens exist in the DOM simultaneously. The `active` class makes a screen visible; `hidden` hides it. Only one screen is `active` at a time. No HTML is generated dynamically for screen structure — screens are pre-built in HTML.

---

## Step 2: CSS Loads and Applies

**File:** `css/style.css`

The CSS file defines:
- The colour palette as custom properties (CSS variables)
- The `.screen.active` and `.screen.hidden` display rules
- All component styles (buttons, cards, timer, textarea, feedback)
- All decorative animations (floating orbs, rotating rings)
- Responsive breakpoints at 900px, 768px, and 480px

After CSS loads, the Home screen is visually complete and the decorative animations begin running.

---

## Step 3: JavaScript Modules Load

**Load order:**
```
animations.js  → defines: (comment block only)
questions.js   → defines: const questionBank = { ... }
analyzer.js    → defines: const analyzer = { ... }
feedback.js    → defines: const feedbackEngine = { ... }
timer.js       → defines: const timer = { ... }
ui.js          → defines: const ui = { ... }  (DOM refs cached here)
app.js         → defines: const state = { ... }  +  all event listeners
```

Each file runs immediately when loaded. By the time `app.js` executes, all other constants are available in the global scope.

---

## Step 4: Application State Initializes

**File:** `app.js`

```js
const state = {
    selectedRole: null,          // which role was chosen
    questions: [],               // the 5 questions for this session
    currentQuestionIndex: 0,     // which question we are on (0-4)
    answers: [],                 // raw answer strings submitted
    results: [],                 // analysis objects from analyzer
    answerSubmitted: false       // race-condition guard
};
```

This object is the application's memory. Everything the app needs to know about the current session lives here.

All event listeners are registered:
- `btn-start` click → go to Setup
- Each `.role-card` click → set selectedRole
- `btn-begin-interview` click → start interview
- `answer-input` input → update word count, toggle submit
- `btn-submit-answer` click → submit manually
- `btn-next-question` click → next question or results
- `btn-retry` / `btn-home` click → reset

---

## Step 5: User Selects a Role

**File:** `app.js`, **UI:** `index.html`, **Styles:** `style.css`

The user clicks a role card (e.g. "Software Engineer").

```
Click event fires
    |
    v
state.selectedRole = btn.getAttribute("data-role")
    → state.selectedRole = "Software Engineer"
    |
    v
ui.selectRoleCard(btn)
    → removes .selected from all cards
    → adds .selected to clicked card (shows violet border + checkmark)
    → btnBegin.disabled = false
```

**Data moved:** `"Software Engineer"` → `state.selectedRole`

---

## Step 6: Interview Starts — Question Data Selected

**File:** `app.js` — `startInterview()`

The user clicks "Start Interview".

```js
state.questions = questionBank["Software Engineer"].slice(0, 5);
// state.questions now holds exactly 5 SE question objects
state.currentQuestionIndex = 0;
state.answers = [];
state.results = [];
```

`questionBank["Software Engineer"]` returns the array of 5 SE question objects from `questions.js`. `.slice(0, 5)` copies them into `state.questions`.

**Data moved:** `questionBank["Software Engineer"]` → `state.questions`

Then:
```js
ui.showScreen(ui.interviewScreen);
loadCurrentQuestion();
```

---

## Step 7: Question Is Rendered

**File:** `app.js` — `loadCurrentQuestion()`, then `ui.js` — `renderQuestion()`

```js
// app.js
state.answerSubmitted = false;             // reset guard
const q = state.questions[0];              // first question
ui.renderQuestion(q, 0, 5);               // render it
ui.btnSubmit.disabled = true;              // submit starts disabled
timer.start(60, tickCallback, timeoutCallback);
```

```js
// ui.js — renderQuestion()
roleLabel.textContent = "Software Engineer";
questionTracker.textContent = "Question 1/5";
questionText.textContent = q.question;     // the actual question string
// progress bar: step[0] gets .active
answerInput.value = "";                    // clear any previous text
feedbackContainer.classList.add("hidden"); // hide previous feedback
timerText.textContent = "60s";
```

**Data moved:** `state.questions[0]` → DOM text elements

---

## Step 8: Timer Starts

**File:** `timer.js` — `start(60, tickCallback, timeoutCallback)`

```js
this.stop();                    // clear any previous interval (safety)
this.remaining = 60;
if (this.onTick) this.onTick(60);   // show 60s immediately

this.interval = setInterval(() => {
    this.remaining--;
    this.onTick(this.remaining);     // ui.updateTimer(sec) called each second
    if (this.remaining <= 0) {
        this.stop();
        this.onTimeout();            // submitCurrentAnswer("timeout")
    }
}, 1000);
```

Every second, `ui.updateTimer(sec)` updates the circle:
- `timerText.textContent = sec + "s"`
- `timerCircle.className = "timer-circle warning"` (at ≤30)
- `timerCircle.className = "timer-circle critical"` (at ≤10)

---

## Step 9: Answer Is Captured

**File:** `app.js` — `input` event listener on `#answer-input`

As the user types:
```js
const count = analyzer.countWords(e.target.value);
ui.updateWordCount(count);     // shows "12 words"
btnSubmit.disabled = (text.trim() === "");
```

The answer is not stored yet — it lives only in the textarea until submitted.

---

## Step 10: Answer Is Submitted and Analyzed

**File:** `app.js` — `submitCurrentAnswer()`
**File:** `analyzer.js` — `analyzeAnswer()`

On manual submit or timeout:
```js
if (state.answerSubmitted) return;     // guard
state.answerSubmitted = true;
timer.stop();

const answerText = ui.answerInput.value;
state.answers.push(answerText);         // store raw answer

const question = state.questions[state.currentQuestionIndex];
const analysis = analyzer.analyzeAnswer(answerText, question);
```

Inside `analyzer.analyzeAnswer()`:
```
1. normalizeText(answerText) → "the dom is a tree structure..."
2. countWords() → 38
3. matchConcepts() → conceptScore=100, matchedConcepts=[...], missingConcepts=[]
4. calculateLengthScore(38, {min:30,max:80}) → qualityScore=100
5. analyzeStructure() → structureScore=67 (2/3 signals found)
6. analyzeCommunication() → fillerCount=0, communicationScore=100
7. finalScore = (100*0.45)+(100*0.25)+(67*0.20)+(100*0.10)
              = 45 + 25 + 13.4 + 10 = 93.4 → rounded to 93
```

**Data moved:** `answerText` + `question` → `analysis` object

---

## Step 11: Score and Feedback Are Generated

**File:** `feedback.js` — `generateFeedback()`

```js
const feedbackStrs = feedbackEngine.generateFeedback(analysis, question);
```

Based on `analysis`:
- `conceptScore = 100` → strength: "Excellent coverage of the core concepts."
- `qualityScore = 100` → strength: "Appropriate level of detail."
- `missingConcepts = []` → missing: "No major concepts were missing."
- All scores acceptable → suggestion: "Great answer!"

**Data moved:** `analysis` + `question` → `feedbackStrs` object with `{ strengths[], missing[], suggestions[] }`

---

## Step 12: Result Is Stored

**File:** `app.js`

```js
state.results.push(analysis);
```

`state.results[0]` now holds the full analysis object for Q1. After 5 questions, `state.results` will have 5 analysis objects.

---

## Step 13: Feedback Is Displayed

**File:** `ui.js` — `showFeedback(analysis, feedbackStrs, isLast)`

```js
scoreValue.textContent = analysis.totalScore;          // "93"
feedbackStrengths.innerHTML = "";                       // clear old
feedbackStrs.strengths.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;                                 // safe — textContent
    feedbackStrengths.appendChild(li);
});
breakdownConcept.textContent = `${analysis.conceptScore}%`;   // "100%"
// ... similar for quality, structure, communication
btnNext.innerHTML = isLast ? "View Results →" : "Next Question →";
feedbackContainer.classList.remove("hidden");           // show the card
```

---

## Step 14: Next Question (Q2–Q5)

**File:** `app.js` — `btnNext` click listener

```js
if (state.currentQuestionIndex < 4) {
    state.currentQuestionIndex++;
    loadCurrentQuestion();       // repeats Steps 7–13
} else {
    finishInterview();
}
```

For Q2–Q5, the same cycle repeats: render question → start timer → capture answer → analyze → store → show feedback.

---

## Step 15: Final Score Aggregation

**File:** `ui.js` — `renderResults(state.results, state.questions)`

After Q5 and clicking "View Results":

```js
let totalScore = 0;
resultsArray.forEach(res => { totalScore += res.totalScore; });
const finalScore = Math.round(totalScore / 5);    // average

const avgConcept   = Math.round(sum of conceptScore / 5);
const avgQuality   = Math.round(sum of qualityScore / 5);
const avgStructure = Math.round(sum of structureScore / 5);
const avgComm      = Math.round(sum of communicationScore / 5);
```

**Data moved:** 5 × `analysis.totalScore` → `finalScore` (single number)

---

## Step 16: Readiness Level

**File:** `feedback.js` — `getReadinessLevel(finalScore)`

```js
if (finalScore >= 90) return "Interview Ready";
if (finalScore >= 75) return "Nearly Ready";
if (finalScore >= 60) return "Needs Practice";
return "More Preparation Needed";
```

Displayed as a large label on the Results screen.

---

## Step 17: Retry / Reset

**File:** `app.js` — `resetApp()`

All state properties are reset to their initial values. The timer is stopped. Role card selection is cleared. The Begin button is disabled again. The Home screen is shown.

The application returns to exactly the same state it was in at page load — except no page reload occurs. This is the SPA (Single-Page Application) pattern.

---

## Complete Data Flow Summary

```
questions.js
  questionBank["Software Engineer"][0..4]
         |
         v
app.js: state.questions
         |
         v
User types in textarea
         |
         v
timer.js: 60s countdown
         |
         v  (on submit or timeout)
analyzer.analyzeAnswer(answerText, question)
         |
         v
  { conceptScore, qualityScore, structureScore,
    communicationScore, totalScore,
    matchedConcepts, missingConcepts, fillerCount }
         |
         v
feedbackEngine.generateFeedback(analysis, question)
         |
         v
  { strengths[], missing[], suggestions[] }
         |
         v
ui.showFeedback(analysis, feedbackStrs, isLast)
         |
         v
state.results.push(analysis)   [x5]
         |
         v
ui.renderResults(state.results, state.questions)
         |
         v
Results screen: finalScore, readiness, categories, Q-review
```
