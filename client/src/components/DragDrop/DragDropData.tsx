import { VariantProps } from 'class-variance-authority'
import { useRef, useState } from 'react'
import { dragDropVariants } from '.'

type Variant = VariantProps<typeof dragDropVariants>

export function useDragDrop() {
    const inputRef = useRef<HTMLInputElement | null>(null)
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

        const reader = new FileReader()
        reader.onload = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    return {
        inputRef,
        preview,
        handleFileInputChange,
        handleDragLeave,
        handleDrop,
        handleDragOver,
        currentVariant,
        setCurrentVariant,
    }
}
