import { useEffect, useMemo, useState } from 'react'
import './styles.scss'
import Button from '@mui/material/Button'
import { ITag } from '../../../appTypes/types'
import { useActions } from '../../../hooks/useActions'
import { useAppSelector } from '../../../hooks/hooks'
import {
  dataSortByDate,
  dataSortMaxValue,
  filterSearch,
} from '../../../hooks/helpers'
import Search from '../../atoms/Search'
import SelectList from '../Selects'
import { copyList } from './copyListData'

interface ICopy extends ITag {
  max: boolean
}

const FilterParams = () => {
  const { setFilterData } = useActions()
  const { codeBase } = useAppSelector((store) => store.main)

  const [tag, setTag] = useState<ITag | null>(null)
  const [max, setMax] = useState<ICopy | null>(null)
  const [search, setSearch] = useState<string>('')

  const tags: ITag[] = codeBase
    ?.map((c: any) => {
      return c?.tags
    })
    .flat()

  const tableTags: Record<string, number> = {}
  const tagsClear = useMemo(() => {
    return tags?.filter(({ value }) => {
      const tag = value.toLowerCase()
      if (tag) {
        if (!tableTags[tag] && (tableTags[tag] = 1)) {
          return tag
        }
      }
    })
  }, [tags])

  const handleChangeTag = (value: ITag | null) => {
    const isTag = tagsClear?.find((t: any) => t.id === value?.id)

    isTag && setTag(isTag)
  }

  const handleChangeMaxValue = (value: ICopy | null) => {
    value && setMax(value)
  }

  let resCodeFilter = codeBase

  if (tag) {
    resCodeFilter = resCodeFilter?.filter((c: any) =>
      c.tags.some(
        (t: ITag) =>
          t.value?.toLocaleLowerCase() === tag.value.toLocaleLowerCase()
      )
    )
  }

  if (max) {
    if (max.id === 3 || max.id === 4) {
      resCodeFilter = resCodeFilter && dataSortByDate(resCodeFilter, max.max)
    } else {
      resCodeFilter = resCodeFilter && dataSortMaxValue(resCodeFilter, max.max)
    }
  }

  if (search.trim()) {
    resCodeFilter = resCodeFilter && filterSearch(resCodeFilter, search)
  }

  const clearFilter = () => {
    setMax(null)
    setTag(null)
    setSearch('')
  }

  useEffect(() => {
    // console.log("FilterParams")

    setFilterData(resCodeFilter)
  }, [tag, max, codeBase, search])

  return (
    <div className="filter_params">
      <Search value={search} onChange={setSearch} />
      <div className="params">
        {!!tags?.length && (
          <SelectList
            value={tag}
            onChange={handleChangeTag}
            label={'Tag'}
            list={tagsClear}
          />
        )}

        <Button
          sx={[
            { fontSize: 10, bgcolor: 'action.selected', color: 'text.primary' },
            !!tags?.length && { mr: 1, ml: 1 },
          ]}
          onClick={clearFilter}
          variant="contained"
          size="large"
        >
          сбросить фильтр
        </Button>
        <SelectList
          value={max}
          onChange={handleChangeMaxValue}
          label={'Сортировка'}
          list={copyList}
        />
      </div>
    </div>
  )
}

export default FilterParams
