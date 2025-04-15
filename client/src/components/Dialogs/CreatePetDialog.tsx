import { useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { DialogHeader } from '../ui/dialog'
import { CreatePetForm } from '../Forms/CreatePetForm'

export function CreatePetDialog() {
    const { dialogs, closeDialog } = useDialogStore()
    const isOpen = Dialogs.CREATE_PET in dialogs

    function handleClose() {
        closeDialog(Dialogs.CREATE_PET)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} key={Dialogs.LOGIN}>
            <DialogContent className="w-[90vw] sm:max-w-[calc(80vw)-2rem] p-5 max-h-[95vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Encontrei um Pet</DialogTitle>
                </DialogHeader>
                <CreatePetForm />
            </DialogContent>
        </Dialog>
    )
}
