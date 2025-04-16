import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCreatePet } from './model'
import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview,
} from '@/components/DragDrop'
import { ProgressAnimation } from '@/components/ProgressAnimation'

export function CreatePetForm() {
    const { form, pending, handleSubmit, handleFileSelect, progress } =
        useCreatePet()
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col lg:flex-row gap-5 h-full items-start"
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ fieldState }) => (
                        <DragDropComponent
                            onFileSelect={handleFileSelect}
                            className={`w-full lg:w-1/2 h-[350px] ${
                                fieldState.error && 'bg-red-50 border-red-400'
                            }`}
                        >
                            <DragDropContent />
                            <DragDropImagePreview />
                            <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-[90%] m-5 bottom-0 bg-emerald-50">
                                <ProgressAnimation percentage={progress} />
                            </DragDropFileInfo>
                        </DragDropComponent>
                    )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start w-full h-full auto-rows-max">
                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cor</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: preto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tipo</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="cursor-pointer w-full">
                                            <SelectValue placeholder="Selecione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="DOG">
                                            Cachorro
                                        </SelectItem>
                                        <SelectItem value="CAT">
                                            Gato
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Localização</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ex: RS, SP..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={pending}
                        className="md:col-span-2 mt-4"
                    >
                        {pending ? 'Enviando...' : 'Cadastrar Pet'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
