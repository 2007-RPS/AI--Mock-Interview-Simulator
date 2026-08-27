const feedbackEngine = {
    generateFeedback(analysis, question) {
        let strengths = [];
        let missing = [];
        let suggestions = [];
        
        if (analysis.isEmpty || analysis.wordCount === 0) {
            return {
                strengths: ["None (No answer was submitted)."],
                missing: question.concepts.map(c => c.name),
                suggestions: ["Provide a complete response addressing the key concepts in the question."]
            };
        }
        
        // STRENGTHS
        if (analysis.conceptScore >= 70) {
            strengths.push("Excellent coverage of the core concepts.");
        } else if (analysis.matchedConcepts.length > 0) {
            strengths.push("Successfully identified: " + analysis.matchedConcepts.join(", ") + ".");
        }
        
        if (analysis.qualityScore >= 80) {
            strengths.push("Appropriate level of detail and answer length.");
        }
        
        if (analysis.structureScore >= 75 && question.structure.length > 0) {
            strengths.push("Clear and well-structured answer progression.");
        }
        
        if (analysis.communicationScore >= 90 && analysis.wordCount >= 10) {
            strengths.push("Professional communication with no filler words.");
        }
        
        if (strengths.length === 0) {
            strengths.push("Attempted to address the question.");
        }
        
        // MISSING CONCEPTS
        if (analysis.missingConcepts.length > 0) {
            missing = [...analysis.missingConcepts];
        } else {
            missing.push("No major expected concepts were missing.");
        }
        
        // SUGGESTIONS (Priority Based)
        if (analysis.conceptScore < 50) {
            if (analysis.missingConcepts.length > 0) {
                suggestions.push("Focus on including core concepts like: " + analysis.missingConcepts[0] + ".");
            } else {
                suggestions.push("Include more technical specifics related to the question.");
            }
        } else if (analysis.qualityScore < 50) {
            const min = question.idealLength ? question.idealLength.min : 30;
            const max = question.idealLength ? question.idealLength.max : 80;
            suggestions.push(`Provide a more complete response (aim for ${min}-${max} words).`);
        } else if (analysis.structureScore < 50 && question.structure.length > 0) {
            suggestions.push("Organize the answer better by including a clear " + question.structure[0] + ".");
        } else if (analysis.communicationScore < 70) {
            suggestions.push("Reduce filler words and avoid repeating the exact same phrases.");
        } else {
            suggestions.push("Great answer! Maintain this level of detail and clarity.");
        }
        
        // Cap lengths for clean UI
        return {
            strengths: strengths.slice(0, 3),
            missing: missing.slice(0, 3),
            suggestions: suggestions.slice(0, 1)
        };
    },
    
    getReadinessLevel(score) {
        if (score >= 90) return "Interview Ready";
        if (score >= 75) return "Nearly Ready";
        if (score >= 60) return "Needs Practice";
        return "More Preparation Needed";
    }
};
