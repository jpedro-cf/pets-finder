import { axiosInstance } from '@/config/axios'

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

export const UsersApi = {
    register: async (data: IRegister) => {
        return await axiosInstance.post('/auth/register', data)
    },
    login: async (data: ILogin) => {
        return await axiosInstance.post('/auth/login', data)
    },
    update: async (data: IUpdateUser) => {
        const { id, ...updateData } = data
        return await axiosInstance.put(`/users/${id}`, updateData)
    },
}
