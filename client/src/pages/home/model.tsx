import { useSearch } from '@/components/Forms/SearchForm/model'
import { usePetsList } from '@/components/PetsList/model'
import { useUploadPetImage } from '@/components/UploadPetImage/model'
import { useDialogStore } from '@/hooks/useDialog'

export function useHome() {
    const { openDialog } = useDialogStore()

    const searchData = useSearch()
    const uploadPetImage = useUploadPetImage()
    const listData = usePetsList()

    const loading = searchData.searching || uploadPetImage.requesting

    function handleScroll(e: React.UIEvent<HTMLElement>) {
        const target = e.currentTarget

        const isAtBottom =
            target.scrollTop + target.clientHeight >= target.scrollHeight - 350

        if (isAtBottom) {
            listData.fetchNextPage()
        }
    }

    return {
        openDialog,
        loading,
        searchData,
        uploadPetImage,
        listData,
        handleScroll,
    }
}
