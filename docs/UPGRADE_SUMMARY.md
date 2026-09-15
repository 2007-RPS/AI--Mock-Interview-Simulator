# Adaptive Interview Upgrade Summary

This document summarizes the changes made to implement the Adaptive Interview Upgrade on the `feature/adaptive-interview-upgrade` branch.

## Architecture & Constraints Preserved
- The application remains a pure Client-Side HTML/CSS/Vanilla JS app.
- No new build tools (Webpack/Vite/Babel) or frameworks (React/Vue) were introduced.
- Existing components (`analyzer.js`, `feedback.js`, `timer.js`) were largely preserved and extended upon.

## New Features
1. **Difficulty Levels:** Added Easy, Intermediate, and Hard selection to the Setup screen.
2. **AI Question Generation (Optional):** Added a demo Gemini API key input. If provided, questions are dynamically generated using the Gemini API via `questionGenerator.js`. If the API fails or is not provided, the system gracefully falls back to the local question bank.
3. **Expanded Local Question Bank:** The local bank in `questions.js` was restructured to hold 5 questions per role per difficulty (total 45 questions). Questions are now selected randomly without duplication.
4. **Weak Area Analysis:** `recommendationEngine.js` aggregates the concept scores from the 5 interview questions and categorizes them into Strong, Developing, Needs Practice, and Priority Improvement areas. It then generates specific recommendations.
5. **Adaptive Coding Challenge:** Following the text interview, an adaptive coding challenge is presented based on the user's weakest identified concept. The code is executed safely in the browser using a Web Worker (`codingEngine.js` and `codingUI.js`).
6. **Enhanced Results Dashboard:** The final results screen now displays the Weak Areas, Recommended Topics, and the Coding Score, alongside the standard four-dimensional breakdown.

## File Structure Additions
- `js/questionGenerator.js`: Handles API calls to Gemini and response validation.
- `js/recommendationEngine.js`: Analyzes answer results to identify weak concepts.
- `js/codingProblems.js`: Database of coding challenges.
- `js/codingEngine.js`: Contains the Web Worker string and execution logic.
- `js/codingUI.js`: Manages the UI transitions and events for the coding challenge screen.

## Note on Security
The Gemini API key integration is designed strictly for demonstration. Keys are not persisted (no localStorage/cookies) and exist only in memory during the session. The Web Worker provides an isolated execution context for user code to prevent DOM manipulation, but it is not a complete security sandbox against infinite loops (which are handled via a timeout) or advanced side-channel attacks.
