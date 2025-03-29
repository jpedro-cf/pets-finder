import { Card, CardContent } from '../ui/card'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useDragDrop } from './DragDropData'
import { Button } from '../ui/button'
import { CloudUpload } from 'lucide-react'

export const dragDropVariants = cva(
    'p-3 h-full border-2 border-emerald-600/40 border-dashed transition-all hover:bg-emerald-50',
    {
        variants: {
            variant: {
                default: '',
                over: 'bg-emerald-50 border-emerald-800',
            },
        },
    }
)
interface IUploadComponentProps {
    onChange: () => void
}

export function UploadComponent() {
    const {
        preview,
        currentVariant,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        handleFileInputChange,
        inputRef,
    } = useDragDrop()

    return (
        <aside className="w-1/3 border-r-2 p-3">
            <Card
                className={cn(
                    dragDropVariants({ variant: currentVariant.variant })
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CardContent
                    className="p-0 rounded-md w-full h-full overflow-hidden 
                    relative flex items-center justify-center"
                >
                    <img
                        src={preview}
                        hidden={!preview}
                        alt="Preview image"
                        className="h-full w-full object-cover z-0"
                    />
                    <Button
                        type="button"
                        variant={'default'}
                        className="z-10"
                        hidden={preview != ''}
                        onClick={() => inputRef.current?.click()}
                    >
                        Carregar imagem <CloudUpload />
                    </Button>
                    <input
                        ref={inputRef}
                        type="file"
                        className="hidden"
                        onChange={handleFileInputChange}
                    />
                </CardContent>
            </Card>
        </aside>
    )
}
