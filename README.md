# AI-Style Mock Interview Simulator

## Overview

The AI-Style Mock Interview Simulator is a browser-based interview preparation tool that allows candidates to practise answering role-specific subjective and technical coding questions within a timed environment. After each answer, the application provides instant feedback—scoring the response across measurable dimensions or executing code against test cases.

The simulator does **not** require an AI/LLM service for answer evaluation. Subjective answers are evaluated locally using a deterministic rule-based scoring engine. An optional Gemini API integration is available only for dynamically generating subjective questions. If no API key is supplied or the request fails, the application falls back to the local question bank. All coding evaluations run in an isolated client-side Web Worker, completely independent of external backends.

---

## Key Features

| Feature | Details |
|---|---|
| **Role Selection** | Software Engineer, Data Analyst, or Marketing |
| **Difficulty Levels** | Easy, Intermediate, Hard |
| **Assessment Modes** | Subjective Interview (all roles) or Coding Challenge (SE/DA only) |
| **5-Question Interview Loop** | Both subjective and coding loops present 5 questions with instant feedback after each |
| **Optional AI Question Generation** | Input a Gemini API Key to dynamically generate subjective questions (falls back to local bank if unavailable) |
| **Weak Area Recommendations** | Rule-based concept aggregation to suggest practice topics based on omitted keywords |
| **Web Worker Coding Engine** | Evaluates JS strings and JS-array data logic natively in an isolated Web Worker with timeout termination |
| **Role-Specific Coding Pools** | Algorithm questions for SE; array/data processing tasks for Data Analyst |
| **Subjective Rule-Based Scoring** | Evaluates answers across four dimensions: Concept Coverage (45%), Answer Quality (25%), Structure & Clarity (20%), and Communication (10%) |
| **Final Results Dashboard** | Overall subjective score, strong areas, needs practice, and algorithmic recommendations |
| **Coding Report Card** | Average coding score, tests passed, questions attempted, and a detailed breakdown |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, @keyframes) |
| Logic | Vanilla JavaScript ES6+ (Web Workers, async/await, Fetch API) |
| Fonts | Google Fonts - Inter |

### Architecture Principles

- **No frontend frameworks**: No React, Vue, or Angular.
- **Fully client-side**: No backend, no server-side database.
- **No evaluation LLM**: Evaluation relies strictly on local deterministic heuristics and Web Worker test cases.
- **No persistent storage**: No localStorage / sessionStorage; refreshing resets the session.
- **No build tools**: No Webpack, Vite, or npm packages.

Opening `index.html` directly in a browser is all that is required to run the application.

---

## Architecture

```
index.html          - Single HTML shell (4 screens)
css/style.css       - All visual styles and responsive rules
js/
  app.js            - Central state, event listeners, application flow
  questions.js      - Static subjective question bank
  questionGenerator.js - Optional Gemini API integration for dynamic questions
  recommendationEngine.js - Weak area diagnosis logic
  codingProblems.js - Static coding challenge bank
  codingEngine.js   - Web Worker based code execution with timeout
  codingUI.js       - Coding-specific DOM rendering
  analyzer.js       - Deterministic subjective evaluation engine
  feedback.js       - Feedback text + readiness logic
  timer.js          - Countdown lifecycle for subjective mode
  ui.js             - Subjective and dashboard DOM rendering
  animations.js     - Architectural placeholder
```

All modules are plain JavaScript objects loaded via script tags in dependency order. There is no module bundler.

---

## How It Works - User Journey

```
Home Screen
  -> Click Start Interview
Setup Screen
  -> Choose Role (SE, DA, Marketing)
  -> Choose Difficulty (Easy, Intermediate, Hard)
  -> Choose Mode (Subjective or Coding)
  -> (Optional) Provide Gemini API Key for dynamic subjective questions
  -> Click Start Interview
  
Subjective Loop (5 Questions)
  -> 60-second timer per question
  -> Rule-based feedback generated upon manual submit or timeout
  
Coding Loop (5 Questions)
  -> Write JavaScript
  -> Web Worker execution isolates code from main thread
  -> Test-case evaluation feedback generated
  
Final Results Screen
  -> View comprehensive performance breakdown and recommendations
```

---

## How to Run

### Method 1 - Open directly (simplest)

1. Download or clone the repository.
2. Open `index.html` in any modern browser.

### Method 2 - Local development server

If you have Python installed:

```bash
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

---

## Security and Privacy Notice

The AI-Style Mock Interview Simulator focuses on privacy-oriented client-side processing.

- **Subjective answers** are evaluated locally. No backend stores answers.
- **Coding submissions** are executed via a Web Worker. This provides isolated execution and timeout-based termination to avoid blocking the main UI thread. However, it is not a production-grade secure sandbox.
- **Gemini API** is entirely optional and only triggers if a key is manually provided. Supplying an API key will expose the generated-question request to the external Google Gemini service. The key is kept strictly in browser memory and is not stored in cookies or localStorage. Client-side API keys are not suitable for production deployments.

---

## Academic Context

This project was built as a B.Tech Web Development Project-Based Learning (PBL) assignment. It demonstrates:
- State management and DOM manipulation
- Web Worker API usage
- Asynchronous programming (Promises, async/await, Fetch)
- Deterministic heuristic analysis
- Modular Vanilla JS structure
