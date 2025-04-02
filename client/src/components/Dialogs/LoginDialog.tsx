import { useDialogStore } from '@/hooks/useDialog'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Dialogs } from '@/types/dialogs'
import { LoginForm } from '../Forms/LoginForm'

export function LoginDialog() {
    const { dialogs, closeDialog } = useDialogStore()
    const isOpen = Dialogs.LOGIN in dialogs

    function handleClose() {
        closeDialog(Dialogs.LOGIN)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} key={Dialogs.LOGIN}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <div className="pt-5">
                    <LoginForm />
                </div>
            </DialogContent>
        </Dialog>
    )
}
