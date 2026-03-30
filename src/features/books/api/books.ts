import { ENDPOINTS } from "@/shared/constants/endpoints";
import type { BooksResponse, Language } from "@/shared/types";

export type BookFilters = {
  languages: Language[];
  genre: string;
  author: string;
};

export const PAGE_SIZE = 25;

export async function fetchBooks(
  filters: BookFilters,
  offset = 0,
): Promise<BooksResponse> {
  const params = new URLSearchParams();
  params.set("limit", String(PAGE_SIZE));
  params.set(
    "fields",
    "key,title,author_name,subject,cover_i,first_publish_year,edition_count",
  );

  if (offset > 0) {
    params.set("offset", String(offset));
  }

  if (filters.author.trim()) {
    params.set("author", filters.author.trim());
  }

  if (filters.genre) {
    params.set("subject", filters.genre);
  }

  filters.languages?.forEach((lang) => params.append("language", lang));

  const response = await fetch(`${ENDPOINTS.BOOKS_LIST}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}
