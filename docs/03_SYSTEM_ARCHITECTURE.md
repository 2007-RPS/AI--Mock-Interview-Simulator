# 03 — System Architecture

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
animations.js   
questions.js            (Static subjective question bank)
questionGenerator.js    (Optional Gemini API integration)
analyzer.js             (Deterministic evaluation engine)
recommendationEngine.js (Weak area diagnosis logic)
codingProblems.js       (Static coding challenge bank)
codingEngine.js         (Web Worker based code execution sandbox)
feedback.js             (Feedback text + readiness logic)
timer.js                (Countdown lifecycle)
ui.js                   (DOM rendering and manipulation - Subjective)
codingUI.js             (DOM rendering and manipulation - Coding)
app.js                  (Central state, event listeners, application flow)
```

## Layer Descriptions

### Frontend Layer

**`index.html`**
- Single HTML document containing all 4 screen sections
- Screens: `#screen-home`, `#screen-setup`, `#screen-interview`, `#screen-results`
- All screens are present in DOM at load time; visibility controlled by `active`/`hidden` CSS classes
- Loads all CSS and JS files at the bottom of `<body>`

**`css/style.css`**
- All visual styles in one file
- Uses CSS custom properties (variables) for the colour palette and spacing
- Responsive design via `@media` queries at 900px, 768px, and 480px

### Data Layer

**`js/questions.js`**
- Static question bank for subjective interviews
- Contains questions mapped by role and difficulty (Easy, Intermediate, Hard)
- Each question object contains: `id`, `role`, `difficulty`, `question`, `concepts[]`, `idealLength`, `structure[]`

**`js/codingProblems.js`**
- Static question bank for coding challenges
- Two distinct pools: `softwareEngineerCodingProblems` and `dataAnalystCodingProblems`
- 15 questions per pool (5 Easy, 5 Intermediate, 5 Hard)
- Defines test cases and initial boilerplate code

### Application Layer

**`js/app.js`**
- Defines and owns the central application state object
- Registers all core DOM event listeners
- Contains the core flow functions and orchestrates module interactions

**`js/questionGenerator.js`**
- Manages optional Gemini API integration for dynamic subjective questions
- Handles prompt construction, fetch requests, and fallback to local question bank

### Timer Layer

**`js/timer.js`**
- Encapsulates the `setInterval` countdown (60 seconds)
- Guarantees no duplicate intervals

### Evaluation & Analysis Layer

**`js/analyzer.js`**
- Contains all subjective scoring logic (Concept Coverage, Answer Quality, Structure, Communication)
- No DOM access, pure deterministic computation

**`js/recommendationEngine.js`**
- Aggregates weak concepts from subjective evaluation
- Classifies them into "priority improvement" or "needs practice"
- Generates final actionable study recommendations

**`js/codingEngine.js`**
- Manages Web Worker creation for secure coding execution
- Avoids `eval()` and `new Function()` natively
- Runs code against test cases with robust timeout and error handling

### UI & Feedback Layer

**`js/feedback.js`**
- Formats analyzer output into structured strengths, missing elements, and suggestions

**`js/ui.js`**
- Caches subjective DOM element references
- Handles screen transitions and subjective question rendering
- Renders the final comprehensive results dashboard

**`js/codingUI.js`**
- Handles all Coding Challenge UI interactions (Code Editor, Run, Submit)
- Handles safe error message rendering and 5-question loop orchestration

## Data Flow Summary

### Subjective Flow
```
User -> Setup -> Subjective Interview -> Question -> 60s timer -> Submit -> Rule-Based Evaluation -> Feedback -> Next Question -> Final Results
```

### Coding Flow
```
User -> Setup -> Coding Challenge -> Question -> Write Code -> Submit -> Web Worker execution -> Test Cases -> Score -> Feedback -> Next Question -> Final Report
```
