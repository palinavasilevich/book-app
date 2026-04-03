import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRandomBook } from "./use-random-book";
import type { BookFilters } from "../api/books";

const DEFAULT_FILTERS: BookFilters = {
  languages: [],
  author: "",
  genre: "",
  firstPublishYearFrom: undefined,
  firstPublishYearTo: undefined,
};

export type BookFiltersFormProps = {
  form: UseFormReturn<BookFilters>;
};

export function useBookFiltersForm() {
  const form = useForm<BookFilters>({
    defaultValues: DEFAULT_FILTERS,
  });

  const [appliedFilters, setAppliedFilters] =
    useState<BookFilters>(DEFAULT_FILTERS);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);

  const {
    data: book,
    isFetching,
    isError,
    error,
  } = useRandomBook(appliedFilters, fetchCount, isSubmitted);

  const onSubmit = form.handleSubmit((data) => {
    setAppliedFilters(data);
    setIsSubmitted(true);
    setFetchCount((c) => c + 1);
  });

  const resetForm = () => {
    form.reset(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setIsSubmitted(false);
    setFetchCount(0);
  };

  return {
    book,
    isFetching,
    isError,
    error,
    form,
    onSubmit,
    resetForm,
  };
}
