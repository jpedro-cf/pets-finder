import { PetsApi } from '@/api/pets'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

export function usePetsList() {
    const {
        data: petsListData,
        fetchNextPage,
        hasNextPage,
        refetch: refetchPets,
    } = useInfiniteQuery({
        queryKey: ['pets'],
        queryFn: ({ pageParam = 0 }) =>
            PetsApi.listPets({
                page: String(pageParam),
                size: '9',
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.pageNumber + 1

            return nextPage < lastPage.totalPages ? nextPage : undefined
        },
        refetchOnWindowFocus: false,
        retry: 2,
    })

    return {
        petsListData,
        fetchNextPage,
        hasNextPage,
        refetchPets,
    }
}
