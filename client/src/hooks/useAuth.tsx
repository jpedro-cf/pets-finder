import { IUser } from '@/types/user'
import { create } from 'zustand'

interface Store {
    token: string | null
    user: IUser | null
}

interface Actions {
    setUser: (user: IUser | null) => void
    setToken: (value: string | null) => void
}

export const useAuth = create<Store & Actions>((set) => ({
    token: null,
    user: null,
    setUser: (user: IUser | null) => set({ user }),
    setToken: (value: string | null) => set({ token: value }),
}))
