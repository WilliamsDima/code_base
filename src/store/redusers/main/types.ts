import { IItemCode } from '../../../appTypes/types'

export type IStore = {
  codeBase: IItemCode[]
  loading: boolean
}

export interface IUserData {
  email: string
  id: string
  name: string
  codes: IItemCode[]
}
