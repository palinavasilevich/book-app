"use client";

import type { BookFilters } from "../../api/books";

import { Button } from "@/shared/ui/kit/button";
import { SelectGenre } from "./select-genre";

import { SelectLanguage } from "./select-language";
import { FieldInput } from "./field-input";

import { useBookFiltersForm } from "../../hooks/use-book-filters-form";

export function FiltersForm() {
  const { form, onSubmit, resetForm } = useBookFiltersForm();

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <SelectLanguage form={form} />
      <SelectGenre />
      <FieldInput
        label="Author"
        placeholder="Enter the author's name, e.g. Archibald Cronin"
      />

      <div className="flex gap-4">
        <Button
          type="submit"
          // disabled={isFetching || !hasFilters}
          // aria-busy={isFetching}
          className="w-40 h-10 cursor-pointer transition-colors hover:bg-primary/80"
        >
          Apply filters & get book
        </Button>

        <Button
          type="reset"
          variant="secondary"
          className="w-40 h-10 cursor-pointer transition-colors "
          onClick={resetForm}
          disabled={!form.formState.isDirty}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
