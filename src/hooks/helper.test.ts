import { codeLanguges } from '../services/listLanguages'
import {
  getDateDisplay,
  filterSearch,
  sortByCopyList,
  listSortByDate,
  filterTags,
  filterSyntax,
  filterUnionList,
  updateItemCode,
} from './helpers'
import { codes, languages, tags } from './mockDataForTest'

describe('Валидация даты', () => {
  test('Число', () => {
    const mockDate = 1682853527339 // 30.04.2023
    expect(getDateDisplay(mockDate)).toBe('30.04.2023')
  })
  test('Формат даты', () => {
    const mockDate = new Date(1682853527339) // 30.04.2023
    expect(getDateDisplay(mockDate)).toBe('30.04.2023')
  })
  test('Не корректная дата', () => {
    const mockDate = 1682853527339 // 30.04.2023
    expect(getDateDisplay(mockDate)).not.toBe('29.04.2023')
  })
})

describe('Поиск', () => {
  test('По названию', () => {
    expect(filterSearch(codes, 'заголовок')).toEqual([codes[0]])
  })
  test('По описанию', () => {
    expect(filterSearch(codes, 'описание')).toEqual([codes[0]])
  })
  test('Ничего не нашёл', () => {
    expect(filterSearch(codes, 'bla bla bla')).toEqual([])
  })
  test('Заглавные буквы', () => {
    expect(filterSearch(codes, 'ЗАГОЛОВОК')).toEqual([codes[0]])
  })
  test('Пустой массив поиска', () => {
    expect(filterSearch(undefined, 'заголовок')).toBe(undefined)
  })
})

describe('Сортировка по количеству копирований', () => {
  test('От большего к меньшему', () => {
    expect(sortByCopyList(codes, true)).toEqual(codes)
  })
  test('От меньшего к большему', () => {
    expect(sortByCopyList(codes, false)).toEqual([codes[1], codes[0]])
  })
  test('Пустой массив сортировки', () => {
    expect(sortByCopyList(undefined, false)).toBe(undefined)
  })
})

describe('Сортировка по дате', () => {
  test('От большего к меньшему', () => {
    expect(listSortByDate(codes, true)).toEqual(codes)
  })
  test('От меньшего к большему', () => {
    expect(listSortByDate(codes, false)).toEqual([codes[1], codes[0]])
  })
  test('Пустой массив сортировки', () => {
    expect(listSortByDate(undefined, false)).toBe(undefined)
  })
})

describe('Фильтр по тэгам', () => {
  test('Фильтр одного тэга', () => {
    expect(filterTags(codes, [tags[0]])).toEqual([codes[0]])
  })
  test('Фильтр двух тэгов', () => {
    expect(filterTags(codes, tags)).toEqual(codes)
  })
  test('Фильтр пустого массив с кодом', () => {
    expect(filterTags(undefined, tags)).toBe(undefined)
  })
})

describe('Фильтр по синтаксису языка', () => {
  test('Фильтр одного языка', () => {
    expect(filterSyntax(codes, [languages[1]])).toEqual([codes[1]])
  })
  test('Фильтр по двум языкам', () => {
    expect(filterSyntax(codes, languages)).toEqual(codes)
  })
  test('Фильтр пустого массив с кодом', () => {
    expect(filterSyntax(undefined, languages)).toBe(undefined)
  })
})

describe('Фильтрация массива уникальных селектов', () => {
  test('Получение пустого массива', () => {
    expect(filterUnionList(codeLanguges, languages, languages[0])).toEqual([])
  })
  test('Появление нового элемента в массиве', () => {
    expect(filterUnionList(codeLanguges, languages, codeLanguges[0])).toEqual([
      codeLanguges[0],
    ])
  })
  test('Массив = undefined', () => {
    expect(filterUnionList(undefined, languages, codeLanguges[0])).toEqual([])
  })
})

describe('Обновление элемента в массиве с кодом', () => {
  test('Обновление заголовка', () => {
    const newItem = {
      ...codes[0],
      title: 'Заголовок изменён',
    }
    expect(updateItemCode(codes, newItem)).toEqual([newItem, codes[1]])
  })
  test('Обновление описания', () => {
    const newItem = {
      ...codes[0],
      description: 'Новое описание',
    }
    expect(updateItemCode(codes, newItem)).toEqual([newItem, codes[1]])
  })
  test('Обновление описания, заголовка, кода и языка', () => {
    const newItem = {
      ...codes[0],
      title: 'Новый заголовок',
      code: 'новый код',
      language: 'css',
      description: 'Новое описание',
    }
    expect(updateItemCode(codes, newItem)).toEqual([newItem, codes[1]])
  })
})
