const questionBank = {
    "Software Engineer": {
        "Easy": [
            {
                id: "SE-E-01",
                role: "Software Engineer",
                difficulty: "Easy",
                question: "What is the DOM and why is it useful in JavaScript?",
                concepts: [
                    { name: "HTML representation", keywords: ["document", "html", "web page"], weight: 30 },
                    { name: "Tree structure", keywords: ["tree", "nodes"], weight: 25 },
                    { name: "Manipulation", keywords: ["manipulate", "modify", "change", "update"], weight: 25 },
                    { name: "JavaScript interaction", keywords: ["javascript", "element"], weight: 20 }
                ],
                idealLength: { min: 30, max: 80 },
                structure: ["definition", "explanation", "example"]
            },
            {
                id: "SE-E-02",
                role: "Software Engineer",
                difficulty: "Easy",
                question: "What is event handling in JavaScript? Give an example.",
                concepts: [
                    { name: "User/browser event", keywords: ["event", "action", "click"], weight: 30 },
                    { name: "Event listener", keywords: ["handler", "listener"], weight: 30 },
                    { name: "Function execution", keywords: ["function", "callback", "execute"], weight: 20 },
                    { name: "Example", keywords: ["onclick", "addeventlistener"], weight: 20 }
                ],
                idealLength: { min: 30, max: 70 },
                structure: ["definition", "example"]
            },
            {
                id: "SE-E-03",
                role: "Software Engineer",
                difficulty: "Easy",
                question: "Explain the difference between let, const, and var.",
                concepts: [
                    { name: "Block scope (let/const)", keywords: ["block", "scope", "let", "const"], weight: 35 },
                    { name: "Function scope (var)", keywords: ["function", "var"], weight: 25 },
                    { name: "Reassignment (const)", keywords: ["reassign", "constant", "change"], weight: 25 },
                    { name: "Hoisting", keywords: ["hoist", "hoisting"], weight: 15 }
                ],
                idealLength: { min: 30, max: 80 },
                structure: ["comparison", "explanation"]
            },
            {
                id: "SE-E-04",
                role: "Software Engineer",
                difficulty: "Easy",
                question: "What is an API and how can a web application use one?",
                concepts: [
                    { name: "Interface", keywords: ["interface", "communication"], weight: 25 },
                    { name: "Request/Response", keywords: ["request", "response"], weight: 30 },
                    { name: "Data Exchange", keywords: ["data", "json", "exchange"], weight: 25 },
                    { name: "Backend integration", keywords: ["backend", "server", "service"], weight: 20 }
                ],
                idealLength: { min: 30, max: 75 },
                structure: ["definition", "explanation"]
            },
            {
                id: "SE-E-05",
                role: "Software Engineer",
                difficulty: "Easy",
                question: "Why are arrays and objects commonly used in JavaScript?",
                concepts: [
                    { name: "Data structures", keywords: ["store", "data", "collection"], weight: 30 },
                    { name: "Ordered list (Array)", keywords: ["array", "index", "order"], weight: 25 },
                    { name: "Key-Value pairs (Object)", keywords: ["object", "key", "value", "property"], weight: 25 },
                    { name: "Organization", keywords: ["organize", "access"], weight: 20 }
                ],
                idealLength: { min: 30, max: 70 },
                structure: ["explanation", "comparison"]
            }
        ],
        "Intermediate": [
            {
                id: "SE-I-01",
                role: "Software Engineer",
                difficulty: "Intermediate",
                question: "What is asynchronous JavaScript and why is it useful?",
                concepts: [
                    { name: "Non-blocking execution", keywords: ["non-blocking", "does not block", "synchronous"], weight: 35 },
                    { name: "Promises/Async/Await", keywords: ["promise", "async", "await", "callback"], weight: 30 },
                    { name: "Network requests", keywords: ["network", "api", "fetch"], weight: 20 },
                    { name: "Responsiveness", keywords: ["responsive", "ui", "freeze"], weight: 15 }
                ],
                idealLength: { min: 40, max: 90 },
                structure: ["definition", "explanation", "application"]
            },
            {
                id: "SE-I-02",
                role: "Software Engineer",
                difficulty: "Intermediate",
                question: "Explain the concept of closures in JavaScript.",
                concepts: [
                    { name: "Lexical scoping", keywords: ["lexical", "scope", "environment"], weight: 30 },
                    { name: "Function returning function", keywords: ["return", "inner function", "outer"], weight: 25 },
                    { name: "State retention", keywords: ["remember", "state", "retain", "access"], weight: 25 },
                    { name: "Data privacy/encapsulation", keywords: ["privacy", "private", "encapsulation"], weight: 20 }
                ],
                idealLength: { min: 40, max: 90 },
                structure: ["definition", "explanation", "use-case"]
            },
            {
                id: "SE-I-03",
                role: "Software Engineer",
                difficulty: "Intermediate",
                question: "How does the event loop work in JavaScript?",
                concepts: [
                    { name: "Call stack", keywords: ["call stack", "execution context"], weight: 25 },
                    { name: "Task queue", keywords: ["task queue", "callback queue", "macrotask"], weight: 25 },
                    { name: "Microtask queue", keywords: ["microtask", "promises"], weight: 20 },
                    { name: "Concurrency model", keywords: ["concurrency", "single-threaded", "loop"], weight: 30 }
                ],
                idealLength: { min: 50, max: 100 },
                structure: ["definition", "explanation"]
            },
            {
                id: "SE-I-04",
                role: "Software Engineer",
                difficulty: "Intermediate",
                question: "What are RESTful APIs and what are their core principles?",
                concepts: [
                    { name: "Statelessness", keywords: ["stateless", "no state"], weight: 25 },
                    { name: "Client-Server separation", keywords: ["client", "server", "separation"], weight: 20 },
                    { name: "HTTP Methods", keywords: ["http", "get", "post", "put", "delete", "methods"], weight: 30 },
                    { name: "Resource-based URIs", keywords: ["resource", "uri", "url", "endpoint"], weight: 25 }
                ],
                idealLength: { min: 40, max: 90 },
                structure: ["definition", "principles"]
            },
            {
                id: "SE-I-05",
                role: "Software Engineer",
                difficulty: "Intermediate",
                question: "Explain the concept of Virtual DOM used by libraries like React.",
                concepts: [
                    { name: "In-memory representation", keywords: ["memory", "copy", "representation"], weight: 25 },
                    { name: "Reconciliation/Diffing", keywords: ["diffing", "reconciliation", "compare"], weight: 35 },
                    { name: "Performance optimization", keywords: ["performance", "speed", "efficient"], weight: 20 },
                    { name: "Batch updating", keywords: ["batch", "update", "minimal changes"], weight: 20 }
                ],
                idealLength: { min: 40, max: 90 },
                structure: ["definition", "mechanism", "benefit"]
            }
        ],
        "Hard": [
            {
                id: "SE-H-01",
                role: "Software Engineer",
                difficulty: "Hard",
                question: "Explain the differences between classical inheritance and prototypal inheritance.",
                concepts: [
                    { name: "Prototype chain", keywords: ["prototype", "chain", "__proto__", "delegate"], weight: 30 },
                    { name: "Classes vs Objects", keywords: ["class", "blueprint", "object directly"], weight: 25 },
                    { name: "Dynamic vs Static", keywords: ["dynamic", "runtime", "static"], weight: 20 },
                    { name: "Object.create / ES6 classes", keywords: ["object.create", "es6", "syntactic sugar"], weight: 25 }
                ],
                idealLength: { min: 50, max: 120 },
                structure: ["comparison", "explanation"]
            },
            {
                id: "SE-H-02",
                role: "Software Engineer",
                difficulty: "Hard",
                question: "How would you design a scalable rate limiting system?",
                concepts: [
                    { name: "Algorithms (Token Bucket/Leaky Bucket)", keywords: ["token bucket", "leaky bucket", "sliding window"], weight: 35 },
                    { name: "Distributed cache (Redis)", keywords: ["redis", "cache", "memcached", "distributed"], weight: 25 },
                    { name: "Concurrency/Race conditions", keywords: ["concurrency", "race condition", "lock"], weight: 20 },
                    { name: "Headers and HTTP codes", keywords: ["429", "too many requests", "headers"], weight: 20 }
                ],
                idealLength: { min: 60, max: 150 },
                structure: ["architecture", "algorithm", "scaling"]
            },
            {
                id: "SE-H-03",
                role: "Software Engineer",
                difficulty: "Hard",
                question: "Explain how Garbage Collection works in modern JavaScript engines like V8.",
                concepts: [
                    { name: "Mark-and-sweep algorithm", keywords: ["mark", "sweep", "algorithm"], weight: 30 },
                    { name: "Reachability", keywords: ["reachable", "root", "reference"], weight: 25 },
                    { name: "Generational collection", keywords: ["generational", "young", "old", "space"], weight: 25 },
                    { name: "Memory leaks", keywords: ["leak", "dangling", "closure"], weight: 20 }
                ],
                idealLength: { min: 50, max: 120 },
                structure: ["mechanism", "algorithm", "pitfalls"]
            },
            {
                id: "SE-H-04",
                role: "Software Engineer",
                difficulty: "Hard",
                question: "What is CORS, why is it necessary, and how do you configure it?",
                concepts: [
                    { name: "Same-Origin Policy", keywords: ["same-origin", "policy", "security", "browser"], weight: 30 },
                    { name: "Preflight requests (OPTIONS)", keywords: ["preflight", "options", "method"], weight: 25 },
                    { name: "Access-Control headers", keywords: ["allow-origin", "headers", "credentials"], weight: 25 },
                    { name: "Cross-domain resource sharing", keywords: ["cross-domain", "different domain"], weight: 20 }
                ],
                idealLength: { min: 50, max: 120 },
                structure: ["definition", "mechanism", "configuration"]
            },
            {
                id: "SE-H-05",
                role: "Software Engineer",
                difficulty: "Hard",
                question: "Describe the principles of Microservices Architecture versus a Monolith.",
                concepts: [
                    { name: "Decoupling/Independent deployment", keywords: ["decoupled", "independent", "deploy"], weight: 30 },
                    { name: "Scalability per service", keywords: ["scale", "bottleneck"], weight: 25 },
                    { name: "Inter-service communication", keywords: ["api", "grpc", "message queue", "kafka"], weight: 25 },
                    { name: "Data consistency/Sagas", keywords: ["consistency", "distributed transaction", "saga", "eventual"], weight: 20 }
                ],
                idealLength: { min: 60, max: 130 },
                structure: ["comparison", "pros-cons", "communication"]
            }
        ]
    },
    "Data Analyst": {
        "Easy": [
            {
                id: "DA-E-01",
                role: "Data Analyst",
                difficulty: "Easy",
                question: "What is SQL and why is it important for data analysis?",
                concepts: [
                    { name: "Query language", keywords: ["sql", "query", "language"], weight: 25 },
                    { name: "Database interaction", keywords: ["database", "data", "relational"], weight: 25 },
                    { name: "Data Retrieval", keywords: ["retrieve", "select", "filter", "extract"], weight: 25 },
                    { name: "Analysis foundation", keywords: ["analyze", "insight", "manipulate"], weight: 25 }
                ],
                idealLength: { min: 30, max: 70 },
                structure: ["definition", "application"]
            },
            {
                id: "DA-E-02",
                role: "Data Analyst",
                difficulty: "Easy",
                question: "Why is data cleaning important before performing analysis?",
                concepts: [
                    { name: "Missing data handling", keywords: ["missing", "null", "empty", "impute"], weight: 25 },
                    { name: "Duplicate removal", keywords: ["duplicate", "deduplicate"], weight: 20 },
                    { name: "Error/inconsistency fixing", keywords: ["error", "inconsistent", "format"], weight: 25 },
                    { name: "Accuracy and reliability", keywords: ["accurate", "reliable", "trust", "quality"], weight: 30 }
                ],
                idealLength: { min: 35, max: 80 },
                structure: ["explanation", "impact"]
            },
            {
                id: "DA-E-03",
                role: "Data Analyst",
                difficulty: "Easy",
                question: "What is the difference between qualitative and quantitative data?",
                concepts: [
                    { name: "Numerical (Quantitative)", keywords: ["number", "numerical", "measure", "quantity"], weight: 35 },
                    { name: "Categorical/Descriptive (Qualitative)", keywords: ["category", "descriptive", "text", "quality"], weight: 35 },
                    { name: "Analysis methods", keywords: ["statistics", "math", "theme", "subjective"], weight: 30 }
                ],
                idealLength: { min: 30, max: 75 },
                structure: ["comparison", "examples"]
            },
            {
                id: "DA-E-04",
                role: "Data Analyst",
                difficulty: "Easy",
                question: "What is the difference between mean and median?",
                concepts: [
                    { name: "Average calculation (Mean)", keywords: ["mean", "average", "sum", "divide"], weight: 30 },
                    { name: "Middle value (Median)", keywords: ["median", "middle", "sort"], weight: 30 },
                    { name: "Outlier sensitivity", keywords: ["outlier", "skew", "extreme", "robust"], weight: 40 }
                ],
                idealLength: { min: 35, max: 80 },
                structure: ["definition", "comparison"]
            },
            {
                id: "DA-E-05",
                role: "Data Analyst",
                difficulty: "Easy",
                question: "Why is data visualization useful when presenting results?",
                concepts: [
                    { name: "Visual representation", keywords: ["visual", "chart", "graph", "plot"], weight: 25 },
                    { name: "Pattern recognition", keywords: ["pattern", "trend", "outlier"], weight: 30 },
                    { name: "Communication to non-technical", keywords: ["communicate", "present", "audience", "stakeholder"], weight: 25 },
                    { name: "Decision making", keywords: ["decision", "insight", "actionable"], weight: 20 }
                ],
                idealLength: { min: 30, max: 75 },
                structure: ["explanation", "benefits"]
            }
        ],
        "Intermediate": [
            {
                id: "DA-I-01",
                role: "Data Analyst",
                difficulty: "Intermediate",
                question: "Explain the differences between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN.",
                concepts: [
                    { name: "INNER JOIN (Intersection)", keywords: ["inner", "match", "both tables", "intersection"], weight: 30 },
                    { name: "LEFT JOIN (All left + matches)", keywords: ["left", "all records from left", "null"], weight: 35 },
                    { name: "FULL OUTER JOIN (Union)", keywords: ["full", "outer", "all records", "either table"], weight: 35 }
                ],
                idealLength: { min: 40, max: 100 },
                structure: ["comparison", "examples"]
            },
            {
                id: "DA-I-02",
                role: "Data Analyst",
                difficulty: "Intermediate",
                question: "What is a primary key and a foreign key in a relational database?",
                concepts: [
                    { name: "Primary Key (Unique identifier)", keywords: ["primary", "unique", "identifier", "null"], weight: 35 },
                    { name: "Foreign Key (Reference)", keywords: ["foreign", "reference", "link", "another table"], weight: 35 },
                    { name: "Relational integrity", keywords: ["integrity", "relationship", "constraint"], weight: 30 }
                ],
                idealLength: { min: 35, max: 85 },
                structure: ["definition", "relationship"]
            },
            {
                id: "DA-I-03",
                role: "Data Analyst",
                difficulty: "Intermediate",
                question: "How do you handle missing values in a dataset?",
                concepts: [
                    { name: "Deletion (Dropping rows/cols)", keywords: ["drop", "delete", "remove", "exclude"], weight: 25 },
                    { name: "Imputation (Mean/Median/Mode)", keywords: ["impute", "mean", "median", "fill", "replace"], weight: 35 },
                    { name: "Advanced imputation (Model-based)", keywords: ["predict", "knn", "regression"], weight: 20 },
                    { name: "Understanding why it's missing", keywords: ["mcar", "mar", "mnar", "mechanism"], weight: 20 }
                ],
                idealLength: { min: 45, max: 100 },
                structure: ["strategies", "considerations"]
            },
            {
                id: "DA-I-04",
                role: "Data Analyst",
                difficulty: "Intermediate",
                question: "What is variance and standard deviation, and why are they important?",
                concepts: [
                    { name: "Spread of data", keywords: ["spread", "dispersion", "variation"], weight: 30 },
                    { name: "Distance from mean (Variance)", keywords: ["squared", "distance", "mean", "variance"], weight: 25 },
                    { name: "Same units as data (Std Dev)", keywords: ["standard deviation", "square root", "original units"], weight: 25 },
                    { name: "Risk/Volatility assessment", keywords: ["risk", "volatility", "confidence", "reliability"], weight: 20 }
                ],
                idealLength: { min: 45, max: 95 },
                structure: ["definition", "relationship", "importance"]
            },
            {
                id: "DA-I-05",
                role: "Data Analyst",
                difficulty: "Intermediate",
                question: "Explain how a GROUP BY clause works in SQL.",
                concepts: [
                    { name: "Aggregation", keywords: ["aggregate", "summarize", "group"], weight: 35 },
                    { name: "Aggregate functions", keywords: ["sum", "count", "avg", "max", "min"], weight: 30 },
                    { name: "HAVING clause for filtering", keywords: ["having", "filter after grouping"], weight: 20 },
                    { name: "Categorical roll-ups", keywords: ["category", "dimension", "level"], weight: 15 }
                ],
                idealLength: { min: 35, max: 80 },
                structure: ["mechanism", "functions", "example"]
            }
        ],
        "Hard": [
            {
                id: "DA-H-01",
                role: "Data Analyst",
                difficulty: "Hard",
                question: "What are SQL window functions and how do they differ from GROUP BY?",
                concepts: [
                    { name: "Perform calculation across related rows", keywords: ["window", "over", "partition by", "order by"], weight: 30 },
                    { name: "Retain individual rows", keywords: ["retain", "collapse", "individual row", "not grouped"], weight: 35 },
                    { name: "Common functions", keywords: ["row_number", "rank", "dense_rank", "lead", "lag"], weight: 20 },
                    { name: "Running totals/moving averages", keywords: ["running total", "moving average", "cumulative"], weight: 15 }
                ],
                idealLength: { min: 50, max: 120 },
                structure: ["definition", "comparison", "use-case"]
            },
            {
                id: "DA-H-02",
                role: "Data Analyst",
                difficulty: "Hard",
                question: "Explain the concept of A/B testing and statistical significance.",
                concepts: [
                    { name: "Control vs Variant", keywords: ["control", "variant", "experiment", "split"], weight: 25 },
                    { name: "Hypothesis testing", keywords: ["hypothesis", "null", "alternative"], weight: 25 },
                    { name: "P-value and Alpha", keywords: ["p-value", "alpha", "significance level", "0.05"], weight: 30 },
                    { name: "Confidence intervals/Sample size", keywords: ["confidence", "sample size", "power", "detect"], weight: 20 }
                ],
                idealLength: { min: 60, max: 130 },
                structure: ["methodology", "statistics", "interpretation"]
            },
            {
                id: "DA-H-03",
                role: "Data Analyst",
                difficulty: "Hard",
                question: "How would you detect anomalies or outliers in a large dataset?",
                concepts: [
                    { name: "Statistical methods (Z-score/IQR)", keywords: ["z-score", "iqr", "standard deviation", "percentile"], weight: 35 },
                    { name: "Visual methods (Boxplots/Scatter)", keywords: ["boxplot", "scatter", "histogram"], weight: 20 },
                    { name: "Machine Learning (Isolation Forest/Clustering)", keywords: ["isolation forest", "dbscan", "clustering", "ml"], weight: 25 },
                    { name: "Contextual anomalies", keywords: ["context", "domain knowledge", "seasonality"], weight: 20 }
                ],
                idealLength: { min: 50, max: 120 },
                structure: ["techniques", "algorithms", "considerations"]
            },
            {
                id: "DA-H-04",
                role: "Data Analyst",
                difficulty: "Hard",
                question: "What is multicollinearity in regression analysis and why is it a problem?",
                concepts: [
                    { name: "Highly correlated predictors", keywords: ["correlate", "independent variable", "predictor", "feature"], weight: 30 },
                    { name: "Unstable coefficients", keywords: ["unstable", "coefficient", "variance", "inflate"], weight: 30 },
                    { name: "Interpretation difficulty", keywords: ["interpret", "effect", "isolate"], weight: 20 },
                    { name: "Detection (VIF/Correlation Matrix)", keywords: ["vif", "variance inflation factor", "matrix", "pca"], weight: 20 }
                ],
                idealLength: { min: 50, max: 110 },
                structure: ["definition", "impact", "solution"]
            },
            {
                id: "DA-H-05",
                role: "Data Analyst",
                difficulty: "Hard",
                question: "Describe the ETL process and common challenges associated with it.",
                concepts: [
                    { name: "Extract, Transform, Load", keywords: ["extract", "transform", "load", "pipeline", "warehouse"], weight: 25 },
                    { name: "Data transformation/cleaning", keywords: ["cleanse", "format", "join", "aggregate"], weight: 25 },
                    { name: "Data volume and performance", keywords: ["volume", "scale", "performance", "incremental", "batch"], weight: 25 },
                    { name: "Data quality and schema changes", keywords: ["quality", "schema", "drift", "validation"], weight: 25 }
                ],
                idealLength: { min: 55, max: 120 },
                structure: ["phases", "challenges", "architecture"]
            }
        ]
    },
    "Marketing": {
        "Easy": [
            {
                id: "MK-E-01",
                role: "Marketing",
                difficulty: "Easy",
                question: "What is a target audience and why is it important in marketing?",
                concepts: [
                    { name: "Specific group of consumers", keywords: ["group", "people", "customers", "segment"], weight: 30 },
                    { name: "Demographics and Psychographics", keywords: ["age", "location", "demographic", "interest", "behavior"], weight: 25 },
                    { name: "Message Relevance", keywords: ["relevant", "tailor", "specific", "resonate"], weight: 25 },
                    { name: "Campaign effectiveness/ROI", keywords: ["campaign", "effective", "roi", "waste"], weight: 20 }
                ],
                idealLength: { min: 30, max: 70 },
                structure: ["definition", "importance"]
            },
            {
                id: "MK-E-02",
                role: "Marketing",
                difficulty: "Easy",
                question: "What is a marketing funnel and what are its main stages?",
                concepts: [
                    { name: "Customer journey model", keywords: ["journey", "customer", "process", "model"], weight: 25 },
                    { name: "Top of funnel (Awareness)", keywords: ["awareness", "attract", "top"], weight: 25 },
                    { name: "Middle of funnel (Consideration)", keywords: ["consideration", "interest", "evaluate", "middle"], weight: 25 },
                    { name: "Bottom of funnel (Conversion)", keywords: ["conversion", "purchase", "action", "bottom"], weight: 25 }
                ],
                idealLength: { min: 35, max: 80 },
                structure: ["definition", "stages"]
            },
            {
                id: "MK-E-03",
                role: "Marketing",
                difficulty: "Easy",
                question: "What is SEO and why does it matter?",
                concepts: [
                    { name: "Search Engine Optimization", keywords: ["seo", "search engine", "google", "rank"], weight: 30 },
                    { name: "Organic traffic", keywords: ["organic", "unpaid", "free", "traffic"], weight: 30 },
                    { name: "Keywords and content", keywords: ["keyword", "content", "relevance"], weight: 20 },
                    { name: "Visibility and trust", keywords: ["visibility", "discover", "trust", "authority"], weight: 20 }
                ],
                idealLength: { min: 35, max: 75 },
                structure: ["definition", "benefits"]
            },
            {
                id: "MK-E-04",
                role: "Marketing",
                difficulty: "Easy",
                question: "Explain the difference between inbound and outbound marketing.",
                concepts: [
                    { name: "Inbound (Pulling customers in)", keywords: ["inbound", "pull", "attract", "content", "seo"], weight: 35 },
                    { name: "Outbound (Pushing message out)", keywords: ["outbound", "push", "interrupt", "ads", "cold call"], weight: 35 },
                    { name: "Permission vs Interruption", keywords: ["permission", "interruption", "value-add"], weight: 30 }
                ],
                idealLength: { min: 35, max: 80 },
                structure: ["comparison", "examples"]
            },
            {
                id: "MK-E-05",
                role: "Marketing",
                difficulty: "Easy",
                question: "Why is customer retention important for a business?",
                concepts: [
                    { name: "Lower acquisition costs", keywords: ["cost", "cheaper", "acquisition", "cac"], weight: 35 },
                    { name: "Lifetime Value (LTV)", keywords: ["lifetime value", "ltv", "revenue", "repeat"], weight: 25 },
                    { name: "Brand advocacy", keywords: ["advocate", "word of mouth", "referral", "loyalty"], weight: 20 },
                    { name: "Sustainable growth", keywords: ["growth", "profit", "stable"], weight: 20 }
                ],
                idealLength: { min: 30, max: 70 },
                structure: ["financial impact", "brand impact"]
            }
        ],
        "Intermediate": [
            {
                id: "MK-I-01",
                role: "Marketing",
                difficulty: "Intermediate",
                question: "What is A/B testing and how do you use it in a campaign?",
                concepts: [
                    { name: "Comparing two variations", keywords: ["two versions", "version a", "version b", "compare", "split"], weight: 30 },
                    { name: "Isolating one variable", keywords: ["variable", "isolate", "one change", "control"], weight: 25 },
                    { name: "Statistical significance", keywords: ["significant", "data-driven", "confidence"], weight: 20 },
                    { name: "Optimization/Conversion rate", keywords: ["optimize", "improve", "conversion", "cro"], weight: 25 }
                ],
                idealLength: { min: 40, max: 90 },
                structure: ["definition", "process", "outcome"]
            },
            {
                id: "MK-I-02",
                role: "Marketing",
                difficulty: "Intermediate",
                question: "How do you calculate and interpret Customer Acquisition Cost (CAC)?",
                concepts: [
                    { name: "Total marketing/sales spend", keywords: ["spend", "cost", "expense", "budget"], weight: 30 },
                    { name: "Divided by new customers acquired", keywords: ["divide", "acquired", "new customers"], weight: 30 },
                    { name: "Ratio to LTV (LTV:CAC)", keywords: ["ltv", "ratio", "lifetime value", "compare"], weight: 25 },
                    { name: "Efficiency and profitability", keywords: ["efficient", "profit", "sustainable", "payback"], weight: 15 }
                ],
                idealLength: { min: 40, max: 85 },
                structure: ["formula", "interpretation", "context"]
            },
            {
                id: "MK-I-03",
                role: "Marketing",
                difficulty: "Intermediate",
                question: "What is the role of a buyer persona in a marketing strategy?",
                concepts: [
                    { name: "Semi-fictional representation", keywords: ["fictional", "representation", "profile", "ideal customer"], weight: 25 },
                    { name: "Based on data and research", keywords: ["data", "research", "interview", "insight"], weight: 20 },
                    { name: "Pain points and goals", keywords: ["pain point", "challenge", "goal", "motivation"], weight: 25 },
                    { name: "Tailoring messaging and channels", keywords: ["tailor", "message", "personalize", "channel", "strategy"], weight: 30 }
                ],
                idealLength: { min: 40, max: 85 },
                structure: ["definition", "components", "application"]
            },
            {
                id: "MK-I-04",
                role: "Marketing",
                difficulty: "Intermediate",
                question: "How would you approach launching a new product in a competitive market?",
                concepts: [
                    { name: "Market research & Competitor analysis", keywords: ["research", "competitor", "analysis", "gap"], weight: 25 },
                    { name: "Unique Value Proposition (UVP)", keywords: ["uvp", "usp", "unique", "differentiate", "positioning"], weight: 30 },
                    { name: "Go-to-market strategy/channels", keywords: ["gtm", "channel", "strategy", "launch plan", "audience"], weight: 25 },
                    { name: "Metrics for success", keywords: ["metric", "kpi", "measure", "success"], weight: 20 }
                ],
                idealLength: { min: 50, max: 110 },
                structure: ["research", "positioning", "execution", "measurement"]
            },
            {
                id: "MK-I-05",
                role: "Marketing",
                difficulty: "Intermediate",
                question: "Explain the concept of marketing attribution.",
                concepts: [
                    { name: "Assigning credit to touchpoints", keywords: ["credit", "touchpoint", "assign", "value", "interaction"], weight: 35 },
                    { name: "Attribution models", keywords: ["model", "first-click", "last-click", "multi-touch", "linear"], weight: 30 },
                    { name: "Understanding customer journey", keywords: ["journey", "path to purchase", "omnichannel"], weight: 20 },
                    { name: "Optimizing ad spend", keywords: ["optimize", "spend", "budget allocation", "roi"], weight: 15 }
                ],
                idealLength: { min: 45, max: 95 },
                structure: ["definition", "models", "purpose"]
            }
        ],
        "Hard": [
            {
                id: "MK-H-01",
                role: "Marketing",
                difficulty: "Hard",
                question: "How do you measure and prove the ROI of a content marketing strategy?",
                concepts: [
                    { name: "Attribution modeling and tracking", keywords: ["attribution", "utm", "tracking", "crm", "analytics"], weight: 30 },
                    { name: "Lead generation to revenue mapping", keywords: ["lead", "conversion", "sales", "pipeline", "revenue"], weight: 25 },
                    { name: "Calculating Content Costs", keywords: ["cost", "production", "distribution", "time", "spend"], weight: 20 },
                    { name: "Long-term vs short-term metrics", keywords: ["long-term", "seo", "brand awareness", "lagging indicator"], weight: 25 }
                ],
                idealLength: { min: 55, max: 120 },
                structure: ["tracking", "costs", "revenue calculation"]
            },
            {
                id: "MK-H-02",
                role: "Marketing",
                difficulty: "Hard",
                question: "What is programmatic advertising and how does Real-Time Bidding (RTB) work?",
                concepts: [
                    { name: "Automated buying/selling of ads", keywords: ["automate", "buying", "software", "algorithm", "inventory"], weight: 30 },
                    { name: "DSP and SSP", keywords: ["dsp", "ssp", "demand", "supply", "exchange"], weight: 25 },
                    { name: "Real-Time Bidding auction process", keywords: ["rtb", "auction", "millisecond", "bid", "impression"], weight: 25 },
                    { name: "Audience targeting/Data", keywords: ["target", "audience", "data", "cookie", "pixel"], weight: 20 }
                ],
                idealLength: { min: 50, max: 110 },
                structure: ["definition", "ecosystem", "mechanism"]
            },
            {
                id: "MK-H-03",
                role: "Marketing",
                difficulty: "Hard",
                question: "How would you handle a sudden PR crisis that goes viral on social media?",
                concepts: [
                    { name: "Rapid response/Acknowledge", keywords: ["rapid", "fast", "acknowledge", "monitor", "pause ads"], weight: 30 },
                    { name: "Crisis management plan/Team", keywords: ["plan", "team", "escalate", "pr", "legal"], weight: 25 },
                    { name: "Transparent & empathetic communication", keywords: ["transparent", "empathy", "apology", "honest", "solution"], weight: 25 },
                    { name: "Post-crisis analysis/Recovery", keywords: ["analyze", "sentiment", "recover", "rebuild trust"], weight: 20 }
                ],
                idealLength: { min: 50, max: 120 },
                structure: ["immediate action", "communication strategy", "resolution"]
            },
            {
                id: "MK-H-04",
                role: "Marketing",
                difficulty: "Hard",
                question: "Explain the impact of privacy regulations (like GDPR/CCPA) and the cookieless future on digital marketing.",
                concepts: [
                    { name: "Consent and Data Ownership", keywords: ["consent", "gdpr", "ccpa", "opt-in", "privacy"], weight: 25 },
                    { name: "Deprecation of third-party cookies", keywords: ["cookie", "third-party", "phase out", "block"], weight: 25 },
                    { name: "Shift to First-Party Data", keywords: ["first-party", "zero-party", "crm", "direct relationship"], weight: 30 },
                    { name: "Contextual targeting & Server-side tracking", keywords: ["contextual", "server-side", "cohort", "capi"], weight: 20 }
                ],
                idealLength: { min: 60, max: 130 },
                structure: ["regulations", "impact", "solutions/adaptations"]
            },
            {
                id: "MK-H-05",
                role: "Marketing",
                difficulty: "Hard",
                question: "How do you align Marketing and Sales teams (Smarketing) to improve revenue?",
                concepts: [
                    { name: "Service Level Agreement (SLA)", keywords: ["sla", "service level agreement", "commit", "accountability"], weight: 25 },
                    { name: "Shared Goals and KPIs (Revenue)", keywords: ["shared", "goal", "revenue", "pipeline", "kpi"], weight: 25 },
                    { name: "Lead definition (MQL vs SQL)", keywords: ["mql", "sql", "qualify", "lead scoring", "definition"], weight: 30 },
                    { name: "Closed-loop reporting/Communication", keywords: ["closed-loop", "feedback", "crm", "meeting", "communicate"], weight: 20 }
                ],
                idealLength: { min: 50, max: 110 },
                structure: ["strategy", "process", "metrics"]
            }
        ]
    }
};

// Pure function for selecting random questions without duplicates
function getRandomQuestions(role, difficulty, count = 5) {
    if (!questionBank[role] || !questionBank[role][difficulty]) {
        return [];
    }
    
    const pool = [...questionBank[role][difficulty]];
    const selected = [];
    
    // Fisher-Yates shuffle logic adapted for picking N items
    while (selected.length < count && pool.length > 0) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        selected.push(pool[randomIndex]);
        pool.splice(randomIndex, 1);
    }
    
    return selected;
}
