import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'

export function Header() {
    return (
        <header className="border-b-1 p-4 flex gap-3">
            <Avatar>
                <AvatarFallback
                    className="bg-emerald-300/80 w-12 h-full flex font-bold 
                items-center justify-center rounded-md text-xl"
                >
                    PF
                </AvatarFallback>
            </Avatar>
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
