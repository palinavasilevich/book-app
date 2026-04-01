import { useRandomBook } from "./use-random-book";
import type { BookFilters } from "../api/books";
import { useForm, useWatch, UseFormReturn } from "react-hook-form";

export type BookFiltersFormProps = {
  form: UseFormReturn<BookFilters>;
};

const DEFAULT_FILTERS: BookFilters = {
  languages: [],
  author: "",
  genre: "",
};

export function useBookFiltersForm() {
  const form = useForm<BookFilters>({
    defaultValues: DEFAULT_FILTERS,
  });

  const resetForm = () => form.reset(DEFAULT_FILTERS);

  const filters = useWatch({ control: form.control }) as BookFilters;

  const {
    data: book,
    isFetching,
    isError,
    error,
    refetch,
  } = useRandomBook(filters);

  const onSubmit = form.handleSubmit(() => {
    refetch();
  });

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
