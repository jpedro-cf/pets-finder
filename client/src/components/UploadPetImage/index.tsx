import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview,
} from '../DragDrop'
import { ProgressAnimation } from '../ProgressAnimation'
import { useEffect, useState } from 'react'

export function UploadPetImage() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [progress, setProgress] = useState('0%')

    function handleFileSelected(file: File | null) {
        if (!file) {
            setProgress('0%')
        }
        setSelectedFile(file)
    }

    useEffect(() => {
        if (!selectedFile) {
            return
        }
        const steps = ['30%', '60%', '100%']
        let index = 0
        setProgress(steps[index])

        const interval = setInterval(() => {
            index++
            if (index >= steps.length) {
                clearInterval(interval)
                return
            }
            setProgress(steps[index])
        }, 1000)
        return () => clearInterval(interval)
    }, [selectedFile])

    return (
        <DragDropComponent onFileSelect={handleFileSelected}>
            <DragDropContent />
            <DragDropImagePreview />
            <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-80 m-5 bottom-0 bg-emerald-50">
                {selectedFile && <ProgressAnimation percentage={progress} />}
            </DragDropFileInfo>
        </DragDropComponent>
    )
}
