import { BOOKS_API_URL } from "@/shared/constants/endpoints";
import type {
  Book,
  BooksResponse,
  Language,
  OpenLibraryBook,
} from "@/shared/types/book.types";
import { formatBookData } from "../utils/format-book-data";

export type BookFilters = {
  languages: Language[];
  genre: string;
  author: string;
};

export const PAGE_SIZE = 25;
const RANDOM_BOOK_POOL_SIZE = 100;

export async function fetchBooks(
  filters: BookFilters,
  offset = 0,
  limit = PAGE_SIZE,
): Promise<BooksResponse> {
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set(
    "fields",
    "key,title,author_name,subject,cover_i,first_publish_year,first_sentence,language,number_of_pages_median",
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

  const response = await fetch(`${BOOKS_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch books: ${response.status}`);
  }

  return response.json();
}

function filterBooksByAuthor(
  books: OpenLibraryBook[],
  authorQuery: string,
): OpenLibraryBook[] {
  const query = authorQuery.toLowerCase().trim();
  return query
    ? books.filter((b) =>
        b.author_name?.some((a) => a.toLowerCase().includes(query)),
      )
    : books;
}

export async function fetchRandomBook(filters: BookFilters): Promise<Book> {
  const pool = await fetchBooks(filters, 0, RANDOM_BOOK_POOL_SIZE);
  if (pool.numFound === 0 || pool.docs.length === 0) {
    throw new Error("No books found for the selected filters.");
  }

  const results = filterBooksByAuthor(pool.docs, filters.author);

  if (results.length === 0) throw new Error("No matching books on this page.");

  const randomBook = results[Math.floor(Math.random() * results.length)];
  return formatBookData(randomBook);
}
