import { PetsApi } from '@/api/pets'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const searchSchema = z.object({
    text: z.string().min(1),
})

export function useSearch() {
    const client = useQueryClient()

    const { mutate: requestSimilarity, isPending: requesting } = useMutation({
        mutationFn: PetsApi.requestSimilarity,
        onSuccess: (data) => fetchSimilar(data.ids),
    })
    const { mutate: fetchSimilar, isPending: fetching } = useMutation({
        mutationFn: PetsApi.getPetsByIds,
        onSuccess: (data) => {
            client.setQueryData(['pets'], {
                pets: data,
                totalPages: 1,
                loading: false,
            })
        },
    })

    const form = useForm<z.infer<typeof searchSchema>>({
        resolver: zodResolver(searchSchema),
    })
    function handleSearch(values: z.infer<typeof searchSchema>) {
        client.setQueryData(['pets'], (old: any) => {
            return {
                ...old,
                loading: true,
            }
        })
        requestSimilarity(values)
    }

    const searching = requesting || fetching

    return {
        handleSearch,
        form,
        searching,
    }
}
