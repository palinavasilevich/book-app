"use client";

import { useState } from "react";
import { FiltersForm } from "./filters-form";
import { BookCard } from "./book-card";
import { useRandomBook } from "../hooks/use-random-book";
import type { BookFilters } from "../api/books";

const DEFAULT_FILTERS: BookFilters = {
  languages: ["en"],
  authorName: "",
  genre: "",
};

export function RandomBookPicker() {
  const [filters, setFilters] = useState<BookFilters>(DEFAULT_FILTERS);
  const [triggerKey, setTriggerKey] = useState(0);

  const {
    data: book,
    isFetching,
    isError,
    error,
  } = useRandomBook(filters, triggerKey);

  function handleClick() {
    setTriggerKey((k) => k + 1);
  }

  return (
    <div className="flex flex-col gap-8">
      <FiltersForm filters={filters} onChange={setFilters} />

      <button
        type="button"
        onClick={handleClick}
        disabled={isFetching}
        className="self-start rounded-xl bg-neutral-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
      >
        {isFetching ? "Search book..." : "Select a random book"}
      </button>

      {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {book && <BookCard book={book} />}
    </div>
  );
}
