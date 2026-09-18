// ui object extensions for coding screen
Object.assign(ui, {
    codingScreen: document.getElementById("screen-coding"),
    codingTitle: document.getElementById("coding-title"),
    codingDescription: document.getElementById("coding-description"),
    codingExamples: document.getElementById("coding-examples"),
    codingConstraints: document.getElementById("coding-constraints"),
    codeInput: document.getElementById("coding-input"),
    btnRunCode: document.getElementById("btn-run-code"),
    btnSubmitCode: document.getElementById("btn-submit-code"),
    codingResultsArea: document.getElementById("coding-results-area"),
    btnSkipCoding: document.getElementById("btn-skip-coding")
});

let currentCodingProblem = null;
let currentCodingQuestionIndex = 0;
let codingQuestions = [];
let codingResultsList = [];

function initCodingChallenge(weakAreas, difficulty) {
    codingQuestions = selectCodingProblems(state.selectedRole, difficulty, 5);
    currentCodingQuestionIndex = 0;
    codingResultsList = [];
    
    document.getElementById("coding-role-label").textContent = state.selectedRole;
    document.getElementById("coding-difficulty-label").textContent = state.difficulty;
    
    loadCodingQuestion();
    ui.showScreen(ui.codingScreen);
}

function loadCodingQuestion() {
    if (currentCodingQuestionIndex >= codingQuestions.length) {
        finishCodingChallenge();
        return;
    }
    
    currentCodingProblem = codingQuestions[currentCodingQuestionIndex];
    document.getElementById("coding-tracker").textContent = `Coding Question ${currentCodingQuestionIndex + 1}/5`;
    
    ui.codingTitle.textContent = currentCodingProblem.title;
    ui.codingDescription.textContent = currentCodingProblem.description;
    ui.codingExamples.textContent = currentCodingProblem.examples;
    ui.codingConstraints.textContent = currentCodingProblem.constraints;
    ui.codeInput.value = currentCodingProblem.starterCode;
    ui.codingResultsArea.textContent = "";
    
    ui.btnRunCode.style.display = "inline-block";
    ui.btnSubmitCode.style.display = "inline-block";
    ui.btnSubmitCode.textContent = "Submit Code";
    ui.btnSkipCoding.style.display = "inline-block";
    
    ui.btnRunCode.disabled = false;
    ui.btnSubmitCode.disabled = true;
    ui.btnSkipCoding.disabled = false;
}

ui.btnRunCode.addEventListener("click", async () => {
    try {
        const code = ui.codeInput.value || "";
        ui.codingResultsArea.textContent = "";
        const p = document.createElement("p");
        p.textContent = "Running tests...";
        ui.codingResultsArea.appendChild(p);
        ui.btnRunCode.disabled = true;
        
        const results = await codingEngine.executeCode(code, currentCodingProblem.testCases);
        
        ui.btnRunCode.disabled = false;
        ui.btnSubmitCode.disabled = false;
        
        renderCodingResults(results, false);
    } catch (err) {
        console.error("Run Code Error:", err);
        ui.codingResultsArea.textContent = "";
        const p = document.createElement("p");
        p.style.color = "var(--error)";
        p.textContent = `Critical UI Error during run: ${err.message}`;
        ui.codingResultsArea.appendChild(p);
        ui.btnRunCode.disabled = false;
    }
});

ui.btnSubmitCode.addEventListener("click", async () => {
    try {
        if (ui.btnSubmitCode.textContent === "Next Question ➔") {
            currentCodingQuestionIndex++;
            loadCodingQuestion();
            return;
        }

        const code = ui.codeInput.value || "";
        ui.btnRunCode.disabled = true;
        ui.btnSubmitCode.disabled = true;
        ui.btnSkipCoding.disabled = true;
        ui.codingResultsArea.textContent = "";
        const p = document.createElement("p");
        p.textContent = "Finalizing evaluation...";
        ui.codingResultsArea.appendChild(p);
        
        const results = await codingEngine.executeCode(code, currentCodingProblem.testCases);
        const evaluation = codingEngine.evaluateResults(results);
        
        codingResultsList.push({
            problem: currentCodingProblem,
            evaluation: evaluation,
            skipped: false
        });
        
        renderCodingResults(results, true);
        
        ui.btnRunCode.style.display = "none";
        ui.btnSkipCoding.style.display = "none";
        ui.btnSubmitCode.textContent = "Next Question ➔";
        ui.btnSubmitCode.disabled = false;
    } catch (err) {
        console.error("Submission Error:", err);
        ui.codingResultsArea.textContent = "";
        const p = document.createElement("p");
        p.style.color = "var(--error)";
        p.textContent = `Critical UI Error during submission: ${err.message}`;
        ui.codingResultsArea.appendChild(p);
        ui.btnSubmitCode.disabled = false;
    }
});

ui.btnSkipCoding.addEventListener("click", () => {
    codingResultsList.push({
        problem: currentCodingProblem,
        evaluation: { score: 0, passedCount: 0, totalCount: currentCodingProblem.testCases.length },
        skipped: true
    });
    
    currentCodingQuestionIndex++;
    loadCodingQuestion();
});

function renderCodingResults(results, isSubmission) {
    ui.codingResultsArea.textContent = "";
    
    if (!results.success) {
        const errorDiv = document.createElement("div");
        errorDiv.style.color = "var(--error)";
        errorDiv.style.padding = "1rem";
        errorDiv.style.background = "rgba(255,0,0,0.1)";
        errorDiv.style.borderRadius = "8px";
        
        const strong = document.createElement("strong");
        strong.textContent = "Execution Error: ";
        
        const errMsg = document.createTextNode(results.error);
        
        errorDiv.appendChild(strong);
        errorDiv.appendChild(errMsg);
        ui.codingResultsArea.appendChild(errorDiv);
        return;
    }
    
    const evalObj = codingEngine.evaluateResults(results);
    
    const scoreDiv = document.createElement("div");
    scoreDiv.style.marginBottom = "1rem";
    scoreDiv.style.fontWeight = "bold";
    scoreDiv.style.color = "var(--primary-dark)";
    scoreDiv.textContent = `Score: ${evalObj.score}%`;
    ui.codingResultsArea.appendChild(scoreDiv);
    
    if (isSubmission) {
        const fbDiv = document.createElement("div");
        fbDiv.style.marginBottom = "1.5rem";
        fbDiv.style.background = "rgba(0,0,0,0.02)";
        fbDiv.style.padding = "1rem";
        fbDiv.style.borderRadius = "8px";
        
        const h4 = document.createElement("h4");
        h4.textContent = "Feedback Summary";
        fbDiv.appendChild(h4);
        
        const summaryP = document.createElement("p");
        summaryP.style.fontWeight = "500";
        if (evalObj.score === 100) {
            summaryP.style.color = "var(--success)";
            summaryP.textContent = "✓ Excellent! All test cases passed.";
        } else if (evalObj.score > 0) {
            summaryP.style.color = "var(--warning)";
            summaryP.textContent = "⚠ Partial success. Review failing edge cases.";
        } else {
            summaryP.style.color = "var(--error)";
            summaryP.textContent = "✗ Needs practice. Logic did not produce expected results.";
        }
        fbDiv.appendChild(summaryP);
        
        const conceptsDiv = document.createElement("div");
        conceptsDiv.style.marginTop = "1rem";
        const cStrong = document.createElement("strong");
        cStrong.textContent = "Concepts tested: ";
        const cText = document.createTextNode(currentCodingProblem.concepts.join(", "));
        conceptsDiv.appendChild(cStrong);
        conceptsDiv.appendChild(cText);
        fbDiv.appendChild(conceptsDiv);
        
        ui.codingResultsArea.appendChild(fbDiv);
    }
    
    evalObj.detailedResults.forEach(r => {
        if (r.passed) {
            const passDiv = document.createElement("div");
            passDiv.style.color = "var(--success)";
            passDiv.style.marginBottom = "0.5rem";
            passDiv.textContent = `✓ Test Case ${r.index + 1}: Passed`;
            ui.codingResultsArea.appendChild(passDiv);
        } else {
            const failDiv = document.createElement("div");
            failDiv.style.color = "var(--error)";
            failDiv.style.marginBottom = "0.5rem";
            failDiv.style.padding = "0.5rem";
            failDiv.style.background = "rgba(255,0,0,0.05)";
            failDiv.style.borderRadius = "4px";
            
            const titleSpan = document.createElement("div");
            titleSpan.textContent = `✗ Test Case ${r.index + 1}: Failed`;
            
            const detailSpan = document.createElement("span");
            detailSpan.style.fontSize = "0.85rem";
            
            const expText = document.createElement("div");
            expText.textContent = `Expected: ${JSON.stringify(r.expected)}`;
            
            const actText = document.createElement("div");
            actText.textContent = `Actual: ${r.error ? r.error : JSON.stringify(r.actual)}`;
            
            detailSpan.appendChild(expText);
            detailSpan.appendChild(actText);
            
            failDiv.appendChild(titleSpan);
            failDiv.appendChild(detailSpan);
            ui.codingResultsArea.appendChild(failDiv);
        }
    });
}

function finishCodingChallenge() {
    state.codingResultsList = codingResultsList;
    ui.renderResults([], []); // We pass empty subjective arrays, renderResults handles coding logic
    ui.showScreen(ui.resultsScreen);
}
