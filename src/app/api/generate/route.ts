

export async function POST(req: Request) {
    const { restaurant, description, details } = await req.json();

    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: `Generate a marketing content for ${restaurant}, ${description}, ${details}` }]
        }),
    });

    const data = await response.json();

    return Response.json({
        message: data.choices[0].message.content
    });
} 