interface IPet {
    id: string
    description: string
    image: string
    location: string
    type: string
    color: string
    contact_info: string
    similar: ISimilarPet[]
    date: Date
}

interface ISimilarPet {
    id: string
    image: string
    location: string
    date: Date
}
