import { supabase } from "@/app/lib/utils/supabase";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";

  await supabase.from("events").insert([
    {
      event_type: "page_view",
      ip,
      has_image: false,
    },
  ]);

  return Response.json({
    success: true,
  });
}
