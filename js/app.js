const state = {
    selectedRole: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    results: [],
    answerSubmitted: false
};

// --- Initialization & Event Listeners ---

document.getElementById("btn-start").addEventListener("click", () => {
    ui.showScreen(ui.setupScreen);
});

ui.roleCards.forEach(card => {
    card.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        state.selectedRole = btn.getAttribute("data-role");
        ui.selectRoleCard(btn);
    });
});

ui.btnBegin.addEventListener("click", () => {
    if (!state.selectedRole) return;
    startInterview();
});

ui.answerInput.addEventListener("input", (e) => {
    const text = e.target.value;
    const count = analyzer.countWords(text);
    ui.updateWordCount(count);
    
    // Prevent empty submissions manually
    if (text.trim() === "") {
        ui.btnSubmit.disabled = true;
    } else {
        ui.btnSubmit.disabled = false;
    }
});

ui.btnSubmit.addEventListener("click", () => {
    if (ui.answerInput.value.trim() === "") return;
    submitCurrentAnswer("manual");
});

ui.btnNext.addEventListener("click", () => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex++;
        loadCurrentQuestion();
    } else {
        finishInterview();
    }
});

document.getElementById("btn-retry").addEventListener("click", resetApp);
document.getElementById("btn-home").addEventListener("click", resetApp);

// --- Core Flow Functions ---

function startInterview() {
    const allRoleQuestions = questionBank[state.selectedRole] || [];
    state.questions = allRoleQuestions.slice(0, 5);
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.results = [];
    
    ui.showScreen(ui.interviewScreen);
    loadCurrentQuestion();
}

function loadCurrentQuestion() {
    state.answerSubmitted = false;
    const q = state.questions[state.currentQuestionIndex];
    
    ui.renderQuestion(q, state.currentQuestionIndex, state.questions.length);
    ui.btnSubmit.disabled = true;
    
    timer.start(
        60,
        (sec) => ui.updateTimer(sec),
        () => submitCurrentAnswer("timeout")
    );
}

function submitCurrentAnswer(reason) {
    // Phase 2: Duplicate-submission / race-condition guard
    if (state.answerSubmitted) return;
    state.answerSubmitted = true;
    
    // Stop the timer immediately
    timer.stop();
    
    const answerText = ui.answerInput.value;
    const question = state.questions[state.currentQuestionIndex];
    
    // Phase 2: Securely capture and store the raw answer in central state
    state.answers.push(answerText);
    
    // Existing Phase 3 UI Integration (Feedback)
    // Left intact as per instruction: "If existing Phase 3 placeholder UI is already present, leave it intact"
    const analysis = analyzer.analyzeAnswer(answerText, question);
    const feedbackStrings = feedbackEngine.generateFeedback(analysis, question);
    
    state.results.push(analysis);
    
    const isLast = (state.currentQuestionIndex === state.questions.length - 1);
    ui.showFeedback(analysis, feedbackStrings, isLast);
}

function finishInterview() {
    ui.renderResults(state.results, state.questions);
    ui.showScreen(ui.resultsScreen);
}

function resetApp() {
    state.selectedRole = null;
    state.questions = [];
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.results = [];
    state.answerSubmitted = false;
    
    timer.stop();
    
    ui.roleCards.forEach(c => c.classList.remove("selected"));
    ui.btnBegin.disabled = true;
    
    ui.showScreen(ui.homeScreen);
}

