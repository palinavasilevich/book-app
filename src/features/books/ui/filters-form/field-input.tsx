import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Controller } from "react-hook-form";
import { BookFiltersFormProps } from "../../hooks/use-book-filters-form";
import type { BookFilters } from "../../api/books";

type FieldInputProps = {
  name: keyof BookFilters;
  label: string;
  placeholder: string;
} & BookFiltersFormProps;

export function FieldInput({
  name,
  label,
  placeholder,
  form,
}: FieldInputProps) {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`form-rhf-input-${name}`}>{label}</FieldLabel>
          <Input
            {...field}
            id={`form-rhf-input-${name}`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
          />

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
