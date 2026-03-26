import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/shared/api/get-query-client";

export default async function Home() {
  const queryClient = getQueryClient();

  // await queryClient.prefetchQuery();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold">What can I read today?</h1>
      <p className="mb-10 text-neutral-500">
        Set your filters and let us pick a random book for you.
      </p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div></div>
      </HydrationBoundary>
    </main>
  );
}
