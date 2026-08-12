import OpenAI from "openai";
import {
  marketingSystemPrompt,
  createMarketingPrompt,
} from "@/app/lib/prompts/prompts";
import { AIResponse } from "@/app/types/marketing";
import { supabase } from "@/app/lib/utils/supabase";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const LIMIT = 10;

export async function POST(req: Request) {
  try {
    const { restaurant, description, details, image, language} = await req.json();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const today = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("daily_usage")
      .select("*")
      .eq("ip", ip)
      .eq("date", today)
      .maybeSingle();

    if (data && data.count >= LIMIT) {
      return Response.json(
        {
          error: "Daily limit reached (10 free generations).",
          remaining: 0,
        },
        { status: 429 },
      );
    }
    const newCount = data ? data.count + 1 : 1;
    const remaining = Math.max(0, LIMIT - newCount);

    const userContent: any[] = [
      {
        type: "text",
        text: createMarketingPrompt(restaurant, description, details, language),
      },
    ];

    if (image) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: image,
        },
      });
    }
 
   console.log("Has image:", !!image);
   console.log("Image start:", image?.substring(0, 50));

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: marketingSystemPrompt,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.3,
      max_tokens: 700,
    });

    const raw = completion.choices[0].message.content || "";

    const aiResponse: AIResponse = JSON.parse(
      raw.replace("```json", "").replace("```", "").trim(),
    );

    await supabase.from("events").insert([
      {
        event_type: "generation_completed",
        ip,
        has_image: false,
      },
    ]);

    if (data) {
        await supabase
        .from("daily_usage")
        .update({ count: data.count + 1 })
        .eq("id", data.id);
    } else {
      await supabase.from("daily_usage").insert([
        {
          ip,
          date: today,
          count: 1,
        },
      ]);
    }
      console.log(completion.choices[0].message.content);
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
      remaining,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to generate content" },
      { status: 500 },
    );
  }
}
