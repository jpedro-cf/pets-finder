import { IPet, ISimilarPet } from '@/types/pet'
import { Card, CardContent } from '../ui/card'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
    Bone,
    Calendar,
    Cat,
    LocateIcon,
    MapPinned,
    PawPrint,
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'

interface Props {
    pet: IPet
}

export function PetsCard({ pet }: Props) {
    const { openDialog } = useDialogStore()

    return (
        <Card className="p-0">
            <CardContent className="p-0">
                <div
                    className="overflow-hidden rounded-md rounded-b-none h-[150px] cursor-pointer"
                    onClick={() =>
                        openDialog(Dialogs.PET_DETAILS, { id: pet.id })
                    }
                >
                    <img
                        src="#"
                        alt="Dog image"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                        <span className="flex items-center gap-1 font-bold text-gray-700">
                            <MapPinned size={18} />
                            {pet.location}
                        </span>
                        <Badge className="py-1.5 px-2" variant={'outline'}>
                            <PetTypesIcon type={pet.type} size={14} />
                        </Badge>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                        <Calendar size={18} />
                        {format(pet.date, 'd LLLL y', { locale: ptBR })}
                    </span>
                    <Button
                        size={'sm'}
                        className="mt-3"
                        onClick={() =>
                            openDialog(Dialogs.PET_DETAILS, { id: pet.id })
                        }
                    >
                        Ver Detalhes <PetTypesIcon type={pet.type} size={14} />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

interface SimilarProps {
    pet: ISimilarPet
}
export function SimilarPetCard({ pet }: SimilarProps) {
    const { openDialog } = useDialogStore()
    return (
        <Card className="p-0">
            <CardContent className="p-0">
                <div
                    className="overflow-hidden rounded-md rounded-b-none h-[120px] cursor-pointer"
                    onClick={() =>
                        openDialog(Dialogs.PET_DETAILS, { id: pet.id })
                    }
                >
                    <img
                        src="#"
                        alt="Dog image"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                        <span className="flex items-center gap-1 font-bold text-gray-700">
                            <MapPinned size={12} />
                            {pet.location}
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                        <Calendar size={12} />
                        {format(pet.date, 'd LLLL y', { locale: ptBR })}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}

export function PetTypesIcon({ type, size }: { type: string; size?: number }) {
    const types: Record<string, React.ReactElement> = {
        DOG: <Bone size={size ?? 16} />,
        CAT: <Cat size={size ?? 16} />,
        DEFAULT: <PawPrint size={size ?? 16} />,
    }

    return <div>{types[type] ?? types['DEFAULT']}</div>
}
