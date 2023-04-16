export type ITag = {
  id: number
  value: string
}

export type Message = {
  handlerDone?: () => void
  title?: string
  body: string
}

export type IItemCode = {
  id: number
  title: string
  description: string
  tags: ITag[]
  code: string
  language?: string
  copy: number
}
