import { Book, OpenLibraryBook } from "@/shared/types/book.types";

export const formatBookData = (book: OpenLibraryBook): Book => {
  const {
    key,
    title,
    author_name,
    cover_i,
    subject,
    language,
    edition_count,
    number_of_pages_median,
    first_publish_year,
    first_sentence,
  } = book;

  return {
    key,
    title: title || "Title Unknown",
    authors: author_name?.join(", ") ?? "Unknown Author",
    coverUrl: cover_i
      ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
      : null,
    subjects: subject?.slice(0, 3) || [],
    firstPublishYear: first_publish_year,
    languages: language?.slice(0, 3).join(", ") ?? "",
    editionCount: edition_count,
    pageCount: number_of_pages_median || "Pages Unknown",
    description: Array.isArray(first_sentence)
      ? first_sentence[0]
      : first_sentence?.value,
  };
};
