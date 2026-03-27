import { ENDPOINTS } from "@/shared/constants/endpoints";
import type { BooksResponse, Language } from "@/shared/types";

export type BookFilters = {
  languages: Language[];
  genre: string;
  author: string;
};

export async function fetchBooks(
  filters: BookFilters,
  page?: number,
): Promise<BooksResponse> {
  const params = new URLSearchParams();

  if (filters.languages?.length > 0) {
    params.set("languages", filters.languages.join(","));
  }

  if (filters.genre) {
    params.set("topic", filters.genre);
  }

  if (filters.author.trim()) {
    params.set("search", filters.author.trim());
  }

  if (page && page > 1) {
    params.set("page", String(page));
  }

  const response = await fetch(`${ENDPOINTS.BOOKS_LIST}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}
