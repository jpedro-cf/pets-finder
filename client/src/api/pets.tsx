import { axiosInstance } from '@/config/axios'
import { IPet } from '@/types/pet'

export interface ICreatePet {
    color: string
    type: string
    location: string
    image: File
}

export interface IListPets {
    page?: string
    size?: string
}

export interface ISimilarityRequest {
    text: string
    image?: File
}

interface ListPetsResult {
    pets: IPet[]
    totalPages: number
}

interface SimilarityResult {
    ids: string[]
}

export const PetsApi = {
    createPet: async (data: ICreatePet): Promise<IPet> => {
        const res = await axiosInstance.post('/pets', data)
        return res.data
    },

    getPetById: async (id: string): Promise<IPet> => {
        const res = await axiosInstance.get(`/pets/${id}`)
        return res.data
    },

    getPetsByIds: async (ids: string[]): Promise<IPet[]> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const res = await axiosInstance.get(`/pets/ids`, {
            params: { data: ids.toString() },
        })
        return res.data
    },

    listPets: async (data: IListPets): Promise<ListPetsResult> => {
        const res = await axiosInstance.get(`/pets`, {
            params: {
                page: data.page ? data.page : 0,
                size: data.size ? data.size : 9,
            },
        })
        return {
            pets: res.data.content,
            totalPages: res.data.totalPages,
        }
    },

    requestSimilarity: async (
        data: ISimilarityRequest
    ): Promise<SimilarityResult> => {
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
