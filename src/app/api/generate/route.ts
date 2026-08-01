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
        content:
          "You are a restaurant marketing assistant. Create professional marketing content for restaurants. Do not reuse the same text between platforms.Each post should feel independently written.",
      },
      {
        role: "user",
        content: `Create 3 different marketing posts.

Instagram:
- Write a short, catchy caption.
- Use emojis.
- Include 5-8 relevant hashtags.
- Make it feel casual and visual.
- Target younger social media users.

Facebook:
- Write a warmer community-focused post.
- Do not use many hashtags (0-2 maximum).
- Make it sound like a local business talking to regular customers.
- Can be longer than Instagram.

Google Business:
- Write a concise local update.
- Do not use hashtags.
- Focus on important information: offer, location, opening, visit.
- Make it professional and searchable. 

Return ONLY JSON.
The structure must be exactly:

{
  "instagram": {
    "post": "Instagram caption including hashtags"
  },
  "facebook": {
    "post": "Facebook post"
  },
  "google": {
    "post": "Google Business update"
  }
}

Do not add, remove, or rename any fields.

Restaurant: ${restaurant}, Description: ${description}, Details: ${details}`,
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
