import { useQuery } from "@tanstack/react-query";
import { fetchBooks, PAGE_SIZE, type BookFilters } from "../api/books";
import type { Book } from "@/shared/types/book.types";
import { formatBookData } from "../utils/format-book-data";

const MAX_RESULTS = 1000;

async function fetchRandomBook(filters: BookFilters): Promise<Book> {
  const firstPage = await fetchBooks(filters, 0);

  if (firstPage.numFound === 0 || firstPage.docs.length === 0) {
    throw new Error("No books found for the selected filters.");
  }

  const totalResults = Math.min(firstPage.numFound, MAX_RESULTS);
  const randomOffset = Math.floor(Math.random() * totalResults);
  const pageOffset = Math.floor(randomOffset / PAGE_SIZE) * PAGE_SIZE;

  const page =
    pageOffset === 0 ? firstPage : await fetchBooks(filters, pageOffset);

  const authorQuery = filters.author.trim().toLowerCase();
  const results = authorQuery
    ? page.docs.filter((book) =>
        book.author_name?.some((a) => a.toLowerCase().includes(authorQuery)),
      )
    : page.docs;

  if (results.length === 0) {
    throw new Error("No matching books on this page. Try again.");
  }

  const randomBook = results[Math.floor(Math.random() * results.length)];

  return formatBookData(randomBook);
}

export function useRandomBook(filters: BookFilters) {
  return useQuery({
    queryKey: ["random-book", filters],
    queryFn: () => fetchRandomBook(filters),
    enabled: false,
    retry: false,
  });
}
