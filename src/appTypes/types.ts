export type User = {
  id: string
  name: string
  avatarUrl: string
  email: string
}

export type ITag = {
  id: string
  value: string
  text: string
}

export type Message = {
  handlerDone?: () => void
  title?: string
  body: string
}

export type Accessibility = {
  id: string
  value: string | 'only_my' | 'publick'
  text: string
  userIdCreator: string
}

export type IItemCode = {
  id: number
  title: string
  description: string
  tags: ITag[]
  code: string
  language?: string
  copy: number
  accessibility: Accessibility
}
