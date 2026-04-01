import { Book } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

export function Header() {
  return (
    <header className="border-b py-6">
      <nav className="mx-auto w-full max-w-2xl px-4 flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <Book />
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
            WhatToRead
          </h2>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  );
}
