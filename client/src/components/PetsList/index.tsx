import { IPet } from '@/types/pet'
import { PetsCard } from '../PetsCard'
import { usePetsList } from './petsListModel'

export function PetsList() {
    const { petsList, petsListLoading } = usePetsList()
    const pets: IPet[] = petsList ?? []

    return (
        <div className="grid grid-cols-3 gap-3">
            {!petsListLoading &&
                (pets as IPet[]).map((pet) => (
                    <PetsCard key={pet.id} pet={pet} />
                ))}
        </div>
    )
}
