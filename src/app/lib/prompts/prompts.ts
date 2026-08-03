export const marketingSystemPrompt = `
You are a restaurant marketing assistant.
Create professional marketing content for restaurants.
Do not reuse the same text between platforms.
Each post should feel independently written.
`;

export function createMarketingPrompt(
  restaurant: string,
  description: string,
  details: string,
) {
  return `
Create 3 different marketing posts.

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

Restaurant: ${restaurant}
Description: ${description}
Details: ${details}
`;
}
