import { ENDPOINTS } from "@/shared/constants/endpoints";
import type { BooksResponse } from "@/shared/types";

async function fetchBooks(): Promise<BooksResponse> {
  const response = await fetch(`${ENDPOINTS.API_BASE_URL}/books`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}

export const getBookListQuery = () => ({
  queryKey: ["books"],
  queryFn: fetchBooks,
});
