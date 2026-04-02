import { useQuery } from "@tanstack/react-query";
import { fetchRandomBook, type BookFilters } from "../api/books";

export function useRandomBook(filters: BookFilters, enabled: boolean) {
  return useQuery({
    queryKey: ["random-book", filters],
    queryFn: () => fetchRandomBook(filters),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
