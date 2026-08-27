# 03 â€” System Architecture

## Overview

The AI-Style Mock Interview Simulator is a single-page application (SPA) built entirely with client-side technologies. There is no server, no build process, and no external runtime dependencies. All modules are plain JavaScript objects loaded via `<script>` tags in a specific dependency order.

## High-Level Architecture

```
+----------------------------------------------------------+
|                     index.html                           |
|  (4 screen sections: Home, Setup, Interview, Results)    |
+---------------------------+------------------------------+
                            |
              +-------------+-------------+
              |                           |
    +---------+--------+       +----------+---------+
    |  css/style.css   |       |  js/ modules       |
    |  (all visual     |       |  (all logic)       |
    |   styles + anim) |       +--------------------+
    +------------------+
```

## Module Dependency Order (load order in index.html)

```
animations.js   (no dependencies)
    |
questions.js    (no dependencies - defines questionBank)
    |
analyzer.js     (no dependencies - defines analyzer)
    |
feedback.js     (no dependencies - defines feedbackEngine)
    |
timer.js        (no dependencies - defines timer)
    |
ui.js           (depends on feedbackEngine)
    |
app.js          (depends on all above: ui, analyzer, feedbackEngine, timer, questionBank)
```

## Layer Descriptions

### Frontend Layer

**`index.html`**
- Single HTML document containing all 4 screen sections
- Screens: `#screen-home`, `#screen-setup`, `#screen-interview`, `#screen-results`
- All screens are present in DOM at load time; visibility controlled by `active`/`hidden` CSS classes
- Contains all static markup; no templating engine used
- Loads all CSS and JS files at the bottom of `<body>`

**`css/style.css`**
- All visual styles in one file (929 lines)
- Uses CSS custom properties (variables) for the colour palette and spacing
- Screen transitions via opacity + translateY animation
- Decorative 3D effects (orbs, rings, geo shapes) implemented with pure CSS
- Responsive design via `@media` queries at 900px, 768px, and 480px
- `prefers-reduced-motion` support to disable all animations for accessibility

### Data Layer

**`js/questions.js`**
- Defines `const questionBank` â€” a plain JavaScript object
- Three top-level keys: `"Software Engineer"`, `"Data Analyst"`, `"Marketing"`
- Each key maps to an array of exactly 5 question objects
- Each question object contains: `id`, `role`, `question`, `concepts[]`, `idealLength`, `structure[]`, and optionally `tip`
- This file has no logic â€” it is pure static data

### Application Layer

**`js/app.js`**
- Defines and owns the central application state object:
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
- Registers all DOM event listeners (click, input)
- Contains the core flow functions: `startInterview`, `loadCurrentQuestion`, `submitCurrentAnswer`, `finishInterview`, `resetApp`
- Orchestrates all other modules but does not perform DOM manipulation or scoring directly

### Timer Layer

**`js/timer.js`**
- Defines `const timer` â€” a plain JavaScript object
- Encapsulates the `setInterval` countdown
- Public API: `start(durationSeconds, tickCallback, timeoutCallback)`, `stop()`, `reset()`
- Guarantees no duplicate intervals: `stop()` is always called before any new `start()`
- Passes control back to `app.js` via callbacks (does not touch DOM directly)

### Evaluation Layer

**`js/analyzer.js`**
- Defines `const analyzer` â€” a plain JavaScript object
- Contains all scoring logic
- Methods:
  - `normalizeText(text)` â€” lowercase, trim, strip punctuation, collapse spaces
  - `countWords(text)` â€” returns word count (0 for empty)
  - `matchConcepts(normalizedText, concepts)` â€” keyword matching with weighted scoring
  - `calculateLengthScore(wordCount, idealLength)` â€” 5-band length scoring
  - `analyzeStructure(normalizedText, expectedStructure)` â€” signal-word detection
  - `analyzeCommunication(normalizedText, wordCount, conceptScore)` â€” filler/repetition detection
  - `analyzeAnswer(answer, question)` â€” master method that calls all above and returns complete result object
- No DOM access, no external calls â€” pure computation

### Feedback Layer

**`js/feedback.js`**
- Defines `const feedbackEngine` â€” a plain JavaScript object
- Methods:
  - `generateFeedback(analysis, question)` â€” takes analyzer output, returns `{ strengths[], missing[], suggestions[] }`
  - `getReadinessLevel(score)` â€” returns one of four readiness strings based on score thresholds
- No DOM access â€” returns plain data structures

### UI Layer

**`js/ui.js`**
- Defines `const ui` â€” a plain JavaScript object
- Caches all DOM element references at initialization
- Methods:
  - `showScreen(screenElement)` â€” handles screen transitions
  - `selectRoleCard(card)` â€” updates role card selected state
  - `renderQuestion(questionObj, index, total)` â€” populates question screen
  - `updateTimer(seconds)` â€” updates timer circle text and CSS class
  - `updateWordCount(count)` â€” updates word count display
  - `showFeedback(analysis, feedbackStrs, isLast)` â€” renders per-question feedback card
  - `renderResults(resultsArray, questionsArray)` â€” builds entire results screen
  - `addListItem(parent, text, symbol, color)` â€” safe DOM helper for list items
- All user-visible content set via `textContent` or `createElement`/`appendChild`
- NEVER uses `innerHTML` with user-controlled data

### Animation Layer

**`js/animations.js`**
- Currently an architectural placeholder (contains only a JSDoc comment)
- All decorative animations (floating orbs, rotating rings, timer pulse, feedback slide-up) are implemented in `css/style.css` using `@keyframes`
- Reserved for future JavaScript-driven animation logic (e.g., score counter roll-up)

## Why Modular Architecture?

1. **Separation of concerns** â€” each module does exactly one thing
2. **Testability** â€” each module can be inspected and reasoned about independently
3. **Maintainability** â€” changes to scoring do not affect UI; changes to UI do not affect scoring
4. **Explainability** â€” every module and its responsibility can be described in one sentence
5. **Assignment requirements** â€” demonstrates reusable functions and modular code

## Data Flow Summary

```
questions.js          (static data)
    |
    v
app.js                (state.questions = questionBank[role].slice(0,5))
    |
    v
User types answer     (ui.answerInput.value)
    |
    v
timer.js              (60s countdown; onTimeout triggers submission)
    |
    v
analyzer.analyzeAnswer(answerText, question)
    |
    v
feedbackEngine.generateFeedback(analysis, question)
    |
    v
ui.showFeedback(analysis, feedbackStrs, isLast)
    |
    v
state.results.push(analysis)
    |
    v
ui.renderResults(state.results, state.questions)
    |
    v
Results screen displayed
```

