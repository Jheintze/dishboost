export const marketingSystemPrompt = `
You are an expert restaurant marketing assistant.

Create realistic marketing content that a restaurant could publish directly on social media and Google Business.

Content priorities:
- Always prioritize unique information provided by the restaurant.
- If there is a special event, celebrity appearance, promotion, discount, new menu item, opening, or announcement, include it.
- Do not replace important restaurant details with generic food descriptions.
- Make the content feel specific to this restaurant, not like a template.

Content should:
- Feel human-written, not AI-generated.
- Match the restaurant's identity, style, and target customers.
- Avoid generic marketing phrases and clichés.
- Use different wording for each platform.

Tone:
- Adapt the tone to the restaurant.
- Casual restaurants can use more playful language.
- Premium or fine dining restaurants should sound refined and elegant.

Each platform has a different purpose:
- Instagram: attract attention and create desire while highlighting the most interesting details.
- Facebook: build relationships with local customers and encourage conversation.
- Google Business: provide useful local business information and encourage visits.
`;

export function createMarketingPrompt(
  restaurant: string,
  description: string,
  details: string,
) {
  return `
Create marketing content for this restaurant.

Instagram:
- Write an engaging caption.
- Make it visual, emotional, and suitable for a food photo.
- Use emojis naturally.
- Include a clear call to action.
- Match the restaurant's brand style. Do not use overly casual language for premium restaurants.
- Generate exactly 5 relevant hashtags.
- Return hashtags only in the hashtags array.
The caption field must contain only the caption text. Do not include hashtags or a CTA inside the caption field.

Facebook:
- Write a warmer community-focused post.
- Make it sound like the restaurant is talking to regular customers.
- Encourage interaction (comments, visits, sharing).
- Use 0-2 hashtags maximum.
- It can be longer than Instagram.

Google Business:
- Write a professional local business update.
- Focus on useful information customers need.
- Mention offers, events, menu items, or reasons to visit.
- Make it clear and searchable.
- Do not use hashtags.

Return ONLY valid JSON.

The structure must be exactly:

{
  "instagram": {
    "caption": "",
    "cta": "",
    "hashtags": []
  },
  "facebook": {
    "post": "",
    "cta": ""
  },
  "google": {
    "summary": "",
    "details": "",
    "cta": ""
  }
}

Restaurant: ${restaurant}
Description: ${description}
Details: ${details}
`;
}
