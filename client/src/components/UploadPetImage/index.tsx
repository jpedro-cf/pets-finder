import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview,
} from '../DragDrop'
import { ProgressAnimation } from '../ProgressAnimation'
import { useUploadPetImage } from './model'

type Props = ReturnType<typeof useUploadPetImage>
export function UploadPetImage(data: Props) {
    const { handleFileSelected, selectedFile, progress } = data

    return (
        <DragDropComponent onFileSelect={handleFileSelected}>
            <DragDropContent />
            <DragDropImagePreview />
            <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-[90%] m-5 bottom-0 bg-emerald-50">
                {selectedFile && <ProgressAnimation percentage={progress} />}
            </DragDropFileInfo>
        </DragDropComponent>
    )
}
