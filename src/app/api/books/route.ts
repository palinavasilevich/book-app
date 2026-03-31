import { type NextRequest } from "next/server";
import { OPEN_LIBRARY_BASE_URL } from "@/shared/constants/endpoints";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams.toString();
  const response = await fetch(`${OPEN_LIBRARY_BASE_URL}?${params}`);

  if (!response.ok) {
    return new Response(`Failed to fetch books: ${response.status}`, {
      status: response.status,
    });
  }

  const data = await response.json();
  return Response.json(data);
}
