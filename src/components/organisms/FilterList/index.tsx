import {
  FC,
  useMemo,
  useState,
  ChangeEvent,
  useTransition,
  useCallback,
} from 'react'
import Input from '@storybook/atoms/Input'
import { BiSearchAlt } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import Button from '@storybook/atoms/Button'
import { IItemCode, ITag } from '@appTypes/types'
import Select from '@storybook/molecules/Select'
import styles from './styles.module.scss'
import { codeLanguges } from '@services/listLanguages'
import { IItemSelect } from '@storybook/molecules/Select/types'
import { useCodeListContext } from '@context/codeListContext'

type Props = {}

const FilterList: FC<Props> = () => {
  const {
    searchValue,
    searchHandler,
    clearFilter,
    tagsSelect,
    setTagsSelect,
    language,
    tagsListClear,
    setLanguage,
  } = useCodeListContext()

  const setTagsHandler = useCallback(
    (tag: IItemSelect) => {
      const tags =
        tagsListClear?.filter((it) => {
          const isTag = tagsSelect.some((tg) => tg.id === tag.id)
          if (it.id === tag.id && !isTag) {
            return it
          }
        }) || []
      setTagsSelect((prev) => [
        ...prev.filter((it) => it.id !== tag.id),
        ...tags,
      ])
    },
    [tagsSelect, setTagsSelect, tagsListClear]
  )

  const setLangHandler = (lang: IItemSelect) => {
    setLanguage(lang?.value as string)
  }

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <BiSearchAlt className={styles.searchIcon} />
        <Input
          onChange={searchHandler}
          value={searchValue}
          className={styles.searchFild}
          alt="search"
          placeholder="поиск"
        />
      </div>
      <div className={styles.selects}>
        {tagsListClear && (
          <Select
            className={styles.tagsSelect}
            list={tagsListClear}
            search={true}
            classList={styles.list}
            multiselect
            multiselectChecked={tagsSelect}
            placeholder="ключевые слова"
            selectHandler={setTagsHandler}
          />
        )}

        <Button onClick={clearFilter} className={styles.reset}>
          <GrPowerReset className={styles.iconReset} />
          <span className={styles.btnTextReset}>сбросить фильтр</span>
        </Button>

        <Select
          className={styles.languagesSelect}
          value={language}
          list={codeLanguges}
          search={true}
          classList={styles.languagesList}
          placeholder="синтаксис"
          selectHandler={setLangHandler}
        />
      </div>
    </div>
  )
}

export default FilterList
