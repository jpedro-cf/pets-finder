import { create } from 'zustand'

interface IDialogProps<T> {
    isOpen: boolean
    data: T | null
    openDialog: (data: T) => void
    closeDialog: () => void
}

export function useDialog<T>() {
    create<IDialogProps<T>>((set) => ({
        isOpen: false,
        data: null,
        openDialog: (data: T) => set({ isOpen: true, data }),
        closeDialog: () => set({ isOpen: false, data: undefined }),
    }))
}
