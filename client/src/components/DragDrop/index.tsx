import { Card, CardContent } from '../ui/card'
import { cva } from 'class-variance-authority'
import { cn, formatFileSize } from '@/lib/utils'
import {
    DragDropContext,
    useDragDrop,
    useDragDropContext,
} from './dragDropModel'
import { Button } from '../ui/button'
import { CloudUpload, Image, Trash } from 'lucide-react'
import { createContext, ReactNode, useEffect, useState } from 'react'

export const dragDropVariants = cva(
    'p-3 h-full border-2 border-emerald-600/40 border-dashed transition-all hover:bg-emerald-50 cursor-pointer',
    {
        variants: {
            variant: {
                default: '',
                over: 'bg-emerald-50 border-emerald-800',
            },
        },
    }
)

interface IDragDropProps extends React.ComponentProps<'div'> {
    onFileSelect: (file: File | null) => void
}

export function DragDropComponent({
    onFileSelect,
    children,
    ...props
}: IDragDropProps) {
    const data = useDragDrop({ onFileSelect })
    const {
        currentFile,
        currentVariant,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileInputChange,
        inputRef,
    } = data

    return (
        <DragDropContext.Provider value={{ data }}>
            <Card
                className={cn(
                    dragDropVariants({ variant: currentVariant.variant }),
                    `cursor-${currentFile ? 'default' : 'pointer'}`,
                    props.className
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => (currentFile ? {} : inputRef.current?.click())}
            >
                <CardContent
                    className="p-0 rounded-md w-full h-full overflow-hidden 
                    flex items-center flex-col justify-center relative"
                >
                    {children}
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileInputChange}
                    />
                </CardContent>
            </Card>
        </DragDropContext.Provider>
    )
}

export function DragDropContent({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { data } = useDragDropContext()
    const { preview, inputRef, currentFile } = data
    return (
        <div
            className={cn('flex flex-col gap-3 items-center', className)}
            {...props}
            hidden={currentFile != null}
        >
            <Image className="text-primary/80" size={52} />
            <span className="text-md leading-1 text-gray-500 font-semibold">
                Escolha uma imagem ou arraste aqui.
            </span>
            <span className="text-sm text-gray-500">
                JPG, PNG, JPEG, WEBP, até 5mb
            </span>
            <Button
                type="button"
                variant={'ghost'}
                className="z-10 bg-emerald-200 hover:bg-emerald-300 mt-2"
                hidden={preview != ''}
                onClick={() => inputRef.current?.click()}
            >
                Escolher imagem
            </Button>
        </div>
    )
}

export function DragDropImagePreview({
    ...props
}: React.ComponentProps<'img'>) {
    const { data } = useDragDropContext()
    const { preview, currentFile } = data
    return (
        <img
            {...props}
            alt="Preview image"
            src={preview}
            hidden={!currentFile}
            className="h-full w-full object-cover z-0"
        />
    )
}

export function DragDropFileInfo({
    children,
    ...props
}: React.ComponentProps<'div'>) {
    const { data } = useDragDropContext()
    const { currentFile, handleFileChange } = data
    return (
        <Card {...props} hidden={!currentFile}>
            {children}
            <CardContent className="flex p-3 gap-3 items-center">
                <Image className="text-primary/80" size={24} />
                <div className="flex items-center justify-between w-full">
                    <div>
                        <span className="font-semibold text-gray-700">
                            {currentFile?.name}{' '}
                        </span>
                        <span className="text-xs text-gray-400">
                            {formatFileSize(currentFile?.size ?? 0)}
                        </span>
                    </div>
                    <Button
                        size={'icon'}
                        className="p-1 bg-emerald-200 hover:bg-emerald-100"
                        variant={'ghost'}
                        type="button"
                        onClick={() => {
                            handleFileChange(null)
                        }}
                    >
                        <Trash />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
