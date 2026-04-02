import { BOOKS_API_URL } from "@/shared/constants/endpoints";
import type { Book, BooksResponse, Language } from "@/shared/types/book.types";
import { formatBookData } from "../utils/format-book-data";

export type BookFilters = {
  languages: Language[];
  genre: string;
  author: string;
  firstPublishYearFrom?: number;
  firstPublishYearTo?: number;
};

export const PAGE_SIZE = 25;
const MAX_RANDOM_OFFSET = 999;

export async function fetchBooks(
  filters: BookFilters,
  offset = 0,
  limit = PAGE_SIZE,
): Promise<BooksResponse> {
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set(
    "fields",
    "key,title,author_name,subject,cover_i,first_sentence,language,number_of_pages_median",
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

  const from = filters.firstPublishYearFrom;
  const to = filters.firstPublishYearTo;
  if (from || to) {
    const min = from ?? "*";
    const max = to ?? "*";
    params.set("q", `first_publish_year:[${min} TO ${max}]`);
  }

  const response = await fetch(`${BOOKS_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}

export async function fetchRandomBook(filters: BookFilters): Promise<Book> {
  const countResult = await fetchBooks(filters, 0, 1);
  if (countResult.numFound === 0 || countResult.docs.length === 0) {
    throw new Error("No books found for the selected filters.");
  }

  const randomOffset = Math.floor(
    Math.random() * Math.min(countResult.numFound, MAX_RANDOM_OFFSET + 1),
  );

  if (randomOffset === 0) {
    return formatBookData(countResult.docs[0]);
  }

  const result = await fetchBooks(filters, randomOffset, 1);
  if (result.docs.length === 0) {
    throw new Error("No matching books at this offset.");
  }

  return formatBookData(result.docs[0]);
}
