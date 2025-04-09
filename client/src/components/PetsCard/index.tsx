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
import React, { createContext, useContext } from 'react'
import { cn } from '@/lib/utils'

type PetData = Omit<IPet, 'similar' | 'description' | 'contact_info'>
interface IPetCardProps extends React.ComponentProps<'div'> {
    pet: PetData
}

export function PetsCard({
    pet,
    children,
    className,
    ...props
}: IPetCardProps) {
    return (
        <PetCardContext.Provider value={{ ...pet }}>
            <Card className={cn('p-0', className)} {...props}>
                <CardContent className={`p-0 ${className}`}>
                    {children}
                </CardContent>
            </Card>
        </PetCardContext.Provider>
    )
}

export function PetCardImage({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const pet = usePetCardContext()
    const { openDialog } = useDialogStore()

    return (
        <div
            className={cn(
                'overflow-hidden rounded-md rounded-b-none h-[150px] cursor-pointer',
                className
            )}
            onClick={() => openDialog(Dialogs.PET_DETAILS, { id: pet.id })}
            {...props}
        >
            <img
                src="#"
                alt="Dog image"
                className="object-cover w-full h-full"
            />
        </div>
    )
}

export function PetCardContent({
    children,
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const pet = usePetCardContext()

    return (
        <div className={cn('p-4', className)} {...props}>
            <div className="flex items-start justify-between gap-2 text-sm font-bold text-gray-700">
                <span className="flex items-center gap-1">
                    <MapPinned className="w-[1.2em]" />
                    {pet.location}
                </span>
                {pet.type && (
                    <Badge className="py-1.5 px-2" variant={'outline'}>
                        <PetTypeIcon type={pet.type} size={14} />
                    </Badge>
                )}
            </div>
            <span className="flex items-center gap-1 text-xs text-primary font-semibold">
                <Calendar className="w-[1.2em]" />
                {format(pet.date, 'd LLLL y', { locale: ptBR })}
            </span>
            {children}
        </div>
    )
}
export function PetCardActions({
    className,
    ...props
}: React.ComponentProps<'button'>) {
    const { openDialog } = useDialogStore()
    const pet = usePetCardContext()
    return (
        <Button
            size={'sm'}
            className={cn('mt-3', className)}
            onClick={() => openDialog(Dialogs.PET_DETAILS, { id: pet.id })}
            {...props}
        >
            Ver Detalhes <PetTypeIcon type={pet.type} size={14} />
        </Button>
    )
}

export function PetTypeIcon({ type, size }: { type: string; size?: number }) {
    const types: Record<string, React.ReactElement> = {
        DOG: <Bone size={size ?? 16} />,
        CAT: <Cat size={size ?? 16} />,
        DEFAULT: <PawPrint size={size ?? 16} />,
    }

    return <div>{types[type] ?? types['DEFAULT']}</div>
}

const PetCardContext = createContext<PetData | null>(null)
function usePetCardContext() {
    const context = useContext(PetCardContext)
    if (!context) {
        throw new Error('Pet context must be used within a card')
    }
    return context
}
