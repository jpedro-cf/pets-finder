import { Header } from '@/components/Header'
import { UploadComponent } from '@/components/DragDrop'

export function Home() {
    return (
        <div className="w-full min-h-screen max-h-screen p-5 flex">
            <div className="w-full border-1 rounded-md shadow-md overflow-hidden flex-1 flex flex-col">
                <Header />
                <div className="flex flex-1 h-full">
                    <UploadComponent />
                </div>
            </div>
        </div>
    )
}
