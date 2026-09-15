const recommendationEngine = {
    analyzeWeakAreas(results, questions) {
        if (!results || results.length === 0 || !questions || questions.length === 0) {
            return {
                strong: [],
                developing: [],
                needsPractice: [],
                priorityImprovement: []
            };
        }

        const conceptStats = {};

        // Aggregate stats
        results.forEach((res, index) => {
            const question = questions[index];
            if (!question || !question.concepts) return;

            question.concepts.forEach(concept => {
                if (!conceptStats[concept.name]) {
                    conceptStats[concept.name] = { totalQuestions: 0, matched: 0 };
                }
                
                conceptStats[concept.name].totalQuestions++;
                if (res.matchedConcepts.includes(concept.name)) {
                    conceptStats[concept.name].matched++;
                }
            });
        });

        const classification = {
            strong: [],
            developing: [],
            needsPractice: [],
            priorityImprovement: []
        };

        // Classify
        for (const [conceptName, stats] of Object.entries(conceptStats)) {
            const score = (stats.matched / stats.totalQuestions) * 100;
            const data = { name: conceptName, score: Math.round(score), total: stats.totalQuestions };

            if (score >= 80) {
                classification.strong.push(data);
            } else if (score >= 65) {
                classification.developing.push(data);
            } else if (score >= 50) {
                classification.needsPractice.push(data);
            } else {
                classification.priorityImprovement.push(data);
            }
        }

        // Sort by score ascending for weaker areas
        classification.needsPractice.sort((a, b) => a.score - b.score);
        classification.priorityImprovement.sort((a, b) => a.score - b.score);
        classification.developing.sort((a, b) => a.score - b.score);
        classification.strong.sort((a, b) => b.score - a.score);

        return classification;
    },

    getRecommendations(weakAreas) {
        const recommendations = [];
        
        // Priority Improvement first
        weakAreas.priorityImprovement.forEach(concept => {
            recommendations.push({
                topic: concept.name,
                reason: `Recommended because concept coverage was very low (${concept.score}%) across questions associated with this topic.`
            });
        });

        // Then Needs Practice
        weakAreas.needsPractice.forEach(concept => {
            recommendations.push({
                topic: concept.name,
                reason: `Recommended because you missed some key points (${concept.score}% coverage) on this topic.`
            });
        });

        return recommendations;
    }
};
