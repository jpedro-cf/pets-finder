import { useMutation } from '@tanstack/react-query'
import { UsersApi } from '@/api/users'
import { useAuth } from '@/hooks/useAuth'
import { useDialogStore } from '@/hooks/useDialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialogs } from '@/types/dialogs'

const loginFormSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
})

export function useLogin() {
    const { setToken } = useAuth()
    const { mutate: authenticateUser, isPending: isAuthenticating } =
        useMutation({
            mutationFn: UsersApi.login,
            onSuccess: (data) => {
                setToken(data.access_token)
            },
        })
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    })
    const { closeDialog, openDialog } = useDialogStore()

    function handleSubmit(values: z.infer<typeof loginFormSchema>) {
        authenticateUser(values, {
            onSuccess: () => closeDialog(Dialogs.LOGIN),
        })
    }

    return {
        handleSubmit,
        openDialog,
        form,
        isAuthenticating,
    }
}
