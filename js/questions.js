const questionBank = {
    "Software Engineer": [
        {
            id: "SE-01",
            role: "Software Engineer",
            question: "What is the DOM and why is it useful in JavaScript?",
            concepts: [
                { name: "HTML representation", keywords: ["document", "html", "web page"], weight: 30 },
                { name: "Tree structure", keywords: ["tree", "tree structure", "nodes"], weight: 25 },
                { name: "Manipulation", keywords: ["manipulate", "modify", "change", "update"], weight: 25 },
                { name: "JavaScript interaction", keywords: ["javascript", "element", "elements"], weight: 20 }
            ],
            idealLength: { min: 30, max: 80 },
            structure: ["definition", "explanation", "example"],
            tip: "Include a simple example of changing an HTML element."
        },
        {
            id: "SE-02",
            role: "Software Engineer",
            question: "What is event handling in JavaScript? Give an example.",
            concepts: [
                { name: "User/browser event", keywords: ["event", "action", "click"], weight: 30 },
                { name: "Event handler/listener", keywords: ["handler", "listener", "event listener"], weight: 30 },
                { name: "Function execution", keywords: ["function", "callback", "execute"], weight: 20 },
                { name: "Example", keywords: ["onclick", "addeventlistener", "submit"], weight: 20 }
            ],
            idealLength: { min: 30, max: 70 },
            structure: ["definition", "explanation", "example"]
        },
        {
            id: "SE-03",
            role: "Software Engineer",
            question: "What is asynchronous JavaScript and why is it useful?",
            concepts: [
                { name: "Non-blocking execution", keywords: ["non-blocking", "does not block"], weight: 35 },
                { name: "Time-consuming/network task", keywords: ["network", "request", "time", "task"], weight: 20 },
                { name: "Promise/async/await/callback", keywords: ["promise", "async", "await", "callback"], weight: 30 },
                { name: "Responsiveness/continuation", keywords: ["responsive", "continue", "execution"], weight: 15 }
            ],
            idealLength: { min: 35, max: 80 },
            structure: ["definition", "explanation", "application"]
        },
        {
            id: "SE-04",
            role: "Software Engineer",
            question: "What is an API and how can a web application use one?",
            concepts: [
                { name: "Interface/communication", keywords: ["interface", "communication"], weight: 25 },
                { name: "Application interaction", keywords: ["application", "software", "system"], weight: 25 },
                { name: "Request/response", keywords: ["request", "response"], weight: 25 },
                { name: "Data/service", keywords: ["data", "service", "server"], weight: 25 }
            ],
            idealLength: { min: 30, max: 75 },
            structure: ["definition", "explanation", "example"]
        },
        {
            id: "SE-05",
            role: "Software Engineer",
            question: "Why are arrays and objects commonly used in JavaScript?",
            concepts: [
                { name: "Store/group data", keywords: ["store", "data", "collection"], weight: 30 },
                { name: "Array/order/index", keywords: ["array", "index", "ordered", "list"], weight: 25 },
                { name: "Object/key/value", keywords: ["object", "key", "value", "property"], weight: 25 },
                { name: "Practical usage", keywords: ["organize", "access", "represent"], weight: 20 }
            ],
            idealLength: { min: 30, max: 70 },
            structure: ["explanation", "comparison", "example"]
        }
    ],
    "Data Analyst": [
        {
            id: "DA-01",
            role: "Data Analyst",
            question: "What is SQL and why is it important for data analysis?",
            concepts: [
                { name: "SQL/query", keywords: ["sql", "query"], weight: 25 },
                { name: "Database/data", keywords: ["database", "data"], weight: 25 },
                { name: "Retrieve/filter", keywords: ["retrieve", "select", "filter"], weight: 25 },
                { name: "Analysis/insight", keywords: ["analyze", "analysis", "insight"], weight: 25 }
            ],
            idealLength: { min: 30, max: 70 },
            structure: ["definition", "explanation", "application"]
        },
        {
            id: "DA-02",
            role: "Data Analyst",
            question: "Why is data cleaning important before performing analysis?",
            concepts: [
                { name: "Missing data", keywords: ["missing", "null", "empty"], weight: 25 },
                { name: "Duplicates", keywords: ["duplicate", "duplicates"], weight: 20 },
                { name: "Errors/inconsistency", keywords: ["error", "inconsistent", "incorrect"], weight: 25 },
                { name: "Accuracy/reliability", keywords: ["accurate", "reliable", "quality"], weight: 30 }
            ],
            idealLength: { min: 35, max: 80 },
            structure: ["explanation", "example", "application"]
        },
        {
            id: "DA-03",
            role: "Data Analyst",
            question: "What is a SQL JOIN and when would you use it?",
            concepts: [
                { name: "Combine tables", keywords: ["combine", "join", "connect"], weight: 30 },
                { name: "Related data", keywords: ["related", "relationship"], weight: 20 },
                { name: "Common key/column", keywords: ["key", "column", "id"], weight: 25 },
                { name: "Multiple tables", keywords: ["tables", "two tables", "multiple tables"], weight: 25 }
            ],
            idealLength: { min: 30, max: 70 },
            structure: ["definition", "explanation", "example"],
            tip: "Use customers and orders as an example."
        },
        {
            id: "DA-04",
            role: "Data Analyst",
            question: "What is the difference between mean and median, and when might median be better?",
            concepts: [
                { name: "Mean/average", keywords: ["mean", "average", "sum"], weight: 25 },
                { name: "Median/middle", keywords: ["median", "middle", "middle value"], weight: 25 },
                { name: "Outliers", keywords: ["outlier", "extreme"], weight: 30 },
                { name: "Appropriate use", keywords: ["skewed", "distribution", "better"], weight: 20 }
            ],
            idealLength: { min: 35, max: 80 },
            structure: ["definition", "comparison", "explanation"]
        },
        {
            id: "DA-05",
            role: "Data Analyst",
            question: "Why is data visualization useful when presenting analytical results?",
            concepts: [
                { name: "Visual representation", keywords: ["visual", "chart", "graph"], weight: 25 },
                { name: "Patterns/trends", keywords: ["pattern", "trend", "relationship"], weight: 30 },
                { name: "Communication", keywords: ["communicate", "present", "explain"], weight: 25 },
                { name: "Decision-making", keywords: ["decision", "insight", "business"], weight: 20 }
            ],
            idealLength: { min: 30, max: 75 },
            structure: ["explanation", "example", "application"]
        }
    ],
    "Marketing": [
        {
            id: "MK-01",
            role: "Marketing",
            question: "What is a target audience and why is it important in marketing?",
            concepts: [
                { name: "Specific group", keywords: ["group", "people", "customers"], weight: 30 },
                { name: "Demographics/characteristics", keywords: ["age", "location", "demographic", "interest"], weight: 20 },
                { name: "Relevance/specificity", keywords: ["relevant", "specific"], weight: 20 },
                { name: "Campaign effectiveness", keywords: ["campaign", "message", "effective"], weight: 30 }
            ],
            idealLength: { min: 30, max: 70 },
            structure: ["definition", "explanation", "application"]
        },
        {
            id: "MK-02",
            role: "Marketing",
            question: "What is a marketing funnel and what are its main stages?",
            concepts: [
                { name: "Customer journey", keywords: ["journey", "customer", "process"], weight: 25 },
                { name: "Awareness", keywords: ["awareness", "aware"], weight: 25 },
                { name: "Consideration", keywords: ["consideration", "interest", "evaluate"], weight: 20 },
                { name: "Conversion", keywords: ["conversion", "purchase", "action"], weight: 30 }
            ],
            idealLength: { min: 35, max: 80 },
            structure: ["definition", "explanation", "application"]
        },
        {
            id: "MK-03",
            role: "Marketing",
            question: "Which metrics would you use to evaluate the performance of a digital marketing campaign?",
            concepts: [
                { name: "Reach/impressions", keywords: ["reach", "impressions", "views"], weight: 20 },
                { name: "Engagement", keywords: ["engagement", "clicks", "ctr"], weight: 25 },
                { name: "Conversion", keywords: ["conversion", "conversion rate"], weight: 30 },
                { name: "ROI/business result", keywords: ["roi", "return", "revenue"], weight: 25 }
            ],
            idealLength: { min: 35, max: 80 },
            structure: ["explanation", "example", "application"]
        },
        {
            id: "MK-04",
            role: "Marketing",
            question: "What is A/B testing and how can it help improve a marketing campaign?",
            concepts: [
                { name: "Two versions", keywords: ["two versions", "version a", "version b"], weight: 30 },
                { name: "Comparison", keywords: ["compare", "comparison"], weight: 20 },
                { name: "Variable/change", keywords: ["variable", "headline", "button", "design"], weight: 20 },
                { name: "Performance/result", keywords: ["performance", "conversion", "result"], weight: 30 }
            ],
            idealLength: { min: 35, max: 80 },
            structure: ["definition", "comparison", "application"]
        },
        {
            id: "MK-05",
            role: "Marketing",
            question: "Why is customer retention important for a business?",
            concepts: [
                { name: "Existing customers", keywords: ["existing", "customers", "customer"], weight: 25 },
                { name: "Repeat purchase", keywords: ["repeat", "return", "purchase"], weight: 25 },
                { name: "Cost/value", keywords: ["cost", "cheaper", "acquisition"], weight: 20 },
                { name: "Loyalty/business growth", keywords: ["loyalty", "growth", "revenue"], weight: 30 }
            ],
            idealLength: { min: 30, max: 70 },
            structure: ["explanation", "example", "application"]
        }
    ]
};
