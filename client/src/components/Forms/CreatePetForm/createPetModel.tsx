import { PetsApi } from '@/api/pets'
import { useFormField } from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useController, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const petFormSchema = z.object({
    color: z.string().min(1, 'Informe a cor'),
    type: z.enum(['DOG', 'CAT'], {
        errorMap: () => ({ message: 'Selecione um tipo válido' }),
    }),
    location: z.string().min(1, 'Informe a localização'),
    image: z
        .custom<File>()
        .refine((file) => file?.size > 0, 'Envie uma imagem'),
})
export function useCreatePet() {
    const form = useForm<z.infer<typeof petFormSchema>>({
        resolver: zodResolver(petFormSchema),
        defaultValues: {
            color: '',
            type: 'DOG',
            location: '',
            image: undefined,
        },
    })

    const { field } = useController({ name: 'image', control: form.control })
    function handleFileSelect(data: File | null) {
        field.onChange(data)
    }

    const { mutate: createPet, isPending } = useMutation({
        mutationFn: PetsApi.createPet,
        onSuccess: () => {
            // yes, that's lazy, i know :/
            window.location.reload()
            toast('Pet criado com sucesso!')
        },
        onError: (e: AxiosError) => {
            const msg =
                e.status == 401 ? 'Você precisa estar autenticado.' : e.message
            toast(msg ?? 'Erro ao criar pet')
        },
    })

    function handleSubmit(data: z.infer<typeof petFormSchema>) {
        createPet({ ...data, image: data.image })
    }

    return { handleSubmit, form, isPending, handleFileSelect }
}
