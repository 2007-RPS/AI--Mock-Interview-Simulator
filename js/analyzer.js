const analyzer = {
    normalizeText(text) {
        if (!text) return "";
        return String(text)
            .toLowerCase()
            .trim()
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            .replace(/\s{2,}/g, " ");
    },
    
    countWords(text) {
        const normalized = this.normalizeText(text);
        if (normalized === "") return 0;
        return normalized.split(" ").length;
    },
    
    matchConcepts(normalizedText, concepts) {
        let covered = [];
        let missing = [];
        let score = 0;
        let maxScore = 0;
        
        if (!concepts || concepts.length === 0) {
            return { covered, missing, score: 0 };
        }
        
        concepts.forEach(c => {
            maxScore += c.weight;
            
            // Escape regex specials just in case
            const escapedKws = c.keywords.map(kw => kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
            
            const matched = escapedKws.some(kw => {
                const regex = new RegExp(`\\b${kw}\\b`);
                return regex.test(normalizedText);
            });
            
            if (matched) {
                covered.push(c.name);
                score += c.weight;
            } else {
                missing.push(c.name);
            }
        });
        
        // Normalize to 0-100 automatically
        const normalizedScore = maxScore > 0 ? (score / maxScore) * 100 : 0;
        return { covered, missing, score: Math.round(normalizedScore) };
    },
    
    calculateLengthScore(wordCount, idealLength) {
        if (wordCount === 0) return 0;
        
        const min = idealLength ? idealLength.min : 30;
        const max = idealLength ? idealLength.max : 80;
        const band = max - min;
        
        // Transparent deterministic length-band rule
        if (wordCount >= min && wordCount <= max) return 100;
        if (wordCount < min / 2) return 25;
        if (wordCount < min) return 50;
        if (wordCount > max && wordCount <= max + band) return 75;
        return 50; // Too long
    },
    
    analyzeStructure(normalizedText, expectedStructure) {
        if (!expectedStructure || expectedStructure.length === 0) {
            return { detected: [], missing: [], score: 100 };
        }
        
        const signals = {
            definition: ["refers to", "defined as", "means", "is a", "are called", "stands for"],
            explanation: ["because", "allows", "used for", "helps to", "works by", "so that", "therefore", "this means"],
            example: ["for example", "for instance", "such as", "e.g", "an example", "specifically"],
            comparison: ["whereas", "while", "compared with", "difference", "instead", "but", "however", "on the other hand"],
            application: ["used in", "can be used", "practical", "in practice", "when you", "real world"]
        };
        
        let detected = [];
        let missing = [];
        
        expectedStructure.forEach(exp => {
            if (signals[exp] && signals[exp].some(sig => {
                const regex = new RegExp(`\\b${sig}\\b`);
                return regex.test(normalizedText);
            })) {
                detected.push(exp);
            } else {
                missing.push(exp);
            }
        });
        
        const score = (detected.length / expectedStructure.length) * 100;
        return { detected, missing, score };
    },
    
    analyzeCommunication(normalizedText, wordCount, conceptScore) {
        if (wordCount === 0) return { fillerCount: 0, repetitionPenalty: 0, score: 0 };
        
        // Meaningless answer check (e.g. "kijn")
        if (wordCount < 5 && conceptScore < 20) {
            return { fillerCount: 0, repetitionPenalty: 0, score: 10 };
        }
        
        const fillers = ["um", "uh", "like", "actually", "basically", "literally", "you know"];
        let fillerCount = 0;
        
        fillers.forEach(f => {
            const regex = new RegExp(`\\b${f}\\b`, 'g');
            const matches = normalizedText.match(regex);
            if (matches) fillerCount += matches.length;
        });
        
        let fillerPenalty = fillerCount * 10;

        const words = normalizedText.split(" ");
        let repetitionCount = 0;
        const phrases = {};
        
        for (let i = 0; i <= words.length - 4; i++) {
            const phrase = words.slice(i, i + 4).join(" ");
            phrases[phrase] = (phrases[phrase] || 0) + 1;
        }
        
        for (let p in phrases) {
            if (phrases[p] > 1) repetitionCount += (phrases[p] - 1);
        }
        
        let repetitionPenalty = repetitionCount * 10;
        let score = 100 - fillerPenalty - repetitionPenalty;
        
        return { 
            fillerCount, 
            repetitionPenalty, 
            score: Math.max(0, Math.min(100, score)) 
        };
    },
    
    analyzeAnswer(answer, question) {
        const rawAnswer = answer || "";
        const isEmpty = rawAnswer.trim() === "";
        const wordCount = this.countWords(rawAnswer);
        
        // Empty Answer Hard Override
        if (isEmpty || wordCount === 0) {
            return {
                isEmpty: true,
                wordCount: 0,
                conceptScore: 0,
                qualityScore: 0,
                structureScore: 0,
                communicationScore: 0,
                matchedConcepts: [],
                missingConcepts: question.concepts ? question.concepts.map(c=>c.name) : [],
                fillerCount: 0,
                score: 0,
                totalScore: 0
            };
        }
        
        const norm = this.normalizeText(rawAnswer);
        
        // Base Scores (0-100)
        const concepts = this.matchConcepts(norm, question.concepts);
        const qualityScore = this.calculateLengthScore(wordCount, question.idealLength);
        const struct = this.analyzeStructure(norm, question.structure);
        const comm = this.analyzeCommunication(norm, wordCount, concepts.score);
        
        // Exact Weighted Scoring Model (45/25/20/10)
        const weightedConcept = concepts.score * 0.45;
        const weightedQuality = qualityScore * 0.25;
        const weightedStructure = struct.score * 0.20;
        const weightedComm = comm.score * 0.10;
        
        let finalScore = Math.round(weightedConcept + weightedQuality + weightedStructure + weightedComm);
        finalScore = Math.max(0, Math.min(100, finalScore)); // Bounds
        
        return {
            isEmpty: false,
            wordCount,
            conceptScore: Math.round(concepts.score),
            qualityScore: Math.round(qualityScore),
            structureScore: Math.round(struct.score),
            communicationScore: Math.round(comm.score),
            matchedConcepts: concepts.covered,
            missingConcepts: concepts.missing,
            fillerCount: comm.fillerCount,
            score: finalScore,
            totalScore: finalScore
        };
    }
};
