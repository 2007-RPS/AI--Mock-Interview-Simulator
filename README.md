# AI-Style Mock Interview Simulator

> A client-side, rule-based mock interview simulator built with pure HTML5, CSS3, and Vanilla JavaScript ES6+. Designed as a B.Tech Web Development project to demonstrate applied JavaScript concepts including DOM manipulation, event handling, timer management, and deterministic scoring logic.

---

## Overview

The AI-Style Mock Interview Simulator is a browser-based interview preparation tool that allows students and job-seekers to practise answering role-specific interview questions within a timed environment. After each answer the application provides instant, rule-based feedback — scoring the response across four measurable dimensions and explaining exactly why a particular score was awarded.

The name "AI-style" refers to the **explainable, rule-based evaluation engine** that mimics structured AI feedback. The project does **not** use any machine-learning model, large language model, or external AI API. All evaluation is deterministic, transparent, and runs entirely in the browser.

---

## Key Features

| Feature | Details |
|---|---|
| **Role Selection** | Software Engineer, Data Analyst, or Marketing |
| **Difficulty Levels** | Easy, Intermediate, Hard |
| **Assessment Modes** | Subjective Interview (all roles) or Coding Challenge (SE/DA only) |
| **Optional AI Question Generation** | (Optional) Input a Gemini API Key to dynamically generate questions |
| **Weak Area Recommendations** | Rule-based concept aggregation to suggest practice topics |
| **5-Question Interview Loop** | Both subjective and coding loops loop through 5 questions with instant feedback after each |
| **Web Worker Coding Engine** | Securely evaluates JS strings and JS-array data logic natively |
| **Separate Coding Pools** | Algorithm questions for SE; SQL/Data Processing (mapped in JS) for Data Analyst |
| **Concept Matching** | Keyword/concept detection with word-boundary-safe regex for subjective questions |
| **Answer Quality Analysis** | Length-band scoring against per-question ideal word counts |
| **Structure & Clarity Analysis** | Detects definition, explanation, example, comparison, and application signals |
| **Communication Analysis** | Detects filler words (um, uh, like, etc.) and 4-gram phrase repetition |
| **Final Results Dashboard** | Overall subjective score, strong areas, needs practice, and AI-driven recommendations |
| **Coding Report Card** | Average coding score, tests passed, questions attempted, and a detailed breakdown |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, @keyframes, clamp(), backdrop-filter) |
| Logic | Vanilla JavaScript ES6+ (Web Workers, async/await, Fetch API) |
| Fonts | Google Fonts - Inter |

### What this project does NOT use

- No React or frontend frameworks
- No backend (fully client-side)
- No required database (local state)
- No database
- No LLM or AI API (OpenAI, Gemini, etc.)
- Optional Gemini API integration (fallback to local if key not provided)
- No authentication
- No persistent storage (localStorage / sessionStorage)
- No React, Vue, or Angular
- No build tools (Webpack, Vite, etc.)
- No npm packages

Opening `index.html` directly in a browser is all that is required to run the application.

---

## Architecture

```
index.html          - Single HTML shell (4 screens)
css/style.css       - All visual styles and responsive rules
js/
  questions.js      - Static subjective question bank
  codingProblems.js - Static coding challenge bank
  questionGenerator.js - Optional Gemini API integration
  codingEngine.js   - Web Worker based code execution sandbox
  recommendationEngine.js - Weak area diagnosis logic
  analyzer.js       - Deterministic evaluation engine
  feedback.js       - Feedback text + readiness logic
  timer.js          - Countdown lifecycle
  ui.js             - All DOM rendering and manipulation
  animations.js     - Architectural placeholder (CSS handles animations)
  app.js            - Central state, event listeners, application flow
```

All modules are plain JavaScript objects loaded via script tags in dependency order. There is no module bundler.

---

## How It Works - User Journey

```
Home Screen
  -> Click Start Interview
Setup Screen - Choose Role, Difficulty, and Assessment Mode
  -> Click Start Interview
Interview Screen - Q1 of 5
  -> Type answer within 60 seconds
  -> Click Submit Answer OR timer reaches 0 (auto-submit)
Per-Question Feedback - Score, strengths, missing concepts, suggestion
  -> Click Next Question
  -> Repeat for Q2 to Q5
Final Results Screen
  - Overall score (average of 5)
  - Readiness level
  - Category averages
  - Strengths and improvement areas
  - Question-by-question review
  -> Click Try Again or Home -> full reset
```

---

## Scoring Formula

Each answer is scored across four dimensions, then combined using a weighted formula:

| Dimension | Weight | What It Measures |
|---|---|---|
| **Concept Coverage** | 45% | How many of the expected keywords/concepts appear in the answer |
| **Answer Quality** | 25% | Whether the answer length falls within the ideal range for the question |
| **Structure & Clarity** | 20% | Presence of definition, explanation, example, comparison, or application signals |
| **Communication** | 10% | Absence of filler words and repeated 4-word phrases |

```
Final Score = (Concept x 0.45) + (Quality x 0.25) + (Structure x 0.20) + (Communication x 0.10)
```

All component scores are 0-100. The final score is clamped to 0-100 and rounded.

---

## Project Structure

```
AI-Mock-Interview-Simulator/
|
|-- index.html
|-- README.md
|-- .gitignore
|
|-- css/
|   `-- style.css
|
|-- js/
|   |-- app.js
|   |-- questions.js
|   |-- timer.js
|   |-- analyzer.js
|   |-- feedback.js
|   |-- ui.js
|   `-- animations.js
|
`-- docs/
    |-- 01_PROJECT_OVERVIEW.md
    |-- 02_REQUIREMENTS_TRACEABILITY.md
    |-- 03_SYSTEM_ARCHITECTURE.md
    |-- 04_FEATURES_AND_FUNCTIONALITY.md
    |-- 05_APPLICATION_FLOW.md
    |-- 06_QUESTION_BANK_AND_DATA_MODEL.md
    |-- 07_EVALUATION_AND_SCORING.md
    |-- 08_FEEDBACK_ENGINE.md
    |-- 09_UI_UX_DESIGN.md
    |-- 10_TECHNICAL_IMPLEMENTATION.md
    |-- 11_SECURITY_AND_EDGE_CASES.md
    |-- 12_TESTING_AND_QA.md
    |-- 13_LIMITATIONS_AND_FUTURE_SCOPE.md
    |-- 14_VIVA_PREPARATION.md
    `-- 15_SYSTEM_EXPLANATION.md
```

---

## How to Run

### Method 1 - Open directly (simplest)

1. Download or clone the repository.
2. Open `index.html` in any modern browser.

No installation, no server, no build step required.

### Method 2 - Local development server

If you have Python installed:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

Or with VS Code, use the **Live Server** extension.

---

## Browser Compatibility

| Browser | Support |
|---|---|
| Google Chrome 90+ | Full support |
| Mozilla Firefox 88+ | Full support |
| Microsoft Edge 90+ | Full support |
| Safari 14+ | Full support |
| Opera 76+ | Full support |

---

## Limitations

- Deterministic keyword matching - correct answers phrased with synonyms may not score fully
- No semantic understanding - the engine detects keywords, not meaning
- No persistent storage - refreshing the browser discards the session
- Typed input only - voice/speech recognition is not implemented
- Questions are randomized per session from a larger pool
- The word "like" is flagged as a filler even in technical usage

---

## Future Scope (Version 2)

- Web Speech API for voice-based answers
- Adaptive follow-up questions
- User accounts and interview history (requires backend)
- Progress dashboard with analytics
- Expanded question banks

These features are **not** currently implemented.

---

## Academic Context

This project was built as a B.Tech Web Development Project-Based Learning (PBL) assignment. It demonstrates:

- Variables and state management
- Functions and reusable modules
- DOM manipulation
- Event handling
- Timer management (setInterval / clearInterval)
- Array and string methods
- Regular expressions
- Conditional logic
- Modular code organization
- Responsive CSS design

---

## Author

B.Tech Web Development - Project-Based Learning  
AI-Style Mock Interview Simulator
