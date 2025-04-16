import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialogs } from '@/types/dialogs'
import { useLogin } from './model'

export function LoginForm() {
    const { form, handleSubmit, isAuthenticating, openDialog } = useLogin()

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
