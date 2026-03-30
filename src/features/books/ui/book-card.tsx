import Image from "next/image";
import React from "react";

import type { Book } from "@/shared/types";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";

import { Badge } from "@/shared/ui/kit/badge";
import { Book as BookIcon, Globe } from "lucide-react";
import { Button } from "@/shared/ui/kit/button";
import { formatBookData } from "../utils/formatBookData";

type BookCardProps = {
  book: Book;
};

export const BookCard = React.memo(function BookCard({ book }: BookCardProps) {
  const { title, authors, coverUrl, subjects, languages } =
    formatBookData(book);
  const editionCount = book.edition_count?.toLocaleString() ?? "—";

  return (
    <Card className="flex flex-col gap-6 shadow-sm">
      <CardHeader className="flex gap-4 flex-1">
        {coverUrl ? (
          <div className="relative w-32 aspect-2/3">
            <Image
              fill
              src={coverUrl}
              alt={`Cover of ${title}`}
              sizes="(max-width: 640px) 100vw, 128px"
              className="rounded-lg shadow object-cover"
            />
          </div>
        ) : (
          <div className="w-32 aspect-2/3 rounded-lg bg-muted flex items-center justify-center">
            <BookIcon size={40} className="text-muted-foreground" />
          </div>
        )}

        <div className="flex flex-col gap-4 flex-1">
          <div>
            <CardTitle className="text-xl font-semibold leading-tight line-clamp-2">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-neutral-500 line-clamp-2">
              {authors}
            </CardDescription>
          </div>

          {subjects.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {subjects.map((tag) => (
                <li key={tag}>
                  <Badge className="max-w-full" variant="secondary">
                    <span className="truncate">{tag}</span>
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardHeader>

      <CardFooter className="flex justify-between items-center mt-auto bg-background">
        <div className="text-xs flex gap-3 items-center flex-wrap">
          {languages?.length > 0 && (
            <p className="flex items-center gap-1 text-muted-foreground uppercase">
              <Globe className="w-4 h-4" /> {languages}
            </p>
          )}
          <p className="flex items-center gap-1 text-muted-foreground">
            <BookIcon className="w-4 h-4" /> {editionCount}
          </p>
        </div>

        <Button
          asChild
          variant="outline"
          className="font-medium text-neutral-800 hover:text-neutral-600"
          aria-label={`View ${title} on Open Library`}
        >
          <a
            href={`https://openlibrary.org${book.key}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Open Library
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
});
