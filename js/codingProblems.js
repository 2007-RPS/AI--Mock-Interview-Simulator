const softwareEngineerCodingProblems = [
    // Easy
    {
        id: "SE-E-01", title: "Two Sum", difficulty: "Easy", category: "Arrays", concepts: ["Arrays", "Hash Maps"],
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
        constraints: "2 <= nums.length <= 10^4",
        starterCode: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
        testCases: [{ args: [[2,7,11,15], 9], expected: [0,1] }, { args: [[3,2,4], 6], expected: [1,2] }, { args: [[3,3], 6], expected: [0,1] }]
    },
    {
        id: "SE-E-02", title: "Valid Palindrome", difficulty: "Easy", category: "Strings", concepts: ["Strings", "Two Pointers"],
        description: "Return true if the phrase is a palindrome (ignoring non-alphanumeric and case).",
        examples: "Input: 'race a car'\nOutput: false",
        constraints: "1 <= s.length <= 2 * 10^5",
        starterCode: "function isPalindrome(s) {\n  \n}",
        testCases: [{ args: ["A man, a plan, a canal: Panama"], expected: true }, { args: ["race a car"], expected: false }, { args: [" "], expected: true }]
    },
    {
        id: "SE-E-03", title: "Contains Duplicate", difficulty: "Easy", category: "Arrays", concepts: ["Arrays", "Hash Maps"],
        description: "Return true if any value appears at least twice.",
        examples: "Input: [1,2,3,1]\nOutput: true",
        constraints: "1 <= nums.length <= 10^5",
        starterCode: "function containsDuplicate(nums) {\n  \n}",
        testCases: [{ args: [[1,2,3,1]], expected: true }, { args: [[1,2,3,4]], expected: false }, { args: [[1,1,1,3,3,4,3,2,4,2]], expected: true }]
    },
    {
        id: "SE-E-04", title: "Reverse String", difficulty: "Easy", category: "Strings", concepts: ["Strings", "Two Pointers"],
        description: "Reverse a string.",
        examples: "Input: 'hello'\nOutput: 'olleh'",
        constraints: "1 <= s.length <= 10^5",
        starterCode: "function reverseString(s) {\n  \n}",
        testCases: [{ args: ["hello"], expected: "olleh" }, { args: ["Hannah"], expected: "hannaH" }]
    },
    {
        id: "SE-E-05", title: "Missing Number", difficulty: "Easy", category: "Arrays", concepts: ["Arrays", "Math"],
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number missing.",
        examples: "Input: [3,0,1]\nOutput: 2",
        constraints: "n == nums.length, 1 <= n <= 10^4",
        starterCode: "function missingNumber(nums) {\n  \n}",
        testCases: [{ args: [[3,0,1]], expected: 2 }, { args: [[0,1]], expected: 2 }, { args: [[9,6,4,2,3,5,7,0,1]], expected: 8 }]
    },
    // Intermediate
    {
        id: "SE-I-01", title: "Merge Intervals", difficulty: "Intermediate", category: "Arrays", concepts: ["Arrays", "Sorting"],
        description: "Merge all overlapping intervals. Intervals are represented as an array of 2-element arrays.",
        examples: "Input: [[1,3],[2,6],[8,10]]\nOutput: [[1,6],[8,10]]",
        constraints: "1 <= intervals.length <= 10^4",
        starterCode: "function mergeIntervals(intervals) {\n  \n}",
        testCases: [{ args: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] }, { args: [[[1,4],[4,5]]], expected: [[1,5]] }]
    },
    {
        id: "SE-I-02", title: "Valid Parentheses", difficulty: "Intermediate", category: "Stacks", concepts: ["Stacks", "Strings"],
        description: "Given a string s containing '()', '{}', '[]', determine if it is valid.",
        examples: "Input: '()[]{}'\nOutput: true",
        constraints: "1 <= s.length <= 10^4",
        starterCode: "function isValid(s) {\n  \n}",
        testCases: [{ args: ["()"], expected: true }, { args: ["()[]{}"], expected: true }, { args: ["(]"], expected: false }]
    },
    {
        id: "SE-I-03", title: "Group Anagrams", difficulty: "Intermediate", category: "Strings", concepts: ["Strings", "Hash Maps"],
        description: "Group anagrams together.",
        examples: "Input: ['eat','tea','tan','ate','nat','bat']\nOutput: [['eat','tea','ate'],['tan','nat'],['bat']]",
        constraints: "1 <= strs.length <= 10^4",
        starterCode: "function groupAnagrams(strs) {\n  \n}",
        testCases: [{ args: [["eat","tea","tan","ate","nat","bat"]], expected: [["eat","tea","ate"],["tan","nat"],["bat"]] }] // simplified expected check logic in real world, but strict equality of JSON for MVP
    },
    {
        id: "SE-I-04", title: "Product of Array Except Self", difficulty: "Intermediate", category: "Arrays", concepts: ["Arrays", "Prefix Sum"],
        description: "Return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
        examples: "Input: [1,2,3,4]\nOutput: [24,12,8,6]",
        constraints: "2 <= nums.length <= 10^5",
        starterCode: "function productExceptSelf(nums) {\n  \n}",
        testCases: [{ args: [[1,2,3,4]], expected: [24,12,8,6] }, { args: [[-1,1,0,-3,3]], expected: [0,0,9,0,0] }]
    },
    {
        id: "SE-I-05", title: "Binary Search", difficulty: "Intermediate", category: "Algorithms", concepts: ["Binary Search", "Arrays"],
        description: "Given a sorted array and a target, return the index of the target. If not found, return -1.",
        examples: "Input: [-1,0,3,5,9,12], target=9\nOutput: 4",
        constraints: "1 <= nums.length <= 10^4",
        starterCode: "function search(nums, target) {\n  \n}",
        testCases: [{ args: [[-1,0,3,5,9,12], 9], expected: 4 }, { args: [[-1,0,3,5,9,12], 2], expected: -1 }]
    },
    // Hard
    {
        id: "SE-H-01", title: "Trapping Rain Water", difficulty: "Hard", category: "Arrays", concepts: ["Arrays", "Two Pointers"],
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap.",
        examples: "Input: [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6",
        constraints: "n == height.length",
        starterCode: "function trap(height) {\n  \n}",
        testCases: [{ args: [[0,1,0,2,1,0,1,3,2,1,2,1]], expected: 6 }, { args: [[4,2,0,3,2,5]], expected: 9 }]
    },
    {
        id: "SE-H-02", title: "Minimum Window Substring", difficulty: "Hard", category: "Strings", concepts: ["Strings", "Sliding Window"],
        description: "Given s and t, return the minimum window substring of s such that every character in t is included.",
        examples: "Input: s='ADOBECODEBANC', t='ABC'\nOutput: 'BANC'",
        constraints: "1 <= s.length <= 10^5",
        starterCode: "function minWindow(s, t) {\n  \n}",
        testCases: [{ args: ["ADOBECODEBANC", "ABC"], expected: "BANC" }, { args: ["a", "a"], expected: "a" }]
    },
    {
        id: "SE-H-03", title: "Longest Valid Parentheses", difficulty: "Hard", category: "Strings", concepts: ["Strings", "Dynamic Programming"],
        description: "Given a string containing just the characters '(' and ')', find the length of the longest valid parenthesis substring.",
        examples: "Input: '(()'\nOutput: 2",
        constraints: "0 <= s.length <= 3 * 10^4",
        starterCode: "function longestValidParentheses(s) {\n  \n}",
        testCases: [{ args: ["(()"], expected: 2 }, { args: [")()())"], expected: 4 }, { args: [""], expected: 0 }]
    },
    {
        id: "SE-H-04", title: "First Missing Positive", difficulty: "Hard", category: "Arrays", concepts: ["Arrays", "Hash Maps"],
        description: "Given an unsorted integer array nums, return the smallest missing positive integer.",
        examples: "Input: [1,2,0]\nOutput: 3",
        constraints: "1 <= nums.length <= 10^5",
        starterCode: "function firstMissingPositive(nums) {\n  \n}",
        testCases: [{ args: [[1,2,0]], expected: 3 }, { args: [[3,4,-1,1]], expected: 2 }, { args: [[7,8,9,11,12]], expected: 1 }]
    },
    {
        id: "SE-H-05", title: "Merge k Sorted Lists", difficulty: "Hard", category: "Arrays", concepts: ["Arrays", "Sorting", "Divide and Conquer"],
        description: "Given an array of sorted arrays (simulating k sorted lists), merge them into one sorted array.",
        examples: "Input: [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]",
        constraints: "0 <= lists.length <= 10^4",
        starterCode: "function mergeKLists(lists) {\n  \n}",
        testCases: [{ args: [[[1,4,5],[1,3,4],[2,6]]], expected: [1,1,2,3,4,4,5,6] }, { args: [[]], expected: [] }, { args: [[[]]], expected: [] }]
    }
];

const dataAnalystCodingProblems = [
    // Easy
    {
        id: "DA-E-01", title: "Filter Valid Emails", difficulty: "Easy", category: "Data Cleaning", concepts: ["Strings", "Regex", "Filtering"],
        description: "Given an array of email strings, return an array of valid emails (contains @ and .).",
        examples: "Input: ['test@example.com', 'invalid']\nOutput: ['test@example.com']",
        constraints: "1 <= emails.length <= 100",
        starterCode: "function filterEmails(emails) {\n  \n}",
        testCases: [{ args: [["test@example.com", "invalid", "user@domain.org"]], expected: ["test@example.com", "user@domain.org"] }]
    },
    {
        id: "DA-E-02", title: "Calculate Average Salary", difficulty: "Easy", category: "Aggregation", concepts: ["Aggregation", "Math"],
        description: "Given an array of employee objects {name, salary}, return the average salary rounded to the nearest integer.",
        examples: "Input: [{name:'A', salary:100}, {name:'B', salary:200}]\nOutput: 150",
        constraints: "1 <= employees.length <= 10^4",
        starterCode: "function averageSalary(employees) {\n  \n}",
        testCases: [{ args: [[{name:'A', salary:100}, {name:'B', salary:200}]], expected: 150 }, { args: [[{name:'A', salary:50000}, {name:'B', salary:60000}, {name:'C', salary:75000}]], expected: 61667 }]
    },
    {
        id: "DA-E-03", title: "Count By Department", difficulty: "Easy", category: "Grouping", concepts: ["Grouping", "Hash Maps"],
        description: "Given an array of objects {id, department}, return an object mapping department names to the count of employees.",
        examples: "Input: [{id:1, department:'IT'}, {id:2, department:'IT'}, {id:3, department:'HR'}]\nOutput: {'IT': 2, 'HR': 1}",
        constraints: "1 <= records.length <= 1000",
        starterCode: "function countByDept(records) {\n  \n}",
        testCases: [{ args: [[{id:1, department:'IT'}, {id:2, department:'IT'}, {id:3, department:'HR'}]], expected: {"IT":2, "HR":1} }]
    },
    {
        id: "DA-E-04", title: "Format SQL Dates", difficulty: "Easy", category: "Data Cleaning", concepts: ["Strings", "Formatting"],
        description: "Given an array of date strings 'MM-DD-YYYY', convert them to 'YYYY-MM-DD'.",
        examples: "Input: ['12-31-2023']\nOutput: ['2023-12-31']",
        constraints: "1 <= dates.length <= 100",
        starterCode: "function formatDates(dates) {\n  \n}",
        testCases: [{ args: [["12-31-2023", "01-15-2024"]], expected: ["2023-12-31", "2024-01-15"] }]
    },
    {
        id: "DA-E-05", title: "Extract Domains", difficulty: "Easy", category: "Data Parsing", concepts: ["Strings", "Parsing"],
        description: "Given an array of URLs, extract and return just the domain name (e.g. 'https://www.google.com/search' -> 'www.google.com').",
        examples: "Input: ['https://example.com/page']\nOutput: ['example.com']",
        constraints: "1 <= urls.length <= 100",
        starterCode: "function extractDomains(urls) {\n  \n}",
        testCases: [{ args: [["https://www.google.com/search", "http://example.com"]], expected: ["www.google.com", "example.com"] }]
    },
    // Intermediate
    {
        id: "DA-I-01", title: "Join Two Tables", difficulty: "Intermediate", category: "Joins", concepts: ["Joins", "Arrays"],
        description: "Given users = [{id, name}] and orders = [{userId, total}], return an array of {name, total} by joining on id = userId.",
        examples: "Input: users=[{id:1, name:'A'}], orders=[{userId:1, total:100}]\nOutput: [{name:'A', total:100}]",
        constraints: "1 <= length <= 1000",
        starterCode: "function joinTables(users, orders) {\n  \n}",
        testCases: [{ args: [[{id:1, name:'A'}, {id:2, name:'B'}], [{userId:1, total:100}, {userId:2, total:200}]], expected: [{name:'A', total:100}, {name:'B', total:200}] }]
    },
    {
        id: "DA-I-02", title: "Top 3 Highest Paid", difficulty: "Intermediate", category: "Sorting", concepts: ["Sorting", "Filtering"],
        description: "Given an array of employees {name, salary}, return the names of the top 3 highest paid employees in descending order of salary.",
        examples: "Input: [{name:'A', salary:100}, {name:'B', salary:300}, {name:'C', salary:200}, {name:'D', salary:50}]\nOutput: ['B', 'C', 'A']",
        constraints: "3 <= employees.length <= 1000",
        starterCode: "function topThree(employees) {\n  \n}",
        testCases: [{ args: [[{name:'A', salary:100}, {name:'B', salary:300}, {name:'C', salary:200}, {name:'D', salary:50}]], expected: ["B", "C", "A"] }]
    },
    {
        id: "DA-I-03", title: "Remove Duplicate Rows", difficulty: "Intermediate", category: "Data Cleaning", concepts: ["Deduplication", "Hash Maps"],
        description: "Given an array of objects representing rows in a table, return a new array with duplicate rows (based on all properties) removed.",
        examples: "Input: [{id:1, v:10}, {id:1, v:10}, {id:2, v:20}]\nOutput: [{id:1, v:10}, {id:2, v:20}]",
        constraints: "1 <= rows.length <= 1000",
        starterCode: "function removeDuplicates(rows) {\n  \n}",
        testCases: [{ args: [[{id:1, v:10}, {id:1, v:10}, {id:2, v:20}]], expected: [{id:1, v:10}, {id:2, v:20}] }]
    },
    {
        id: "DA-I-04", title: "Pivot Data", difficulty: "Intermediate", category: "Transformation", concepts: ["Transformation", "Grouping"],
        description: "Given [{date, metric, value}], return [{date, metric1: val1, metric2: val2}] pivoting the metric column.",
        examples: "Input: [{date:'d1', metric:'A', value:10}, {date:'d1', metric:'B', value:20}]\nOutput: [{date:'d1', A:10, B:20}]",
        constraints: "1 <= data.length <= 100",
        starterCode: "function pivotData(data) {\n  \n}",
        testCases: [{ args: [[{date:'d1', metric:'A', value:10}, {date:'d1', metric:'B', value:20}]], expected: [{date:'d1', A:10, B:20}] }]
    },
    {
        id: "DA-I-05", title: "Calculate Rolling Sum", difficulty: "Intermediate", category: "Window Functions", concepts: ["Window Functions", "Arrays"],
        description: "Given an array of numbers representing daily sales, return an array of the cumulative (rolling) sum.",
        examples: "Input: [10, 20, 30]\nOutput: [10, 30, 60]",
        constraints: "1 <= sales.length <= 10^4",
        starterCode: "function rollingSum(sales) {\n  \n}",
        testCases: [{ args: [[10, 20, 30]], expected: [10, 30, 60] }, { args: [[5, 5, 5, 5]], expected: [5, 10, 15, 20] }]
    },
    // Hard
    {
        id: "DA-H-01", title: "Complex Join & Aggregate", difficulty: "Hard", category: "Joins & Aggregation", concepts: ["Joins", "Aggregation", "Sorting"],
        description: "Given 'users' [{id, region}] and 'purchases' [{userId, amount}], return an array of {region, totalSales} sorted by totalSales descending.",
        examples: "Input: users=[{id:1, region:'US'}], purchases=[{userId:1, amount:50}, {userId:1, amount:50}]\nOutput: [{region:'US', totalSales:100}]",
        constraints: "1 <= length <= 10^4",
        starterCode: "function regionSales(users, purchases) {\n  \n}",
        testCases: [{ args: [[{id:1, region:'US'}, {id:2, region:'EU'}], [{userId:1, amount:50}, {userId:1, amount:50}, {userId:2, amount:200}]], expected: [{region:'EU', totalSales:200}, {region:'US', totalSales:100}] }]
    },
    {
        id: "DA-H-02", title: "Rank Scores", difficulty: "Hard", category: "Window Functions", concepts: ["Window Functions", "Sorting", "Ranking"],
        description: "Given an array of score numbers, return an array of their ranks. Equal scores get the same rank, and the next rank is incremented (Dense Rank). Highest score is rank 1.",
        examples: "Input: [100, 100, 90, 80]\nOutput: [1, 1, 2, 3]",
        constraints: "1 <= scores.length <= 1000",
        starterCode: "function denseRank(scores) {\n  \n}",
        testCases: [{ args: [[100, 100, 90, 80]], expected: [1, 1, 2, 3] }, { args: [[3.5, 3.65, 4.0, 3.65]], expected: [3, 2, 1, 2] }]
    },
    {
        id: "DA-H-03", title: "Fill Missing Dates", difficulty: "Hard", category: "Data Cleaning", concepts: ["Data Imputation", "Dates"],
        description: "Given an array of objects [{date: '2023-01-01', value: 10}, {date: '2023-01-03', value: 20}], return a continuous array filling missing dates with value 0.",
        examples: "Input: [{date: '2023-01-01', value: 10}, {date: '2023-01-03', value: 20}]\nOutput: [{date: '2023-01-01', value: 10}, {date: '2023-01-02', value: 0}, {date: '2023-01-03', value: 20}]",
        constraints: "Dates in 'YYYY-MM-DD', max gap 100 days",
        starterCode: "function fillMissingDates(data) {\n  \n}",
        testCases: [{ args: [[{date: '2023-01-01', value: 10}, {date: '2023-01-03', value: 20}]], expected: [{date: '2023-01-01', value: 10}, {date: '2023-01-02', value: 0}, {date: '2023-01-03', value: 20}] }]
    },
    {
        id: "DA-H-04", title: "Cohort Retention Analysis", difficulty: "Hard", category: "Cohort Analysis", concepts: ["Grouping", "Time Series"],
        description: "Given [{userId, signupDate, lastActiveDate}], calculate the retention rate (percentage rounded to nearest integer) of users who were active >30 days after signup.",
        examples: "Input: [{userId:1, signupDate:'2023-01-01', lastActiveDate:'2023-02-15'}, {userId:2, signupDate:'2023-01-01', lastActiveDate:'2023-01-05'}]\nOutput: 50",
        constraints: "1 <= users.length <= 10^4",
        starterCode: "function retentionRate(users) {\n  \n}",
        testCases: [{ args: [[{userId:1, signupDate:'2023-01-01', lastActiveDate:'2023-02-15'}, {userId:2, signupDate:'2023-01-01', lastActiveDate:'2023-01-05'}]], expected: 50 }]
    },
    {
        id: "DA-H-05", title: "Moving Average", difficulty: "Hard", category: "Window Functions", concepts: ["Window Functions", "Math"],
        description: "Given an array of numbers and a window size k, return an array of moving averages of size k. Length of result is length - k + 1.",
        examples: "Input: nums=[1,2,3,4], k=2\nOutput: [1.5, 2.5, 3.5]",
        constraints: "1 <= k <= nums.length <= 10^4",
        starterCode: "function movingAverage(nums, k) {\n  \n}",
        testCases: [{ args: [[1,2,3,4], 2], expected: [1.5, 2.5, 3.5] }, { args: [[10, 20, 30, 40], 3], expected: [20, 30] }]
    }
];

function selectCodingProblems(role, difficulty, count = 5) {
    let pool = role === "Data Analyst" ? dataAnalystCodingProblems : softwareEngineerCodingProblems;
    let candidates = pool.filter(p => p.difficulty === difficulty);
    
    // If not enough candidates of exact difficulty, fallback to picking from the same role
    if (candidates.length < count) {
        candidates = pool.slice(); // copy all from the role
    }
    
    // Shuffle and pick `count`
    let shuffled = candidates.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
