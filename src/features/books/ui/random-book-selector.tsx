"use client";

import { useState } from "react";
import { FiltersForm } from "./filters-form";
import { BookCard } from "./book-card";
import { useRandomBook } from "../hooks/use-random-book";
import type { BookFilters } from "../api/books";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Button } from "@/shared/ui/kit/button";
import { SkeletonBookCard } from "./skeleton-book-card";

const DEFAULT_FILTERS: BookFilters = {
  languages: ["eng"],
  author: "",
  genre: "",
};

export function RandomBookSelector() {
  const [filters, setFilters] = useState<BookFilters>(DEFAULT_FILTERS);

  const {
    data: book,
    isFetching,
    isError,
    error,
    refetch,
  } = useRandomBook(filters);

  function handleClick() {
    refetch();
  }

  return (
    <div className="flex flex-col gap-8">
      <FiltersForm filters={filters} onChange={setFilters} />

      <Button
        onClick={handleClick}
        disabled={isFetching}
        aria-busy={isFetching}
        className={`
          self-start rounded-xl px-6 py-5 text-sm font-medium text-white 
          transition-colors hover:bg-violet-900 disabled:opacity-50 cursor-pointer
          `}
      >
        {isFetching ? (
          <>
            <Spinner data-icon="inline-start" />
            Searching for a book...
          </>
        ) : book ? (
          "Try again"
        ) : (
          "Select a random book"
        )}
      </Button>

      {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {!book && isFetching && <SkeletonBookCard />}
      {book && <BookCard book={book} />}
    </div>
  );
}
