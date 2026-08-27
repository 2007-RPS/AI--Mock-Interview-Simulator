# 01 — Project Overview

## Project Title

AI-Style Mock Interview Simulator

## Problem Statement

Job interviews are stressful, and most students have limited opportunity to practise before the real thing. Traditional preparation methods — reading theory, watching videos, or practising with friends — do not simulate the pressure of answering a question within a fixed time while being evaluated on the spot.

This project addresses that gap by providing a structured, timed, browser-based interview simulator that gives students immediate feedback on their answers.

## Motivation

The project was built as a B.Tech Web Development Project-Based Learning (PBL) assignment. The objective was to build a functionally meaningful JavaScript application that demonstrates:

- Applied DOM manipulation
- Timer-driven interaction
- Rule-based text evaluation
- Modular JavaScript architecture
- Responsive front-end design

Rather than building a trivial to-do list or calculator, this project tackles a real student need: structured interview practice.

## Why "AI-Style"?

The term "AI-style" does not mean the application uses machine learning or a large language model. It means the evaluation engine is designed to produce **explainable, structured, rule-based feedback** similar in format to what an AI tool might provide.

The evaluation is:
- Fully deterministic (same answer always produces the same score)
- Transparent (every scoring component is displayed to the user)
- Rule-based (written in plain JavaScript logic, not trained)
- Client-side (no API calls, no server, no model weights)

This design choice was intentional: it keeps the project honest, offline-capable, and educationally demonstrable.

## Objectives

1. Build a working timed mock interview application in the browser.
2. Implement a role-specific question bank with concept metadata.
3. Design a rule-based answer evaluation engine (concept matching, length analysis, structure detection, communication scoring).
4. Generate instant, explainable per-question feedback.
5. Produce a final session summary with an overall score and readiness level.
6. Demonstrate JavaScript fundamentals: variables, functions, DOM, events, timers, arrays, strings, conditionals.
7. Create a professional, responsive UI with a modern AI-inspired visual style.

## Target Users

- B.Tech / engineering students preparing for campus placements
- Students practising for technical or non-technical interviews
- Anyone who wants structured self-evaluation of interview answers

## Scope — What Is Included

| Feature | Included |
|---|---|
| 3 interview roles | Yes |
| 5 questions per role | Yes |
| 60-second countdown timer | Yes |
| Timeout auto-submission | Yes |
| Typed answer input | Yes |
| Concept keyword matching | Yes |
| Length/quality scoring | Yes |
| Structure detection | Yes |
| Filler-word/communication scoring | Yes |
| Per-question feedback | Yes |
| Final results screen | Yes |
| Readiness level | Yes |
| Retry/reset | Yes |
| Responsive design | Yes |
| CSS-based animations | Yes |

## MVP Boundaries — What Is Intentionally Excluded

| Feature | Excluded | Reason |
|---|---|---|
| Voice/speech input | Not implemented | Out of assignment scope; future V2 |
| LLM/AI API | Not used | Not required; adds dependency and cost |
| Backend/database | Not used | Client-side project; no server needed |
| User authentication | Not implemented | No persistence required |
| localStorage / sessionStorage | Not used | Session data intentionally discarded on refresh |
| Random question ordering | Not implemented | Deterministic order for reproducibility |
| Score persistence | Not implemented | No backend to store results |

## Expected Outcome

A fully working, browser-based mock interview simulator that:
1. Demonstrates core JavaScript programming concepts.
2. Provides meaningful, rule-based evaluation of typed answers.
3. Gives users actionable feedback they can act on immediately.
4. Can be explained clearly in a B.Tech viva examination.
5. Runs without any installation, server, or external dependency.
