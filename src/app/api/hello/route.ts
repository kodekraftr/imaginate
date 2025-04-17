import { getRequestContext } from "@cloudflare/next-on-pages";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    return new Response(
        JSON.stringify({ result: `You searched for: ${query}` }),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
}