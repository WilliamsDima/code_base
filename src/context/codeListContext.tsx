import { IItemCode, ITag } from '@appTypes/types'
import {
  filterSearch,
  filterSyntax,
  filterTags,
  listSortByDate,
  sortByCopyList,
} from '@hooks/helpers'
import { useRTKQuery } from '@hooks/useRTKQuery'
import { IItemSelect } from '@storybook/molecules/Select/types'
import {
  useContext,
  createContext,
  useMemo,
  FC,
  ReactElement,
  ChangeEvent,
  useState,
  SetStateAction,
  useTransition,
} from 'react'

type IContext = {
  searchValue: string
  tagsSelect: ITag[]
  tagsListClear: ITag[] | undefined
  languages: IItemSelect[]
  isLoading: boolean
  isPending: boolean
  sortByDate: boolean
  sortByCopy: boolean
  codesData: IItemCode[] | undefined
  codesFilter: IItemCode[] | undefined
  clearFilter: () => void
  clearSearch: () => void
  setTagsSelect: React.Dispatch<SetStateAction<ITag[]>>
  setLanguages: React.Dispatch<SetStateAction<IItemSelect[]>>
  setSortByDate: React.Dispatch<SetStateAction<boolean>>
  setSortByCopy: React.Dispatch<SetStateAction<boolean>>
  updateItem: (codes: { codes: IItemCode[] }) => void
  setSearchValue: (value: string) => void
  searchHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

const CodeListContext = createContext<IContext>({} as IContext)

type AppProviderType = {
  children: ReactElement
}

export const CodeListProvider: FC<AppProviderType> = ({ children }) => {
  const { codes, isLoading, updateItem } = useRTKQuery()

  const [filtredValue, setFiltredValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [isPending, startTransition] = useTransition()

  const [tagsSelect, setTagsSelect] = useState<ITag[]>([])
  const [languages, setLanguages] = useState<IItemSelect[]>([])

  const [sortByDate, setSortByDate] = useState(true)
  const [sortByCopy, setSortByCopy] = useState(false)

  const codesFilter = useMemo(() => {
    let search = codes

    if (filtredValue.length) {
      search = filterSearch(codes, filtredValue)
    }
    if (tagsSelect.length) {
      search = filterTags(search, tagsSelect)
    }
    if (languages.length) {
      search = filterSyntax(search, languages)
    }
    return search
  }, [filtredValue, codes, tagsSelect, languages])

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    // этот хук отвечает за изменение value у поиска
    setSearchValue(target?.value)
    // а этот отвечает за value по которому уже будет происходит поиск
    startTransition(() => {
      setFiltredValue(target?.value)
    })
  }

  const tags: ITag[] | undefined = useMemo(() => {
    return codes
      ?.map((c: IItemCode) => {
        return c.tags
      })
      .flat()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codes])

  const tableTags: Record<string, number> = {}
  const tagsListClear = useMemo(() => {
    // eslint-disable-next-line array-callback-return
    return tags?.filter(({ value }) => {
      const tag = value.toLowerCase()
      if (tag) {
        if (!tableTags[tag] && (tableTags[tag] = 1)) {
          return tag
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  const clearSearch = () => {
    setSearchValue('')
    setFiltredValue('')
  }

  const clearFilter = () => {
    // console.log('clearFilter')

    clearSearch()
    setTagsSelect([])
    setLanguages([])
  }

  const sortCodes = useMemo(() => {
    let sort
    sort = listSortByDate(codesFilter, sortByDate)
    if (sortByCopy) {
      sort = sortByCopyList(sort, sortByCopy)
    }

    return sort
  }, [codesFilter, sortByDate, sortByCopy])

  const value = useMemo(() => {
    return {
      searchValue,
      isLoading,
      tagsSelect,
      tagsListClear,
      languages,
      codesFilter: sortCodes,
      codesData: codes,
      sortByDate,
      sortByCopy,
      setSortByCopy,
      setSortByDate,
      updateItem,
      setTagsSelect,
      setLanguages,
      setSearchValue,
      searchHandler,
      clearFilter,
      clearSearch,
      isPending,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchValue,
    isLoading,
    sortCodes,
    codes,
    tagsSelect,
    languages,
    tagsListClear,
    sortByDate,
    sortByCopy,
  ])

  return (
    <CodeListContext.Provider value={value}>
      {children}
    </CodeListContext.Provider>
  )
}

export const useCodeListContext = () => {
  return useContext(CodeListContext)
}
