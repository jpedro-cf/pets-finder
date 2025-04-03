import { PetsApi } from '@/api/pets'
import { useQuery } from '@tanstack/react-query'

export function usePetsList() {
    const {
        data: petsList,
        isLoading: petsListLoading,
        refetch: refetchPets,
    } = useQuery({
        queryKey: ['pets'],
        queryFn: () =>
            PetsApi.listPets({
                page: '0',
                size: '9',
            }),
    })

    return { petsList, petsListLoading, refetchPets }
}
