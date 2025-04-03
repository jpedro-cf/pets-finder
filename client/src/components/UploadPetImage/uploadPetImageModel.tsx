import { usePetsService } from '@/services/pets'
import { useState } from 'react'

export function useUploadPetImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [progress, setProgress] = useState('0%')
    const { requestImageSimilarity, fetchSimilarPets } = usePetsService()

    function handleFileSelected(file: File | null) {
        setSelectedFile(file)
        if (!file) {
            setProgress('0%')
            return
        }
        setProgress('33%')

        const data = { text: 'request', image: file }
        requestImageSimilarity(data, {
            onSuccess: (data) => {
                setProgress('66%')

                fetchSimilarPets(data.ids, {
                    onSuccess: () => setProgress('100%'),
                })
            },
        })
    }
    return {
        selectedFile,
        progress,
        handleFileSelected,
    }
}
