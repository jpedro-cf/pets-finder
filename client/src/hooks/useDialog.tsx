import { create } from 'zustand'

interface IDialog<T = any> {
    id: string
    isOpen: boolean
    data: T | null
}

interface IDialogStore {
    dialogs: Record<string, IDialog>
    openDialog: <T>(id: string, data: T) => void
    closeDialog: (id: string) => void
}

export const useDialogStore = create<IDialogStore>((set) => ({
    dialogs: {},
    openDialog: (id, data) =>
        set((state) => ({
            dialogs: {
                ...state.dialogs,
                [id]: { id, isOpen: true, data },
            },
        })),
    closeDialog: (id) =>
        set((state) => {
            const newData = { ...state.dialogs }
            delete newData[id]
            return { dialogs: newData }
        }),
}))
