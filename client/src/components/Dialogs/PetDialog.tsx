import { IDialog, useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { formatPhoneNumber } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { PetsApi } from '@/api/pets'
import { Calendar, MapPin, Phone } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useEffect } from 'react'
import { SimilarPets } from '../SimilarPets'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'

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
            <DialogContent className="w-[95vw] sm:max-w-[calc(80vw)-2rem] p-5 gap-1 bg-slate-50 h-[95vh] overflow-auto">
                <DialogHeader className="mb-3 text-start">
                    <DialogTitle className="text-2xl font-bold">
                        Detalhes do Pet
                    </DialogTitle>
                </DialogHeader>
                {!isLoading && pet && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="overflow-hidden h-[250px] md:h-full w-full rounded-md">
                            <img
                                src={`${import.meta.env.VITE_IMAGES_URL}/${
                                    pet.image
                                }`}
                                alt="Pet image"
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <div>
                                <h3 className="font-medium mb-2 text-lg">
                                    Descrição:
                                </h3>
                                <p className="text-sm">{pet.description}</p>
                            </div>
                            <div className="text-sm flex flex-col gap-2">
                                <span>
                                    <span className="text-emerald-700/80">
                                        <MapPin
                                            className="inline me-1"
                                            size={20}
                                        />
                                        Localização:
                                    </span>{' '}
                                    {pet.location}
                                </span>
                                <span>
                                    <span className="text-emerald-700/80">
                                        <Calendar
                                            className="inline me-1"
                                            size={20}
                                        />
                                        Encontrado em:
                                    </span>{' '}
                                    {format(pet.date, 'd LLLL y', {
                                        locale: ptBR,
                                    })}
                                </span>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-medium mb-2">
                                    Informações de contato:
                                </h3>
                                <div className="text-sm flex flex-col gap-2">
                                    <span>
                                        <span className="text-emerald-700/80">
                                            <Phone
                                                className="inline me-1"
                                                size={20}
                                            />
                                            Telefone:
                                        </span>{' '}
                                        {formatPhoneNumber(pet.contact_info)}
                                    </span>
                                </div>
                            </div>
                            <Button size={'lg'} className="mt-3" asChild>
                                <a href={`tel:+${pet.contact_info}`}>
                                    Entrar em contato
                                </a>
                            </Button>
                            {pet.similar.length > 0 && (
                                <>
                                    <Separator />
                                    <SimilarPets pets={pet.similar} />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
