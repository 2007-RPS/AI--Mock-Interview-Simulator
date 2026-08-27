# 07 — Evaluation and Scoring Engine

## Overview

The evaluation engine (`js/analyzer.js`) is the core of the AI-style experience. It takes a raw text answer and a question object, then deterministically computes a score from 0 to 100. Every component of the score is transparent, reproducible, and explainable.

There is no machine learning, no trained model, and no external API. The same answer to the same question will always produce the same score.

---

## The Master Method: `analyzeAnswer(answer, question)`

This is the entry point called from `app.js`:

```js
const analysis = analyzer.analyzeAnswer(answerText, question);
```

It returns a result object:

```js
{
    isEmpty: Boolean,
    wordCount: Number,
    conceptScore: Number,        // 0–100
    qualityScore: Number,        // 0–100
    structureScore: Number,      // 0–100
    communicationScore: Number,  // 0–100
    matchedConcepts: Array,      // concept names that were found
    missingConcepts: Array,      // concept names that were NOT found
    fillerCount: Number,         // number of filler word occurrences
    score: Number,               // final weighted score 0–100
    totalScore: Number           // same as score (used by UI)
}
```

---

## Step 1: Text Normalization — `normalizeText(text)`

```js
return String(text)
    .toLowerCase()
    .trim()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ");
```

What it does:
1. Converts text to lowercase
2. Trims leading/trailing whitespace
3. Removes punctuation (periods, commas, brackets, etc.)
4. Collapses multiple spaces into one

This ensures that "Tree Structure." and "tree structure" match the same keyword.

---

## Step 2: Word Count — `countWords(text)`

```js
const normalized = this.normalizeText(text);
if (normalized === "") return 0;
return normalized.split(" ").length;
```

- Empty string returns 0 (not 1)
- Counts space-separated tokens after normalization

---

## Step 3: Empty Answer Hard Override

If the answer is empty or word count is 0, all scores are immediately set to 0:

```js
if (isEmpty || wordCount === 0) {
    return {
        isEmpty: true,
        wordCount: 0,
        conceptScore: 0, qualityScore: 0,
        structureScore: 0, communicationScore: 0,
        matchedConcepts: [],
        missingConcepts: question.concepts.map(c => c.name),
        fillerCount: 0, score: 0, totalScore: 0
    };
}
```

No further computation occurs for empty answers. This is the correct behavior: a blank answer receives 0 and all concepts are listed as missing.

---

## Step 4: Concept Matching — `matchConcepts(normalizedText, concepts)`

Each question has a `concepts[]` array. Each concept has a `keywords[]` list and a `weight` value.

**Algorithm:**
1. For each concept, check if ANY of its keywords appear as a whole word in the normalized text
2. Use word-boundary regex: `new RegExp("\\b" + keyword + "\\b")`
3. If matched: add concept name to `covered[]`, add weight to score
4. If not matched: add concept name to `missing[]`
5. Normalize total to 0–100: `(score / maxScore) * 100`

**Why word-boundary matching?**
- Prevents false positives: `"umbrella"` will NOT match the filler `"um"`
- Prevents substring matches: `"likewise"` will NOT match keyword `"like"`
- Multi-word keywords like `"tree structure"` are matched as phrases

**Example (SE-01 — DOM question):**

```
Concepts:
  HTML representation  (weight 30)  keywords: ["document", "html", "web page"]
  Tree structure       (weight 25)  keywords: ["tree", "tree structure", "nodes"]
  Manipulation         (weight 25)  keywords: ["manipulate", "modify", "change", "update"]
  JavaScript interaction(weight 20) keywords: ["javascript", "element", "elements"]

MaxScore = 100

Answer: "The DOM is a tree structure of HTML elements that JavaScript can modify."
After normalization: "the dom is a tree structure of html elements that javascript can modify"

Matches:
  HTML representation  → "html" found → +30
  Tree structure       → "tree structure" found → +25
  Manipulation         → "modify" found → +25
  JavaScript interaction → "javascript" found → +20

conceptScore = (100/100) * 100 = 100
```

---

## Step 5: Answer Quality (Length Scoring) — `calculateLengthScore(wordCount, idealLength)`

Each question defines `idealLength: { min, max }`. The scoring uses 5 bands:

| Condition | Score | Meaning |
|---|---|---|
| `wordCount === 0` | 0 | Empty (handled by override above) |
| `wordCount >= min && <= max` | 100 | Ideal range |
| `wordCount < min/2` | 25 | Very short (less than half the minimum) |
| `wordCount < min` | 50 | Below ideal |
| `wordCount > max && <= max + band` | 75 | Slightly over (where band = max - min) |
| `wordCount > max + band` | 50 | Too long |

**Example for SE-01 (min=30, max=80, band=50):**

| Words | Score |
|---|---|
| 0 | 0 |
| 1–14 | 25 |
| 15–29 | 50 |
| 30–80 | 100 |
| 81–130 | 75 |
| 131+ | 50 |

Key insight: overly long answers do NOT automatically score maximum. Excessively long answers score 50 (too long).

---

## Step 6: Structure Analysis — `analyzeStructure(normalizedText, expectedStructure)`

Each question defines `structure[]` listing the expected elements (e.g. `["definition", "explanation", "example"]`).

The engine checks for signal words for each expected element:

| Element | Signal Words |
|---|---|
| `definition` | refers to, defined as, means, is a, are called, stands for |
| `explanation` | because, allows, used for, helps to, works by, so that, therefore, this means |
| `example` | for example, for instance, such as, e.g, an example, specifically |
| `comparison` | whereas, while, compared with, difference, instead, but, however, on the other hand |
| `application` | used in, can be used, practical, in practice, when you, real world |

Each signal word is matched with `\b` word-boundary regex to prevent partial matches.

**Score formula:**
```
structureScore = (detectedCount / expectedCount) * 100
```

**False positive protection:**
- `"This is useful."` → no signal words matched → score = 0
- `"I like JavaScript."` → no signal words → score = 0
- `"because it allows modification"` → "because" and "allows" both match → partial score

---

## Step 7: Communication Analysis — `analyzeCommunication(normalizedText, wordCount, conceptScore)`

### Meaningless Answer Guard
If `wordCount < 5` AND `conceptScore < 20`: returns `score = 10` (near-zero but not zero, as there was an attempt)

### Filler Word Detection
The 7 detected filler words/phrases:
```
"um", "uh", "like", "actually", "basically", "literally", "you know"
```

Each uses `\b` word-boundary matching and global flag (`/g`) to count all occurrences.
Penalty: **−10 points per filler occurrence**

### Repetition Penalty (4-gram sliding window)
1. Split normalized text into words
2. Create all possible 4-word consecutive phrases
3. Count how many appear more than once
4. Penalty: **−10 points per repeated 4-gram** (above first occurrence)

**Why 4-grams?** Individual repeated words (e.g. technical terms like "data", "function") are common and should not be penalized. Only exact repeated 4-word sequences indicate poor communication quality.

### Final Communication Score
```
score = 100 - fillerPenalty - repetitionPenalty
score = Math.max(0, Math.min(100, score))  // clamped 0–100
```

---

## Step 8: Final Weighted Score

```js
const weightedConcept   = concepts.score * 0.45;
const weightedQuality   = qualityScore   * 0.25;
const weightedStructure = struct.score   * 0.20;
const weightedComm      = comm.score     * 0.10;

let finalScore = Math.round(weightedConcept + weightedQuality + weightedStructure + weightedComm);
finalScore = Math.max(0, Math.min(100, finalScore));  // bounds guard
```

| Component | Weight | Rationale |
|---|---|---|
| Concept Coverage | 45% | Primary differentiator — did the candidate know the key concepts? |
| Answer Quality | 25% | Shows effort and completeness |
| Structure & Clarity | 20% | Demonstrates communication skill |
| Communication | 10% | Professional polish |

---

## Score Examples

### Answer A — Strong Answer
```
Question: What is the DOM?
Answer: "The DOM, or Document Object Model, is a tree structure that represents
         an HTML web page. JavaScript can manipulate it by selecting elements
         and modifying their content or style. For example, document.getElementById
         allows you to update text dynamically."

Word count: ~40 words (ideal range 30–80) → qualityScore = 100
Concepts: all 4 matched → conceptScore = 100
Structure: definition ("is a") + explanation ("allows") + example → structureScore ≈ 100
Communication: no fillers → communicationScore = 100

Final = (100×0.45) + (100×0.25) + (100×0.20) + (100×0.10) = 100
```

### Answer B — Weak Answer
```
Question: What is the DOM?
Answer: "It is like a thing in HTML"

Word count: 7 words (< min/2 = 15) → qualityScore = 25
Concepts: "html" matched but "like" is a filler not a keyword match → conceptScore ≈ 20
Structure: no signal words → structureScore = 0
Communication: "like" is a filler → fillerPenalty = 10 → communicationScore = 90

Final ≈ (20×0.45) + (25×0.25) + (0×0.20) + (90×0.10)
      = 9 + 6.25 + 0 + 9 = ~24
```

### Answer C — Empty Answer
```
All scores = 0. totalScore = 0.
```
