const codingEngine = {
    // We create a Blob representing the Web Worker to avoid needing an external file
    getWorkerCode() {
        return `
            self.onmessage = function(e) {
                const { code, testCases } = e.data;
                const results = [];
                
                try {
                    // Safe-ish eval within worker context (no DOM access)
                    // Construct a function that returns the user's function
                    const userFuncStr = code + "\\n; return " + getFunctionName(code) + ";";
                    const userFunc = new Function(userFuncStr)();
                    
                    if (typeof userFunc !== 'function') {
                        throw new Error("Could not find a valid function to execute.");
                    }

                    for (let i = 0; i < testCases.length; i++) {
                        const { args, expected } = testCases[i];
                        try {
                            const result = userFunc(...args);
                            const passed = JSON.stringify(result) === JSON.stringify(expected);
                            results.push({
                                index: i,
                                passed: passed,
                                expected: expected,
                                actual: result,
                                error: null
                            });
                        } catch (err) {
                            results.push({
                                index: i,
                                passed: false,
                                expected: expected,
                                actual: null,
                                error: err.toString()
                            });
                        }
                    }
                    self.postMessage({ success: true, results });
                } catch (err) {
                    self.postMessage({ success: false, error: err.toString() });
                }
            };
            
            function getFunctionName(code) {
                const match = code.match(/function\\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\\s*\\(/);
                return match ? match[1] : null;
            }
        `;
    },

    executeCode(code, testCases, timeoutMs = 2000) {
        return new Promise((resolve, reject) => {
            const blob = new Blob([this.getWorkerCode()], { type: "application/javascript" });
            const worker = new Worker(URL.createObjectURL(blob));
            
            let timeoutId = setTimeout(() => {
                worker.terminate();
                resolve({ success: false, error: "Execution Timeout: Code took too long to run (possible infinite loop)." });
            }, timeoutMs);

            worker.onmessage = function(e) {
                clearTimeout(timeoutId);
                worker.terminate();
                resolve(e.data);
            };

            worker.onerror = function(e) {
                clearTimeout(timeoutId);
                worker.terminate();
                resolve({ success: false, error: e.message });
            };

            worker.postMessage({ code, testCases });
        });
    },
    
    evaluateResults(results) {
        if (!results || !results.success) {
            return {
                score: 0,
                passedCount: 0,
                totalCount: 0,
                feedback: "Failed to execute. " + (results ? results.error : "")
            };
        }
        
        const total = results.results.length;
        const passed = results.results.filter(r => r.passed).length;
        const score = Math.round((passed / total) * 100);
        
        let feedback = "";
        if (score === 100) {
            feedback = "Excellent! All test cases passed.";
        } else if (score > 0) {
            feedback = "Some test cases failed. Review edge cases and constraints.";
        } else {
            feedback = "All test cases failed. Re-evaluate your approach.";
        }
        
        return {
            score,
            passedCount: passed,
            totalCount: total,
            feedback,
            detailedResults: results.results
        };
    }
};
