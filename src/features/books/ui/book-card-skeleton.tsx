import {
  Card,
  CardFooter,
  CardHeader,
} from "@/shared/ui/kit/card";
import { Skeleton } from "@/shared/ui/kit/skeleton";

export function BookCardSkeleton() {
  return (
    <Card className="flex gap-6 shadow-sm">
      <div className="flex px-5">
        <Skeleton className="w-32 aspect-2/3 rounded-lg" />

        <CardHeader className="flex gap-4 flex-1">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>

            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </CardHeader>
      </div>

      <CardFooter className="flex justify-between items-center bg-background">
        <div className="flex gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-9 w-40 rounded-md" />
      </CardFooter>
    </Card>
  );
}
