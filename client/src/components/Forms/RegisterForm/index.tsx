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
import { formatPhoneNumber } from '@/lib/utils'
import { useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'
import { UsersApi } from '@/api/users'
import { useMutation } from '@tanstack/react-query'

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
export function RegisterForm() {
    const { mutate: registerUser, isPending: isRegistering } = useMutation({
        mutationFn: UsersApi.register,
    })
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
    })
    const { closeDialog, openDialog } = useDialogStore()

    function handleSubmit(values: z.infer<typeof registerFormSchema>) {
        registerUser(values, {
            onSuccess: () => {
                closeDialog(Dialogs.REGISTER)
                openDialog(Dialogs.LOGIN, null)
            },
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite seu nome"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
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
                    name="number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Celular:</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="(00) 00000-0000"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(
                                            formatPhoneNumber(e.target.value)
                                        )
                                    }}
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
                <Button
                    disabled={isRegistering}
                    type="submit"
                    size={'lg'}
                    className="w-full col-span-2 mt-5"
                >
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
