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
import { useRegistration } from './model'

export function RegisterForm() {
    const { form, handleSubmit, isPending } = useRegistration()

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
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
                    disabled={isPending}
                    type="submit"
                    size={'lg'}
                    className="w-full sm:col-span-2 mt-5"
                >
                    Enviar
                </Button>
            </form>
        </Form>
    )
}
