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
    ui.codingResultsArea.innerHTML = "";
    
    ui.btnRunCode.style.display = "inline-block";
    ui.btnSubmitCode.style.display = "inline-block";
    ui.btnSubmitCode.textContent = "Submit Code";
    ui.btnSkipCoding.style.display = "inline-block";
    
    ui.btnRunCode.disabled = false;
    ui.btnSubmitCode.disabled = true;
    ui.btnSkipCoding.disabled = false;
}

ui.btnRunCode.addEventListener("click", async () => {
    const code = ui.codeInput.value;
    ui.codingResultsArea.innerHTML = "<p>Running tests...</p>";
    ui.btnRunCode.disabled = true;
    
    const results = await codingEngine.executeCode(code, currentCodingProblem.testCases);
    
    ui.btnRunCode.disabled = false;
    ui.btnSubmitCode.disabled = false;
    
    renderCodingResults(results, false);
});

ui.btnSubmitCode.addEventListener("click", async () => {
    if (ui.btnSubmitCode.textContent === "Next Question →") {
        currentCodingQuestionIndex++;
        loadCodingQuestion();
        return;
    }

    const code = ui.codeInput.value;
    ui.btnRunCode.disabled = true;
    ui.btnSubmitCode.disabled = true;
    ui.btnSkipCoding.disabled = true;
    ui.codingResultsArea.innerHTML = "<p>Finalizing evaluation...</p>";
    
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
    ui.btnSubmitCode.textContent = "Next Question →";
    ui.btnSubmitCode.disabled = false;
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
    ui.codingResultsArea.innerHTML = "";
    
    if (!results.success) {
        ui.codingResultsArea.innerHTML = `<div style="color:var(--error); padding:1rem; background:rgba(255,0,0,0.1); border-radius:8px;">
            <strong>Execution Error:</strong> ${results.error}
        </div>`;
        return;
    }
    
    const evalObj = codingEngine.evaluateResults(results);
    
    let html = `<div style="margin-bottom: 1rem; font-weight:bold; color:var(--primary-dark);">Score: ${evalObj.score}%</div>`;
    
    if (isSubmission) {
        // Build feedback block similar to subjective
        html += `<div style="margin-bottom: 1.5rem; background: rgba(0,0,0,0.02); padding: 1rem; border-radius: 8px;">`;
        html += `<h4>Feedback Summary</h4>`;
        if (evalObj.score === 100) {
            html += `<p style="color: var(--success); font-weight: 500;">✓ Excellent! All test cases passed.</p>`;
        } else if (evalObj.score > 0) {
            html += `<p style="color: var(--warning); font-weight: 500;">! Partial success. Review failing edge cases.</p>`;
        } else {
            html += `<p style="color: var(--error); font-weight: 500;">✗ Needs practice. Logic did not produce expected results.</p>`;
        }
        
        html += `<div style="margin-top: 1rem;"><strong>Concepts tested:</strong> ${currentCodingProblem.concepts.join(", ")}</div>`;
        html += `</div>`;
    }
    
    evalObj.detailedResults.forEach(r => {
        if (r.passed) {
            html += `<div style="color:var(--success); margin-bottom:0.5rem;">✓ Test Case ${r.index + 1}: Passed</div>`;
        } else {
            html += `<div style="color:var(--error); margin-bottom:0.5rem; padding: 0.5rem; background:rgba(255,0,0,0.05); border-radius:4px;">
                ✗ Test Case ${r.index + 1}: Failed<br>
                <span style="font-size:0.85rem">Expected: ${JSON.stringify(r.expected)}<br>
                Actual: ${r.error ? r.error : JSON.stringify(r.actual)}</span>
            </div>`;
        }
    });
    
    ui.codingResultsArea.innerHTML = html;
}

function finishCodingChallenge() {
    state.codingResultsList = codingResultsList;
    ui.renderResults([], []); // We pass empty subjective arrays, renderResults handles coding logic
    ui.showScreen(ui.resultsScreen);
}
