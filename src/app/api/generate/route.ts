import OpenAI from "openai";
import {
  marketingSystemPrompt,
  createMarketingPrompt,
} from "@/app/lib/prompts/prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { restaurant, description, details } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: marketingSystemPrompt,
      },
      {
        role: "user",
        content: createMarketingPrompt(
        restaurant ,
        description,
        details)
      },
    ],
    temperature: 0.5,
    max_tokens: 600,
  });

  console.log(completion.choices[0].message.content);
  const raw = completion.choices[0].message.content || "";

  const aiResponse = JSON.parse(
    raw.replace("```json", "").replace("```", "").trim(),
  );

  return Response.json({
    generatedCaption: aiResponse,
  });
}
