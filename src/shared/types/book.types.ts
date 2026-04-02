export type Language = "eng" | "fre" | "ger" | "spa" | "fin";

export type BooksResponse = {
  numFound: number;
  start: number;
  docs: OpenLibraryBook[];
};

export type OpenLibraryBook = {
  key: string;
  title?: string;
  author_name?: string[];
  number_of_pages_median?: number;
  subject?: string[];
  cover_i?: number;
  language: Language[];
  first_sentence?: string[] | { type: string; value: string };
};

export type Book = {
  key: string;
  title: string;
  authors: string;
  subjects: string[];
  coverUrl: string | null;
  languages: string;
  pageCount: number | string;
  description?: string;
};
