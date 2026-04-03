"use client";

import { FiltersForm } from "./filters-form";
import { BookCard } from "./book-card";
import { BookCardSkeleton } from "./book-card-skeleton";
import { useBookFiltersForm } from "../hooks/use-book-filters-form";
import { Button } from "@/shared/ui/kit/button";

export function RandomBookSelector() {
  const {
    book,
    isError,
    error,
    isFetching,
    form,
    onSubmit,
    resetForm,
    refetchNew,
  } = useBookFiltersForm();

  return (
    <div className="flex flex-col gap-8">
      <FiltersForm
        form={form}
        isFetching={isFetching}
        onSubmit={onSubmit}
        resetForm={resetForm}
      />

      {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {isFetching ? (
        <BookCardSkeleton />
      ) : (
        book && (
          <>
            <Button
              variant="secondary"
              onClick={() => refetchNew()}
              className="w-40 m-auto h-10 cursor-pointer bg-primary/50 hover:bg-primary/80"
            >
              Try another book
            </Button>
            <BookCard book={book} />
          </>
        )
      )}
    </div>
  );
}
