# Adaptive Interview Upgrade Summary

This document summarizes the changes made to implement the Adaptive Interview Upgrade on the `feature/adaptive-interview-upgrade` branch.

## Architecture & Constraints Preserved
- The application remains a pure Client-Side HTML/CSS/Vanilla JS app.
- No new build tools (Webpack/Vite/Babel) or frameworks (React/Vue) were introduced.
- Existing components (`analyzer.js`, `feedback.js`, `timer.js`) were largely preserved and extended upon.

## New Features
1. **Difficulty Levels:** Added Easy, Intermediate, and Hard selection to the Setup screen.
2. **AI Question Generation (Optional):** Added a demo Gemini API key input. If provided, questions are dynamically generated using the Gemini API via `questionGenerator.js`. If the API fails or is not provided, the system gracefully falls back to the local question bank. A "Test API Key" button was also added for immediate validation.
3. **Expanded Local Question Bank:** The local bank in `questions.js` was restructured to hold 5 questions per role per difficulty (total 45 questions). Questions are now selected randomly without duplication.
4. **Weak Area Analysis:** `recommendationEngine.js` aggregates the concept scores from the 5 interview questions and categorizes them into Strong, Developing, Needs Practice, and Priority Improvement areas. It then generates specific recommendations.
5. **Adaptive Coding Challenge:** Following the text interview (or chosen as a direct mode), an adaptive coding challenge flow presents exactly 5 questions based on the selected role and difficulty. The code is executed safely in the browser using a Web Worker (`codingEngine.js` and `codingUI.js`).
6. **Separate Coding Pools:** `codingProblems.js` defines unique 15-question pools for Software Engineer (Algorithms) and Data Analyst (SQL/Data logic mapped to JS array functions).
7. **Role Restrictions:** Marketing role users are explicitly blocked from selecting the Coding Challenge, ensuring role relevance.
8. **Enhanced Results Dashboard:** The final results screen now decouples subjective vs coding results based on what the user chose. It displays Coding Score, Questions Attempted, Tests Passed, and a detailed question breakdown.

## File Structure Additions
- `js/questionGenerator.js`: Handles API calls to Gemini and response validation.
- `js/recommendationEngine.js`: Analyzes answer results to identify weak concepts.
- `js/codingProblems.js`: Database of SE and DA coding challenges.
- `js/codingEngine.js`: Contains the Web Worker logic for executing JS without `eval`.
- `js/codingUI.js`: Manages the 5-question UI loop and events for the coding challenge screen.

## Note on Security
The Gemini API key integration is designed strictly for demonstration. Keys are not persisted (no localStorage/cookies) and exist only in memory during the session. The Web Worker provides an isolated execution context (via Blob URL) for user code to prevent DOM manipulation, and infinite loops are handled via a strict timeout. Evaluated code uses native JS instead of `eval()` or `new Function()`.
