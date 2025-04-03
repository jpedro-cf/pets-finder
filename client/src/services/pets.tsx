import { PetsApi } from '@/api/pets'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function usePetsService() {
    const [id, setId] = useState<string | null>(null)
    const client = useQueryClient()

    const { mutate: createPet, isPending: isCreatingPet } = useMutation({
        mutationFn: PetsApi.createPet,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['pets'] })
        },
    })

    const {
        data: pet,
        isLoading: petLoading,
        refetch: refetchPet,
    } = useQuery({
        queryKey: ['pet', id],
        queryFn: () => PetsApi.getPetById(id!),
        enabled: !!id,
    })
    async function fetchPet(data: string) {
        setId(data)
        await refetchPet()
    }

    const { mutate: fetchSimilarPets, isPending: similarPetsLoading } =
        useMutation({
            mutationFn: PetsApi.getPetsByIds,
            onSuccess: () => {
                client.invalidateQueries({ queryKey: ['pets'] })
            },
        })

    const {
        data: petsList,
        isLoading: petsListLoading,
        refetch: fetchPets,
    } = useQuery({
        queryKey: ['pets'],
        queryFn: () =>
            PetsApi.listPets({
                page: '0',
                size: '9',
            }),
        enabled: false,
    })

    const {
        mutate: requestImageSimilarity,
        isPending: similarityRequestLoading,
    } = useMutation({
        mutationFn: PetsApi.requestSimilarity,
    })

    return {
        createPet,
        isCreatingPet,
        pet,
        petLoading,
        petsList,
        fetchPets,
        petsListLoading,
        requestImageSimilarity,
        similarityRequestLoading,
        fetchPet,
        fetchSimilarPets,
        similarPetsLoading,
    }
}
