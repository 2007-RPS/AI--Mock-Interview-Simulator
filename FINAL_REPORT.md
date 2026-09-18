# Woxsen University
## School of Technology
### B.Tech – Computer Science and Engineering
### PROJECT BASED LEARNING REPORT

**Title of the Project**
(DESIGN AND IMPLEMENTATION OF AN AI-STYLE MOCK INTERVIEW SIMULATOR USING RULE-BASED EVALUATION)

Course Code: __________
Course Name: __________
Semester: __________
Academic Year: 2026-27

Submitted by:
Name: __________
Register Number: __________
Section: __________

Under the Guidance of:
Faculty Name: __________
Designation: __________
Department of Computer Science and Engineering
Month, Year

---

## DECLARATION

I hereby declare that the Project Title "DESIGN AND IMPLEMENTATION OF AN AI-STYLE MOCK INTERVIEW SIMULATOR USING RULE-BASED EVALUATION" submitted by me is an original work carried out under the guidance of the faculty mentioned above.

I confirm that this work has not been submitted in part or full for the award of any degree, diploma, or other academic qualification in this or any other institution.

All sources of information used in this case study have been properly acknowledged and cited as per university referencing standards.

I further declare that the plagiarism percentage is within the permissible limit prescribed by the institution.

Place: ____________
Date: ____________

Signature of the Candidate
Name: __________
Register Number: __________

---

## CERTIFICATE

This is to certify that the Project titled "DESIGN AND IMPLEMENTATION OF AN AI-STYLE MOCK INTERVIEW SIMULATOR USING RULE-BASED EVALUATION" is a bonafide work carried out by Mr./Ms. __________ (Register No: ___________), B.Tech – Computer Science and Engineering, during the Academic Year 2026-27, under my supervision and guidance.

Guide Signature
(Name of the Guide)
Designation

---

## ACKNOWLEDGEMENT

The success and final outcome of this project required a lot of guidance and assistance from many people, and I am extremely privileged to have got this all along the completion of my project. All that I have done is only due to such supervision and assistance, and I would not forget to thank them.

I respect and thank my guide [Faculty Name], [Designation], for providing me an opportunity to do the project work in Woxsen University and giving me all support and guidance, which made me complete the project duly. I am extremely thankful to them for providing such a nice support and guidance.

I am thankful to and fortunate enough to get constant encouragement, support, and guidance from all teaching staffs of the Department of Computer Science and Engineering who helped me in successfully completing my project work. Also, I would like to extend my sincere esteem to all staff in the laboratory for their timely support.

Name: __________
Register Number: __________

---

## ABSTRACT

Job interviews are highly stressful, and students often have limited opportunities to practice effectively before facing real recruiters. Traditional preparation methods, such as reading technical theory, watching tutorial videos, or conducting informal peer practice, fail to simulate the pressure of formulating and delivering a comprehensive answer within a strict time limit while being systematically evaluated. This project addresses this gap by designing and implementing a browser-based mock interview simulator that provides students with a structured, timed, and interactive environment to practice role-specific technical and behavioral questions.

The proposed solution is a client-side Single Page Application (SPA) built using HTML5, CSS3, and vanilla JavaScript without relying on any external backend databases or APIs. The term "AI-Style" refers to the structured, automated, and explainable feedback experience. The MVP itself uses deterministic rule-based evaluation rather than machine-learning or generative-AI models. Users can select from three predefined professional roles: Software Engineer, Data Analyst, and Marketing. During the mock interview, a 60-second countdown timer runs concurrently, simulating real-world time pressure. The core of the application is a deterministic, rule-based evaluation engine that analyzes the user's typed responses. It employs text normalization, word counting, regular expression matching, and heuristic structural analysis to compute scores across four distinct dimensions: Concept Coverage (45%), Answer Quality (25%), Structure & Clarity (20%), and Communication (10%).

By relying exclusively on client-side deterministic rules, the simulator generates highly transparent and explainable feedback indicating missing concepts, detected filler words, structural effectiveness, and an overall readiness level. The results demonstrate the viability of using heuristic rule-based systems to provide meaningful formative assessment in educational tools. Future scope includes expanding the question bank and introducing progressive difficulty levels to further enhance the preparatory experience for engineering and management students.

---

## TABLE OF CONTENTS
1. ABSTRACT
2. INTRODUCTION
   2.1 Background
   2.2 Motivation and Real-World Relevance
   2.3 Scope and Organization of Report
3. PROBLEM STATEMENT AND OBJECTIVES
   3.1 Problem Definition
   3.2 Objectives
   3.3 Constraints
   3.4 Assumptions
4. LITERATURE REVIEW / BACKGROUND
5. METHODOLOGY AND SYSTEM DESIGN
   5.1 Overall System Architecture
   5.2 Flowchart / Block Diagram
   5.3 Algorithm Explanation
   5.4 Tools and Technologies
   5.5 Use Case Diagram
   5.6 Data Flow Diagram
6. IMPLEMENTATION
   6.1 Project Structure
   6.2 HTML Implementation
   6.3 CSS/UI Implementation
   6.4 Question Bank Implementation
   6.5 Central State Management
   6.6 Interview Flow
   6.7 Timer Implementation
   6.8 Answer Capture
   6.9 Evaluation Engine
   6.10 Feedback Engine
   6.11 Results Aggregation
   6.12 Security / DOM Safety
   6.13 Responsive Design
   6.14 Pseudocode
   6.15 Screenshots / Outputs
7. RESULTS AND DISCUSSION
   7.1 Code-Level Verification
   7.2 Manual Browser Testing
   7.3 Illustrative Scoring Analysis
   7.4 Limitations
8. CONCLUSION AND FUTURE SCOPE
REFERENCES

---

## LIST OF FIGURES
Figure 1. Overall System Architecture
Figure 2. Application Flowchart
Figure 3. Evaluation Algorithm Flowchart
Figure 4. Use Case Diagram
Figure 5. Data Flow Diagram
Figure 6. Home Screen
Figure 7. Role Selection Screen
Figure 8. Interview Screen with Timer
Figure 9. Question Feedback Card
Figure 10. Final Results Screen

---

## LIST OF TABLES
Table 1. Literature Review Comparison
Table 2. Project Objectives
Table 3. Functional Requirements
Table 4. Non-Functional Requirements
Table 5. Module Responsibilities
Table 6. Question Bank Summary
Table 7. Scoring Components and Weights
Table 8. Evaluation Rules
Table 9. Test Cases
Table 10. Results Summary
Table 11. Limitations and Future Enhancements
Table 12. Requirements Traceability

---

# 1. ABSTRACT
(Included in preliminary pages as per standard formatting guidelines, refer to page 5).

# 2. INTRODUCTION

## 2.1 Background
The transition from academic environments to the professional industry is a significant milestone for engineering and management students. A barrier in this transition is the technical and behavioral interview process. Modern recruitment pipelines frequently employ preliminary screening rounds, asynchronous video interviews, and rigorous technical panels that demand candidates to articulate their thoughts clearly, concisely, and under strict time constraints. Despite possessing adequate theoretical knowledge, many students struggle during interviews due to a lack of practice in answering questions cohesively within a limited timeframe.

Historically, students have relied on passive preparation techniques such as reviewing standard interview questions, reading textbook definitions, and watching online tutorials. While these methods build foundational knowledge, they fail to replicate the cognitive load and stress associated with a live interview environment. Active practice through peer-to-peer mock interviews or career counseling sessions is effective but often constrained by the availability of qualified evaluators and scheduling conflicts.

In recent years, software solutions have emerged to assist with interview preparation. Many commercial platforms now leverage Artificial Intelligence (AI), Machine Learning (ML), and Large Language Models (LLMs) to provide conversational practice and feedback. However, these systems are often proprietary, require continuous internet connectivity, incur API costs, and sometimes provide opaque feedback where users do not understand exactly why they lost points. 

This project explores an alternative approach: building an educational simulator that provides immediate, explainable, and deterministic feedback. The term "AI-Style" refers to the structured, automated, and explainable feedback experience. The MVP itself uses deterministic rule-based evaluation rather than machine-learning or generative-AI models. By engineering a robust, rule-based text analysis engine using JavaScript, it is possible to evaluate the presence of core concepts, structural signaling words, and communicative clarity in a candidate's answer. This approach provides an accessible, offline-capable, and transparent educational tool for students to refine their interview techniques.

## 2.2 Motivation and Real-World Relevance
The primary motivation behind this project is to create an educational utility that addresses the anxiety and unpreparedness students face during campus placements. A timed mock interview simulator forces the user to actively retrieve information from memory and construct a written response under pressure, bridging the gap between passive knowledge absorption and active knowledge demonstration.

From a technical perspective, this project was conceived as a Project-Based Learning (PBL) assignment to demonstrate proficiency in web development technologies. Building a functional, interactive application in the browser provides a canvas to apply fundamental Computer Science principles, including state management, asynchronous event handling, Document Object Model (DOM) manipulation, and algorithmic text processing. 

The decision to strictly avoid external dependencies, backend databases, and third-party APIs was a deliberate pedagogical constraint. It necessitates writing self-contained client-side code. This constraint ensures the application remains free to host and reduces privacy concerns associated with transmitting interview responses to external services. Furthermore, constructing a deterministic evaluation engine teaches valuable lessons in heuristic algorithm design, regular expressions, and modular software architecture. 

By categorizing the simulator into distinct professional roles—Software Engineer, Data Analyst, and Marketing—the application caters to a diverse student body, demonstrating its versatility as a preparation tool.

## 2.3 Scope and Organization of Report
The scope of this project involves the design, development, and code-level verification of a client-side web application. The implementation encompasses a graphical user interface consisting of multiple interactive screens (Home, Setup, Interview, Results), a static JSON-like question bank, a countdown timer mechanism, and a multi-layered rule-based evaluation engine. The evaluation engine is strictly deterministic, employing text normalization and pattern matching to score answers based on concept coverage (45%), answer length quality (25%), structural markers (20%), and communication clarity (10%). The project intentionally excludes voice input, backend storage, user authentication, and generative AI features to focus on robust JavaScript logic.

The remainder of this report is organized as follows:
- **Chapter 3: Problem Statement and Objectives** defines the specific issues addressed by the system and outlines the project goals and constraints.
- **Chapter 4: Literature Review / Background** reviews existing systems and academic works related to automated assessment and interview simulation.
- **Chapter 5: Methodology and System Design** details the architectural framework, data flow, and algorithmic approach chosen for the simulator.
- **Chapter 6: Implementation** provides a comprehensive technical breakdown of the modules, code logic, security considerations, and UI development.
- **Chapter 7: Results and Discussion** presents the outputs, scoring examples, and an interpretation of the system's performance.
- **Chapter 8: Conclusion and Future Scope** summarizes the learning outcomes and suggests realistic pathways for future enhancements.

# 3. PROBLEM STATEMENT AND OBJECTIVES

## 3.1 Problem Definition
Engineering and management students frequently fail to clear technical screening rounds due to an inability to articulate structured, comprehensive answers under time pressure. Existing offline preparation methods do not adequately simulate the stress of a timed interview, while existing software solutions are often paywalled, require internet-dependent external APIs, and provide non-deterministic feedback that is difficult for students to interpret. Therefore, there is a need for a lightweight, accessible, privacy-preserving, and transparent mock interview simulator that provides structured, rule-based feedback on candidate responses.

## 3.2 Objectives
The main objectives of this project are defined to ensure a focused prototype:
- **Obj 1:** To develop a browser-based Single Page Application (SPA) using HTML5, CSS3, and vanilla JavaScript without relying on frameworks like React or Angular.
- **Obj 2:** To implement a time-constrained interview environment featuring a 60-second countdown timer that automatically submits the user's response upon expiration.
- **Obj 3:** To design a deterministic, rule-based text evaluation engine capable of scoring user input across four metrics: Concept Coverage, Answer Quality, Structure & Clarity, and Communication.
- **Obj 4:** To generate transparent, explainable per-question feedback highlighting matched concepts, missing keywords, structural effectiveness, and filler word usage.
- **Obj 5:** To aggregate individual question scores into a final session summary that categorizes the user's overall interview readiness.
- **Obj 6:** To ensure the application operates on the client side and mitigates Cross-Site Scripting (XSS) via safe DOM manipulation techniques.

**Table 2. Project Objectives**

| Objective | Description | Measure of Success |
|---|---|---|
| Obj 1 | Client-Side SPA | System functions completely in a browser without external libraries. |
| Obj 2 | Timed Interview | Timer counts down from 60s and correctly triggers submission. |
| Obj 3 | Rule-Based Engine | Evaluator correctly assigns scores using regex and logic rules. |
| Obj 4 | Explainable Feedback | UI displays specific missing concepts and strengths clearly. |
| Obj 5 | Final Readiness | System aggregates scores and assigns appropriate readiness labels. |
| Obj 6 | Security and Offline | Safe DOM rendering implemented, no API calls executed. |

## 3.3 Constraints
- **No Backend or Database:** The system must operate entirely on the client-side to ensure zero hosting costs and minimize privacy risks. State is maintained solely in browser memory and is lost upon page refresh.
- **No External APIs or Machine Learning Models:** The evaluation logic must be heuristic and rule-based. The term "AI-Style" refers to the presentation and depth of the feedback, not the underlying technical mechanism.
- **No External Libraries:** The project must not use external CSS frameworks (e.g., Tailwind, Bootstrap) or JavaScript libraries (e.g., jQuery).

**Table 3. Functional Requirements**

| Req ID | Requirement | Description |
|---|---|---|
| FR-01 | Role Selection | Users must be able to select from at least 3 predefined roles. |
| FR-02 | Timed Submission | The system must enforce a 60-second timer and auto-submit at 0s. |
| FR-03 | Manual Submission | Users must be able to manually submit answers before the timeout. |
| FR-04 | Evaluation Metrics | Answers must be scored on 4 specific criteria. |
| FR-05 | Feedback UI | Users must receive instant feedback per question. |

**Table 4. Non-Functional Requirements**

| Req ID | Requirement | Description |
|---|---|---|
| NFR-01 | Offline Capability | After resources are loaded, the core interview operates without a backend. |
| NFR-02 | DOM Safety | The system must prevent XSS via textContent and safe rendering. |
| NFR-03 | Performance | Client-side execution typically executes with negligible processing delay. |
| NFR-04 | Responsive UI | The design must adapt to mobile and desktop viewports. |

## 3.4 Assumptions
- It is assumed that the user is interacting with the application via a modern web browser equipped with standard ES6+ JavaScript execution capabilities.
- It is assumed that the user will type their responses using a physical or on-screen keyboard, as voice-to-text functionality is outside the current MVP scope.
- It is assumed that the predefined keywords in the static question bank reflect the expected core concepts for each respective role and question.

# 4. LITERATURE REVIEW / BACKGROUND

The development of automated assessment tools and mock interview systems has been an active area of research in educational technology. To contextualize the proposed rule-based simulator, several relevant academic and industry approaches were reviewed.

**1. Automated Essay Scoring (AES) Systems (Dikli, 2006)**
Dikli provides an overview of early Automated Essay Scoring systems like e-rater and Intellimetric. These systems historically relied on natural language processing (NLP) to extract linguistic features, word counts, and structural elements to grade student essays. The proposed mock interview simulator draws inspiration from these early heuristic AES systems, particularly in its approach to analyzing answer length (Answer Quality metric) and detecting transitional phrases (Structure & Clarity metric) to gauge response cohesion.

**2. Keyword-Based Short Answer Grading (Burrows et al., 2015)**
Burrows et al. reviewed various methodologies for automatically grading short-text answers. A prevalent approach in deterministic grading systems involves keyword and concept mapping. By defining a rubric of expected keywords and applying regular expressions, systems can reliably assess the factual correctness of a short answer. Our simulator implements this directly via the Concept Coverage metric (weighted at 45%), iterating through a predefined array of role-specific concepts and utilizing regex to detect word boundaries.

**3. The Role of Time Pressure in Computer-Based Assessments (Attali, 2010)**
Attali's research explores how time limits affect test-taker performance and anxiety in computer-based assessments. The study indicates that strict countdown timers alter the cognitive strategy of the user, forcing rapid retrieval and prioritization of information. The proposed system incorporates a strict 60-second `setInterval` countdown to induce cognitive stress, relevant to the proposed approach of replicating the psychological environment of a technical interview.

**4. Design of Web-Based Educational Simulators (Liao, 2005)**
Liao discusses the pedagogical value of web-based simulators that do not require installation and provide immediate feedback. The research emphasizes that immediate, formative feedback is effective for learning. The AI-Style Mock Interview Simulator adheres to this principle by rendering a feedback card immediately after each question is submitted, detailing which concepts were missing before the user proceeds to the next question.

**5. Explainable AI and Transparent Assessment (Conati et al., 2018)**
With the rise of black-box machine learning models, Conati et al. highlight the necessity for explainable student models in intelligent tutoring systems. When users are graded by an algorithm, they must understand the rationale behind the score to improve. Because our simulator uses a deterministic, rule-based algorithm rather than a neural network, the system supports the design rationale for providing highly transparent and explainable feedback. The UI explicitly breaks down the score into its four constituent components.

**6. JavaScript for Client-Side Educational Tools (Flanagan, 2011)**
Flanagan's guide on JavaScript underscores the capacity of the modern browser to act as an independent computational platform. By leveraging the Document Object Model (DOM) and ES6+ features, state machines and string processing algorithms can execute on the client side. This validates the architectural decision to build the entire simulator without a backend server, ensuring offline capabilities.

**Table 1. Literature Review Comparison**

| Author/Year | Approach | Technology | Evaluation Method | Strength | Limitation | Relevance to Proposed System |
|---|---|---|---|---|---|---|
| Dikli (2006) | Automated Essay Scoring | Early NLP | Linguistic feature extraction | High correlation with human graders | Computationally heavy | Inspired length and structure scoring |
| Burrows et al. (2015) | Short Answer Assessment | Regex/String Matching | Keyword and concept mapping | Deterministic and fast | Cannot detect synonyms effectively | Direct basis for Concept Coverage (45%) |
| Attali (2010) | Computer-Based Testing | Experimental UI | Analysis of time limits on performance | Proves time pressure aids simulation | Focuses on testing, not practice | Justifies the 60-second timer feature |
| Liao (2005) | Web-Based Simulators | HTML/JS | Immediate formative feedback | High accessibility | Limited to programmed logic | Validates SPA browser-based architecture |
| Conati et al. (2018) | Explainable Tutoring | Heuristic algorithms | Transparent score breakdown | High user trust | Less adaptable than ML models | Validates the transparent feedback UI design |

# 5. METHODOLOGY AND SYSTEM DESIGN

## 5.1 Overall System Architecture
The application is structured as a client-side Single Page Application (SPA). The application follows a modular separation-of-concerns architecture using modular JavaScript files loaded through standard script tags in a defined dependency order. The architecture ensures that UI rendering, state management, timer control, and text analysis remain independent logical units.

The architecture consists of three primary layers:
1. **Presentation Layer (HTML/CSS):** Responsible for the visual structure, responsive layout, CSS animations, and DOM elements.
2. **Controller Layer (app.js & ui.js):** Manages the application lifecycle, orchestrates screen transitions, handles DOM events (clicks, input), and updates the visual state safely.
3. **Business Logic Layer (analyzer.js, feedback.js, timer.js, questions.js):** Contains the core logic for running the interview, enforcing time limits, assessing textual input via heuristic rules, and generating feedback strings.

**Figure 1. Overall System Architecture**
[IMAGE: fig1.png]

## 5.2 Flowchart / Block Diagram
The system architecture flows sequentially from the static HTML entry point down through the JavaScript modules. The user journey is mapped to guide the user from role selection through a structured five-question interview, culminating in an aggregated results dashboard.

**Figure 2. Application Flowchart**
[IMAGE: fig2.png]

## 5.3 Algorithm Explanation
The core algorithmic complexity resides in the `analyzer.js` module, which processes the user's raw text input and outputs a deterministic score (0-100). The algorithm executes the following steps sequentially:

1. **Sanitization and Normalization:** The input text is converted to lowercase, stripped of punctuation, and excessive whitespace is condensed to single spaces.
2. **Empty Answer Override:** If the raw input is entirely empty or word count equals zero, the algorithm immediately bypasses further matching and assigns a score of 0. Empty answers are not rewarded in the communication sub-score.
3. **Concept Extraction (45% Weight):** The algorithm iterates over a predefined list of required concepts. For each concept, it checks an array of associated keywords against the normalized text using word-boundary regular expressions (`\bkeyword\b`). If a match is found, the concept weight is added to a running total.
4. **Quality / Length Analysis (25% Weight):** The total word count is compared against a defined ideal length band (e.g., 30 to 80 words). Answers falling within the band receive 100%. Answers that are too short (less than half the minimum) or too long receive heuristic penalties (e.g., 25% or 50%).
5. **Structural Analysis (20% Weight):** The algorithm checks for the presence of specific structural transition words categorized into definitions, explanations, examples, comparisons, and applications. Finding expected structural signals increases this sub-score.
6. **Communication / Clarity (10% Weight):** The algorithm applies negative penalties for communication flaws. It scans for common filler words (e.g., "um", "like", "basically") using regex, penalizing the score for each occurrence. It also checks for repeated four-word phrases (n-grams) to detect redundant rambling.
7. **Score Aggregation:** The final formula applies the defined weights, rounds the result, and clamps the score rigorously between 0 and 100 to prevent out-of-bounds calculations.

**Figure 3. Evaluation Algorithm Flowchart**
[IMAGE: fig3.png]

## 5.4 Tools and Technologies
- **HTML5:** Provides the semantic structure and accessibility attributes (ARIA labels, roles).
- **CSS3:** Handles responsive design via media queries, layout techniques (Flexbox, Grid), and custom visual effects.
- **JavaScript:** The programming language used for all logic, utilizing modern features such as arrow functions, template literals, destructuring, and block-scoping paradigms.
- **Git & GitHub:** Used for version control, tracking code modifications, and maintaining the project repository securely.

## 5.5 Use Case Diagram
The use case diagram represents the interaction between the user and the major functions of the simulator.

**Figure 4. Use Case Diagram**
[IMAGE: fig4.png]

## 5.6 Data Flow Diagram
The Data Flow Diagram models how the typed response travels through `app.js`, `analyzer.js`, the scoring components, `feedback.js`, and `ui.js` in the heuristic evaluation pipeline.

**Figure 5. Data Flow Diagram**
[IMAGE: fig5.png]

# 6. IMPLEMENTATION

This chapter details the technical implementation of the AI-Style Mock Interview Simulator, mapping the architectural design to concrete source code.

## 6.1 Project Structure
The project is organized to promote modularity and maintainability:
```
/
├── index.html            # Main entry point, UI skeleton
├── css/
│   └── style.css         # Styling, animations, media queries
├── js/
│   ├── animations.js     # Placeholder for future JS animations
│   ├── questions.js      # Static JSON-like database of roles/questions
│   ├── analyzer.js       # Core heuristic evaluation algorithms
│   ├── feedback.js       # Translates scores into readable feedback text
│   ├── timer.js          # Countdown logic and interval management
│   ├── ui.js             # DOM manipulation and screen rendering
│   └── app.js            # Central state machine and event listeners
└── docs/                 # PBL documentation files
```

The script loading order in `index.html` is strictly ordered to ensure dependencies are available before they are utilized. `app.js` is loaded last, as it initializes the application state using the preceding modules.

**Table 5. Module Responsibilities**

| Module | Primary Responsibility | Interaction |
|---|---|---|
| index.html | Skeleton SPA container | Hosts all scripts and styles |
| style.css | UI styles and keyframe animations | Defines visual layout and motion |
| app.js | State management and event listening | Orchestrates all other JS modules |
| analyzer.js | Text processing and scoring | Invoked by app.js, returns score obj |
| feedback.js | String generation | Parses analyzer output for the UI |
| timer.js | Countdown clock | Synchronized by app.js |
| ui.js | DOM mutation | Updates screen elements safely |

## 6.2 HTML Implementation
`index.html` implements a Single Page Application (SPA) structure. Instead of navigating between different HTML files, the application uses four primary `<section>` elements. Only one section is assigned the `active` CSS class at any given time, while the others receive a `hidden` class (`display: none`). 
Semantic HTML tags such as `<main>`, `<header>`, and `<section>` are used. Accessibility is considered by including `aria-live="polite"` on the timer and feedback containers to notify screen readers of dynamic content updates.

## 6.3 CSS/UI Implementation
The application utilizes a modern visual aesthetic characterized by dark themes, gradients, and glassmorphism.
- **Variables:** CSS custom properties (`:root`) define the color palette, typography, and spacing.
- **Glassmorphism:** The `.card-glass` class implements `background: rgba(255, 255, 255, 0.05)` and `backdrop-filter: blur(10px)` to create a frosted glass effect.
- **Animations:** All current visual animations are implemented through CSS `@keyframes`. The `animations.js` file is an intentional architectural placeholder for future JavaScript-driven animation functionality.
- **Responsive Design:** Media queries (`@media (max-width: 768px)`) adapt the layout for mobile devices by adjusting font sizes, stacking grid columns into single rows, and shrinking the visual timer.

## 6.4 Question Bank Implementation
The `questions.js` file acts as an in-memory, read-only database. It exports a `questionBank` object containing arrays of questions mapped to the three roles: "Software Engineer", "Data Analyst", and "Marketing".
Each question is a complex object containing:
- `id`: Unique identifier.
- `text`: The interview prompt.
- `concepts`: An array of required concepts, each with a `name`, numeric `weight`, and an array of `keywords` (synonyms and variations).
- `idealLength`: An object defining the `min` and `max` word count expected for a high-quality answer.
- `structure`: An array of expected structural markers (e.g., `["definition", "explanation"]`).

**Table 6. Question Bank Summary**

| Role | Total Questions | Example Question Topic |
|---|---|---|
| Software Engineer | 5 | Object-Oriented Programming (OOP) |
| Data Analyst | 5 | SQL vs NoSQL Differences |
| Marketing | 5 | A/B Testing Methodology |

## 6.5 Central State Management
`app.js` serves as the central controller. It maintains a global `state` object:
```javascript
const state = {
    currentRole: null,
    currentQuestionIndex: 0,
    questions: [],
    answers: [], 
    results: [], 
    answerSubmitted: false
};
```
The `state.answerSubmitted` boolean is a synchronization guard. It prevents a race condition where a user clicks "Submit" at the exact millisecond the timer triggers an auto-submit timeout, ensuring the evaluation logic only executes once per question. State is intentionally wiped if the user refreshes the browser, as persistent storage was explicitly excluded from the MVP.

## 6.6 Interview Flow
The user journey is managed by transition functions in `app.js` and `ui.js`:
1. **Setup:** The user selects a role, updating `state.currentRole` and enabling the "Begin" button.
2. **Begin Interview:** `state.questions` is populated with the 5 questions from `questionBank` corresponding to the selected role.
3. **Load Question:** The UI renders the current question text. The timer is initialized, and `state.answerSubmitted` is set to `false`.
4. **Submission:** Upon clicking submit or reaching 0 seconds, `timer.stop()` is invoked before starting a new interval. The input is captured, sent to `analyzer.js`, and the returned score is pushed to `state.results`. The UI is updated to show the feedback card.
5. **Next Question:** Increments `state.currentQuestionIndex` and loops back to step 3, or transitions to the Results screen if all 5 questions are complete.

## 6.7 Timer Implementation
The `timer.js` module encapsulates the countdown logic using the browser's `setInterval` API. 
```javascript
start(durationSeconds, onTick, onComplete) {
    this.stop(); 
    this.timeLeft = durationSeconds;
    // ...
    this.intervalId = setInterval(() => {
        this.timeLeft--;
        if (this.timeLeft <= 0) {
            this.stop();
            if (onComplete) onComplete();
        } else {
            if (onTick) onTick(this.timeLeft);
        }
    }, 1000);
}
```
Invoking `this.stop()` at the beginning of `start()` prevents duplicate intervals from running concurrently. Timeout and manual submission use the same submission path.

## 6.8 Answer Capture
Answer capture relies on extracting the `value` property from the `<textarea>` DOM node. To ensure accurate scoring, the input is passed to `analyzer.normalizeText()`, which strips punctuation and converts all characters to lowercase, ensuring that string matching is case-insensitive. If a timeout occurs on an empty field, the evaluator forcefully assigns a score of 0.

## 6.9 Evaluation Engine
The evaluation logic in `analyzer.js` is the core functionality. 

**Concept Matching Logic:**
```javascript
const regex = new RegExp(`\\b${kw}\\b`);
return regex.test(normalizedText);
```
The use of `\b` (word boundary) in the regular expression ensures that partial matches are rejected (e.g., searching for "AI" will not falsely trigger on the word "rAIn").

**Scoring Weights:**
- **Concept Coverage (45%):** Proportional to the cumulative weight of successfully matched concepts divided by the maximum possible concept weight for that question.
- **Answer Quality (25%):** 100% if the word count falls within the `idealLength` boundaries defined in the question bank. Penalties apply for excessively short or long answers.
- **Structure & Clarity (20%):** Scans for predefined transitional arrays (e.g., "for example", "because") to infer that the candidate is explaining or exemplifying.
- **Communication (10%):** Starts at 100% and subtracts points for regex matches against a list of filler words ("um", "like", "basically").

**Table 7. Scoring Components and Weights**

| Metric | Exact Weight | Description |
|---|---|---|
| Concept Coverage | 45% | Regex word-boundary matching of predefined concept keywords. |
| Answer Quality | 25% | Comparison of word count against an ideal length band. |
| Structure & Clarity | 20% | Detection of transitional structural phrases (e.g., "for example"). |
| Communication | 10% | Detection and penalization of filler words and phrase repetition. |

**Table 8. Evaluation Rules**

| Rule | Trigger Condition | Consequence |
|---|---|---|
| Empty Override | wordCount == 0 | Immediate total score of 0. |
| Match Keyword | RegExp matches `\bkeyword\b` | Accumulates concept weight. |
| Ideal Length | wordCount >= min && wordCount <= max | 100% Answer Quality score. |
| Rambling Penalty | wordCount > max + band | Quality score penalty. |
| Filler Word | Text contains "um", "uh", "like" | -10 points per occurrence. |

## 6.10 Feedback Engine
`feedback.js` acts as a translation layer. It takes the numeric score object produced by the analyzer and generates human-readable text. It dynamically constructs arrays of "Strengths" and "Missing" points. Furthermore, it determines a holistic readiness level based on the final aggregated score thresholds:
- 90–100: **Interview Ready**
- 75–89: **Nearly Ready**
- 60–74: **Needs Practice**
- 0–59: **More Preparation Needed**

## 6.11 Results Aggregation
Upon completing the final question, `app.js` iterates through the `state.results` array, calculating the arithmetic mean for each of the four scoring dimensions across the entire 5-question session. This aggregated data is then passed to `ui.showResultsScreen()`, which updates the final summary UI.

## 6.12 Security / DOM Safety
Since the application evaluates user-supplied text, preventing Cross-Site Scripting (XSS) is important. The application mitigates the identified XSS risk by rendering dynamic user-related content using `textContent` and safe DOM creation methods instead of injecting user-controlled HTML.
Instead of utilizing unsafe `element.innerHTML`, `ui.js` utilizes secure DOM manipulation methods:
- `element.textContent` to safely insert text.
- `document.createElement()` and `element.appendChild()` to build the dynamic feedback lists programmatically.
The application completely avoids using `eval()` or `document.write()`. User answers are stored strictly in runtime state memory without any backend database or persistent storage in this MVP.

## 6.13 Responsive Design
Responsive design was implemented purely via CSS media queries. For viewport widths below 768px, CSS Flexbox directions are changed from `row` to `column`, padding is reduced to maximize screen real estate, and header typography scales down dynamically.

## 6.14 Pseudocode
The following pseudocode outlines the core evaluation loop executed upon answer submission:

```
FUNCTION evaluateAnswer(rawText, questionMetadata):
    IF rawText is empty OR wordCount is 0:
        RETURN ScoreObject(0, 0, 0, 0)
    
    normalizedText = convertToLowercaseAndRemovePunctuation(rawText)
    
    conceptScore = 0
    FOR EACH concept IN questionMetadata.concepts:
        IF normalizedText contains ANY keyword in concept.keywords using WordBoundaryRegex:
            conceptScore = conceptScore + concept.weight
    
    qualityScore = evaluateLength(wordCount, questionMetadata.idealLength)
    structureScore = detectTransitions(normalizedText, questionMetadata.structure)
    commScore = calculateFillerPenalties(normalizedText)
    
    finalScore = (conceptScore * 0.45) + (qualityScore * 0.25) + 
                 (structureScore * 0.20) + (commScore * 0.10)
    
    RETURN RoundAndClamp(finalScore, 0, 100)
```

## 6.15 Screenshots / Outputs

**Figure 6. Home Screen**
[TO BE UPDATED AFTER MANUAL TESTING]

**Figure 7. Role Selection Screen**
[TO BE UPDATED AFTER MANUAL TESTING]

**Figure 8. Interview Screen with Timer**
[TO BE UPDATED AFTER MANUAL TESTING]

**Figure 9. Question Feedback Card**
[TO BE UPDATED AFTER MANUAL TESTING]

**Figure 10. Final Results Screen**
[TO BE UPDATED AFTER MANUAL TESTING]

# 7. RESULTS AND DISCUSSION

The implementation of the AI-Style Mock Interview Simulator yielded a functional, zero-dependency browser application capable of fulfilling all initial project objectives. 

## 7.1 Code-Level Verification
Code-level verification involving source-code inspection, logical verification, and isolated analyzer testing confirms that the core algorithms function as intended. 

**Table 9. Test Cases**

| Test ID | Test Case | Input/Action | Expected Result | Actual Result | Status | Testing Method |
|---|---|---|---|---|---|---|
| TC-01 | Navigation Flow | Click "Start Interview" | Switches view to Setup Screen | Correct view shown | Verified | Code-Level Verification |
| TC-02 | Timer Trigger | Wait 60 seconds | Auto-submits answer text | Submission invoked | Verified | Code-Level Verification |
| TC-03 | Empty Answer | Submit empty box | Score = 0 for all metrics | Score clamped to 0 | Verified | Code-Level Verification |
| TC-04 | Race Condition | Submit at timeout | `state.answerSubmitted` lock | Submits exactly once | Verified | Code-Level Verification |
| TC-05 | XSS-Safe Rendering | Submit `<script>` | Renders as raw text | Handled via `textContent` | Verified | Code-Level Verification |
| TC-06 | Responsive Layout | Resize below 768px | Column flex layout triggers | CSS Media query active | Verified | Code-Level Verification |
| TC-07 | Question Progression | Answer 5 questions | Reaches Results screen | Loop terminates properly | Verified | Code-Level Verification |
| TC-08 | Final Results | Finish interview | Averages scores | Math calculation correct | Verified | Code-Level Verification |
| TC-09 | Retry Flow | Click "Retry" | Resets state | State wiped | Verified | Code-Level Verification |

## 7.2 Manual Browser Testing
Manual browser testing involves actual execution and observation in a web browser. Formal manual browser testing has not yet been fully completed and documented by the student. The screenshot figures and observed test results will be updated following real-world browser execution.

## 7.3 Illustrative Scoring Analysis
To demonstrate the capability of the rule-based engine, consider a hypothetical user response to a Software Engineering question asking to "Explain Object-Oriented Programming (OOP)":

*Question Metadata Constraints:*
- Required Concepts: "Encapsulation", "Inheritance", "Polymorphism", "Abstraction".
- Ideal Length: 30 - 80 words.

*Illustrative User Answer:*
"um basically object oriented programming is a paradigm. it uses encapsulation to hide data. inheritance allows code reuse. polymorphism means many forms. it helps to organize code."

*Algorithm Processing:*
1. **Normalization:** "um basically object oriented programming is a paradigm it uses encapsulation to hide data inheritance allows code reuse polymorphism means many forms it helps to organize code" (28 words).
2. **Concept Coverage:** Matches "encapsulation", "inheritance", "polymorphism". Misses "abstraction". Assuming equal concept weights for this illustrative example, three of the four required concepts are detected, resulting in approximately 75% concept coverage.
3. **Answer Quality:** 28 words is slightly below the minimum ideal length (30). Score penalized to 50%.
4. **Structure & Clarity:** Matches structural signals "is a", "allows", "means", "helps to". Score: 100%.
5. **Communication:** Detects fillers "um", "basically". Penalties applied. Score: 80%.

*Final Score Calculation:*
(75 * 0.45) + (50 * 0.25) + (100 * 0.20) + (80 * 0.10) = 33.75 + 12.5 + 20 + 8 = **74.25 / 100**.

This final score maps to a Readiness Label of "Needs Practice". The illustrative calculation proves that a deterministic system can yield a nuanced evaluation of a textual response. The implementation demonstrates the technical feasibility of the rule-based approach.

## 7.4 Limitations
The decision to utilize deterministic rules imposes inherent limitations on the semantic understanding of the system:
1. **Keyword Rigidity:** The system relies on exact word-boundary matches. While synonyms can be added to the `keywords` array, the system cannot understand context. 
2. **Semantic Ignorance:** The structure detection heuristic looks for phrases like "for example." It does not understand if the example provided is technically correct.
3. **No Persistence:** In the MVP design, resetting the browser clears all session data, preventing users from reviewing past historical performance.

**Table 10. Results Summary**

| Metric | Target | Actual Achievement |
|---|---|---|
| Time Limit Enforcement | Strict 60-second limit | Verified via timer logic |
| Scoring Consistency | Deterministic matching | Verified via RegExp logic |
| System Dependency | Zero external backends | Pure Client-side SPA |
| DOM Security | XSS Prevention | Verified via textContent |

# 8. CONCLUSION AND FUTURE SCOPE

## Conclusion
The design and implementation of the AI-Style Mock Interview Simulator achieved its primary objective: to provide a timed, structured, and evaluative practice environment for students preparing for technical interviews. Developed using HTML5, CSS3, and vanilla JavaScript, the project operates within the browser environment. 

The implementation of a custom, rule-based text evaluation engine demonstrates that multi-dimensional feedback can be generated heuristically. By evaluating Concept Coverage, Answer Quality, Structure, and Communication, the simulator provides highly transparent and explainable feedback because each score component is derived from explicitly defined rules. Furthermore, adherence to secure DOM manipulation ensures the application mitigates Cross-Site Scripting vulnerabilities, while the modular JavaScript architecture provides a foundation for future expansion. The project fulfills the requirements of the B.Tech Project-Based Learning curriculum, delivering a practical utility while applying fundamental software engineering principles.

## Future Scope
To evolve the MVP into a more comprehensive educational platform, several future enhancements are proposed:

**Table 11. Limitations and Future Enhancements**

| Current Limitation | Proposed Enhancement | Benefit |
|---|---|---|
| Typed Text Input Only | Web Speech API Integration | Simulates verbal interviews. |
| Fixed Question Bank | Dynamic Backend Database | Allows broad question generation. |
| Rigid Word Matching | NLP Integration | Evaluates semantic understanding correctly. |
| Wiped Session State | LocalStorage or Database | Permits historical performance tracking. |

**Table 12. Requirements Traceability**

| Requirement / Objective | Implementation Component | Evidence | Status |
|---|---|---|---|
| Role selection (3 roles) | ui.js / app.js | Setup screen renders role buttons | Verified (Code Audit) |
| 60-second timer | timer.js | `setInterval` counting down from 60 | Verified (Code Audit) |
| Manual submission | ui.js / app.js | Submit button click listener | Verified (Code Audit) |
| Timeout submission | timer.js / app.js | Timeout triggers `timer.stop()` and submit | Verified (Code Audit) |
| 4 evaluation metrics | analyzer.js | Calculation function for each metric | Verified (Code Audit) |
| Per-question feedback | feedback.js / ui.js | Generation of Strengths/Missing arrays | Verified (Code Audit) |
| Results aggregation | app.js / ui.js | Average calculation and Results UI render | Verified (Code Audit) |
| Responsive UI | style.css | Media queries `@media (max-width: 768px)` | Verified (Code Audit) |
| DOM safety | ui.js | Use of `textContent` and `createElement` | Verified (Code Audit) |
| Client-side operation | Entire Application | No external API fetches in source code | Verified (Code Audit) |

---

# REFERENCES
[1] H. Dikli, "An overview of automated scoring of essays," *Journal of Technology, Learning, and Assessment*, vol. 5, no. 1, 2006.
[2] S. Burrows, I. Gurevych, and B. Stein, "The eras and trends of automatic short answer grading," *International Journal of Artificial Intelligence in Education*, vol. 25, pp. 60-117, 2015.
[3] Y. Attali, "The effects of time limits on test-taker performance and anxiety," *Educational and Psychological Measurement*, vol. 70, no. 1, pp. 43-57, 2010.
[4] C. Liao, "Design and evaluation of a web-based educational simulation system," *Computers & Education*, vol. 45, no. 3, pp. 317-332, 2005.
[5] C. Conati, K. Porayska-Pomsta, and M. Mavrikis, "AI in Education needs interpretable machine learning: Lessons from open learner modelling," *arXiv preprint arXiv:1807.00154*, 2018.
[6] D. Flanagan, *JavaScript: The Definitive Guide*, 6th ed. Sebastopol, CA: O'Reilly Media, 2011.
[7] Mozilla Developer Network (MDN), "Document Object Model (DOM) - Web APIs," MDN Web Docs, 2023. [Online]. Available: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[8] W3C, "HTML5: A vocabulary and associated APIs for HTML and XHTML," World Wide Web Consortium, 2014. [Online]. Available: https://www.w3.org/TR/html52/
[9] W3C, "CSS Animations Level 1," World Wide Web Consortium, 2023. [Online]. Available: https://www.w3.org/TR/css-animations-1/
[10] D. Crockford, *JavaScript: The Good Parts*, 1st ed. Sebastopol, CA: O'Reilly Media, 2008.
[11] M. West, "Understanding Regular Expressions in JavaScript," *Smashing Magazine*, 2019. [Online]. Available: https://www.smashingmagazine.com/
[12] OWASP Foundation, "Cross Site Scripting Prevention Cheat Sheet," OWASP, 2023. [Online]. Available: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
[13] Google Developers, "Web Fundamentals: Accessibility," Google, 2023. [Online]. Available: https://developers.google.com/web/fundamentals/accessibility
[14] E. Marcotte, *Responsive Web Design*, 2nd ed. New York, NY: A Book Apart, 2014.
[15] J. Resig and B. Bibeault, *Secrets of the JavaScript Ninja*, 2nd ed. Shelter Island, NY: Manning Publications, 2016.
[16] ECMA International, "ECMAScript 2015 Language Specification," ECMA-262 6th Edition, 2015. [Online]. Available: https://262.ecma-international.org/6.0/
[17] I. Sommerville, *Software Engineering*, 10th ed. Pearson, 2015.
[18] R. Martin, *Clean Code: A Handbook of Agile Software Craftsmanship*. Prentice Hall, 2008.
