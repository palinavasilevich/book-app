import { Field, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";

type FieldInputProps = {
  label: string;
  placeholder: string;
};

export function FieldInput({ label, placeholder }: FieldInputProps) {
  return (
    <Field>
      <FieldLabel htmlFor={label}>{label}</FieldLabel>
      <Input id={label} type="text" placeholder={placeholder} />
    </Field>
  );
}
