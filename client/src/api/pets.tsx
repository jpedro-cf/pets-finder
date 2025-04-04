import { axiosInstance } from '@/config/axios'
import { IPet } from '@/types/pet'

export interface ICreatePet {
    color: string
    location: string
}

export interface IListPets {
    page?: string
    size?: string
}

export interface ISimilarityRequest {
    text: string
    image?: File
}

export const PetsApi = {
    createPet: async (data: ICreatePet) => {
        return await axiosInstance.post('/pets', data)
    },

    getPetById: async (id: string): Promise<IPet> => {
        const res = await axiosInstance.get(`/pets/${id}`)
        return res.data
    },

    getPetsByIds: async (ids: string[]) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axiosInstance.get(`/pets/ids`, {
            params: { data: ids.toString() },
        })
        return res.data
    },

    listPets: async (data: IListPets) => {
        const res = await axiosInstance.get(`/pets`, {
            params: {
                page: data.page ? data.page : 0,
                size: data.size ? data.size : 9,
            },
        })
        return res.data.content
    },

    requestSimilarity: async (data: ISimilarityRequest) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const form = new FormData()
        form.append('text', data.text)
        if (data.image) {
            form.append('image', data.image)
        }

        const res = await axiosInstance.post('/similarity', form)
        return res.data
    },
}
