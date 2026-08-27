# 13 — Limitations and Future Scope

## Overview

This document clearly separates what the current MVP implements from what would be added in a hypothetical Version 2. Nothing in the Future Scope section is currently implemented.

---

## Current MVP Limitations

### 1. Keyword-Dependent Evaluation

The evaluation engine matches specific keywords from `questions.js`. An answer that correctly explains a concept using different words (synonyms, paraphrasing) may not score full marks.

**Example:** SE-01 expects the keyword `"tree"` for the Tree Structure concept. An answer saying `"hierarchical node representation"` is semantically correct but will not match.

**Root cause:** Rule-based matching without semantic understanding.

---

### 2. No Semantic Understanding

The system detects the presence of words, not the meaning of sentences. It cannot distinguish between:
- `"The DOM is a tree structure"` (correct)
- `"The DOM is not a tree structure"` (incorrect but would still match "tree")

This is a fundamental limitation of keyword-based evaluation.

---

### 3. Filler Word Ambiguity

The word `"like"` is in the filler list because it is commonly used as a verbal filler. However, it also appears in legitimate technical writing:
- `"Arrays are like lists"` — legitimate comparison, but "like" is penalized
- `"The DOM works like a tree"` — legitimate analogy, but penalized

This is an accepted trade-off in the MVP. The penalty is small (−10 points from the 10%-weighted Communication score, so −1 point maximum impact on final score).

---

### 4. Fixed Question Order

Questions are always presented in the same order for each role. There is no shuffling or adaptive selection. A user who practises the same role multiple times will see the same 5 questions in the same order.

---

### 5. No Voice Input

Answers must be typed. There is no speech recognition or voice recording functionality. The Web Speech API is not used.

---

### 6. No Persistent Storage

When the browser tab is closed or refreshed, the entire session is lost. There is no:
- `localStorage` usage
- `sessionStorage` usage
- Backend database
- Score history
- Progress tracking over multiple sessions

This is intentional per the assignment specification.

---

### 7. No Backend

The application is entirely client-side. There is no:
- Server
- API endpoint
- Database
- Authentication system
- User accounts

---

### 8. Structure Detection is Heuristic

Structure scoring detects signal words (`because`, `for example`, etc.). A perfectly structured, logically organized answer that does not use these specific signal words will score 0 on structure. Conversely, an answer containing `"because"` in an unrelated context will receive structure credit.

---

### 9. No Adaptive Difficulty

All questions have fixed difficulty. The application does not adjust based on how well the user is performing.

---

### 10. Small Question Bank

Each role has exactly 5 questions. Repeated use of the simulator will quickly result in familiarity with the questions, reducing the training value.

---

## Future Scope — Version 2

> **None of the following features are currently implemented.**

### V2.1 — Voice Input

- Integrate the **Web Speech API** (`SpeechRecognition`) for voice-based answers
- Transcribe speech to text and pass to the existing evaluation engine
- No server required — Web Speech API is browser-native

### V2.2 — Semantic Evaluation Layer

- Optionally call an LLM API (e.g. Gemini API, OpenAI API) for semantic evaluation
- Use as a supplementary scoring layer alongside the existing rule-based engine
- Requires an API key and network access

### V2.3 — Expanded Question Bank

- More roles (e.g. Product Manager, UI/UX Designer, DevOps)
- More questions per role (10–20)
- Question shuffling for varied practice sessions
- Difficulty tags (beginner / intermediate / advanced)

### V2.4 — User Accounts and Progress Tracking

- Backend (Node.js / Firebase / Supabase)
- User authentication
- Interview history
- Score trends over time
- Personal weak area identification

### V2.5 — Adaptive Follow-Up Questions

- If conceptScore is low, ask a follow-up clarifying question
- Branching interview flow based on performance

### V2.6 — Enhanced Analytics

- Dashboard showing progress across multiple sessions
- Concept coverage heat map
- Most commonly missed concepts
- Filler word frequency trend

### V2.7 — Export and Sharing

- Export results as PDF
- Share score summary link
- Embed in LMS (Moodle, Canvas)
