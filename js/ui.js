const ui = {
    // Screens
    homeScreen: document.getElementById("screen-home"),
    setupScreen: document.getElementById("screen-setup"),
    interviewScreen: document.getElementById("screen-interview"),
    resultsScreen: document.getElementById("screen-results"),
    
    // Setup UI
    roleCards: document.querySelectorAll(".role-card[data-role]"),
    difficultyCards: document.querySelectorAll(".role-card[data-difficulty]"),
    typeCards: document.querySelectorAll(".role-card[data-type]"),
    geminiApiKeyInput: document.getElementById("gemini-api-key"),
    btnTestApi: document.getElementById("btn-test-api"),
    apiKeyFeedback: document.getElementById("api-key-feedback"),
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
    resCodingScore: document.getElementById("results-coding-score"),
    resStrengths: document.getElementById("results-strengths"),
    resImprovements: document.getElementById("results-improvements"),
    resRecommendations: document.getElementById("results-recommendations"),
    resOverallRec: document.getElementById("results-overall-recommendation"),
    resQuestionReview: document.getElementById("results-question-review"),
    
    showScreen(screenElement) {
        [this.homeScreen, this.setupScreen, this.interviewScreen, this.codingScreen, this.resultsScreen].forEach(s => {
            if(s) {
                s.classList.remove("active");
                s.classList.add("hidden");
            }
        });
        screenElement.classList.remove("hidden");
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
        this.roleLabel.textContent = `${questionObj.role} / ${questionObj.difficulty}`;
        this.questionTracker.textContent = `Question ${index + 1}/${total}`;
        this.questionText.textContent = questionObj.question;
        
        const sourceBadge = document.getElementById("interview-source-badge");
        if (questionObj.source === "AI") {
            sourceBadge.textContent = "AI Generated";
            sourceBadge.style.color = "var(--accent-cyan)";
            sourceBadge.style.background = "rgba(6, 182, 212, 0.15)";
            sourceBadge.style.borderColor = "rgba(6, 182, 212, 0.3)";
        } else {
            sourceBadge.textContent = "Local Question Bank";
            sourceBadge.style.color = "var(--accent-violet)";
            sourceBadge.style.background = "rgba(168, 85, 247, 0.15)";
            sourceBadge.style.borderColor = "rgba(168, 85, 247, 0.3)";
        }
        
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
            this.btnNext.innerHTML = "Continue &rarr;";
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
        document.getElementById("subjective-results-section").style.display = "none";
        document.getElementById("coding-results-section").style.display = "none";
        document.getElementById("results-subtitle").textContent = state.interviewType === "coding" ? "Coding Assessment Results" : "Subjective Interview Analysis";

        if (state.interviewType === "subjective") {
            document.getElementById("subjective-results-section").style.display = "block";
            let totalScore = 0;
            let conceptPct = 0, qualPct = 0, structPct = 0, commPct = 0;
            let count = resultsArray.length;
            
            resultsArray.forEach(res => {
                totalScore += res.totalScore;
                conceptPct += res.conceptScore;
                qualPct += res.qualityScore;
                structPct += res.structureScore;
                commPct += res.communicationScore;
            });
            
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
            
            // Clear lists
            this.resStrengths.innerHTML = "";
            this.resImprovements.innerHTML = "";
            this.resRecommendations.innerHTML = "";
            
            // Populate Strong Areas
            if (state.weakAreas && state.weakAreas.strong.length > 0) {
                state.weakAreas.strong.forEach(c => {
                    this.addListItem(this.resStrengths, c.name, "✓", "var(--success)");
                });
            } else {
                this.addListItem(this.resStrengths, "Keep practicing to build strong areas.", "✓", "var(--success)");
            }
            
            // Populate Needs Practice
            const needsWork = [];
            if (state.weakAreas) {
                if (state.weakAreas.priorityImprovement) needsWork.push(...state.weakAreas.priorityImprovement);
                if (state.weakAreas.needsPractice) needsWork.push(...state.weakAreas.needsPractice);
            }
            
            if (needsWork.length > 0) {
                needsWork.forEach(c => {
                    this.addListItem(this.resImprovements, c.name, "!", "var(--warning)");
                });
            } else {
                this.addListItem(this.resImprovements, "No critical weaknesses detected.", "!", "var(--warning)");
            }
            
            // Populate Recommendations
            const recommendedConcepts = recommendationEngine.getRecommendedTopics(state.selectedRole, state.weakAreas);
            recommendedConcepts.forEach(c => {
                this.addListItem(this.resRecommendations, c, "→", "var(--primary)");
            });
            
            this.resOverallRec.textContent = recommendationEngine.generateOverallActionPlan ? recommendationEngine.generateOverallActionPlan(finalScore, state.weakAreas) : "Review the feedback above to improve your skills.";
            
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
        } else if (state.interviewType === "coding") {
            document.getElementById("coding-results-section").style.display = "block";
            
            const resultsList = state.codingResultsList || [];
            let totalScore = 0;
            let attemptedCount = 0;
            let totalTestsPassed = 0;
            let totalTests = 0;
            let strongConcepts = new Set();
            let weakConcepts = new Set();
            
            const breakdownContainer = document.getElementById("coding-question-breakdown");
            breakdownContainer.innerHTML = "";
            
            resultsList.forEach((res, i) => {
                const prob = res.problem;
                let scoreText = res.skipped ? "Not Attempted" : `${res.evaluation.score}%`;
                
                if (!res.skipped) {
                    attemptedCount++;
                    totalScore += res.evaluation.score;
                    totalTestsPassed += res.evaluation.passedCount;
                    
                    if (res.evaluation.score >= 80) {
                        prob.concepts.forEach(c => strongConcepts.add(c));
                    } else {
                        prob.concepts.forEach(c => weakConcepts.add(c));
                    }
                }
                totalTests += res.evaluation.totalCount || prob.testCases.length;
                
                // Build row
                const div = document.createElement("div");
                div.style.background = "rgba(255,255,255,0.6)";
                div.style.padding = "1rem";
                div.style.borderRadius = "8px";
                div.style.border = "1px solid rgba(0,0,0,0.05)";
                div.style.display = "flex";
                div.style.justifyContent = "space-between";
                div.style.alignItems = "center";
                
                const infoDiv = document.createElement("div");
                
                const titleH5 = document.createElement("h5");
                titleH5.style.margin = "0 0 0.25rem 0";
                titleH5.style.fontSize = "1.05rem";
                titleH5.textContent = `Q${i+1}: ${prob.title}`;
                
                const conceptsDiv = document.createElement("div");
                conceptsDiv.style.fontSize = "0.85rem";
                conceptsDiv.style.color = "var(--text-secondary)";
                conceptsDiv.textContent = prob.concepts.join(", ");
                
                infoDiv.appendChild(titleH5);
                infoDiv.appendChild(conceptsDiv);
                
                const scoreDiv = document.createElement("div");
                scoreDiv.style.fontWeight = "700";
                scoreDiv.style.fontSize = "1.1rem";
                scoreDiv.style.color = res.skipped ? "var(--text-secondary)" : (res.evaluation.score >= 80 ? "var(--success)" : "var(--warning)");
                scoreDiv.textContent = scoreText;
                
                div.appendChild(infoDiv);
                div.appendChild(scoreDiv);
                breakdownContainer.appendChild(div);
            });
            
            const avgScore = attemptedCount > 0 ? Math.round(totalScore / attemptedCount) : 0;
            document.getElementById("final-coding-score").textContent = attemptedCount > 0 ? `${avgScore}%` : "Not Attempted";
            document.getElementById("final-coding-tests").textContent = `${totalTestsPassed} / ${totalTests}`;
            document.getElementById("final-coding-attempted").textContent = `${attemptedCount} / 5`;
            
            const ulStrong = document.getElementById("coding-strong-areas");
            const ulNeeds = document.getElementById("coding-needs-practice");
            ulStrong.innerHTML = "";
            ulNeeds.innerHTML = "";
            
            if (strongConcepts.size > 0) {
                Array.from(strongConcepts).forEach(c => this.addListItem(ulStrong, c, "✓", "var(--success)"));
            } else {
                this.addListItem(ulStrong, "None identified.", "✓", "var(--success)");
            }
            
            if (weakConcepts.size > 0) {
                Array.from(weakConcepts).forEach(c => this.addListItem(ulNeeds, c, "!", "var(--warning)"));
            } else {
                this.addListItem(ulNeeds, "None identified.", "!", "var(--warning)");
            }
        }
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
