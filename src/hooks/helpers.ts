/* eslint-disable array-callback-return */

import { IItemSelect } from '@storybook/molecules/Select/types'
import { IItemCode, ITag } from '../appTypes/types'

// Поскольку массив заморожен в строгом режиме, нужно скопировать массив перед его сортировкой поэтому использую slice
export const sortByCopyList = (
  resCodeFilter: IItemCode[] | undefined,
  max: boolean
) =>
  resCodeFilter &&
  resCodeFilter.slice().sort((a, b) => {
    if (max) {
      return b.copy - a.copy
    }
    return a.copy - b.copy
  })

export const listSortByDate = (codes: IItemCode[] | undefined, max: boolean) =>
  codes &&
  codes.slice().sort((a, b) => {
    if (max) {
      return b.id - a.id
    }
    return a.id - b.id
  })

export const filterSearch = (
  codeBase: IItemCode[] | undefined,
  search: string
) =>
  codeBase &&
  codeBase.filter((c) => {
    const text = (c.title + ' ' + c.description).toLocaleLowerCase()
    if (text.includes(search.toLocaleLowerCase())) {
      return c
    }
  })

export const filterTags = (codes: IItemCode[] | undefined, tags: ITag[]) =>
  codes &&
  codes.filter((c) => {
    const isCode = tags.some((tag) =>
      c.tags.some((it) =>
        tag.value.toLocaleLowerCase().includes(it.value.toLocaleLowerCase())
      )
    )
    if (isCode) {
      return c
    }
  })

export const filterSyntax = (
  codes: IItemCode[] | undefined,
  languages: IItemSelect[]
) =>
  codes &&
  codes.filter((c) => {
    const isCode = languages.some((lang) => c.language === lang.value)
    if (isCode) {
      return c
    }
  })

const dateConverter = (i: number) => {
  if (i < 10) {
    return '0' + i
  }
  return i
}
export const getDateDisplay = (d: Date | number | string) => {
  const date = new Date(d)
  const display =
    dateConverter(date.getDate()) +
    '.' +
    dateConverter(date.getMonth() + 1) +
    '.' +
    date.getFullYear()

  return display
}

export const filterUnionList = (
  list: IItemSelect[] | undefined,
  goalList: IItemSelect[],
  goal: IItemSelect
): any[] => {
  return (
    list?.filter((it) => {
      const isItem = goalList.some((tg) => tg.id === goal.id)
      if (it.id === goal.id && !isItem) {
        return it
      }
    }) || []
  )
}

export const updateItemCode = (codes: IItemCode[], item: IItemCode) => {
  return codes.map((code) => {
    if (code.id === item.id) {
      code = {
        ...code,
        ...item,
      }
    }
    return code
  })
}
