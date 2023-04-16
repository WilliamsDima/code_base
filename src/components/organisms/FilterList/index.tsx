import { FC, useCallback } from 'react'
import Input from '@storybook/atoms/Input'
import { BiSearchAlt } from 'react-icons/bi'
import { GrPowerReset } from 'react-icons/gr'
import Button from '@storybook/atoms/Button'
import Select from '@storybook/molecules/Select'
import styles from './styles.module.scss'
import { codeLanguges } from '@services/listLanguages'
import { IItemSelect } from '@storybook/molecules/Select/types'
import { useCodeListContext } from '@context/codeListContext'
import { filterUnionList } from '@hooks/helpers'
import ButtonClearInput from '@storybook/atoms/ButtonClearInput'

type Props = {}

const FilterList: FC<Props> = () => {
  const {
    searchValue,
    searchHandler,
    clearFilter,
    tagsSelect,
    setTagsSelect,
    clearSearch,
    languages,
    tagsListClear,
    setLanguages,
  } = useCodeListContext()

  const setTagsHandler = useCallback(
    (tag: IItemSelect) => {
      const tags = filterUnionList(tagsListClear, tagsSelect, tag)
      setTagsSelect((prev) => [
        ...prev.filter((it) => it.id !== tag.id),
        ...tags,
      ])
    },
    [tagsSelect, setTagsSelect, tagsListClear]
  )

  const setLangHandler = useCallback(
    (lang: IItemSelect) => {
      const langs = filterUnionList(codeLanguges, languages, lang)
      setLanguages((prev) => [
        ...prev.filter((it) => it.id !== lang.id),
        ...langs,
      ])
    },
    [languages, setLanguages, codeLanguges]
  )

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
        {!!searchValue.length && <ButtonClearInput clear={clearSearch} />}
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
          list={codeLanguges}
          search={true}
          classList={styles.languagesList}
          placeholder="синтаксис"
          multiselect
          multiselectChecked={languages}
          selectHandler={setLangHandler}
        />
      </div>
    </div>
  )
}

export default FilterList
