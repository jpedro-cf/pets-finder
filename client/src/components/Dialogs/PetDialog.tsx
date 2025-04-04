import { IDialog, useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { IPet } from '@/types/pet'
import { formatPhoneNumber } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { PetsApi } from '@/api/pets'
import { Bone, Calendar, FileText, MapPinned, Phone } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { PetsCard, SimilarPetCard } from '../PetsCard'
import { useEffect } from 'react'

export function PetDialog() {
    const { dialogs, closeDialog } = useDialogStore()
    const dialogData: IDialog<{ id: string }> = dialogs[Dialogs.PET_DETAILS]
    const isOpen = dialogData && dialogData.isOpen

    const {
        data: pet,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['pet'],
        queryFn: () => PetsApi.getPetById(dialogData.data.id),
        enabled: !!dialogData?.data.id,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    function handleClose() {
        closeDialog(Dialogs.PET_DETAILS)
    }
    useEffect(() => {
        refetch()
    }, [dialogData?.data.id])

    if (!isOpen) {
        return <></>
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} key={Dialogs.LOGIN}>
            <DialogContent className="w-[80vw] sm:max-w-[calc(80vw)-2rem] p-5">
                <DialogHeader>
                    <DialogTitle>Detalhes do Pet</DialogTitle>
                </DialogHeader>
                {!isLoading && pet && (
                    <div className="grid grid-cols-3 gap-5">
                        <div className="overflow-hidden h-full sm:min-h-[70vh] w-full rounded-md">
                            <img
                                src="#"
                                alt="Pet image"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="col-span-2">
                            <div className="mb-5 text-gray-700 text-sm p-3 rounded-md bg-emerald-100 border-1 border-emerald-200">
                                <span className="font-semibold text-lg">
                                    <FileText className="inline" size={20} />{' '}
                                    Descrição:
                                </span>
                                <p className="mt-3 text-sm">
                                    {pet.description}
                                </p>
                            </div>
                            <span className="font-semibold text-lg text-gray-700">
                                Mais informações
                            </span>
                            <div className="grid grid-cols-3 gap-4 mt-1">
                                <div className="text-gray-700 text-sm bg-gray-100 py-3 px-5 rounded-md font-semibold">
                                    <Phone className="inline me-1" size={16} />
                                    {formatPhoneNumber(pet.contact_info)}
                                </div>
                                <div className="text-gray-700 text-sm bg-gray-100 py-3 px-5 rounded-md font-semibold">
                                    <Calendar
                                        className="inline me-1"
                                        size={16}
                                    />
                                    {format(pet.date, 'd LLLL y', {
                                        locale: ptBR,
                                    })}
                                </div>
                                <div className="text-gray-700 text-sm bg-gray-100 py-3 px-5 rounded-md font-semibold">
                                    <MapPinned
                                        className="inline me-1"
                                        size={16}
                                    />
                                    {pet.location}
                                </div>
                            </div>
                            {pet.similar.length > 0 && (
                                <>
                                    <span className="mt-3 mb-1 block text-lg text-gray-700 font-semibold">
                                        Pets Similares:
                                    </span>
                                    <div className="grid grid-cols-4 gap-2">
                                        {pet.similar.map((similar) => (
                                            <SimilarPetCard pet={similar} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
