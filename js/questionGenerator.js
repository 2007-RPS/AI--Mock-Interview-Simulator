// Pure function for validation
function validateGeneratedQuestion(q, selectedRole, selectedDifficulty) {
    if (!q || typeof q !== 'object') return false;
    if (typeof q.question !== 'string' || q.question.trim() === '') return false;
    if (q.difficulty !== selectedDifficulty) return false;
    if (!Array.isArray(q.concepts) || q.concepts.length === 0) return false;
    
    // Concepts should have name and keywords
    const validConcepts = q.concepts.every(c => c.name && Array.isArray(c.keywords) && c.weight !== undefined);
    if (!validConcepts) return false;
    
    return true;
}

// Optional Gemini question generator
async function generateQuestionsWithAI(role, difficulty, apiKey) {
    if (!apiKey) {
        return getRandomQuestions(role, difficulty, 5); // Fallback
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const prompt = `Generate exactly 5 mock interview questions for a ${role} role at ${difficulty} difficulty level.
Return ONLY valid JSON (no markdown block, just the JSON array).
Format:
[
  {
    "id": "gen-timestamp-1",
    "role": "${role}",
    "difficulty": "${difficulty}",
    "question": "The question text here",
    "concepts": [
      { "name": "Concept name", "keywords": ["keyword1", "keyword2"], "weight": 30 },
      { "name": "Concept 2", "keywords": ["keyword3"], "weight": 70 }
    ],
    "idealLength": { "min": 30, "max": 100 },
    "structure": ["intro", "details"]
  }
]
Important: Make sure weights sum to 100 roughly. Ensure accurate concepts for the role.
`;

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                }
            })
        });

        if (!response.ok) {
            console.warn("Gemini API request failed. Falling back to local questions.");
            return getRandomQuestions(role, difficulty, 5);
        }

        const data = await response.json();
        const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        
        // Strip markdown if it returned it
        let jsonStr = textContent;
        if (jsonStr.startsWith("```json")) {
            jsonStr = jsonStr.substring(7, jsonStr.length - 3).trim();
        } else if (jsonStr.startsWith("```")) {
            jsonStr = jsonStr.substring(3, jsonStr.length - 3).trim();
        }
        
        const generatedArray = JSON.parse(jsonStr);
        
        if (!Array.isArray(generatedArray) || generatedArray.length !== 5) {
            console.warn("API did not return exactly 5 questions. Falling back.");
            return getRandomQuestions(role, difficulty, 5);
        }
        
        const validQuestions = generatedArray.filter(q => validateGeneratedQuestion(q, role, difficulty));
        
        if (validQuestions.length !== 5) {
            console.warn("Some generated questions failed validation. Falling back.");
            return getRandomQuestions(role, difficulty, 5);
        }
        
        return validQuestions;

    } catch (err) {
        console.error("Error generating questions:", err);
        return getRandomQuestions(role, difficulty, 5);
    }
}
