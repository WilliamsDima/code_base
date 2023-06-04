export interface IItemSelect {
  id: string | number
  value?: string | number | boolean
  text?: string
}

export type Room = 'only_my' | 'publick' | string
