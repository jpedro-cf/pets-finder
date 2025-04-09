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
import { useCreatePet } from './createPetModel'
import {
    DragDropComponent,
    DragDropContent,
    DragDropFileInfo,
    DragDropImagePreview,
} from '@/components/DragDrop'
export function CreatePetForm() {
    const { form, isPending, handleSubmit, handleFileSelect } = useCreatePet()
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex gap-5 h-full items-start"
            >
                <FormField
                    control={form.control}
                    name="image"
                    render={({ fieldState }) => (
                        <DragDropComponent
                            onFileSelect={handleFileSelect}
                            className={`w-1/2 h-[350px] ${
                                fieldState.error && 'bg-red-50 border-red-400'
                            }`}
                        >
                            <DragDropContent />
                            <DragDropImagePreview />
                            <DragDropFileInfo className="absolute z-10 overflow-hidden py-1 block w-80 m-5 bottom-0 bg-emerald-50" />
                        </DragDropComponent>
                    )}
                />
                <div className="grid grid-cols-2 gap-4 items-start h-full auto-rows-max">
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
                            <FormItem className="col-span-2">
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
                        disabled={isPending}
                        className="col-span-2 mt-4"
                    >
                        {isPending ? 'Enviando...' : 'Cadastrar Pet'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
