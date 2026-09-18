# 06 — Question Bank and Data Model

## Overview

The question bank is defined in `js/questions.js` as a single plain JavaScript object constant named `questionBank`. It is the sole data source for interview questions and contains all metadata required by the evaluation engine.

## Structure

```js
const questionBank = {
    "Software Engineer": [ /* 5 question objects */ ],
    "Data Analyst":      [ /* 5 question objects */ ],
    "Marketing":         [ /* 5 question objects */ ]
};
```

- **3 roles** — Software Engineer, Data Analyst, Marketing
- **Multiple questions per role & difficulty** — Easy, Intermediate, Hard
- **45 subjective questions total** (15 per role)
- **Randomized Selection** — questions are shuffled and exactly 5 are picked per session

## Question Object Schema

Each question is a plain JavaScript object with the following fields:

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | String | Yes | Unique identifier (e.g. `"SE-01"`, `"DA-03"`, `"MK-05"`) |
| `role` | String | Yes | Role name matching the parent key |
| `question` | String | Yes | The question text displayed to the user |
| `concepts` | Array | Yes | Array of concept objects used by `analyzer.matchConcepts()` |
| `idealLength` | Object | Yes | `{ min: Number, max: Number }` — ideal word count range |
| `structure` | Array | Yes | Expected structural elements (e.g. `["definition", "explanation", "example"]`) |
| `tip` | String | No | Optional hint (present on some questions; not displayed in current UI) |

## Concept Object Schema

Each item in `concepts[]`:

| Field | Type | Description |
|---|---|---|
| `name` | String | Human-readable concept name (shown in feedback) |
| `keywords` | Array of Strings | One or more keywords; if ANY matches, the concept is counted as covered |
| `weight` | Number | Relative importance (all weights in a question sum to 100) |

**Example concept object:**
```js
{ name: "Tree structure", keywords: ["tree", "tree structure", "nodes"], weight: 25 }
```

The concept is considered matched if any of its keywords appears as a whole word in the normalized answer text (using `\bkeyword\b` regex).

## Structure Array Values

The `structure` field lists the expected structural elements. Valid values and their signal words:

| Value | Signal Words Detected |
|---|---|
| `"definition"` | refers to, defined as, means, is a, are called, stands for |
| `"explanation"` | because, allows, used for, helps to, works by, so that, therefore, this means |
| `"example"` | for example, for instance, such as, e.g, an example, specifically |
| `"comparison"` | whereas, while, compared with, difference, instead, but, however, on the other hand |
| `"application"` | used in, can be used, practical, in practice, when you, real world |

## Ideal Length

Each question specifies an `idealLength` object:
```js
idealLength: { min: 30, max: 80 }
```

This is used by `analyzer.calculateLengthScore()` to score the answer's word count. The exact length bands are documented in `07_EVALUATION_AND_SCORING.md`.

## Question IDs by Role

### Software Engineer (SE-01 to SE-05)

| ID | Question Topic | idealLength |
|---|---|---|
| SE-01 | What is the DOM and why is it useful? | 30–80 words |
| SE-02 | What is event handling in JavaScript? Give an example. | 30–70 words |
| SE-03 | What is asynchronous JavaScript and why is it useful? | 35–80 words |
| SE-04 | What is an API and how can a web application use one? | 30–75 words |
| SE-05 | Why are arrays and objects commonly used in JavaScript? | 30–70 words |

### Data Analyst (DA-01 to DA-05)

| ID | Question Topic | idealLength |
|---|---|---|
| DA-01 | What is SQL and why is it important for data analysis? | 30–70 words |
| DA-02 | Why is data cleaning important before performing analysis? | 35–80 words |
| DA-03 | What is a SQL JOIN and when would you use it? | 30–70 words |
| DA-04 | What is the difference between mean and median? | 35–80 words |
| DA-05 | Why is data visualization useful when presenting results? | 30–75 words |

### Marketing (MK-01 to MK-05)

| ID | Question Topic | idealLength |
|---|---|---|
| MK-01 | What is a target audience and why is it important? | 30–70 words |
| MK-02 | What is a marketing funnel and what are its main stages? | 35–80 words |
| MK-03 | Which metrics would you use to evaluate a digital marketing campaign? | 35–80 words |
| MK-04 | What is A/B testing and how can it help improve a campaign? | 35–80 words |
| MK-05 | Why is customer retention important for a business? | 30–70 words |

## How State Uses the Question Bank

In `app.js`, `startInterview()` does:
```js
const allRoleQuestions = questionBank[state.selectedRole] || [];
state.questions = allRoleQuestions.slice(0, 5);
```

- `state.selectedRole` is set when the user clicks a role card
- `questionBank[state.selectedRole]` returns the array for that role
- `.slice(0, 5)` takes the first 5 (all 5; each role has exactly 5)
- `state.questions` is the array used throughout the interview

## How Questions Are Consumed

| Consumer | Usage |
|---|---|
| `ui.renderQuestion(q, index, total)` | Reads `q.role`, `q.question` for display |
| `analyzer.matchConcepts(text, q.concepts)` | Reads `q.concepts[].keywords` and `q.concepts[].weight` |
| `analyzer.calculateLengthScore(count, q.idealLength)` | Reads `q.idealLength.min` and `q.idealLength.max` |
| `analyzer.analyzeStructure(text, q.structure)` | Reads `q.structure[]` to know which signals to look for |
| `feedbackEngine.generateFeedback(analysis, q)` | Reads `q.concepts[].name` for missing concept names; `q.idealLength` for suggestions |
