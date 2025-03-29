import { axiosInstance } from '@/config/axios'

export interface ICreatePet {
    color: string
    location: string
}

export interface IListPets {
    page?: string
    size?: string
}

export const PetsApi = {
    createPet: async (data: ICreatePet) => {
        return await axiosInstance.post('/pets', data)
    },

    getPet: async (id: string) => {
        return await axiosInstance.get(`/pets/${id}`)
    },

    listPets: async (data: IListPets) => {
        return await axiosInstance.get(`/pets`, {
            params: {
                page: data.page ? data.page : 0,
                size: data.size ? data.size : 9,
            },
        })
    },
}
