import { CreatePetDialog } from '@/components/Dialogs/CreatePetDialog'
import { LoginDialog } from '@/components/Dialogs/LoginDialog'
import { PetDialog } from '@/components/Dialogs/PetDialog'
import { RegisterDialog } from '@/components/Dialogs/RegisterDialog'
import { SearchForm } from '@/components/Forms/SearchForm'
import { Header } from '@/components/Header'
import { PetsList } from '@/components/PetsList'
import { Button } from '@/components/ui/button'
import { UploadPetImage } from '@/components/UploadPetImage'
import { Dog } from 'lucide-react'
import { useHome } from './homeModel'
import { Dialogs } from '@/types/dialogs'
const scrollBar =
    '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/70 '

export function Home() {
    const {
        openDialog,
        searchData,
        uploadPetImage,
        listData,
        loading,
        handleScroll,
    } = useHome()

    return (
        <>
            <div className="w-full min-h-screen max-h-screen p-4 flex">
                <div className="w-full border-1 rounded-md shadow-md overflow-hidden flex flex-col">
                    <Header />
                    <div
                        className={`flex flex-col md:flex-row h-full overflow-y-auto ${scrollBar}`}
                    >
                        <aside className="w-full lg:w-1/3 border-r-2 p-5">
                            <UploadPetImage {...uploadPetImage} />
                        </aside>
                        <main
                            className={`w-full lg:w-2/3 p-5 pe-2 md:overflow-auto ${scrollBar}`}
                            onScroll={handleScroll}
                        >
                            <div className="mb-5 flex flex-col sm:flex-row items-center gap-2">
                                <SearchForm {...searchData} />
                                <Button
                                    type="button"
                                    className="w-full sm:w-auto"
                                    onClick={() =>
                                        openDialog(Dialogs.CREATE_PET, null)
                                    }
                                >
                                    Encontrei um pet <Dog />{' '}
                                </Button>
                            </div>
                            <PetsList loading={loading} data={listData} />
                        </main>
                    </div>
                </div>
            </div>
            <RegisterDialog />
            <LoginDialog />
            <PetDialog />
            <CreatePetDialog />
        </>
    )
}
