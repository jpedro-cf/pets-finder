import {
    PetCardActions,
    PetCardContent,
    PetCardImage,
    PetsCard,
} from '../PetsCard'
import { usePetsList } from './model'
import { PetsCardSkeleton } from '../PetsCard/skeleton'
import React from 'react'
const scrollBar = '[&::-webkit-scrollbar]:w-0 '
interface Props {
    loading: boolean
    data: ReturnType<typeof usePetsList>
}
export function PetsList({ loading, data }: Props) {
    const { petsListData } = data

    return (
        <div className={`max-h-full pe-2 ${scrollBar}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {loading
                    ? Array.from([1, 2, 3]).map((_, i) => (
                          <PetsCardSkeleton key={i} />
                      ))
                    : petsListData?.pages.map((group, i) => (
                          <React.Fragment key={i}>
                              {group.pets.map((pet) => (
                                  <PetsCard key={pet.id} pet={pet}>
                                      <PetCardImage className="h-[200px]" />
                                      <PetCardContent>
                                          <PetCardActions />
                                      </PetCardContent>
                                  </PetsCard>
                              ))}
                          </React.Fragment>
                      ))}
            </div>
        </div>
    )
}
