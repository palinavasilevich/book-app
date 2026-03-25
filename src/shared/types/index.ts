export type Language = "en" | "fr" | "de" | "es" | "fi";

export type Data = {
  count: number;
  results: Book[];
  next: string | null;
  previous: string | null;
};

export type Author = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

type FormatKeys =
  | "image/jpeg"
  | "text/html"
  | "application/epub+zip"
  | "text/plain; charset=utf-8";

export type Book = {
  id: number;
  title: string;
  authors: Author[];
  subjects: string[];
  languages: Language[];
  copyright: boolean | null;
  download_count: number;
  formats: Partial<Record<FormatKeys, string>> & Record<string, string>;
};
