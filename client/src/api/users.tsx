import { axiosInstance } from '@/config/axios'
import { IUser } from '@/types/user'

export interface IRegister {
    name: string
    email: string
    number: string
    password: string
}

export interface ILogin {
    email: string
    password: string
}

export interface IUpdateUser {
    id: string
    number?: string
    email?: string
    name?: string
    password?: string
    password_confirmation: string
}

export interface ILoginResponse {
    access_token: string
    refresh_token: string
    user: IUser
}

export const UsersApi = {
    register: async (data: IRegister) => {
        return await axiosInstance.post('/auth/register', data)
    },
    login: async (data: ILogin): Promise<ILoginResponse> => {
        const res = await axiosInstance.post('/auth/login', data)
        return res.data
    },
    me: async (): Promise<IUser> => {
        const res = await axiosInstance.get('/auth/me')
        return res.data
    },
    refresh: async (): Promise<Pick<ILoginResponse, 'access_token'>> => {
        const res = await axiosInstance.get('/auth/refresh')
        return res.data
    },
    update: async (data: IUpdateUser): Promise<IUser> => {
        const { id, ...updateData } = data
        const res = await axiosInstance.put(`/users/${id}`, updateData)
        return res.data
    },
}
