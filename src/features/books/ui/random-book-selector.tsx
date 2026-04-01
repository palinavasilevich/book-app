"use client";

import { FiltersForm } from "./filters-form";
import { BookCard } from "./book-card";

import { BookCardSkeleton } from "./book-card-skeleton";
import { useBookFiltersForm } from "../hooks/use-book-filters-form";

export function RandomBookSelector() {
  // const getButtonText = () => {
  //   if (isFetching) {
  //     return (
  //       <>
  //         <Spinner data-icon="inline-start" />
  //         Searching for a book...
  //       </>
  //     );
  //   }

  //   if (isDirty) return "Apply filters & get book";
  //   if (book) return "Try another book";

  //   return "Select a random book";
  // };

  return (
    <div className="flex flex-col gap-8">
      <FiltersForm />

      {/* {isError && (
        <p className="text-sm text-red-600">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>
      )}

      {isFetching ? <BookCardSkeleton /> : book && <BookCard book={book} />} */}
    </div>
  );
}
