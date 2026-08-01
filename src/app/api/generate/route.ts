import OpenAI from "openai";

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
        content: "You are a restaurant marketing assistant. Write engaging social media content.",
      },
      {
        role: "user",
        content: `Restaurant: ${restaurant}, Description: ${description}, Details: ${details}`,
      },
    ],
    temperature: 0.5,
    max_tokens: 600,
  });

  const aiResponse = completion.choices[0].message.content;

  return Response.json({
    generatedCaption : aiResponse,
  });
}
