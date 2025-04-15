import { useDialogStore } from '@/hooks/useDialog'
import { cn } from '@/lib/utils'
import { Dialogs } from '@/types/dialogs'
import { ISimilarPet } from '@/types/pet'

interface Props extends React.ComponentProps<'div'> {
    pets: ISimilarPet[]
}

export function SimilarPets({ pets, className, ...props }: Props) {
    const { openDialog } = useDialogStore()
    return (
        <div className={cn('rounded-md', className)}>
            <div className={'grid grid-cols-4 gap-2'}>
                {pets.map((pet) => (
                    <div
                        onClick={() => {
                            openDialog(Dialogs.PET_DETAILS, {
                                id: pet.id,
                            })
                        }}
                        className="block overflow-hidden rounded-md h-[100px] cursor-pointer"
                    >
                        <img
                            className="w-full h-full object-cover"
                            src={`${import.meta.env.VITE_IMAGES_URL}/${
                                pet.image
                            }`}
                            alt="Pet image"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
