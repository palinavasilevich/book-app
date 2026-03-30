import { Skeleton } from "@/shared/ui/kit/skeleton";

export function SkeletonBookCard() {
  return (
    <div className="flex gap-6 rounded-2xl border border-neutral-200 bg-white p-6 ">
      <Skeleton className="w-32 aspect-2/3 rounded-lg shrink-0" />
      <div className="w-full flex flex-col justify-between gap-3">
        <div>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-1 h-4 w-1/2" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="mt-1 h-4 w-2/3" />
      </div>
    </div>
  );
}
