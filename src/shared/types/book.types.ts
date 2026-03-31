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
  first_publish_year?: number;
  edition_count: number;
  language: Language[];
  isbn?: string[];
  first_sentence?: string[];
};

export type Book = {
  key: string;
  title: string;
  authors: string;
  subjects: string[];
  coverUrl: string | null;
  firstPublishYear?: number;
  editionCount?: number;
  languages: string;
  pageCount: number | string;
  description?: string;
};
