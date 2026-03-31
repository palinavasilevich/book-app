"use client";

import { FiltersForm } from "./filters-form";
import { BookCard } from "./book-card";
import { Spinner } from "@/shared/ui/kit/spinner";
import { Button } from "@/shared/ui/kit/button";
import { BookCardSkeleton } from "./book-card-skeleton";
import { useBookSelector } from "../hooks/use-book-selector";

export function RandomBookSelector() {
  const {
    draftFilters,
    setDraftFilters,
    book,
    isFetching,
    isError,
    error,
    isDirty,
    hasFilters,
    handleClick,
  } = useBookSelector();

  const getButtonText = () => {
    if (isFetching) {
      return (
        <>
          <Spinner data-icon="inline-start" />
          Searching for a book...
        </>
      );
    }

    if (isDirty) return "Apply filters & get book";
    if (book) return "Try another book";

    return "Select a random book";
  };

  return (
    <div className="flex flex-col gap-8">
      <FiltersForm filters={draftFilters} onChange={setDraftFilters} />

      <Button
        onClick={handleClick}
        disabled={isFetching || !hasFilters}
        aria-busy={isFetching}
        className="self-start rounded-xl px-6 py-5 text-sm font-medium text-white transition-colors hover:bg-violet-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {getButtonText()}
      </Button>

      {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {isFetching ? <BookCardSkeleton /> : book && <BookCard book={book} />}
    </div>
  );
}
