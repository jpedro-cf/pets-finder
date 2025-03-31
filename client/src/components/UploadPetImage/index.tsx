import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview,
} from '../DragDrop'
import { useDragDrop } from '../DragDrop/dragDropModel'
import { cva } from 'class-variance-authority'
import { UploadPetAnimation } from '../PetUploadProgress'
import { usePetProgress } from '../PetUploadProgress/petUploadProgressModel'
import { useEffect, useState } from 'react'
export function UploadPetImage() {
    const data = useDragDrop()
    const { preview, currentFile } = data
    const progress = usePetProgress('0%')
    const { setCurrent } = progress

    useEffect(() => {
        if (!currentFile) {
            return
        }
        const steps = ['30%', '60%', '100%']
        let index = 0
        setCurrent(steps[index])
        const interval = setInterval(() => {
            index++
            if (index >= steps.length) {
                clearInterval(interval)
                return
            }
            setCurrent(steps[index])
        }, 1000)
        return () => clearInterval(interval)
    }, [currentFile])

    return (
        <DragDropComponent data={data}>
            <DragDropContent hidden={currentFile != null} />
            <DragDropImagePreview src={preview} hidden={!currentFile} />
            <DragDropFileInfo
                className="absolute z-10 overflow-hidden py-1 block w-80 m-5 bottom-0 bg-emerald-50"
                hidden={!currentFile}
            >
                {currentFile && <UploadPetAnimation data={progress} />}
            </DragDropFileInfo>
        </DragDropComponent>
    )
}
