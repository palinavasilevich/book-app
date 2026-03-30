import { Book } from "@/shared/types";

export const formatBookData = (book: Book) => {
  return {
    title: book.title || "Title Unknown",
    authors: book.author_name?.join(", ") ?? "Unknown Author",
    publishYear: book.first_publish_year || "Year Unknown",
    coverUrl: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null,
    subjects: book.subject?.slice(0, 3) || [],
    languages: book.language?.join(", ") ?? "",
    editionCount: book.edition_count?.toLocaleString() ?? "—",
    // pageCount: book.number_of_pages_median || "Pages Unknown",
  };
};
