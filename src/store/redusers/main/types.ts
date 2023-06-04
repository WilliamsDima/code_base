import { IItemSelect } from '@storybook/molecules/Select/types'
import { IItemCode } from '../../../appTypes/types'

export type IStore = {
  tab: IItemSelect
}

export interface IUserData {
  email: string
  id: string
  name: string
  codes: IItemCode[]
}
