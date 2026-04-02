import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useRandomBook } from "./use-random-book";
import type { BookFilters } from "../api/books";

const DEFAULT_FILTERS: BookFilters = {
  languages: [],
  author: "",
  genre: "",
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

  const {
    data: book,
    isFetching,
    isError,
    error,
  } = useRandomBook(appliedFilters, isSubmitted);

  const onSubmit = form.handleSubmit((data) => {
    setAppliedFilters(data);
    setIsSubmitted(true);
  });

  const resetForm = () => {
    form.reset(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setIsSubmitted(false);
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
