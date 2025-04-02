import { PetsApi } from '@/api/pets'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export function usePetsService() {
    const [ids, setIds] = useState<string[] | null>(null)
    const [id, setId] = useState<string | null>(null)

    const { mutate: createPet, isPending: isCreatingPet } = useMutation({
        mutationFn: PetsApi.createPet,
    })

    const {
        data: pet,
        isLoading: petLoading,
        refetch: refetchPet,
    } = useQuery({
        queryKey: ['pet', id],
        queryFn: () => PetsApi.getPetById(id!),
        enabled: id != null,
    })
    async function fetchPet(data: string) {
        setId(data)
        await refetchPet()
    }

    const {
        data: similarPets,
        isSuccess: similarPetsSuccess,
        isLoading: similarPetsLoading,
        refetch: refetchSimilarPets,
    } = useQuery({
        queryKey: ['pets', ids],
        queryFn: () => PetsApi.getPetsByIds(ids!),
        enabled: ids != null,
    })
    async function fetchSimilarPets(ids: string[]) {
        setIds(ids)
        await refetchSimilarPets()
    }

    const {
        data: petsList,
        isLoading: listPetsLoading,
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

    const { mutate: requestImageSimilarity, isPending: similarityLoading } =
        useMutation({
            mutationFn: PetsApi.requestSimilarity,
        })

    return {
        createPet,
        isCreatingPet,
        pet,
        petLoading,
        petsList,
        fetchPets,
        listPetsLoading,
        requestImageSimilarity,
        similarityLoading,
        similarPets,
        similarPetsSuccess,
        fetchSimilarPets,
        fetchPet,
        similarPetsLoading,
    }
}
