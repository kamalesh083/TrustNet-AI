import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

type ShapInput = {
  trust_score: number;
  confidence_score: number;
  reasons: string[];
};

export async function getFeature(shapData: ShapInput) {
  try {
    const featureRes = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
                You are a blockchain trust explanation assistant.

                STRICT OUTPUT RULES (must follow exactly):
                - Return ONLY 4 lines
                - Each line must be ONE short sentence
                - Do NOT include titles, introductions, summaries, or explanations
                - Do NOT use bullets, numbering, symbols, or markdown
                - Do NOT repeat sentence structures or wording from the input
                - Use simple, human-friendly language
                - Avoid technical, ML, or SHAP terminology
                - Use ONLY the information provided below

                Context:
                Trust Score: ${shapData.trust_score}/100
                Confidence Level: ${shapData.confidence_score}%

                Signals to reinterpret:
                ${shapData.reasons.map((r) => `- ${r}`).join("\n")}

                Task:
                Rewrite the signals into exactly four clear trust insights.
                Each insight must be on its own line.
                Start writing the four lines immediately.
`,
            },
          ],
        },
      ],
    });

    const text = featureRes.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    console.log(text);

    // 🔒 Safety: always return 4 points
    const points = text
      .split("\n")
      .map((line) => line.replace(/^[-*•]\s*/, "").trim())
      .filter(Boolean)
      .slice(0, 4);

    return points.length === 4
      ? points
      : [
          "This wallet shows generally stable usage patterns.",
          "Its activity history contributes positively to trust.",
          "Some interactions introduce minor caution signals.",
          "Overall behavior suggests moderate reliability.",
        ];
  } catch (err) {
    console.error("Gemini error:", err);
    return;
  }
}
