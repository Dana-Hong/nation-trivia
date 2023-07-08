import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] grow flex-col items-center">
      <div className="flex w-full max-w-3xl justify-between gap-2 pt-2 md:pt-4 lg:pt-8">
        <Skeleton className="h-3 w-6" />
        <Skeleton className="h-3 w-6" />
      </div>
      <div className="flex w-full grow flex-col items-center justify-center gap-8">
        <div className="w-full max-w-3xl flex flex-col items-center gap-2 pt-2 md:pt-4">
          <Skeleton className="h-3 w-6" />
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex grow flex-col gap-12">
          <div className="grid w-full max-w-lg grid-cols-2 gap-3 px-4 pt-8">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
