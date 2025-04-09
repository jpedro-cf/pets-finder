import { PetsApi } from '@/api/pets'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const petFormSchema = z.object({
    color: z.string().min(1, 'Informe a cor'),
    type: z.enum(['DOG', 'CAT'], {
        errorMap: () => ({ message: 'Selecione um tipo válido' }),
    }),
    location: z.string().min(1, 'Informe a localização'),
    image: z.custom<File>().refine((file) => file != null, 'Envie uma imagem'),
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
    function handleFileSelect(data: File | null) {
        if (!data) {
            return
        }
        form.setValue('image', data)
    }
    const { mutate: createPet, isPending } = useMutation({
        mutationFn: PetsApi.createPet,
    })

    function handleSubmit(data: z.infer<typeof petFormSchema>) {
        createPet({ ...data, image: data.image })
    }

    return { handleSubmit, form, isPending, handleFileSelect }
}
