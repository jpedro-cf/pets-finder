import { VariantProps } from 'class-variance-authority'
import { createContext, useContext, useRef, useState } from 'react'
import { dragDropVariants } from '.'

type Variant = VariantProps<typeof dragDropVariants>

export function useDragDrop() {
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

        const file: File = e.dataTransfer.files[0]
        handleFile(file)

        setCurrentVariant({ variant: 'default' })
    }

    function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        const { files } = e.target
        if (files) {
            handleFile(files[0])
        }
    }

    function handleFile(file: File) {
        if (!file.type.match('image.*')) {
            return
        }
        setCurrentFile(file)

        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
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
