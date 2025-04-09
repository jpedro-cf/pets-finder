import { IPet } from '@/types/pet'
import {
    PetCardActions,
    PetCardContent,
    PetCardImage,
    PetsCard,
} from '../PetsCard'
import { usePetsList } from './petsListModel'
import { PetsCardSkeleton } from '../PetsCard/skeleton'
const scrollBar =
    '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-primary/70 '
interface Props {
    loading: boolean
}
export function PetsList({ loading }: Props) {
    const { petsListData, petsListLoading } = usePetsList()

    return (
        <div className={`max-h-full overflow-y-auto pe-2 ${scrollBar}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {loading || petsListLoading
                    ? Array.from([1, 2, 3]).map((_, i) => (
                          <PetsCardSkeleton key={i} />
                      ))
                    : petsListData?.pets?.map((pet) => (
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
