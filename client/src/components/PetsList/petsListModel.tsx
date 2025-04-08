import { PetsApi } from '@/api/pets'
import { useQuery } from '@tanstack/react-query'

export function usePetsList() {
    const {
        data: petsListData,
        isFetching: petsListLoading,
        refetch: refetchPets,
    } = useQuery({
        queryKey: ['pets'],
        queryFn: () =>
            PetsApi.listPets({
                page: '0',
                size: '9',
            }),
        retry: 2,
        refetchOnWindowFocus: false,
    })

    return {
        petsListData,
        petsListLoading,
        refetchPets,
    }
}
