import { type NextRequest } from "next/server";
import { OPEN_LIBRARY_BASE_URL } from "@/shared/constants/endpoints";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 500;

async function fetchWithRetry(url: string): Promise<Response> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, { next: { revalidate: 3600 } });
    if (response.status !== 503 || attempt === MAX_RETRIES) return response;
    await new Promise((r) => setTimeout(r, RETRY_DELAY_MS * attempt));
  }
  // unreachable, but satisfies TS
  throw new Error("Retry loop exited unexpectedly");
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams.toString();
    const response = await fetchWithRetry(`${OPEN_LIBRARY_BASE_URL}?${params}`);

    if (!response.ok) {
      return new Response(`Failed to fetch books: ${response.status}`, {
        status: response.status,
      });
    }

    const data = await response.json();
    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("API error:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
