"use client";

import { Button } from "@/shared/ui/kit/button";
import { FieldInput } from "./field-input";
import { FieldYearRange } from "./field-year-range";

import { type BookFiltersFormProps } from "../../hooks/use-book-filters-form";
import { Spinner } from "@/shared/ui/kit/spinner";
import { FieldSelectLanguage } from "./field-select-language";
import { FieldSelectGenre } from "./field-select-genre";

type FiltersFormProps = BookFiltersFormProps & {
  isFetching: boolean;
  hasResult?: boolean;
  submitButtonText?: string;
  onSubmit: React.ComponentProps<"form">["onSubmit"];
  resetForm: () => void;
};

export function FiltersForm({
  form,
  isFetching,
  hasResult = false,
  submitButtonText = "Apply filters & get book",
  onSubmit,
  resetForm,
}: FiltersFormProps) {
  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <FieldSelectLanguage form={form} />
      <FieldSelectGenre form={form} />
      <FieldInput
        name="author"
        label="Author"
        placeholder="Enter the author's name, e.g. Brandon Sanderson"
        form={form}
      />
      <FieldYearRange form={form} />

      <div className="flex gap-4 justify-between">
        <Button
          type="submit"
          disabled={isFetching || (!hasResult && !form.formState.isDirty)}
          aria-busy={isFetching}
          className="flex-1 h-10 cursor-pointer transition-colors hover:bg-primary/80"
        >
          {!isFetching ? (
            submitButtonText
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
