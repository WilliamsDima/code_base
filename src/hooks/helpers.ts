import { IItemCode } from "../services/types"

// Поскольку массив заморожен в строгом режиме, нужно скопировать массив перед его сортировкой поэтому использую slice
export const dataSortMaxValue = (resCodeFilter: any[], max: boolean) => resCodeFilter 
&& resCodeFilter.slice().sort((a, b) => {
  if (max) {
    return b.copy - a.copy
  }
  return a.copy - b.copy
})

export const dataSortByDate= (resCodeFilter: IItemCode[], max: boolean) => resCodeFilter 
&& resCodeFilter.slice().sort((a, b) => {
  if (max) {
    return b.id - a.id
  }
  return a.id - b.id
})

export const filterSearch = (codeBase: IItemCode[], search: string) => codeBase 
&& codeBase.slice().filter((c) => {
  const text = c.title.toLocaleLowerCase() + ' ' + c.description.toLocaleLowerCase()
  if (text.includes(search.toLocaleLowerCase())) {
    return c
  }
})