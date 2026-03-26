export type Language = "en" | "fr" | "de" | "es" | "fi";

export type BooksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};

export type Author = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
};

export type FormatMimeType =
  | "image/jpeg"
  | "text/html"
  | "text/html; charset=utf-8"
  | "application/epub+zip"
  | "application/x-mobipocket-ebook"
  | "application/rdf+xml"
  | "text/plain"
  | "text/plain; charset=utf-8"
  | "text/plain; charset=us-ascii"
  | "text/plain; charset=iso-8859-1"
  | (string & {});

export type Book = {
  id: number;
  title: string;
  authors: Author[];
  translators: Author[];
  subjects: string[];
  bookshelves: string[];
  languages: Language[];
  copyright: boolean | null;
  media_type: string;
  formats: Partial<Record<FormatMimeType, string>>;
  download_count: number;
  summaries: string[];
};
