"use client";

import type { Language } from "@/shared/types/book.types";
import type { BookFilters } from "../api/books";
import { cn } from "@/shared/lib/utils";
import { LANGUAGES } from "@/shared/constants/languages";
import { GENRES_BOOKS } from "@/shared/constants/genres";
import { Button } from "@/shared/ui/kit/button";
import React from "react";

type FiltersFormProps = {
  filters: BookFilters;
  onChange: (filters: BookFilters) => void;
};

export function FiltersForm({ filters, onChange }: FiltersFormProps) {
  const toggleLanguage = (lang: Language) => {
    const selectedLanguages = filters.languages.includes(lang)
      ? filters.languages.filter((l) => l !== lang)
      : [...filters.languages, lang];

    onChange({ ...filters, languages: selectedLanguages });
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, genre: e.target.value });
  };

  const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, author: e.target.value });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium text-neutral-700">Language</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(({ value, label }) => {
            const selected = filters.languages.includes(value);
            return (
              <Button
                key={value}
                variant="outline"
                onClick={() => toggleLanguage(value)}
                className={cn(
                  "rounded-full border p-3 text-sm transition-colors cursor-pointer",
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

      <div>
        <label
          htmlFor="genre"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          Genre
        </label>
        <select
          name="genre"
          value={filters.genre}
          onChange={handleSelect}
          className={`
            w-full rounded-lg border border-neutral-300 bg-white 
            px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2
          focus:ring-neutral-200
          `}
        >
          <option disabled value="" className="opacity-0.5">
            Select genre...
          </option>
          {GENRES_BOOKS.map((genre) => (
            <option key={genre.id} value={genre.label}>
              {genre.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="author"
          className="mb-2 block text-sm font-medium text-neutral-700"
        >
          Author
        </label>
        <input
          name="author"
          type="text"
          value={filters.author}
          className={`
            w-full rounded-lg border border-neutral-300 bg-white 
            px-3 py-2 text-sm outline-none focus:border-neutral-500 focus:ring-2
          focus:ring-neutral-200
          `}
          placeholder="Archibald Cronin"
          onChange={handleChangeAuthor}
        />
      </div>
    </div>
  );
}
