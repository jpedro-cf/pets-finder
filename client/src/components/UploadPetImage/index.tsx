import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview,
} from '../DragDrop'
import { ProgressAnimation } from '../ProgressAnimation'
import { useUploadPetImage } from './uploadPetImageModel'

export function UploadPetImage() {
    const { handleFileSelected, selectedFile, progress } = useUploadPetImage()

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
