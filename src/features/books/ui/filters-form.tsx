"use client";

import React from "react";
import type { Language } from "@/shared/types/book.types";
import type { BookFilters } from "../api/books";
import { cn } from "@/shared/lib/utils";
import { LANGUAGES } from "@/shared/constants/languages";
import { GENRES_BOOKS } from "@/shared/constants/genres";
import { Button } from "@/shared/ui/kit/button";
import { SelectGenre } from "./filters-form/select-genre";
import { Field, FieldLabel } from "@/shared/ui/kit/field";

type FiltersFormProps = {
  filters: BookFilters;
  onChange: (filters: BookFilters) => void;
};

export function FiltersForm({ filters, onChange }: FiltersFormProps) {
  const updateFilter = <K extends keyof BookFilters>(
    key: K,
    value: BookFilters[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const toggleLanguage = (lang: Language) => {
    const isSelected = filters.languages.includes(lang);

    const updatedLanguages = isSelected
      ? filters.languages.filter((l) => l !== lang)
      : [...filters.languages, lang];

    updateFilter("languages", updatedLanguages);
  };

  return (
    <form className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">Language</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(({ value, label }) => {
            const selected = filters.languages.includes(value);

            return (
              <Button
                key={value}
                type="button"
                variant="outline"
                aria-pressed={selected}
                onClick={() => toggleLanguage(value)}
                className={cn(
                  "cursor-pointer rounded-full border p-3 text-sm transition-colors",
                  selected
                    ? "border-violet-800 bg-violet-800 text-white"
                    : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500",
                )}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>

      <Field className="w-full">
        <FieldLabel>Genre</FieldLabel>
        <SelectGenre />
      </Field>
      <div>
        <label
          htmlFor="author"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={filters.author}
          placeholder="Archibald Cronin"
          onChange={(e) => updateFilter("author", e.target.value)}
          className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
        />
      </div>
    </form>
  );
}
