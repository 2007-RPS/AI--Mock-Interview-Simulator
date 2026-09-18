# 14 — Viva Preparation Guide

This document prepares you for a B.Tech Web Development viva examination on the AI-Style Mock Interview Simulator.

---

## A. 30-Second Project Explanation

"I built an adaptive, browser-based mock interview simulator using HTML, CSS, and Vanilla JavaScript. The user selects a role (Software Engineer, Data Analyst, or Marketing), a difficulty level, and chooses between a Subjective or Coding mode. For Subjective, they answer 5 questions with a 60-second timer, receiving instant rule-based evaluation and weak-area recommendations. For Coding, they solve 5 technical challenges executed safely in a Web Worker, receiving a final report card based on test case accuracy. The app optionally integrates the Gemini API for dynamic question generation."

---

## B. 1-Minute Explanation

"The AI-Style Mock Interview Simulator is a single-page web application built purely with HTML5, CSS3, and Vanilla JavaScript. It offers two distinct tracks. In the Subjective track, the application loads 5 randomized questions from a local pool or via the Gemini API. The answer is passed to a deterministic evaluation engine that scores concept coverage, length, structure, and communication. In the Coding Challenge track, user JavaScript is safely executed in an isolated Web Worker without using `eval()`. The Web Worker runs hidden test cases to evaluate correctness. The session concludes with a detailed Results Dashboard, offering either weak-area study recommendations or a final Coding Report Card. This project demonstrates DOM manipulation, Event Loop management, Web Workers, API integration, and modular JavaScript architecture."

---

## C. 3-Minute Technical Explanation

"The application is structured into modular layers. The data layer uses `questions.js` and `codingProblems.js` to store difficulty-mapped static questions. The orchestration layer in `app.js` manages global state.

For Subjective mode, the timer in `timer.js` uses `setInterval` to handle countdowns and timeout-based auto-submissions. The rule-based analyzer normalizes text and runs regex-based concept matching, length bands, and filler word detection. An optional `questionGenerator.js` uses `fetch()` to call the Gemini API, falling back to local data if it fails.

For Coding mode, `codingEngine.js` dynamically creates a Web Worker using `URL.createObjectURL(new Blob(...))`. This prevents the user's code from blocking the main thread or accessing the DOM. The code is executed natively—never with `eval()`—and test case results are passed back via `postMessage`. A strict timeout protects against infinite loops, and `try...catch` wrappers catch syntax errors and unhandled promise rejections.

All DOM updates in `ui.js` and `codingUI.js` use `textContent` or `createElement`, preventing XSS. The application requires no backend, database, or build tools."

---

## D. Architecture Questions

**Q: Why is the project split into multiple JS files?**
A: To separate concerns. Data (`questions.js`), logic (`analyzer.js`, `codingEngine.js`), DOM rendering (`ui.js`, `codingUI.js`), and orchestration (`app.js`) are separated. This makes the code modular, maintainable, and easier to debug.

**Q: What is the load order of JS files and why does it matter?**
A: Data files and utility modules load first. Rendering modules load next. `app.js` loads last because it depends on all other modules to attach event listeners and begin the application flow.

**Q: How does the Gemini integration work?**
A: `questionGenerator.js` takes the user's role and difficulty, constructs a prompt, and calls the Gemini REST API via `fetch()`. It requests a structured JSON response. If the API fails or is unavailable, the system safely falls back to the local `questions.js` pool.

---

## E. Coding Engine Questions

**Q: How do you execute the user's code safely?**
A: I use a Web Worker initialized via a Blob URL. The user's code string is concatenated with the test cases and executed inside the worker.

**Q: Why not just use `eval()`?**
A: `eval()` executes in the main thread and local scope. If a user writes an infinite loop, `eval()` would permanently freeze the entire browser tab. A Web Worker runs on a separate background thread and can be terminated. Web Workers also do not have access to the `document` or `window`, preventing malicious DOM manipulation.

**Q: How do you prevent infinite loops in the Web Worker?**
A: A `setTimeout` races against the worker's execution promise. If the worker doesn't respond with a `postMessage` within 2 seconds, the main thread calls `worker.terminate()` and rejects the promise.

**Q: Why is Marketing not allowed to take the Coding Challenge?**
A: Marketing is a non-technical role in this context. The UI enforces role-relevance. If a user switches to Marketing, the coding option is automatically disabled and reset to Subjective.

---

## F. Scoring & Logic Questions

**Q: Is the Subjective evaluation machine learning?**
A: No, it is deterministic and rule-based. It uses regex `\bkeyword\b` for concept matching, array length for word counts, and fixed arrays for signal-word detection.

**Q: What is the Recommendation Engine?**
A: `recommendationEngine.js` aggregates the concepts the user missed during the 5 subjective questions. It classifies them into 'Priority Improvement' (missed multiple times/high weight) or 'Needs Practice', providing actionable study topics on the final dashboard.

---

## G. UI/UX & Security

**Q: How do you prevent XSS (Cross-Site Scripting)?**
A: User inputs (both subjective answers and coding errors) are strictly rendered using `.textContent`, never `.innerHTML`. 

**Q: Is the Gemini API Key stored securely?**
A: It is strictly stored in memory during the active browser session. It is never written to `localStorage` or cookies. However, because this is a client-side app, it is only recommended for demonstration keys, as network requests can be inspected.

**Q: How did you fix the UI layout for Difficulty and Mode selection?**
A: I used CSS Flexbox with `flex-wrap: wrap` and `justify-content: center`. This ensures the cards adapt dynamically to wide screens and mobile devices without creating awkward whitespace, which was an issue with the previous CSS Grid layout.
