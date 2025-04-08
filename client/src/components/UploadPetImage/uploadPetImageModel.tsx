import { PetsApi } from '@/api/pets'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export function useUploadPetImage() {
    const client = useQueryClient()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [progress, setProgress] = useState('0%')

    function handleFileSelected(file: File | null) {
        setSelectedFile(file)
        if (!file) {
            setProgress('0%')
            return
        }
        setProgress('33%')

        const data = { text: 'request', image: file }
        requestImageSimilarity(data)
    }

    const { mutate: fetchSimilarPets } = useMutation({
        mutationFn: PetsApi.getPetsByIds,
        onSuccess: (data) => {
            setProgress('100%')
            client.setQueryData(['pets'], { pets: data, totalPages: 1 })
        },
    })

    const { mutate: requestImageSimilarity } = useMutation({
        mutationFn: PetsApi.requestSimilarity,
        onSuccess: (data) => {
            setProgress('66%')
            fetchSimilarPets(data.ids)
        },
    })

    return {
        selectedFile,
        progress,
        handleFileSelected,
    }
}
