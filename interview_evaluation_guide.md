# AI Mock Interview Simulator: Questions & Evaluation Guide

This guide details all the questions currently loaded in the Mock Interview Simulator (`questions.js`), along with expected answers, how the AI evaluates them, and potential edge/special cases for candidate responses.

---

## 1. Role: Software Engineer

### SE-01: What is the DOM and why is it useful in JavaScript?
* **Question**: What is the DOM and why is it useful in JavaScript?
* **Expected Answer**: The Document Object Model (DOM) is a programming interface for web documents. It represents the HTML web page as a tree structure of nodes. It is useful because it allows JavaScript to dynamically interact with, manipulate, and update the structure, style, and content of the page (e.g., changing text or styling of an element).
* **How We Evaluate**: 
  * Target Length: 30 - 80 words.
  * Structure: Definition -> Explanation -> Example.
  * Concepts Weighed: 
    * HTML representation (30% weight, Keywords: *document, html, web page*)
    * Tree structure (25% weight, Keywords: *tree, tree structure, nodes*)
    * Manipulation (25% weight, Keywords: *manipulate, modify, change, update*)
    * JavaScript interaction (20% weight, Keywords: *javascript, element, elements*)
* **Edge & Special Cases**:
  * *Partial Answers*: A candidate might explain what it stands for but fail to mention the "tree structure" (missing 25% of the score).
  * *Code-Only Answers*: Providing a JavaScript snippet (like `document.getElementById()`) without explaining the underlying concept will miss the "definition" structural requirement.

### SE-02: What is event handling in JavaScript? Give an example.
* **Question**: What is event handling in JavaScript? Give an example.
* **Expected Answer**: Event handling in JavaScript is the process of capturing and responding to user or browser actions, like clicks, key presses, or page loads. We use event listeners to execute a specific function or callback when the event occurs. For example, using `button.addEventListener('click', myFunction)` to submit a form when a user clicks a button.
* **How We Evaluate**:
  * Target Length: 30 - 70 words.
  * Structure: Definition -> Explanation -> Example.
  * Concepts Weighed:
    * User/browser event (30%, Keywords: *event, action, click*)
    * Event handler/listener (30%, Keywords: *handler, listener, event listener*)
    * Function execution (20%, Keywords: *function, callback, execute*)
    * Example (20%, Keywords: *onclick, addeventlistener, submit*)
* **Edge & Special Cases**:
  * *Missing the Example*: The prompt explicitly asks for an example. Candidates who define it perfectly but forget the example lose points on the "Example" criteria.
  * *Obsolete Practices*: Candidates mentioning inline HTML handlers (e.g., `<button onclick="...">`) should ideally be nudged towards `addEventListener` but still trigger the "onclick" keyword.

### SE-03: What is asynchronous JavaScript and why is it useful?
* **Question**: What is asynchronous JavaScript and why is it useful?
* **Expected Answer**: Asynchronous JavaScript allows the code to perform time-consuming tasks (like network requests or fetching data) in a non-blocking manner. Instead of stopping the execution of other code while waiting, it uses Promises, async/await, or callbacks to continue running the rest of the application, keeping the UI responsive.
* **How We Evaluate**:
  * Target Length: 35 - 80 words.
  * Structure: Definition -> Explanation -> Application.
  * Concepts Weighed:
    * Non-blocking execution (35%, Keywords: *non-blocking, does not block*)
    * Time-consuming/network task (20%, Keywords: *network, request, time, task*)
    * Promise/async/await/callback (30%, Keywords: *promise, async, await, callback*)
    * Responsiveness/continuation (15%, Keywords: *responsive, continue, execution*)
* **Edge & Special Cases**:
  * *Overly Technical*: Listing `async/await` and Promises without explaining the "why" (non-blocking nature) misses the core theoretical understanding (35% penalty).
  * *Synchronous Confusion*: Mixing up the definitions of synchronous vs. asynchronous execution.

### SE-04: What is an API and how can a web application use one?
* **Question**: What is an API and how can a web application use one?
* **Expected Answer**: An API (Application Programming Interface) is a set of rules that allows different software applications to communicate with each other. A web application uses an API to request data or services from a server (using HTTP requests) and receives a response, often in JSON format, which it can then display to the user.
* **How We Evaluate**:
  * Target Length: 30 - 75 words.
  * Structure: Definition -> Explanation -> Example.
  * Concepts Weighed:
    * Interface/communication (25%, Keywords: *interface, communication*)
    * Application interaction (25%, Keywords: *application, software, system*)
    * Request/response (25%, Keywords: *request, response*)
    * Data/service (25%, Keywords: *data, service, server*)
* **Edge & Special Cases**:
  * *Restaurant Analogy*: Many candidates use the "waiter at a restaurant" analogy. The AI should ideally pick up on keywords like "request" and "response", but might penalize if explicit technical terms (software, server, data) are omitted.

### SE-05: Why are arrays and objects commonly used in JavaScript?
* **Question**: Why are arrays and objects commonly used in JavaScript?
* **Expected Answer**: Arrays and objects are commonly used because they allow developers to store, group, and organize collections of data efficiently. Arrays are used for ordered lists of data accessed via an index, while objects are used to represent entities using key-value pairs. They make it easier to manage and represent complex data structures.
* **How We Evaluate**:
  * Target Length: 30 - 70 words.
  * Structure: Explanation -> Comparison -> Example.
  * Concepts Weighed:
    * Store/group data (30%, Keywords: *store, data, collection*)
    * Array/order/index (25%, Keywords: *array, index, ordered, list*)
    * Object/key/value (25%, Keywords: *object, key, value, property*)
    * Practical usage (20%, Keywords: *organize, access, represent*)
* **Edge & Special Cases**:
  * *Answering for only one*: Explaining objects in depth but completely forgetting to discuss arrays (or vice versa).
  * *JSON Confusion*: Equating JavaScript objects strictly to JSON without noting the programmatic use of objects.

---

## 2. Role: Data Analyst

### DA-01: What is SQL and why is it important for data analysis?
* **Question**: What is SQL and why is it important for data analysis?
* **Expected Answer**: SQL (Structured Query Language) is a language used to communicate with relational databases. It is important for data analysis because it allows analysts to write queries to retrieve, filter, and manipulate large datasets, enabling them to extract insights and perform complex analysis directly at the data source.
* **How We Evaluate**:
  * Target Length: 30 - 70 words.
  * Structure: Definition -> Explanation -> Application.
  * Concepts Weighed:
    * SQL/query (25%, Keywords: *sql, query*)
    * Database/data (25%, Keywords: *database, data*)
    * Retrieve/filter (25%, Keywords: *retrieve, select, filter*)
    * Analysis/insight (25%, Keywords: *analyze, analysis, insight*)
* **Edge & Special Cases**:
  * *NoSQL confusion*: Talking about databases in general but failing to mention its specific role in querying relational databases.

### DA-02: Why is data cleaning important before performing analysis?
* **Question**: Why is data cleaning important before performing analysis?
* **Expected Answer**: Data cleaning is crucial because raw data often contains missing values, duplicates, and errors. If these inconsistencies aren't resolved, it can lead to incorrect conclusions. Cleaning the data ensures accuracy and reliability, resulting in high-quality insights and better business decisions.
* **How We Evaluate**:
  * Target Length: 35 - 80 words.
  * Structure: Explanation -> Example -> Application.
  * Concepts Weighed:
    * Missing data (25%, Keywords: *missing, null, empty*)
    * Duplicates (20%, Keywords: *duplicate, duplicates*)
    * Errors/inconsistency (25%, Keywords: *error, inconsistent, incorrect*)
    * Accuracy/reliability (30%, Keywords: *accurate, reliable, quality*)
* **Edge & Special Cases**:
  * *Garbage In, Garbage Out (GIGO)*: Candidates who just say "Garbage in, garbage out" without explaining the actual mechanics (duplicates, nulls) will score low on specific concept weights.

### DA-03: What is a SQL JOIN and when would you use it?
* **Question**: What is a SQL JOIN and when would you use it?
* **Expected Answer**: A SQL JOIN is a clause used to combine rows from two or more multiple tables based on a related column or common key between them. You would use it when you need to connect related data that is stored separately, such as linking a 'customers' table with an 'orders' table to see what a specific customer bought.
* **How We Evaluate**:
  * Target Length: 30 - 70 words.
  * Structure: Definition -> Explanation -> Example.
  * Concepts Weighed:
    * Combine tables (30%, Keywords: *combine, join, connect*)
    * Related data (20%, Keywords: *related, relationship*)
    * Common key/column (25%, Keywords: *key, column, id*)
    * Multiple tables (25%, Keywords: *tables, two tables, multiple tables*)
* **Edge & Special Cases**:
  * *Missing the "How"*: Saying it combines tables but failing to mention the necessity of a "common key" or "ID".

### DA-04: Difference between mean and median, and when might median be better?
* **Question**: What is the difference between mean and median, and when might median be better?
* **Expected Answer**: The mean is the mathematical average of a set of numbers, calculated by finding their sum and dividing by the count. The median is the exact middle value when the numbers are sorted. The median is better to use when the data distribution is skewed by extreme outliers, as the mean can be heavily distorted by them.
* **How We Evaluate**:
  * Target Length: 35 - 80 words.
  * Structure: Definition -> Comparison -> Explanation.
  * Concepts Weighed:
    * Mean/average (25%, Keywords: *mean, average, sum*)
    * Median/middle (25%, Keywords: *median, middle, middle value*)
    * Outliers (30%, Keywords: *outlier, extreme*)
    * Appropriate use (20%, Keywords: *skewed, distribution, better*)
* **Edge & Special Cases**:
  * *Forgetting the second part of the prompt*: Defining both accurately but failing to answer *when* median is better (skipping outliers/skewed distributions).

### DA-05: Why is data visualization useful when presenting analytical results?
* **Question**: Why is data visualization useful when presenting analytical results?
* **Expected Answer**: Data visualization is the visual representation of data using charts and graphs. It is useful because it makes it much easier to identify patterns, trends, and relationships that might go unnoticed in raw spreadsheets. It helps effectively communicate complex findings to non-technical stakeholders, aiding in faster and better business decision-making.
* **How We Evaluate**:
  * Target Length: 30 - 75 words.
  * Structure: Explanation -> Example -> Application.
  * Concepts Weighed:
    * Visual representation (25%, Keywords: *visual, chart, graph*)
    * Patterns/trends (30%, Keywords: *pattern, trend, relationship*)
    * Communication (25%, Keywords: *communicate, present, explain*)
    * Decision-making (20%, Keywords: *decision, insight, business*)
* **Edge & Special Cases**:
  * *Dashboard listing*: Just listing tools like Tableau/PowerBI without explaining the conceptual value (identifying trends, stakeholder communication).

---

## 3. Role: Marketing

### MK-01: What is a target audience and why is it important in marketing?
* **Question**: What is a target audience and why is it important in marketing?
* **Expected Answer**: A target audience is a specific group of people with shared demographics, interests, or characteristics that a product is aimed at. It is important because it allows marketers to tailor their message to be highly relevant and specific, which increases campaign effectiveness, improves conversion rates, and reduces wasted ad spend.
* **How We Evaluate**:
  * Target Length: 30 - 70 words.
  * Structure: Definition -> Explanation -> Application.
  * Concepts Weighed:
    * Specific group (30%, Keywords: *group, people, customers*)
    * Demographics/characteristics (20%, Keywords: *age, location, demographic, interest*)
    * Relevance/specificity (20%, Keywords: *relevant, specific*)
    * Campaign effectiveness (30%, Keywords: *campaign, message, effective*)
* **Edge & Special Cases**:
  * *Too Broad*: Explaining it as "people who buy your product" without touching on shared demographics or characteristics.

### MK-02: What is a marketing funnel and what are its main stages?
* **Question**: What is a marketing funnel and what are its main stages?
* **Expected Answer**: A marketing funnel represents the customer journey from the first interaction with a brand to the final purchase. The main stages typically include Awareness (discovering the brand), Consideration (evaluating the product and developing interest), and Conversion (taking the final action, like a purchase).
* **How We Evaluate**:
  * Target Length: 35 - 80 words.
  * Structure: Definition -> Explanation -> Application.
  * Concepts Weighed:
    * Customer journey (25%, Keywords: *journey, customer, process*)
    * Awareness (25%, Keywords: *awareness, aware*)
    * Consideration (20%, Keywords: *consideration, interest, evaluate*)
    * Conversion (30%, Keywords: *conversion, purchase, action*)
* **Edge & Special Cases**:
  * *Alternative Funnel Models*: Mentioning AIDA (Attention, Interest, Desire, Action) instead of Awareness/Consideration/Conversion. The AI keywords currently look specifically for awareness/consideration/conversion, so an AIDA answer might score lower unless it triggers overlapping keywords like 'interest' and 'action'.

### MK-03: Which metrics would you use to evaluate a digital marketing campaign?
* **Question**: Which metrics would you use to evaluate the performance of a digital marketing campaign?
* **Expected Answer**: To evaluate a digital marketing campaign, I would look at top-of-funnel metrics like reach and impressions to see how many people saw the ad. Then, I would measure engagement metrics like clicks and CTR (Click-Through Rate). Most importantly, I would analyze the conversion rate and the overall ROI (Return on Investment) to determine how much revenue the campaign generated.
* **How We Evaluate**:
  * Target Length: 35 - 80 words.
  * Structure: Explanation -> Example -> Application.
  * Concepts Weighed:
    * Reach/impressions (20%, Keywords: *reach, impressions, views*)
    * Engagement (25%, Keywords: *engagement, clicks, ctr*)
    * Conversion (30%, Keywords: *conversion, conversion rate*)
    * ROI/business result (25%, Keywords: *roi, return, revenue*)
* **Edge & Special Cases**:
  * *Vanity Metrics Only*: Focusing entirely on likes, views, and reach without discussing bottom-line results like Conversion or ROI (which hold 55% of the total weight).

### MK-04: What is A/B testing and how can it help improve a marketing campaign?
* **Question**: What is A/B testing and how can it help improve a marketing campaign?
* **Expected Answer**: A/B testing is a method where you compare two versions (Version A and Version B) of a marketing asset, like an email or landing page. You change a single variable, such as a headline or a button color, to see which version performs better. It helps improve campaigns by using data-driven results to optimize conversion rates.
* **How We Evaluate**:
  * Target Length: 35 - 80 words.
  * Structure: Definition -> Comparison -> Application.
  * Concepts Weighed:
    * Two versions (30%, Keywords: *two versions, version a, version b*)
    * Comparison (20%, Keywords: *compare, comparison*)
    * Variable/change (20%, Keywords: *variable, headline, button, design*)
    * Performance/result (30%, Keywords: *performance, conversion, result*)
* **Edge & Special Cases**:
  * *Missing the "Control Variable" concept*: A common mistake is saying you test entirely different campaigns against each other, instead of changing a specific variable (headline, button). The "variable/change" keyword block catches this.

### MK-05: Why is customer retention important for a business?
* **Question**: Why is customer retention important for a business?
* **Expected Answer**: Customer retention is important because keeping existing customers is generally much cheaper than the cost of acquiring new ones. Satisfied customers often make repeat purchases, build brand loyalty, and refer others, which leads to steady revenue and long-term business growth.
* **How We Evaluate**:
  * Target Length: 30 - 70 words.
  * Structure: Explanation -> Example -> Application.
  * Concepts Weighed:
    * Existing customers (25%, Keywords: *existing, customers, customer*)
    * Repeat purchase (25%, Keywords: *repeat, return, purchase*)
    * Cost/value (20%, Keywords: *cost, cheaper, acquisition*)
    * Loyalty/business growth (30%, Keywords: *loyalty, growth, revenue*)
* **Edge & Special Cases**:
  * *Ignoring Acquisition Costs*: Candidates might talk about loyalty and revenue but forget the crucial business rule that retention is cheaper than acquisition (missing the 20% cost/value component).
