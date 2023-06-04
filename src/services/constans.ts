import { IItemSelect } from '@storybook/molecules/Select/types'

export const THEME_LOCAL = 'THEME_LOCAL'

export const sistemsTabs: IItemSelect[] = [
  {
    id: 0,
    text: 'Публичные',
    value: 'Видят все пользователи',
  },
  {
    id: 1,
    text: 'Моя кодовая база',
    value: 'Вижу только я',
  },
]

export const sistemsTabsForCreate: IItemSelect[] = [
  {
    id: 0,
    text: 'Видят все пользователи',
    value: 'Видят все пользователи',
  },
  {
    id: 1,
    text: 'Вижу только я',
    value: 'Вижу только я',
  },
]
