import { usePetsService } from '@/services/pets'
import { useState } from 'react'

export function useUploadPetImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [progress, setProgress] = useState('33%')
    const { requestImageSimilarity, fetchSimilarPets } = usePetsService()

    function handleFileSelected(file: File | null) {
        setSelectedFile(file)
        if (!file) {
            setProgress('0%')
            return
        }
        requestImageSimilarity(
            { text: 'request', image: file },
            {
                onSuccess: (res) => {
                    fetchSimilarPets(res.data.ids)
                    setProgress('66%')
                },
            }
        )
    }

    return {
        selectedFile,
        progress,
        handleFileSelected,
    }
}
