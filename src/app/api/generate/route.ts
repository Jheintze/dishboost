import OpenAI from "openai";
import {
  marketingSystemPrompt,
  createMarketingPrompt,
} from "@/app/lib/prompts/prompts";
import { AIResponse } from "@/app/types/marketing";

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
    max_tokens: 700,
  });

  console.log(completion.choices[0].message.content);
  const raw = completion.choices[0].message.content || "";

  const aiResponse: AIResponse = JSON.parse(
    raw.replace("```json", "").replace("```", "").trim(),
  );

  // Clean Instagram caption
  aiResponse.instagram.caption = aiResponse.instagram.caption
    .replace(/#[\wÀ-ÿ]+/g, "")
    .trim();

  // Ensure hashtags have #
  aiResponse.instagram.hashtags = aiResponse.instagram.hashtags.map(
    (tag: string) => (tag.startsWith("#") ? tag : `#${tag}`),
  );

  return Response.json({
    generatedCaption: aiResponse,
  });
}
