const ui = {
    // Screens
    homeScreen: document.getElementById("screen-home"),
    setupScreen: document.getElementById("screen-setup"),
    interviewScreen: document.getElementById("screen-interview"),
    resultsScreen: document.getElementById("screen-results"),
    
    // Setup UI
    roleCards: document.querySelectorAll(".role-card"),
    btnBegin: document.getElementById("btn-begin-interview"),
    
    // Interview UI
    roleLabel: document.getElementById("interview-role-label"),
    questionTracker: document.getElementById("interview-question-tracker"),
    progressSteps: document.querySelectorAll(".progress-step"),
    questionText: document.getElementById("current-question-text"),
    answerInput: document.getElementById("answer-input"),
    wordCountDisplay: document.getElementById("word-count"),
    btnSubmit: document.getElementById("btn-submit-answer"),
    
    // Timer UI
    timerCircle: document.querySelector(".timer-circle"),
    timerText: document.getElementById("timer-text"),
    
    // Feedback UI
    feedbackContainer: document.getElementById("feedback-container"),
    scoreValue: document.querySelector(".score-value"),
    feedbackStrengths: document.querySelector(".strengths ul"),
    feedbackMissing: document.querySelector(".missing ul"),
    feedbackImprove: document.querySelector(".improve p"),
    breakdownConcept: document.querySelector(".breakdown-row:nth-child(2) span:last-child"),
    breakdownQuality: document.querySelector(".breakdown-row:nth-child(3) span:last-child"),
    breakdownStructure: document.querySelector(".breakdown-row:nth-child(4) span:last-child"),
    breakdownCommunication: document.querySelector(".breakdown-row:nth-child(5) span:last-child"),
    btnNext: document.getElementById("btn-next-question"),
    
    // Results UI
    overallScoreNum: document.querySelector(".overall-score .score-number"),
    readinessLabel: document.querySelector(".readiness-label"),
    resCatConcept: document.querySelector(".category-breakdown .breakdown-row:nth-child(2) span:last-child"),
    resCatQuality: document.querySelector(".category-breakdown .breakdown-row:nth-child(3) span:last-child"),
    resCatStructure: document.querySelector(".category-breakdown .breakdown-row:nth-child(4) span:last-child"),
    resCatComm: document.querySelector(".category-breakdown .breakdown-row:nth-child(5) span:last-child"),
    resStrengths: document.getElementById("results-strengths"),
    resImprovements: document.getElementById("results-improvements"),
    resQuestionReview: document.getElementById("results-question-review"),
    
    showScreen(screenElement) {
        [this.homeScreen, this.setupScreen, this.interviewScreen, this.resultsScreen].forEach(s => {
            s.classList.remove("active");
            s.classList.add("hidden");
        });
        screenElement.classList.remove("hidden");
        // small timeout to allow display:block to apply before animating opacity
        setTimeout(() => {
            screenElement.classList.add("active");
        }, 50);
    },
    
    selectRoleCard(selectedCard) {
        this.roleCards.forEach(c => c.classList.remove("selected"));
        selectedCard.classList.add("selected");
        this.btnBegin.disabled = false;
    },
    
    renderQuestion(questionObj, index, total) {
        this.roleLabel.textContent = questionObj.role;
        this.questionTracker.textContent = `Question ${index + 1}/${total}`;
        this.questionText.textContent = questionObj.question;
        
        // Update Progress
        this.progressSteps.forEach((step, i) => {
            step.className = "progress-step"; // reset
            if (i < index) step.classList.add("completed");
            else if (i === index) step.classList.add("active");
        });
        
        // Reset Inputs & Feedback
        this.answerInput.value = "";
        this.answerInput.disabled = false;
        this.wordCountDisplay.textContent = "0 words";
        this.feedbackContainer.classList.add("hidden");
        
        // Reset Timer UI
        this.timerCircle.className = "timer-circle";
        this.timerText.textContent = "60s";
    },
    
    updateTimer(seconds) {
        this.timerText.textContent = `${seconds}s`;
        if (seconds <= 10 && seconds > 0) {
            this.timerCircle.className = "timer-circle critical";
        } else if (seconds <= 30) {
            this.timerCircle.className = "timer-circle warning";
        } else {
            this.timerCircle.className = "timer-circle";
        }
    },
    
    updateWordCount(count) {
        this.wordCountDisplay.textContent = count === 1 ? "1 word" : `${count} words`;
    },
    
    showFeedback(analysis, feedbackStrs, isLastQuestion) {
        this.btnSubmit.disabled = true;
        this.answerInput.disabled = true;
        
        // Populate Score
        this.scoreValue.textContent = analysis.totalScore;
        
        // Populate Lists safely
        this.feedbackStrengths.innerHTML = "";
        feedbackStrs.strengths.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            this.feedbackStrengths.appendChild(li);
        });
        
        this.feedbackMissing.innerHTML = "";
        feedbackStrs.missing.forEach(m => {
            const li = document.createElement("li");
            li.textContent = m;
            this.feedbackMissing.appendChild(li);
        });
        
        this.feedbackImprove.textContent = feedbackStrs.suggestions[0];
        
        // Populate Breakdown
        this.breakdownConcept.textContent = `${analysis.conceptScore}%`;
        this.breakdownQuality.textContent = `${analysis.qualityScore}%`;
        this.breakdownStructure.textContent = `${analysis.structureScore}%`;
        this.breakdownCommunication.textContent = `${analysis.communicationScore}%`;
        
        // Update Button
        if (isLastQuestion) {
            this.btnNext.innerHTML = "View Results &rarr;";
        } else {
            this.btnNext.innerHTML = "Next Question &rarr;";
        }
        
        this.feedbackContainer.classList.remove("hidden");
        // Scroll to feedback
        setTimeout(() => {
            this.feedbackContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
    },
    
    renderResults(resultsArray, questionsArray) {
        // Calculate Averages
        let totalScore = 0, conceptPct = 0, qualPct = 0, structPct = 0, commPct = 0;
        
        resultsArray.forEach(res => {
            totalScore += res.totalScore;
            conceptPct += res.conceptScore;
            qualPct += res.qualityScore;
            structPct += res.structureScore;
            commPct += res.communicationScore;
        });
        
        const count = resultsArray.length;
        const finalScore = Math.round(totalScore / count);
        
        const avgConcept = Math.round(conceptPct / count);
        const avgQuality = Math.round(qualPct / count);
        const avgStructure = Math.round(structPct / count);
        const avgComm = Math.round(commPct / count);
        
        this.overallScoreNum.textContent = finalScore;
        this.readinessLabel.textContent = feedbackEngine.getReadinessLevel(finalScore);
        
        this.resCatConcept.textContent = `${avgConcept} / 100`;
        this.resCatQuality.textContent = `${avgQuality} / 100`;
        this.resCatStructure.textContent = `${avgStructure} / 100`;
        this.resCatComm.textContent = `${avgComm} / 100`;
        
        // Overall Strengths and Improvements
        this.resStrengths.innerHTML = "";
        this.resImprovements.innerHTML = "";
        
        // Strengths
        if (avgConcept >= 70) this.addListItem(this.resStrengths, "Strong concept coverage", "✓", "var(--success)");
        if (avgQuality >= 75) this.addListItem(this.resStrengths, "Appropriate answer completeness", "✓", "var(--success)");
        if (avgStructure >= 75) this.addListItem(this.resStrengths, "Clear and logical structure", "✓", "var(--success)");
        if (avgComm >= 80) this.addListItem(this.resStrengths, "Good professional communication", "✓", "var(--success)");
        
        if (this.resStrengths.children.length === 0) {
            this.addListItem(this.resStrengths, "Attempted all questions", "✓", "var(--success)");
        }
        
        // Improvements (sort by lowest score)
        let areas = [
            { name: "Focus on covering all required core concepts", score: avgConcept },
            { name: "Provide more complete answers with appropriate detail", score: avgQuality },
            { name: "Organize technical answers with clear explanations and examples", score: avgStructure },
            { name: "Reduce filler words and repetitions to improve clarity", score: avgComm }
        ];
        areas.sort((a, b) => a.score - b.score);
        
        // Pick top 2 improvements (if score < 85, else pick 1)
        const improvementsToShow = finalScore < 85 ? 2 : 1;
        for (let i = 0; i < improvementsToShow; i++) {
            this.addListItem(this.resImprovements, areas[i].name, "→", "var(--warning)");
        }
        
        // Build Question Review
        this.resQuestionReview.innerHTML = "";
        resultsArray.forEach((res, i) => {
            const qObj = questionsArray[i];
            
            const reviewCard = document.createElement("div");
            reviewCard.style.padding = "1rem";
            reviewCard.style.background = "rgba(255,255,255,0.6)";
            reviewCard.style.borderRadius = "var(--radius-md)";
            reviewCard.style.border = "1px solid rgba(255,255,255,0.8)";
            
            const header = document.createElement("div");
            header.style.display = "flex";
            header.style.justifyContent = "space-between";
            header.style.alignItems = "center";
            header.style.marginBottom = "0.5rem";
            
            const title = document.createElement("h5");
            title.style.margin = "0";
            title.style.fontSize = "1.05rem";
            title.style.color = "var(--primary-dark)";
            title.textContent = `Q${i + 1}`;
            
            const score = document.createElement("div");
            score.style.fontWeight = "800";
            score.style.color = "var(--text-primary)";
            score.textContent = `Score: ${res.totalScore}/100`;
            
            header.appendChild(title);
            header.appendChild(score);
            
            const qText = document.createElement("p");
            qText.style.margin = "0 0 0.75rem 0";
            qText.style.fontSize = "0.95rem";
            qText.style.color = "var(--text-secondary)";
            qText.style.fontStyle = "italic";
            qText.textContent = `"${qObj.question}"`;
            
            const feedback = document.createElement("div");
            feedback.style.fontSize = "0.9rem";
            if (res.totalScore >= 75) {
                feedback.style.color = "var(--success)";
                const label = document.createElement("strong");
                label.textContent = "Strength: ";
                const detail = document.createTextNode(res.conceptScore >= 75 ? 'Strong concept coverage' : 'Good overall response');
                feedback.appendChild(label);
                feedback.appendChild(detail);
            } else {
                feedback.style.color = "var(--error)";
                const missingText = res.missingConcepts.length > 0 ? res.missingConcepts.join(", ") : "Structure or clarity";
                const label = document.createElement("strong");
                label.textContent = "Missing: ";
                const detail = document.createTextNode(missingText);
                feedback.appendChild(label);
                feedback.appendChild(detail);
            }
            
            reviewCard.appendChild(header);
            reviewCard.appendChild(qText);
            reviewCard.appendChild(feedback);
            
            this.resQuestionReview.appendChild(reviewCard);
        });
    },
    
    addListItem(parent, text, symbol, color) {
        const li = document.createElement("li");
        li.style.marginBottom = "0.6rem";
        li.style.display = "flex";
        li.style.alignItems = "flex-start";
        li.style.gap = "0.6rem";
        
        const sym = document.createElement("span");
        sym.textContent = symbol;
        sym.style.color = color;
        sym.style.fontWeight = "bold";
        sym.style.fontSize = "1.1rem";
        
        const txt = document.createElement("span");
        txt.textContent = text;
        
        li.appendChild(sym);
        li.appendChild(txt);
        parent.appendChild(li);
    }
};
