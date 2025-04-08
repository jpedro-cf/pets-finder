import { useSearch } from './searchFormModel'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

type Props = ReturnType<typeof useSearch>
export function SearchForm(data: Props) {
    const { form, handleSearch, searching } = data
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSearch)} className="w-full">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem className="border-1 rounded-md p-0.5 ps-3 relative flex items-center">
                            <FormControl className="p-0">
                                <Input
                                    {...field}
                                    placeholder="Pesquisar..."
                                    className="border-0 p-0 aria-invalid:ring-0"
                                />
                            </FormControl>
                            <Button
                                disabled={searching}
                                type="submit"
                                className="absolute right-1"
                                size={'sm'}
                            >
                                {searching ? (
                                    '...'
                                ) : (
                                    <span className="inline-flex gap-1 items-center">
                                        Pesquisar <Search />
                                    </span>
                                )}
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}
