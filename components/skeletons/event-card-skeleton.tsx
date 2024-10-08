import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const EventCardSkeleton = () => {
  return (
    <Card className="shadow">
      <div className="sm:flex">
        <div
          className={
            "sm:w-1/3 aspect-[16/6] sm:aspect-video w-full relative overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
          }
        >
          <Skeleton className="w-full h-full" />
        </div>

        <div className="sm:w-2/3 p-4">
          <CardHeader className="p-0 pb-2 flex-row items-center space-y-0 justify-between">
            <Skeleton className="h-6 w-3/4" />
            <div className="flex gap-4 items-center">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          </CardHeader>

          <CardContent className="p-0 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </div>
      </div>
    </Card>
  );
};
