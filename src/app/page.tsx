import { RandomBookSelector } from "@/features/books/ui/random-book-selector";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-semibold">What can I read today?</h1>
        <p className="mb-8 text-neutral-500">
          Set your filters and let us pick a random book for you.
        </p>
      </div>
      <RandomBookSelector />
    </main>
  );
}
