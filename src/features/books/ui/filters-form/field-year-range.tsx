import { Field, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Controller } from "react-hook-form";
import { BookFiltersFormProps } from "../../hooks/use-book-filters-form";

export function FieldYearRange({ form }: BookFiltersFormProps) {
  return (
    <div className="flex gap-4">
      <Controller
        name="firstPublishYearFrom"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1">
            <FieldLabel htmlFor="form-rhf-input-year-from">From year</FieldLabel>
            <Input
              id="form-rhf-input-year-from"
              type="number"
              placeholder="e.g. 1900"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
            />
          </Field>
        )}
      />
      <Controller
        name="firstPublishYearTo"
        control={form.control}
        render={({ field }) => (
          <Field className="flex-1">
            <FieldLabel htmlFor="form-rhf-input-year-to">To year</FieldLabel>
            <Input
              id="form-rhf-input-year-to"
              type="number"
              placeholder="e.g. 2000"
              value={field.value ?? ""}
              onChange={(e) =>
                field.onChange(
                  e.target.value === "" ? undefined : Number(e.target.value),
                )
              }
            />
          </Field>
        )}
      />
    </div>
  );
}
