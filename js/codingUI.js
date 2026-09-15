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

function initCodingChallenge(weakAreas, difficulty) {
    let weakest = [];
    if (weakAreas.priorityImprovement.length > 0) weakest = weakAreas.priorityImprovement;
    else if (weakAreas.needsPractice.length > 0) weakest = weakAreas.needsPractice;
    
    currentCodingProblem = selectCodingProblem(weakest, difficulty);
    
    ui.codingTitle.textContent = currentCodingProblem.title;
    ui.codingDescription.textContent = currentCodingProblem.description;
    ui.codingExamples.textContent = currentCodingProblem.examples;
    ui.codingConstraints.textContent = currentCodingProblem.constraints;
    ui.codeInput.value = currentCodingProblem.starterCode;
    ui.codingResultsArea.innerHTML = "";
    
    ui.btnRunCode.disabled = false;
    ui.btnSubmitCode.disabled = true;
    
    ui.showScreen(ui.codingScreen);
}

ui.btnRunCode.addEventListener("click", async () => {
    const code = ui.codeInput.value;
    ui.codingResultsArea.innerHTML = "<p>Running tests...</p>";
    ui.btnRunCode.disabled = true;
    
    const results = await codingEngine.executeCode(code, currentCodingProblem.testCases);
    
    ui.btnRunCode.disabled = false;
    ui.btnSubmitCode.disabled = false;
    
    renderCodingResults(results);
});

ui.btnSubmitCode.addEventListener("click", async () => {
    const code = ui.codeInput.value;
    ui.btnRunCode.disabled = true;
    ui.btnSubmitCode.disabled = true;
    ui.btnSkipCoding.disabled = true;
    ui.codingResultsArea.innerHTML = "<p>Finalizing evaluation...</p>";
    
    const results = await codingEngine.executeCode(code, currentCodingProblem.testCases);
    const evaluation = codingEngine.evaluateResults(results);
    
    state.codingScore = evaluation.score;
    
    finishInterviewFinal(); // Proceed to dashboard
});

ui.btnSkipCoding.addEventListener("click", () => {
    state.codingScore = null;
    finishInterviewFinal();
});

function renderCodingResults(results) {
    ui.codingResultsArea.innerHTML = "";
    
    if (!results.success) {
        ui.codingResultsArea.innerHTML = `<div style="color:var(--error); padding:1rem; background:rgba(255,0,0,0.1); border-radius:8px;">
            <strong>Execution Error:</strong> ${results.error}
        </div>`;
        return;
    }
    
    const evalObj = codingEngine.evaluateResults(results);
    
    let html = `<div style="margin-bottom: 1rem; font-weight:bold; color:var(--primary-dark);">Score: ${evalObj.score}%</div>`;
    
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

// Modify finishInterview to show coding challenge instead of results immediately
function finishInterview() {
    // Generate weak areas
    const weakAreas = recommendationEngine.analyzeWeakAreas(state.results, state.questions);
    state.weakAreas = weakAreas;
    
    initCodingChallenge(weakAreas, state.difficulty);
}

function finishInterviewFinal() {
    ui.renderResults(state.results, state.questions);
    ui.showScreen(ui.resultsScreen);
}
