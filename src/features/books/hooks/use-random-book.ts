import { useQuery } from "@tanstack/react-query";
import { fetchBooks, type BookFilters } from "../api/books";
import type { Book } from "@/shared/types";

const PAGE_SIZE = 32;
const MAX_PAGES = 100;

async function fetchRandomBook(filters: BookFilters): Promise<Book> {
  const firstPage = await fetchBooks(filters, 1);

  if (firstPage.count === 0 || firstPage.results.length === 0) {
    throw new Error("No books found for the selected filters.");
  }

  const totalPages = Math.min(
    Math.ceil(firstPage.count / PAGE_SIZE),
    MAX_PAGES,
  );
  const randomPage = Math.ceil(Math.random() * totalPages);

  const page =
    randomPage === 1 ? firstPage : await fetchBooks(filters, randomPage);

  const authorQuery = filters.author.trim().toLowerCase();
  const results = authorQuery
    ? page.results.filter((book) =>
        book.authors.some((a) => a.name.toLowerCase().includes(authorQuery)),
      )
    : page.results;

  if (results.length === 0) {
    throw new Error("No matching books on this page. Try again.");
  }

  return results[Math.floor(Math.random() * results.length)];
}

export function useRandomBook(filters: BookFilters) {
  return useQuery({
    queryKey: ["random-book", filters],
    queryFn: () => fetchRandomBook(filters),
    enabled: false,
    retry: false,
  });
}
