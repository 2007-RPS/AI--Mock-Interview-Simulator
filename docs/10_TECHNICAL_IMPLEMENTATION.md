# 10 — Technical Implementation

This document explains the core JavaScript concepts demonstrated in the project, where each is used, and why.

---

## 1. Variables and State Management

**Concept:** `const` and `let`; plain objects for centralized state

**Where used:** `app.js`

```js
const state = {
    selectedRole: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    results: [],
    answerSubmitted: false
};
```

`const` is used for the state object reference (reference never reassigns; properties mutate). All 6 properties represent the complete runtime memory. No global variables are scattered — everything lives in `state`.

---

## 2. Functions

**Concept:** Named functions for reusable logic; methods on objects for modular behavior

**Where used:** `app.js`, `analyzer.js`, `feedback.js`, `timer.js`, `ui.js`

Named functions in `app.js`:
- `startInterview()` — initializes a session
- `loadCurrentQuestion()` — prepares and renders a question
- `submitCurrentAnswer(reason)` — handles submission (manual or timeout)
- `finishInterview()` — transitions to the results screen
- `resetApp()` — clears all state and returns to Home

Module method pattern (`analyzer.js`):
```js
const analyzer = {
    normalizeText(text) { ... },
    countWords(text) { ... },
    analyzeAnswer(answer, question) { ... }
};
```

---

## 3. Arrow Functions

**Concept:** Concise function syntax; does not create its own `this`

**Where used:** Throughout — event listeners, `.forEach()`, `.map()`, timer callbacks

```js
ui.roleCards.forEach(card => {
    card.addEventListener("click", (e) => {
        state.selectedRole = e.currentTarget.getAttribute("data-role");
    });
});
```

---

## 4. Event Listeners

**Concept:** `addEventListener` for decoupled event handling

**Where used:** `app.js`

| Event | Target | Action |
|---|---|---|
| `click` | `#btn-start` | Go to Setup screen |
| `click` | `.role-card` (each) | Set selected role |
| `click` | `#btn-begin-interview` | Start interview |
| `input` | `#answer-input` | Update word count; toggle submit button |
| `click` | `#btn-submit-answer` | Manual submission |
| `click` | `#btn-next-question` | Advance to next question or finish |
| `click` | `#btn-retry` | Reset app |
| `click` | `#btn-home` | Reset app |

All listeners use `addEventListener`. No `onclick` attributes appear in the HTML.

---

## 5. Timer — setInterval and clearInterval

**Concept:** Recurring callbacks; cleanup to prevent leaks

**Where used:** `timer.js`

```js
this.interval = setInterval(() => {
    this.remaining--;
    if (this.onTick) this.onTick(this.remaining);
    if (this.remaining <= 0) {
        this.stop();
        if (this.onTimeout) this.onTimeout();
    }
}, 1000);
```

```js
stop() {
    if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
    }
}
```

Storing the interval ID in `this.interval` and clearing it prevents memory leaks and duplicate timers. Setting `null` after clearing allows safe re-checking.

---

## 6. DOM Manipulation

**Concept:** Reading and writing the DOM without page reloads

**Where used:** `ui.js` exclusively

| API | Usage |
|---|---|
| `document.getElementById(id)` | Cache element references at startup |
| `document.querySelector(selector)` | Cache complex selectors |
| `document.querySelectorAll(selector)` | NodeLists (role cards, progress steps) |
| `element.textContent = value` | Safe text update — never innerHTML for user data |
| `document.createElement(tag)` | Create new elements dynamically |
| `element.appendChild(child)` | Add elements to the DOM |
| `element.classList.add/remove/contains` | Toggle CSS classes for state changes |
| `element.style.property = value` | Dynamic color in result score cards |

All DOM references are cached at startup in `ui.js` for performance.

---

## 7. Arrays and Array Methods

**Concept:** Ordered data storage; functional transformation methods

| Method | Where | What it does |
|---|---|---|
| `.push()` | `app.js` | Appends each answer and result to state arrays |
| `.forEach()` | `app.js`, `ui.js`, `analyzer.js` | Iterates over questions, results, concepts, keywords |
| `.map()` | `analyzer.js`, `feedback.js` | Transforms concept arrays to name arrays |
| `.some()` | `analyzer.js` | Checks if any keyword matches in concept |
| `.sort()` | `ui.js` | Sorts improvement areas by lowest score |
| `.slice()` | `app.js`, `feedback.js` | Takes first N elements without mutating original |
| `.join()` | `feedback.js`, `ui.js` | Converts matched/missing arrays to display strings |

---

## 8. String Methods

**Concept:** Text manipulation for normalization and comparison

**Where used:** `analyzer.js`

| Method | Usage |
|---|---|
| `.toLowerCase()` | Normalize text for case-insensitive keyword matching |
| `.trim()` | Remove leading/trailing whitespace |
| `.replace(regex, replacement)` | Strip punctuation; collapse multiple spaces |
| `.split(" ")` | Split normalized text into word array for counting |
| `.join(" ")` | Reconstruct phrases for 4-gram analysis |

---

## 9. Regular Expressions

**Concept:** Pattern matching for precise text analysis

**Where used:** `analyzer.js`

```js
// Word-boundary keyword matching
const regex = new RegExp(`\\b${keyword}\\b`);
regex.test(normalizedText);

// Global filler word count
const regex = new RegExp(`\\b${filler}\\b`, 'g');
const matches = normalizedText.match(regex);
```

`\b` (word boundary) ensures "um" matches only the standalone word, not the substring in "umbrella". The `g` flag counts all occurrences in the string.

---

## 10. Conditional Logic

**Concept:** `if/else` chains for rule-based, transparent decisions

**Where used:** `analyzer.js`, `feedback.js`, `app.js`, `ui.js`

Length band scoring example:
```js
if (wordCount >= min && wordCount <= max) return 100;  // ideal
if (wordCount < min / 2) return 25;                    // very short
if (wordCount < min) return 50;                        // below ideal
if (wordCount > max && wordCount <= max + band) return 75; // slightly over
return 50;                                             // too long
```

Every scoring decision is an explicit, readable rule — this is what makes the evaluation explainable.

---

## 11. Objects as Modules

**Concept:** Plain JavaScript objects with methods as the module pattern

The project uses plain `<script>` tags (no ES Modules, no bundler). Each file defines a `const` object with methods, providing namespacing and encapsulation:

```js
// questions.js
const questionBank = { "Software Engineer": [...], ... };

// analyzer.js
const analyzer = { normalizeText() {}, analyzeAnswer() {}, ... };

// Used in app.js:
analyzer.analyzeAnswer(text, question);
```

---

## 12. Screen Management

**Concept:** CSS class toggling for SPA screen transitions

**Where used:** `ui.showScreen()`

```js
showScreen(screenElement) {
    [homeScreen, setupScreen, interviewScreen, resultsScreen].forEach(s => {
        s.classList.remove("active");
        s.classList.add("hidden");
    });
    screenElement.classList.remove("hidden");
    setTimeout(() => {
        screenElement.classList.add("active");
    }, 50);
}
```

All 4 screens exist in the DOM simultaneously. The 50ms `setTimeout` allows `display:block` (from removing `hidden`) to apply before the opacity transition begins — a common CSS transition pattern.

---

## 13. Closures and Callbacks

**Concept:** Functions capturing enclosing scope; passed as arguments

**Where used:** `app.js` → `timer.js`

```js
timer.start(
    60,
    (sec) => ui.updateTimer(sec),           // tickCallback
    () => submitCurrentAnswer("timeout")    // timeoutCallback
);
```

The callbacks capture `ui` and `submitCurrentAnswer` from `app.js`'s scope. The `timer` module has no direct dependency on `ui` or `app.js` — it only manages time and calls whatever callbacks it was given. This is the callback pattern for decoupling.

---

## 14. setTimeout

**Concept:** One-shot delayed execution

**Where used:** `ui.showScreen()` (50ms delay for CSS transition), `ui.renderResults()` (scroll after render)

```js
setTimeout(() => {
    screenElement.classList.add("active");
}, 50);
```

Unlike `setInterval` (which repeats), `setTimeout` fires once after the specified delay.
