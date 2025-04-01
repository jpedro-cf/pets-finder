import { create } from 'zustand'

interface IDialog<T = any> {
    id: string
    isOpen: boolean
    data: T | null
}

interface IDialogStore {
    dialogs: Record<string, IDialog>
    open: <T>(id: string, data: T) => void
    close: (id: string) => void
}

export function useDialogStore() {
    create<IDialogStore>((set) => ({
        dialogs: {},
        open: (id, data) =>
            set((state) => ({
                dialogs: {
                    ...state.dialogs,
                    [id]: { id, isOpen: true, data },
                },
            })),
        close: (id) =>
            set((state) => {
                const newData = { ...state.dialogs }
                delete newData[id]
                return { dialogs: newData }
            }),
    }))
}
