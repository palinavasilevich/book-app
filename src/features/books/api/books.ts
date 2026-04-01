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
const MAX_RESULTS = 1000;

export async function fetchBooks(
  filters: BookFilters,
  offset = 0,
): Promise<BooksResponse> {
  const params = new URLSearchParams();

  params.set("limit", String(PAGE_SIZE));
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
  const firstPage = await fetchBooks(filters, 0);
  if (firstPage.numFound === 0 || firstPage.docs.length === 0) {
    throw new Error("No books found for the selected filters.");
  }

  const totalResults = Math.min(firstPage.numFound, MAX_RESULTS);
  const randomOffset = Math.floor(Math.random() * totalResults);
  const pageOffset = Math.floor(randomOffset / PAGE_SIZE) * PAGE_SIZE;

  const page =
    pageOffset === 0 ? firstPage : await fetchBooks(filters, pageOffset);

  const results = filterBooksByAuthor(page.docs, filters.author);

  if (results.length === 0) throw new Error("No matching books on this page.");

  const randomBook = results[Math.floor(Math.random() * results.length)];
  return formatBookData(randomBook);
}
