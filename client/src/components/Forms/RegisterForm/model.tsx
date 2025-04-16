import { UsersApi } from '@/api/users'
import { useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    number: z
        .string()
        .min(3)
        .transform((element) => {
            return element.replace(/\D/g, '')
        }),
    password: z.string().min(1),
})
export function useRegistration() {
    const { closeDialog, openDialog } = useDialogStore()
    const { mutate: registerUser, isPending } = useMutation({
        mutationFn: UsersApi.register,
    })
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
    })
    function handleSubmit(values: z.infer<typeof registerFormSchema>) {
        registerUser(values, {
            onSuccess: () => {
                closeDialog(Dialogs.REGISTER)
                openDialog(Dialogs.LOGIN, null)
            },
        })
    }
    return { form, handleSubmit, isPending }
}
