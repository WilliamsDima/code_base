export type ITag = {
  id: number
  value: string
}

export type Message = {
  handlerDone?: () => void
  title?: string
  body: string
}

export type Accessibility = {
  id: string | number
  value?: string | number | boolean
  text?: string
  userIdCreator: string | number
}

export type IItemCode = {
  id: number
  title: string
  description: string
  tags: ITag[]
  code: string
  language?: string
  copy: number
  accessibility?: Accessibility
}
