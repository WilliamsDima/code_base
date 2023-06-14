import { IItemCode, ITag } from '@appTypes/types'
import { IItemSelect } from '@storybook/molecules/Select/types'

//  ЗАПРЕЩЕНО ИЗМЕНЯТЬ КАКИЕ ЛИБО СУЩЕСТВУЮЩИЕ ДАННЫЕ!!!

export const tags: ITag[] = [
  {
    id: '1680773028229',
    value: 'какой то тэг',
    text: 'какой то тэг',
  },
  {
    id: '1680773028234',
    value: 'tag',
    text: 'tag',
  },
]

export const languages: IItemSelect[] = [
  {
    id: '16',
    value: 'javascript',
    text: 'javascript',
  },
  {
    id: '9',
    value: 'css',
    text: 'css',
  },
]

export const codes: IItemCode[] = [
  {
    title: 'Какой то заголовок',
    code: 'тут какой то код с javascript',
    language: 'javascript',
    copy: 4,
    description: 'какое то описание',
    id: 1680773033792,
    tags: [tags[0]],
    accessibility: {
      id: '1',
      text: 'Виден всем',
      userIdCreator: '123',
      value: 'publick',
    },
  },
  {
    title: 'test',
    code: 'тут какой то код с css',
    language: 'css',
    copy: 1,
    description: 'description',
    id: 1680773033773,
    tags: [tags[1]],
    accessibility: {
      id: '1',
      text: 'Виден всем',
      userIdCreator: '123',
      value: 'publick',
    },
  },
]
