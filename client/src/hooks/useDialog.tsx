import { Dialogs } from '@/types/dialogs'
import { IPet } from '@/types/pet'
import { create } from 'zustand'

export interface IDialog<T = any> {
    id: string
    isOpen: boolean
    data: T
}

interface Types {
    [Dialogs.CREATE_PET]: null
    [Dialogs.LOGIN]: null
    [Dialogs.REGISTER]: null
    [Dialogs.PET_DETAILS]: { id: string }
}

interface IDialogStore {
    dialogs: Record<string, IDialog>
    openDialog: <T extends keyof Types>(id: T, data: Types[T]) => void
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
