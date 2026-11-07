import system from "@/content/artifacts/relay-system.json";
export const dynamic = "force-static";
export function GET() {
  return new Response(JSON.stringify(system, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
