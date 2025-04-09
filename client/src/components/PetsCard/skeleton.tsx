import { Skeleton } from '../ui/skeleton'

export function PetsCardSkeleton() {
    return (
        <div className="rounded-md border-1 overflow-hidden h-[175px]">
            <Skeleton className="h-2/4 w-full rounded-none" />
            <div className="p-4 flex flex-col gap-3">
                <Skeleton className="h-2 w-2/3" />
                <Skeleton className="h-2 w-1/2" />

                <Skeleton className="h-5 w-1/4" />
            </div>
        </div>
    )
}
