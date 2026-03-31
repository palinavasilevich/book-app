import { useEffect, useRef, useState } from "react";
import { useRandomBook } from "./use-random-book";
import type { BookFilters } from "../api/books";

const DEFAULT_FILTERS: BookFilters = {
  languages: ["eng"],
  author: "",
  genre: "",
};

export function useBookSelector() {
  const [draftFilters, setDraftFilters] = useState<BookFilters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<BookFilters>(DEFAULT_FILTERS);

  const { data: book, isFetching, isError, error, refetch } =
    useRandomBook(appliedFilters);

  const isDirty =
    JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters);

  const hasFilters = !!draftFilters.author.trim() || !!draftFilters.genre;

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    refetch();
  }, [appliedFilters, refetch]);

  function handleClick() {
    if (isDirty) {
      setAppliedFilters(draftFilters);
    } else {
      refetch();
    }
  }

  return {
    draftFilters,
    setDraftFilters,
    book,
    isFetching,
    isError,
    error,
    isDirty,
    hasFilters,
    handleClick,
  };
}
