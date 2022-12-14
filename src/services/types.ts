export type ITag = {
    id: number
    value: string
}

export type IItemCode = {
    id: number
    title: string
    description: string
    tags: ITag[]
    code: string
    file: any[]
    copy: number
}