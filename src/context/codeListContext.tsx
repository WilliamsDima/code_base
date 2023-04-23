import { IItemCode, ITag } from '@appTypes/types'
import { filterSearch, filterSyntax, filterTags } from '@hooks/helpers'
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
  codes: IItemCode[] | undefined
  clearFilter: () => void
  clearSearch: () => void
  setTagsSelect: React.Dispatch<SetStateAction<ITag[]>>
  setLanguages: React.Dispatch<SetStateAction<IItemSelect[]>>
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
    return codesFilter
      ?.map((c: IItemCode) => {
        return c.tags
      })
      .flat()
  }, [codes])

  const tableTags: Record<string, number> = {}
  const tagsListClear = useMemo(() => {
    return tags?.filter(({ value }) => {
      const tag = value.toLowerCase()
      if (tag) {
        if (!tableTags[tag] && (tableTags[tag] = 1)) {
          return tag
        }
      }
    })
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

  const value = useMemo(() => {
    return {
      searchValue,
      isLoading,
      tagsSelect,
      tagsListClear,
      languages,
      codes: codesFilter,
      updateItem,
      setTagsSelect,
      setLanguages,
      setSearchValue,
      searchHandler,
      clearFilter,
      clearSearch,
      isPending,
    }
  }, [
    searchValue,
    isLoading,
    codes,
    codesFilter,
    tagsSelect,
    languages,
    tagsListClear,
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
