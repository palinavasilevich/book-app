import { useRandomBook } from "./use-random-book";
import type { BookFilters } from "../api/books";
import { useForm, UseFormReturn } from "react-hook-form";

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

  const onSubmit = form.handleSubmit((filters) => {
    console.log(filters);
    // const {
    //   data: book,
    //   isFetching,
    //   isError,
    //   error,
    //   refetch,
    // } = useRandomBook(filters);
  });

  return {
    // book,
    // isFetching,
    // isError,
    // error,
    form,
    onSubmit,
    resetForm,
  };
}
