import { PawPrint } from 'lucide-react'

export function Header() {
    return (
        <header className="border-b-1 p-4 flex gap-3">
            <div className="bg-emerald-300/80 h-full w-11 flex items-center justify-center rounded-md">
                <PawPrint size={32} />
            </div>
            <div>
                <h1 className="font-bold text-lg/5">Pets Finder</h1>
                <span className="font-normal text-sm text-gray-500">
                    Sistema de busca por imagens para identificar e localizar
                    animais de estimação perdidos.
                </span>
            </div>
        </header>
    )
}
