import { PetsApi } from '@/api/pets'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
export function usePetsService(id?: string) {
    const [params, setParams] = useSearchParams()

    const { mutate: createPet, isPending: isCreatingPet } = useMutation({
        mutationFn: PetsApi.createPet,
    })

    const { data: pet, isLoading: petLoading } = useQuery({
        queryKey: ['pet', id],
        queryFn: () => PetsApi.getPet(id ? id : ''),
        enabled: !!id,
    })

    const { data: listPets, isLoading: listPetsLoading } = useQuery({
        queryKey: ['pets'],
        queryFn: () =>
            PetsApi.listPets({
                page: params.get('page') ?? undefined,
                size: '9',
            }),
        enabled: !!id,
    })

    return {
        createPet,
        isCreatingPet,
        pet,
        petLoading,
        listPets,
        listPetsLoading,
    }
}
