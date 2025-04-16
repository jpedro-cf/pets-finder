import { PetsApi } from '@/api/pets'
import { useFormField } from '@/components/ui/form'
import { useDialogStore } from '@/hooks/useDialog'
import { Dialogs } from '@/types/dialogs'
import { SSESteps } from '@/types/sse'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios, AxiosError } from 'axios'
import { useState } from 'react'
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

interface SSEMessage {
    request_id: string
    step: string
    data: any
}

const messagesMap: Record<string, string> = {
    [SSESteps.FAILED]: '0%',
    [SSESteps.STABLISHED]: '33%',
    [SSESteps.CREATED]: '66%',
    [SSESteps.COMPLETED]: '100%',
}

export function useCreatePet() {
    const client = useQueryClient()
    const [progress, setProgress] = useState('0%')

    const form = useForm<z.infer<typeof petFormSchema>>({
        resolver: zodResolver(petFormSchema),
        defaultValues: {
            color: '',
            type: 'DOG',
            location: '',
            image: undefined,
        },
    })
    // change the form field state
    const { field } = useController({ name: 'image', control: form.control })
    function handleFileSelect(data: File | null) {
        field.onChange(data)
    }

    function startConnection() {
        setProgress('0%')
        const source = new EventSource(
            `${import.meta.env.VITE_API_URL}/pets/sse`
        )

        // All this is not really necessary, I just wanted to study the concepts of SSE
        source.onmessage = (event) => {
            const message: SSEMessage = JSON.parse(event.data)
            setProgress(messagesMap[message.step])

            if (message.step == SSESteps.FAILED) {
                handleError(null)
                source.close()
            }

            if (message.step == SSESteps.STABLISHED) {
                createPet(source, message)
            }

            if (message.step == SSESteps.COMPLETED) {
                form.reset()
                source.close()

                client.invalidateQueries({ queryKey: ['pets'] })
                toast.success('Pet criado com sucesso!')
            }
        }

        source.onerror = () => {
            handleError(null)
            source.close()
        }
    }

    const { mutate, isPending } = useMutation({
        mutationFn: PetsApi.createPet,
        onError: (e: AxiosError) => {
            handleError(e)
        },
    })

    function handleError(e: AxiosError | null) {
        const UNAUTHORIZED = e?.status == 401
        const defaultMessage = 'Você precisa estar autenticado.'

        const msg = UNAUTHORIZED
            ? defaultMessage
            : (e?.response?.data as any).detail
        toast.warning(msg ?? 'Erro ao criar pet.')

        setProgress('0%')
    }

    function createPet(source: EventSource, message: SSEMessage) {
        const data = { ...form.getValues(), requestId: message.request_id }

        mutate(data, {
            onError: () => source.close(),
        })
    }

    function handleSubmit() {
        startConnection()
    }
    const pending = !['0%', '100%'].includes(progress) || isPending

    return { handleSubmit, form, pending, handleFileSelect, progress }
}
