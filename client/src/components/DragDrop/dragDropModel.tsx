import { VariantProps } from 'class-variance-authority'
import { createContext, useContext, useRef, useState } from 'react'
import { dragDropVariants } from '.'

type Variant = VariantProps<typeof dragDropVariants>

interface DragDropPros {
    onFileSelect: (file: File | null) => void
}

export function useDragDrop({ onFileSelect }: DragDropPros) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [currentFile, setCurrentFile] = useState<File | null>(null)
    const [currentVariant, setCurrentVariant] = useState<Variant>({
        variant: 'default',
    })
    const [preview, setPreview] = useState('')

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        setCurrentVariant({ variant: 'over' })
        e.preventDefault()
    }

    function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        setCurrentVariant({ variant: 'default' })
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        e.stopPropagation()

        const file = e.dataTransfer.files[0]
        handleFileChange(file)

        setCurrentVariant({ variant: 'default' })
    }

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const { files } = e.target
        if (files) {
            handleFileChange(files[0])
        }
    }

    function handleFileChange(file: File | null) {
        setCurrentFile(file)
        onFileSelect(file)

        if (!file) {
            setPreview('')
            return
        }

        if (file.type.match('image.*')) {
            const reader = new FileReader()
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return {
        inputRef,
        preview,
        setPreview,
        currentFile,
        setCurrentFile,
        handleFileInputChange,
        handleDragLeave,
        handleDrop,
        handleDragOver,
        currentVariant,
        setCurrentVariant,
        handleFileChange,
    }
}

type DragDropContext = {
    data: ReturnType<typeof useDragDrop>
}

export const DragDropContext = createContext<DragDropContext | undefined>(
    undefined
)

export function useDragDropContext() {
    const context = useContext(DragDropContext)
    if (!context) {
        throw new Error(
            'useDragDropContext must be used with a DragDropComponent'
        )
    }
    return context
}
