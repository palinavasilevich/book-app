import type { Book } from "@/shared/types";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import Image from "next/image";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;
  const authors = book.author_name?.join(", ") ?? "";

  return (
    <div className="flex gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      {cover && (
        <div className="relative w-32 aspect-2/3 shrink-0">
          <Image
            src={cover}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 640px) 100px, 128px"
            className="rounded-lg shadow object-cover"
          />
        </div>
      )}
      <div className="flex flex-col justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold leading-tight">{book.title}</h2>
          {authors && (
            <p className="mt-1 text-sm text-neutral-500">{authors}</p>
          )}
        </div>

        {book.subject && book.subject.length > 0 && (
          <ul className="flex flex-wrap gap-1">
            {book.subject.slice(0, 5).map((subject) => (
              <li
                key={subject}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
              >
                {subject}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-4 text-sm">
          {book.first_publish_year && (
            <span className="text-neutral-400">
              First published {book.first_publish_year}
            </span>
          )}
          <a
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-800 underline underline-offset-2 hover:text-neutral-600"
          >
            View on Open Library
          </a>
        </div>
      </div>
    </div>
  );
}
