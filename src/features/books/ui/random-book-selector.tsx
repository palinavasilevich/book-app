"use client";

import { FiltersForm } from "./filters-form";
import { BookCard } from "./book-card";
import { BookCardSkeleton } from "./book-card-skeleton";
import { useBookFiltersForm } from "../hooks/use-book-filters-form";

export function RandomBookSelector() {
  const { book, isError, error, isFetching, form, onSubmit, resetForm } =
    useBookFiltersForm();

  return (
    <div className="flex flex-col gap-8">
      <FiltersForm
        form={form}
        isFetching={isFetching}
        hasResult={!!book}
        submitButtonText={book ? "Try another book" : undefined}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {isFetching ? <BookCardSkeleton /> : book && <BookCard book={book} />}
    </div>
  );
}
