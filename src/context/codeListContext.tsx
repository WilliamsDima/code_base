import { IItemCode, ITag } from '@appTypes/types'
import { useRTKQuery } from '@hooks/useRTKQuery'
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
  language: string | number
  isLoading: boolean
  isPending: boolean
  codes: IItemCode[] | undefined
  clearFilter: () => void
  setTagsSelect: React.Dispatch<SetStateAction<ITag[]>>
  setLanguage: (value: string | number) => void
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
  const [language, setLanguage] = useState<string | number>('')

  const codesFilter = useMemo(() => {
    // console.log('filtredValue', filtredValue)
    return codes?.filter((code) => {
      const textContent = (code.title + code.description).toLocaleLowerCase()
      if (textContent.includes(filtredValue.toLocaleLowerCase())) {
        return code
      }
    })
  }, [filtredValue, codes])

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
  }, [codesFilter])

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

  const clearFilter = () => {
    console.log('clearFilter')

    setSearchValue('')
    setTagsSelect([])
    setLanguage('')
    setFiltredValue('')
  }

  const value = useMemo(() => {
    return {
      searchValue,
      isLoading,
      tagsSelect,
      tagsListClear,
      language,
      codes: codesFilter,
      updateItem,
      setTagsSelect,
      setLanguage,
      setSearchValue,
      searchHandler,
      clearFilter,
      isPending,
    }
  }, [
    searchValue,
    isLoading,
    codes,
    codesFilter,
    tagsSelect,
    language,
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
