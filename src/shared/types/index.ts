export type Language = "eng" | "fre" | "ger" | "spa" | "fin";

export type BooksResponse = {
  numFound: number;
  start: number;
  docs: Book[];
};

export type Book = {
  key: string;
  title: string;
  author_name?: string[];
  subject?: string[];
  cover_i?: number;
  first_publish_year?: number;
  edition_count: number;
  language: Language[];
};
