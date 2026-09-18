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

### 4. Limited Role Support for Coding
Currently, only Software Engineer and Data Analyst roles support the Coding Challenge. Marketing and other future subjective roles cannot take a coding assessment.

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

---

### 7. No Backend

The application is entirely client-side. There is no:
- Server
- API endpoint (other than external Gemini calls)
- Database
- Authentication system
- User accounts

---

### 8. Structure Detection is Heuristic

Structure scoring detects signal words (`because`, `for example`, etc.). A perfectly structured, logically organized answer that does not use these specific signal words will score 0 on structure. Conversely, an answer containing `"because"` in an unrelated context will receive structure credit.

---

## Future Scope — Version 2

> **None of the following features are currently implemented.**

### V2.1 — Voice Input

- Integrate the **Web Speech API** (`SpeechRecognition`) for voice-based answers
- Transcribe speech to text and pass to the existing evaluation engine
- No server required — Web Speech API is browser-native

### V2.2 — LLM-based Semantic Evaluation Layer

- Expand the Gemini integration to perform deep semantic evaluation of answers
- Use as a supplementary scoring layer alongside the existing rule-based engine

### V2.3 — Expanded Roles

- Add more roles (e.g. Product Manager, UI/UX Designer, DevOps)
- Develop specific coding challenge equivalents (e.g. SQL simulators, CSS challenges)

### V2.4 — User Accounts and Progress Tracking

- Backend (Node.js / Firebase / Supabase)
- User authentication
- Interview history
- Score trends over time

### V2.5 — Adaptive Follow-Up Questions

- If conceptScore is low, ask a follow-up clarifying question
- Branching interview flow based on performance

### V2.6 — Enhanced Analytics

- Dashboard showing progress across multiple sessions
- Concept coverage heat map

### V2.7 — Export and Sharing

- Export results as PDF
- Embed in LMS (Moodle, Canvas)
