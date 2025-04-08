import { IPet } from '@/types/pet'
import {
    PetCardActions,
    PetCardContent,
    PetCardImage,
    PetsCard,
} from '../PetsCard'
import { usePetsList } from './petsListModel'
import { SearchForm } from '../Forms/SearchForm'
import { useSearch } from '../Forms/SearchForm/searchFormModel'
const scrollBar =
    '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/70 '

export function PetsList() {
    const { petsListData, petsListLoading } = usePetsList()
    const searchData = useSearch()
    const loading = searchData.searching || petsListLoading

    const pets: IPet[] = petsListData?.pets ?? []
    const totalPages: number = petsListData?.totalPages ?? 0

    return (
        <div className={`max-h-full overflow-y-auto pe-2 ${scrollBar}`}>
            <div className="mb-5 flex items-center gap-2">
                <SearchForm {...searchData} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {!loading &&
                    pets.map((pet) => (
                        <PetsCard key={pet.id} pet={pet}>
                            <PetCardImage />
                            <PetCardContent>
                                <PetCardActions />
                            </PetCardContent>
                        </PetsCard>
                    ))}
            </div>
        </div>
    )
}
