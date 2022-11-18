import React, { useEffect } from "react"
import './styles.scss'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import Search from "../../atoms/Search"
import SelectList from "../Selects"
import { ITag } from "../../../services/types"
import { dataSortMaxValue, filterSearch } from "../../../hooks/helpers"
import { setFilterData } from "../../../store/redusers/main/main"
import Button from '@mui/material/Button'

interface ICopy extends ITag {
  max: boolean
}

const copeList = [
  {id: 1, value: 'Популярные', max: true},
  {id: 2, value: 'Непопулярныне', max: false},
]

const FilterParams = () => {

  const dispatch = useAppDispatch()
  const { codeBase } = useAppSelector(store => store.main)

  const [tag, setTag] = React.useState<ITag | null>(null)
  const [max, setMax] = React.useState<ICopy | null>(null)
  const [search, setSearch] = React.useState<string>('')

  const tags = codeBase?.map((c) => {
    return c.tags
  }).flat()

  const tableTags = {} as any
  const tagsClear = tags?.filter(({value}) =>(!tableTags[value]  && (tableTags[value] = 1)));

  const handleChangeTag = (value: ITag | null) => {
    const isTag = tags?.find((t) => t.id === value?.id)
    
    isTag && setTag(isTag)
  }

  const handleChangeMaxValue = (value: ICopy | null) => {
    value && setMax(value)
  }

  let resCodeFilter = codeBase

  if (tag) {
    resCodeFilter = resCodeFilter?.filter((c) => c.tags.some((t) => t.value === tag.value))
  }

  if (max) {
    resCodeFilter = resCodeFilter && dataSortMaxValue(resCodeFilter, max.max)
  }

  if (search.trim()) {
    resCodeFilter = resCodeFilter && filterSearch(resCodeFilter, search)
  }

  const submit = (e: any) => {
    // if (e?.keyCode === 13) {

    //   if (search.trim()) {
    //     console.log(search)
    //   }
    // } else {
    //   console.log(search)
    // }
  }

  const clearFilter = () => {
    setMax(null)
    setTag(null)
    setSearch('')
  }

  useEffect(() => {
    dispatch(setFilterData(resCodeFilter))
  }, [tag, max, codeBase, search])
  
  return (
    <div className="filter_params">
        <Search value={search} onChange={setSearch} submit={submit}/>
        <div className="params">
          {!!tags?.length && <SelectList value={tag} onChange={handleChangeTag} label={'Tag'} list={tagsClear}/>}  
          <Button 
          sx={{fontSize: 10, mr: 1, ml: 1}}
          onClick={clearFilter} 
          variant="contained" 
          size="large">сбросить фильтр</Button>
          <SelectList value={max} onChange={handleChangeMaxValue} label={'Количество копирований'} list={copeList}/>
        </div>

    </div>
  )
}

export default FilterParams
