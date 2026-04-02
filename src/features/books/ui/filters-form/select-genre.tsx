import { GENRES_BOOKS } from "@/shared/constants/genres";
import { Field, FieldLabel } from "@/shared/ui/kit/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { Controller } from "react-hook-form";
import { BookFiltersFormProps } from "../../hooks/use-book-filters-form";

export function SelectGenre({ form }: BookFiltersFormProps) {
  return (
    <Controller
      name="genre"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field className="w-full" data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="form-rhf-select-genre">Genre</FieldLabel>
          <Select
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
          >
            <SelectTrigger
              id="form-rhf-select-genre"
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent className="px-4">
              {GENRES_BOOKS.map((genre) => (
                <SelectItem key={genre.value} value={genre.value}>
                  {genre.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      )}
    />
  );
}
