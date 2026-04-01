import { useQuery } from "@tanstack/react-query";
import { fetchRandomBook, type BookFilters } from "../api/books";

export function useRandomBook(filters: BookFilters) {
  return useQuery({
    queryKey: ["random-book", filters],
    queryFn: () => fetchRandomBook(filters),
    enabled: false,
    retry: false,
  });
}
