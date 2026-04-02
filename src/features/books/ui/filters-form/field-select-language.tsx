import { LANGUAGES } from "@/shared/constants/languages";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/shared/ui/kit/field";
import { Controller } from "react-hook-form";
import { BookFiltersFormProps } from "../../hooks/use-book-filters-form";

export function FieldSelectLanguage({ form }: BookFiltersFormProps) {
  return (
    <Controller
      name="languages"
      control={form.control}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend variant="label">Languages</FieldLegend>
          <FieldGroup className="flex flex-row gap-3">
            {LANGUAGES.map((language) => {
              return (
                <Field
                  key={language.value}
                  orientation="horizontal"
                  data-invalid={fieldState.invalid}
                >
                  <Checkbox
                    id={`form-rhf-checkbox-${language.value}`}
                    name={language.value}
                    aria-invalid={fieldState.invalid}
                    checked={field.value.includes(language.value)}
                    onCheckedChange={(checked) => {
                      const newValue = checked
                        ? [...field.value, language.value]
                        : field.value.filter(
                            (value) => value !== language.value,
                          );
                      field.onChange(newValue);
                    }}
                  />
                  <FieldLabel
                    htmlFor={`form-rhf-checkbox-${language.value}`}
                    className="font-normal"
                  >
                    {language.label}
                  </FieldLabel>
                </Field>
              );
            })}
          </FieldGroup>
        </FieldSet>
      )}
    />
  );
}
