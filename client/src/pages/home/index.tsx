import { Header } from '@/components/Header'
import {
    DragDropContent,
    DragDropImagePreview,
    DragDropComponent,
    DragDropFileInfo,
} from '@/components/DragDrop'
import { useDragDrop } from '@/components/DragDrop/dragDropModel'

export function Home() {
    const dragDrop = useDragDrop()
    const { preview, currentFile } = dragDrop
    return (
        <div className="w-full min-h-screen max-h-screen p-5 flex">
            <div className="w-full border-1 rounded-md shadow-md overflow-hidden flex-1 flex flex-col">
                <Header />
                <div className="flex flex-1 h-full">
                    <aside className="w-1/3 border-r-2 p-3">
                        <DragDropComponent data={dragDrop}>
                            <DragDropImagePreview
                                src={preview}
                                hidden={!currentFile}
                            />
                            <DragDropFileInfo
                                className="absolute z-10 p-3 block w-80 m-5 bottom-0 bg-emerald-50"
                                hidden={!currentFile}
                            />
                            <DragDropContent hidden={currentFile != null} />
                        </DragDropComponent>
                    </aside>
                </div>
            </div>
        </div>
    )
}
