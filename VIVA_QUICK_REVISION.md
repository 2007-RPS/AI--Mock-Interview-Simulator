# Viva Quick Revision Guide
**Project:** AI-Style Mock Interview Simulator

## 1. Project Explanation Summary
This project is a browser-based, client-side Single Page Application (SPA) designed to help students practice role-specific technical interviews under time pressure. It utilizes a 60-second countdown timer and a heuristic, rule-based evaluation engine to provide instant, transparent feedback on typed answers.

## 2. Architecture & Flow
- **Architecture:** Modular separation of concerns. Modular JavaScript files loaded through standard script tags in a defined dependency order.
- **Flow:** Home $\rightarrow$ Role Selection $\rightarrow$ 5 Questions (60s timer each) $\rightarrow$ Aggregated Results.
- **State Management:** A central `state` object in `app.js` tracks the current question index, user answers, generated results, and answerSubmitted synchronization guard.

## 3. The Scoring Formula
Final Score = `(Concept * 0.45) + (Quality * 0.25) + (Structure * 0.20) + (Communication * 0.10)`
- *Concept:* Regex word-boundary (`\b`) matches against required keywords.
- *Quality:* Word count compared to an "ideal length" band (e.g., 30-80 words).
- *Structure:* Detection of transitional phrases (e.g., "for example", "because").
- *Communication:* Deductions for filler words ("um", "like") and repetitive phrases.

## 4. Key Viva Questions & Answers

**Q: Why did you use Vanilla JavaScript instead of React/Angular?**
A: To demonstrate foundational competency in DOM manipulation, state management, and event handling without the overhead of external libraries, fulfilling the PBL constraints.

**Q: Why is there no backend or database?**
A: The MVP is designed as a secure, offline-capable client-side application. Session data is temporarily held in browser memory and intentionally discarded upon refresh. This reduces privacy concerns associated with transmitting interview responses to external services.

**Q: If it has no ML model, why call it "AI-Style"?**
A: The term refers to the *presentation* and *depth* of the feedback (providing specific actionable insights and multi-metric scoring), which mimics the output of an AI tool. The MVP itself uses deterministic rule-based evaluation rather than machine-learning or generative-AI models.

**Q: What is a Single Page Application (SPA)?**
A: A web application that interacts with the user by dynamically rewriting the current web page with new data from the server (or local state), instead of the default method of a web browser loading entire new pages.

**Q: What is the DOM and how are you modifying it safely?**
A: The Document Object Model is the browser's programmatic representation of the HTML. We mitigate XSS risks by rendering dynamic user-related content using `element.textContent` and safe DOM creation methods like `document.createElement()`, explicitly avoiding `element.innerHTML`.

**Q: How does the timer work?**
A: It uses the JavaScript `setInterval` API to decrement a counter every 1000ms. We use `timer.stop()` before starting a new interval and to stop it when the user submits or when it hits 0.

**Q: How do you prevent a race condition if the user clicks submit at the exact moment the timer expires?**
A: We use a boolean synchronization guard variable `state.answerSubmitted`. The timeout and manual submission use the same submission path. The submission function checks this lock first; if it's already true, it aborts, preventing double submission.

**Q: How does the keyword matching work?**
A: We convert the user's text to lowercase and remove punctuation. We then iterate through predefined keywords and use the Regular Expression `\bkeyword\b`. The `\b` ensures we only match whole words, so searching for "IT" doesn't falsely match "bITe".

**Q: What happens if a user submits an empty answer?**
A: The `analyzer.js` immediately detects a word count of 0, bypasses all heuristic matching, and returns a flat score of 0 across all metrics to prevent giving them a falsely high "Communication" score for having zero filler words.

**Q: What are the main limitations of your system?**
A: Since it uses deterministic exact-word matching, it struggles with synonyms unless they are explicitly programmed. It also lacks true semantic understanding—it knows if you used the phrase "for example", but it does not evaluate if the example itself was technically correct.

**Q: How would you add real AI to this in the future?**
A: By integrating an external LLM API (like Gemini or OpenAI) via HTTP fetch requests. I would pass the question and the user's answer in a prompt, requesting a JSON response containing the semantic score and feedback.

**Q: How would you add voice input?**
A: By utilizing the browser's native `Web Speech API` (`SpeechRecognition` interface) to transcribe the user's spoken words into text in real-time, then passing that text into our existing evaluation engine.
