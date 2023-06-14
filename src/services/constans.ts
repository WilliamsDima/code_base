import { IItemSelect } from '@storybook/molecules/Select/types'

export const THEME_LOCAL = 'THEME_LOCAL'

export const sistemsRooms: IItemSelect[] = [
  {
    id: '0',
    text: 'Публичные',
    value: 'publick',
  },
  {
    id: '1',
    text: 'Моя кодовая база',
    value: 'only_my',
  },
]

export const sistemsRoomsForCreate: IItemSelect[] = [
  {
    id: '0',
    text: 'Видят все пользователи',
    value: 'publick',
  },
  {
    id: '1',
    text: 'Вижу только я',
    value: 'only_my',
  },
]
