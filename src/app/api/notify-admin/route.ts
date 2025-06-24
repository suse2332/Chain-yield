import { notifyAdmin } from "@/lib/telegram";

export async function POST(req: Request) {
  const { message } = await req.json();
  await notifyAdmin(message);
  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
}
