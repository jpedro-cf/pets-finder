import { useDialogStore } from '@/hooks/useDialog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { Dialogs } from '@/types/dialogs'
import { RegisterForm } from '../Forms/RegisterForm'

export function RegisterDialog() {
    const { dialogs, closeDialog } = useDialogStore()
    const isOpen = Dialogs.REGISTER in dialogs

    function handleClose() {
        closeDialog(Dialogs.REGISTER)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} key={Dialogs.REGISTER}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar</DialogTitle>
                </DialogHeader>
                <div className="pt-5">
                    <RegisterForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}
