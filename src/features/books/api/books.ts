import { ENDPOINTS } from "@/shared/constants/endpoints";
import type { BooksResponse, Language } from "@/shared/types";

export type BookFilters = {
  languages: Language[];
  topic: string;
  authorName: string;
  genre: string;
};

export async function fetchBooks(filters: BookFilters): Promise<BooksResponse> {
  const params = new URLSearchParams();

  if (filters.languages?.length > 0) {
    params.set("languages", filters.languages.join(","));
  }

  if (filters.topic?.trim()) {
    params.set("topic", filters.topic.trim());
  }

  const response = await fetch(`${ENDPOINTS.BOOKS_LIST}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}
