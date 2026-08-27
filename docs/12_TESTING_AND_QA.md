# 12 — Testing and QA

## Testing Approach

This project uses **code audit verification** (inspection of source code logic) as its primary QA method. Manual browser testing is planned as a separate phase.

> **Important distinction:**
> - "Code audit passed" = logic was inspected and verified correct by reading the source code
> - "Manual browser testing" = running the actual app in a browser and exercising each flow
> Manual browser testing has NOT yet been completed as a formal documented exercise.

---

## Code Audit Summary

A full independent audit was performed covering:
- All mandatory original assignment requirements (all PASS)
- Architecture and module responsibilities
- Cross-module data flow and property name consistency
- Timer behavior and race condition handling
- Empty answer edge cases (manual vs. timeout)
- Score formula verification (exact 45/25/20/10 weights)
- DOM safety / XSS prevention
- Responsive CSS breakpoints
- Accessibility features
- Performance (no runaway intervals, no memory leaks)

**Audit verdict: READY FOR TESTING — 0 critical, 0 high issues.**  
2 medium issues were found and fixed. 3 low issues were noted (2 fixed, 1 not applicable).

---

## Test Matrix — Functional

| # | Test Case | Input / Action | Expected Result | Audit Status | Manual Status |
|---|---|---|---|---|---|
| F01 | Home screen loads | Open index.html | Home screen visible with Start button | PASS (code) | Pending |
| F02 | Navigate to Setup | Click Start Interview | Setup screen visible | PASS (code) | Pending |
| F03 | Role card selection | Click Software Engineer | Card highlighted; Begin button enabled | PASS (code) | Pending |
| F04 | Role change | Click DA after SE | DA card selected; SE deselected | PASS (code) | Pending |
| F05 | Begin without role | Click Begin (no role selected) | Nothing happens (guard prevents it) | PASS (code) | Pending |
| F06 | Interview starts | Select role + click Begin | Q1 displayed; timer starts at 60s | PASS (code) | Pending |
| F07 | Question numbering | First question shown | Shows "Question 1/5"; step 1 active | PASS (code) | Pending |
| F08 | Word count live | Type in textarea | Word count updates in real time | PASS (code) | Pending |
| F09 | Submit disabled empty | Empty textarea | Submit button is disabled | PASS (code) | Pending |
| F10 | Submit enabled with text | Type any character | Submit button becomes enabled | PASS (code) | Pending |
| F11 | Manual submission | Type answer, click Submit | Feedback card appears; timer stops | PASS (code) | Pending |
| F12 | Double submit prevention | Click Submit twice rapidly | Only one submission recorded | PASS (code) | Pending |
| F13 | Next question | Click Next after Q1 feedback | Q2 displayed; fresh 60s timer | PASS (code) | Pending |
| F14 | Answers stored in order | Submit 5 answers | state.answers has 5 entries in order | PASS (code) | Pending |
| F15 | Q5 last question | Submit Q5 answer | Button shows "View Results" | PASS (code) | Pending |
| F16 | View Results | Click View Results after Q5 | Results screen shown | PASS (code) | Pending |
| F17 | Retry | Click Try Again | Home screen; all state cleared | PASS (code) | Pending |
| F18 | Home button | Click Home on Results | Home screen; all state cleared | PASS (code) | Pending |

---

## Test Matrix — Timer

| # | Test Case | Input / Action | Expected Result | Audit Status | Manual Status |
|---|---|---|---|---|---|
| T01 | Timer starts at 60 | Begin interview | Timer shows 60s | PASS (code) | Pending |
| T02 | Countdown | Wait 3 seconds | Timer shows 57s | PASS (code) | Pending |
| T03 | Warning state | Wait until <=30s | Timer circle turns amber | PASS (code) | Pending |
| T04 | Critical state | Wait until <=10s | Timer circle turns red | PASS (code) | Pending |
| T05 | Timer stops on submit | Submit answer manually | Timer halts immediately | PASS (code) | Pending |
| T06 | Timeout auto-submit | Wait 60s without submitting | Answer submitted automatically | PASS (code) | Pending |
| T07 | Timeout empty answer | Wait 60s with empty textarea | Score 0; interview continues normally | PASS (code) | Pending |
| T08 | Fresh timer on new Q | After Next Question | Timer resets to 60s for new question | PASS (code) | Pending |
| T09 | Timer cleared on Retry | Click Retry mid-interview | Timer stops; no orphaned intervals | PASS (code) | Pending |
| T10 | No duplicate interval | Begin interview twice | Only one interval active at a time | PASS (code) | Pending |

---

## Test Matrix — Scoring

| # | Test Case | Input | Expected Result | Audit Status |
|---|---|---|---|---|
| S01 | Empty answer score | Empty string | totalScore = 0 | PASS (code) |
| S02 | All concepts matched | Answer containing all expected keywords | conceptScore = 100 | PASS (code) |
| S03 | Ideal length | Answer word count in min–max range | qualityScore = 100 | PASS (code) |
| S04 | Very short answer | Word count < min/2 | qualityScore = 25 | PASS (code) |
| S05 | Slightly long answer | max < words <= max+band | qualityScore = 75 | PASS (code) |
| S06 | Too long answer | Words > max+band | qualityScore = 50 | PASS (code) |
| S07 | Filler word penalty | Answer containing "um" | communicationScore -= 10 | PASS (code) |
| S08 | Word boundary — umbrella | Answer contains "umbrella" | "um" NOT flagged as filler | PASS (code) |
| S09 | Word boundary — likewise | Answer contains "likewise" | "like" NOT flagged as filler | PASS (code) |
| S10 | Meaningless short answer | "kijn" (1 word, no concepts) | communicationScore = 10; totalScore near 0 | PASS (code) |
| S11 | Structure detection | Answer with "because" | explanation structure detected | PASS (code) |
| S12 | No false structure | "This is useful." | No structure signal detected | PASS (code) |
| S13 | Score formula | Manual calculation | (C*0.45)+(Q*0.25)+(S*0.20)+(Comm*0.10) | PASS (code) |
| S14 | Score bounds | Any answer | 0 <= totalScore <= 100 always | PASS (code) |

---

## Test Matrix — Results Screen

| # | Test Case | Expected Result | Audit Status |
|---|---|---|---|
| R01 | Overall score | Average of 5 totalScore values, rounded | PASS (code) |
| R02 | Category averages | Average of each component across 5 results | PASS (code) |
| R03 | Readiness: Interview Ready | finalScore >= 90 | PASS (code) |
| R04 | Readiness: Nearly Ready | finalScore 75–89 | PASS (code) |
| R05 | Readiness: Needs Practice | finalScore 60–74 | PASS (code) |
| R06 | Readiness: More Prep Needed | finalScore < 60 | PASS (code) |
| R07 | Q-review cards | 5 cards shown for Q1–Q5 | PASS (code) |

---

## Test Matrix — Security

| # | Test Case | Input | Expected Result | Audit Status |
|---|---|---|---|---|
| SEC01 | XSS attempt in answer | `<script>alert(1)</script>` typed as answer | Text stored, never executed; shown safely via textContent | PASS (code) |
| SEC02 | HTML tags in answer | `<b>bold</b>` typed | Rendered as literal plain text, not parsed as HTML | PASS (code) |
| SEC03 | No localStorage usage | After completing interview | localStorage remains empty | PASS (code) |
| SEC04 | Refresh clears session | Refresh during interview | Returns to Home; no session restored | PASS (code) |

---

## Test Matrix — Responsive Design

| # | Viewport | Check | Status |
|---|---|---|---|
| RES01 | 320px | No horizontal scroll; all content visible | Pending manual |
| RES02 | 375px | Buttons usable; textarea accessible | Pending manual |
| RES03 | 768px | 1-column layout; timer 80px; strip stacks | Pending manual |
| RES04 | 1024px | 2-column layout; orbs reduced | Pending manual |
| RES05 | 1440px | Content centered; max-width respected | Pending manual |

---

## Test Matrix — Accessibility

| # | Check | Expected | Audit Status |
|---|---|---|---|
| A01 | Keyboard navigation | Tab through all interactive elements | PASS (code) |
| A02 | Focus visible | Indigo outline on focused buttons | PASS (code) |
| A03 | Reduced motion | All CSS animations disabled via media query | PASS (code) |
| A04 | Screen reader labels | aria-label and sr-only label present on textarea | PASS (code) |
| A05 | Live regions | Timer and feedback use aria-live="polite" | PASS (code) |
