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
    first_sentence,
  } = book;

  console.log(book);
  return {
    key,
    title: title || "Title Unknown",
    authors: author_name?.join(", ") ?? "Unknown Author",
    coverUrl: cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : null,
    subjects: subject?.slice(0, 3) || [],
    firstPublishYear: number_of_pages_median,
    languages: language?.join(", ") ?? "",
    editionCount: edition_count,
    pageCount: number_of_pages_median || "Pages Unknown",
    description: first_sentence ? first_sentence[0] : "",
  };
};
