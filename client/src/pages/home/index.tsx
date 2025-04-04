import { LoginDialog } from '@/components/Dialogs/LoginDialog'
import { PetDialog } from '@/components/Dialogs/PetDialog'
import { RegisterDialog } from '@/components/Dialogs/RegisterDialog'
import { Header } from '@/components/Header'
import { PetsList } from '@/components/PetsList'
import { UploadPetImage } from '@/components/UploadPetImage'

export function Home() {
    return (
        <>
            <div className="w-full min-h-screen max-h-screen p-5 flex">
                <div className="w-full border-1 rounded-md shadow-md overflow-hidden flex-1 flex flex-col">
                    <Header />
                    <div className="flex flex-1 h-full">
                        <aside className="w-1/3 border-r-2 p-5">
                            <UploadPetImage />
                        </aside>
                        <main className="w-2/3 p-5">
                            <PetsList />
                        </main>
                    </div>
                </div>
            </div>
            <RegisterDialog />
            <LoginDialog />
            <PetDialog />
        </>
    )
}
