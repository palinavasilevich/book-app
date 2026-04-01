"use client";

import { Button } from "@/shared/ui/kit/button";
import { SelectGenre } from "./select-genre";

import { SelectLanguage } from "./select-language";
import { FieldInput } from "./field-input";

import { type BookFiltersFormProps } from "../../hooks/use-book-filters-form";
import { Spinner } from "@/shared/ui/kit/spinner";

type FiltersFormProps = BookFiltersFormProps & {
  isFetching: boolean;
  onSubmit: React.ComponentProps<"form">["onSubmit"];
  resetForm: () => void;
};

export function FiltersForm({
  form,
  isFetching,
  onSubmit,
  resetForm,
}: FiltersFormProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <SelectLanguage form={form} />
      <SelectGenre form={form} />
      <FieldInput
        name="author"
        label="Author"
        placeholder="Enter the author's name, e.g. Archibald Cronin"
        form={form}
      />

      <div className="flex gap-4 justify-between">
        <Button
          type="submit"
          disabled={isFetching || !form.formState.isDirty}
          aria-busy={isFetching}
          className="flex-1 h-10 cursor-pointer transition-colors hover:bg-primary/80"
        >
          {!isFetching ? (
            "Apply filters & get book"
          ) : (
            <>
              <Spinner data-icon="inline-start" />
              Searching for a book...
            </>
          )}
        </Button>

        <Button
          type="reset"
          variant="secondary"
          className="flex-1 h-10 cursor-pointer transition-colors "
          onClick={resetForm}
          disabled={!form.formState.isDirty}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}
