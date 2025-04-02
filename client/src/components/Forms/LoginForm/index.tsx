import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUsersService } from '@/services/users'
import { formatPhoneNumber } from '@/lib/utils'
import { useEffect } from 'react'
import { useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'

const loginFormSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
})
export function LoginForm() {
    const { authenticateUser, isAuthenticating } = useUsersService({})
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    })
    const { closeDialog, openDialog } = useDialogStore()

    function handleSubmit(values: z.infer<typeof loginFormSchema>) {
        authenticateUser(values, {
            onSuccess: () => closeDialog(Dialogs.LOGIN),
        })
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-2 gap-3"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail:</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="Digite seu e-mail"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha:</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="*****"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="mt-5 col-span-2 text-gray-700">
                    Ainda não possui uma conta?{' '}
                    <span
                        className="text-primary font-semibold underline cursor-pointer"
                        onClick={() => openDialog(Dialogs.REGISTER, null)}
                    >
                        Registrar-se
                    </span>
                </div>
                <Button
                    disabled={isAuthenticating}
                    type="submit"
                    size={'lg'}
                    className="w-full col-span-2 "
                >
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
