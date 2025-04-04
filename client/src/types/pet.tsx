export interface IPet {
    id: string
    description: string
    image: string
    location: string
    type: string
    contact_info: string
    similar: ISimilarPet[]
    date: Date
}

export interface ISimilarPet {
    id: string
    image: string
    location: string
    date: Date
}
