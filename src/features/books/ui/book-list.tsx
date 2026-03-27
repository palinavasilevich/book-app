"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getBookListQuery } from "../api/books";

export function BookList() {
  const { data: books } = useSuspenseQuery(getBookListQuery());

  return (
    <ul className="space-y-2">
      {books.results.map((book) => (
        <li key={book.id} className="p-4 rounded-xl bg-indigo-300">
          {book.title}
        </li>
      ))}
    </ul>
  );
}
