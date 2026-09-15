const codingProblems = [
    {
        id: "CP-01",
        title: "Two Sum",
        difficulty: "Easy",
        category: "Arrays",
        concepts: ["Arrays", "Hash Maps"],
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]",
        constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
        starterCode: "function twoSum(nums, target) {\n  // Write your code here\n  \n}",
        testCases: [
            { args: [[2,7,11,15], 9], expected: [0,1] },
            { args: [[3,2,4], 6], expected: [1,2] },
            { args: [[3,3], 6], expected: [0,1] }
        ]
    },
    {
        id: "CP-02",
        title: "Valid Palindrome",
        difficulty: "Easy",
        category: "Strings",
        concepts: ["Strings", "Two Pointers"],
        description: "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
        examples: "Input: s = \"A man, a plan, a canal: Panama\"\nOutput: true",
        constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
        starterCode: "function isPalindrome(s) {\n  // Write your code here\n  \n}",
        testCases: [
            { args: ["A man, a plan, a canal: Panama"], expected: true },
            { args: ["race a car"], expected: false },
            { args: [" "], expected: true }
        ]
    },
    {
        id: "CP-03",
        title: "Contains Duplicate",
        difficulty: "Easy",
        category: "Arrays",
        concepts: ["Arrays", "Hash Maps"],
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        examples: "Input: nums = [1,2,3,1]\nOutput: true",
        constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        starterCode: "function containsDuplicate(nums) {\n  // Write your code here\n  \n}",
        testCases: [
            { args: [[1,2,3,1]], expected: true },
            { args: [[1,2,3,4]], expected: false },
            { args: [[1,1,1,3,3,4,3,2,4,2]], expected: true }
        ]
    },
    {
        id: "CP-04",
        title: "Filter Valid Emails",
        difficulty: "Easy",
        category: "Strings",
        concepts: ["Strings", "Regex"],
        description: "Given an array of strings representing email addresses, return an array of only the valid ones. A valid email has characters, an '@' symbol, and a domain.",
        examples: "Input: ['test@example.com', 'invalid-email']\nOutput: ['test@example.com']",
        constraints: "1 <= emails.length <= 100",
        starterCode: "function filterEmails(emails) {\n  // Write your code here\n  \n}",
        testCases: [
            { args: [["test@example.com", "invalid", "user@domain.org"]], expected: ["test@example.com", "user@domain.org"] }
        ]
    },
    {
        id: "CP-05",
        title: "Format SQL Output",
        difficulty: "Easy",
        category: "Formatting",
        concepts: ["Formatting", "Arrays", "Objects"],
        description: "Given an array of object records, return an array of formatted strings 'ID: NAME'.",
        examples: "Input: [{id: 1, name: 'Alice'}]\nOutput: ['1: Alice']",
        constraints: "1 <= records.length <= 100",
        starterCode: "function formatRecords(records) {\n  // Write your code here\n  \n}",
        testCases: [
            { args: [[{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}]], expected: ["1: Alice", "2: Bob"] }
        ]
    }
];

function selectCodingProblem(weakestConcepts, difficulty) {
    // Basic recommendation heuristic
    let targetConcept = weakestConcepts.length > 0 ? weakestConcepts[0].name.toLowerCase() : "";
    
    // Attempt to find a problem that matches the weak concept
    let candidates = codingProblems.filter(p => {
        return p.concepts.some(c => c.toLowerCase().includes(targetConcept) || targetConcept.includes(c.toLowerCase()));
    });
    
    // Fallback if no matching concept found
    if (candidates.length === 0) {
        candidates = codingProblems;
    }
    
    // Pick randomly from candidates
    const idx = Math.floor(Math.random() * candidates.length);
    return candidates[idx];
}
