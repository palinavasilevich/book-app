import type { Book } from "@/shared/types";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const cover = book.formats["image/jpeg"];
  const readUrl =
    book.formats["text/html"] ?? book.formats["text/plain; charset=utf-8"];
  const authors = book.authors.map((a) => a.name).join(", ");

  return (
    <div className="flex gap-6 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      {cover && (
        <img
          src={cover}
          alt={`Cover of ${book.title}`}
          width={128}
          height={192}
          className="shrink-0 rounded-lg object-cover shadow"
        />
      )}
      <div className="flex flex-col justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold leading-tight">{book.title}</h2>
          {authors && (
            <p className="mt-1 text-sm text-neutral-500">{authors}</p>
          )}
        </div>

        {book.subjects.length > 0 && (
          <ul className="flex flex-wrap gap-1">
            {book.subjects.slice(0, 5).map((subject) => (
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
          <span className="text-neutral-400">
            {book.download_count.toLocaleString()} downloads
          </span>
          {readUrl && (
            <a
              href={readUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-800 underline underline-offset-2 hover:text-neutral-600"
            >
              Read online
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
