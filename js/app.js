const state = {
    selectedRole: null,
    difficulty: null,
    interviewType: null,
    geminiApiKey: null,
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    results: [],
    answerSubmitted: false,
    codingScore: null,
    weakAreas: null
};

// --- Initialization & Event Listeners ---

document.getElementById("btn-start").addEventListener("click", () => {
    ui.showScreen(ui.setupScreen);
});

function checkStartReady() {
    if (state.selectedRole && state.difficulty && state.interviewType) {
        ui.btnBegin.disabled = false;
        ui.btnBegin.textContent = "Start Interview";
    } else {
        ui.btnBegin.disabled = true;
        ui.btnBegin.textContent = "Select Options to Start";
    }
}

ui.roleCards.forEach(card => {
    card.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        state.selectedRole = btn.getAttribute("data-role");
        ui.roleCards.forEach(c => c.classList.remove("selected"));
        btn.classList.add("selected");
        
        // Handle Marketing Coding Restriction
        const codingCard = document.querySelector('.role-card[data-type="coding"]');
        if (state.selectedRole === "Marketing") {
            codingCard.classList.add("disabled");
            codingCard.setAttribute("aria-disabled", "true");
            codingCard.querySelector('h3').textContent = "Coding Challenge (DISABLED)";
            if (state.interviewType === "coding") {
                state.interviewType = "subjective"; 
            }
            // Always remove selected visually from coding
            codingCard.classList.remove("selected");
            // If nothing is selected or it was reset, select subjective
            if (state.interviewType === "subjective") {
                document.querySelector('.role-card[data-type="subjective"]').classList.add("selected");
            }
        } else {
            codingCard.classList.remove("disabled");
            codingCard.setAttribute("aria-disabled", "false");
            codingCard.querySelector('h3').textContent = "Coding Challenge";
        }
        
        checkStartReady();
    });
});

ui.difficultyCards.forEach(card => {
    card.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        state.difficulty = btn.getAttribute("data-difficulty");
        ui.difficultyCards.forEach(c => c.classList.remove("selected"));
        btn.classList.add("selected");
        checkStartReady();
    });
});

ui.typeCards.forEach(card => {
    card.addEventListener("click", (e) => {
        const btn = e.currentTarget;
        const type = btn.getAttribute("data-type");
        
        // Prevent clicking coding if Marketing
        if (type === "coding" && state.selectedRole === "Marketing") {
            return;
        }
        
        state.interviewType = type;
        ui.typeCards.forEach(c => c.classList.remove("selected"));
        btn.classList.add("selected");
        checkStartReady();
    });
});

ui.geminiApiKeyInput.addEventListener("input", (e) => {
    state.geminiApiKey = e.target.value.trim() || null;
    ui.apiKeyFeedback.textContent = ""; // Clear feedback on typing
});

if (ui.btnTestApi) {
    ui.btnTestApi.addEventListener("click", async () => {
        if (!state.geminiApiKey) {
            ui.apiKeyFeedback.textContent = "Please enter an API key first.";
            ui.apiKeyFeedback.style.color = "var(--warning)";
            return;
        }
        ui.btnTestApi.disabled = true;
        ui.btnTestApi.textContent = "Testing...";
        ui.apiKeyFeedback.textContent = "";
        
        const result = await testApiKey(state.geminiApiKey);
        
        ui.apiKeyFeedback.textContent = result.message;
        if (result.valid) {
            ui.apiKeyFeedback.style.color = "var(--success)";
        } else {
            ui.apiKeyFeedback.style.color = "var(--error)";
        }
        
        ui.btnTestApi.disabled = false;
        ui.btnTestApi.textContent = "Test API Key";
    });
}

ui.btnBegin.addEventListener("click", async () => {
    if (!state.selectedRole || !state.difficulty || !state.interviewType) return;
    
    // Prevent invalid state execution
    if (state.selectedRole === "Marketing" && state.interviewType === "coding") {
        alert("Marketing does not support Coding Challenge.");
        return;
    }
    
    // UI loading state
    ui.btnBegin.textContent = "Loading...";
    ui.btnBegin.disabled = true;
    
    if (state.interviewType === "subjective") {
        await startInterview();
    } else if (state.interviewType === "coding") {
        // Prepare weakAreas as empty since subjective didn't run
        state.weakAreas = { strong: [], developing: [], needsPractice: [], priorityImprovement: [] };
        // Defer to coding UI
        initCodingChallenge(state.weakAreas, state.difficulty);
    }
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

async function startInterview() {
    state.questions = await generateQuestionsWithAI(state.selectedRole, state.difficulty, state.geminiApiKey);
    
    // Safety check - if we couldn't get 5 questions for some reason, don't start
    if (state.questions.length < 5) {
        alert("Not enough questions available for this role and difficulty.");
        return;
    }

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
    // Generate weak areas
    const weakAreas = recommendationEngine.analyzeWeakAreas(state.results, state.questions);
    state.weakAreas = weakAreas;
    
    // Skip coding challenge, go straight to results
    ui.renderResults(state.results, state.questions);
    ui.showScreen(ui.resultsScreen);
}

function resetApp() {
    state.selectedRole = null;
    state.difficulty = null;
    state.geminiApiKey = null;
    state.questions = [];
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.results = [];
    state.answerSubmitted = false;
    
    timer.stop();
    
    ui.roleCards.forEach(c => c.classList.remove("selected"));
    ui.difficultyCards.forEach(c => c.classList.remove("selected"));
    ui.geminiApiKeyInput.value = "";
    ui.btnBegin.disabled = true;
    
    ui.showScreen(ui.homeScreen);
}

