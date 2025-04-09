import { LoginDialog } from '@/components/Dialogs/LoginDialog'
import { PetDialog } from '@/components/Dialogs/PetDialog'
import { RegisterDialog } from '@/components/Dialogs/RegisterDialog'
import { SearchForm } from '@/components/Forms/SearchForm'
import { useSearch } from '@/components/Forms/SearchForm/searchFormModel'
import { Header } from '@/components/Header'
import { PetsList } from '@/components/PetsList'
import { UploadPetImage } from '@/components/UploadPetImage'
import { useUploadPetImage } from '@/components/UploadPetImage/uploadPetImageModel'
const scrollBar = '[&::-webkit-scrollbar]:w-1.5 '
export function Home() {
    const searchData = useSearch()
    const uploadPetImage = useUploadPetImage()

    const loading = searchData.searching || uploadPetImage.requesting

    return (
        <>
            <div className="w-full min-h-screen max-h-screen p-4 flex">
                <div className="w-full border-1 rounded-md shadow-md overflow-hidden flex flex-col">
                    <Header />
                    <div
                        className={`flex flex-col md:flex-row h-full overflow-y-auto ${scrollBar}`}
                    >
                        <aside className="w-full md:w-1/3 border-r-2 p-5">
                            <UploadPetImage {...uploadPetImage} />
                        </aside>
                        <main className="w-full md:w-2/3 p-5 pe-2">
                            <div className="mb-5 flex items-center gap-2">
                                <SearchForm {...searchData} />
                            </div>
                            <PetsList loading={loading} />
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
