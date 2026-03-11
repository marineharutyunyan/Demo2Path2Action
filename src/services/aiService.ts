import { OPENAI_CONFIG } from "@/config/openai";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function improveText(
  currentText: string,
  fieldContext: string,
  campaignContext?: string,
): Promise<string> {
  if (!currentText.trim()) {
    throw new Error("Please enter some text first");
  }

  const systemPrompt = `You are an expert civic campaign planner and copywriter. Your task is to improve and enhance text for civic initiative planning documents. 
Keep the core message but make it:
- More clear and professional
- More actionable and specific
- Better structured if needed
- More compelling and engaging

Respond with ONLY the improved text, no explanations or preamble.`;

  const userPrompt = `Improve this text for a civic campaign planning document.
Field type: ${fieldContext}
${campaignContext ? `Campaign context: ${campaignContext}` : ""}

Original text:
"${currentText}"

Provide an improved version:`;

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_CONFIG.model,
      messages,
      max_tokens: OPENAI_CONFIG.maxTokens,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error?.message || "Failed to improve text");
  }

  const data: OpenAIResponse = await response.json();
  const improvedText = data.choices[0]?.message?.content?.trim();

  if (!improvedText) {
    throw new Error("No response received from AI");
  }

  return improvedText;
}
