import { useQuery } from "@tanstack/react-query";
import { fetchBooks, type BookFilters } from "../api/books";
import type { Book } from "@/shared/types";

async function fetchRandomBook(filters: BookFilters): Promise<Book> {
  const books = await fetchBooks(filters);

  if (books.count === 0 || books.results.length === 0) {
    throw new Error("No books found for the selected filters.");
  }

  const results = books.results;
  return results[Math.floor(Math.random() * results.length)];
}

export function useRandomBook(filters: BookFilters, triggerKey: number) {
  return useQuery({
    queryKey: ["random-book", filters, triggerKey],
    queryFn: () => fetchRandomBook(filters),
    enabled: triggerKey > 0,
    retry: false,
  });
}
