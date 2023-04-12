import { FC, useMemo, useState } from 'react'
import Input from '@storybook/atoms/Input'
import { useInput } from '@hooks/useInput'
import { BiSearchAlt } from 'react-icons/bi'
import Button from '@storybook/atoms/Button'
import { IItemCode, ITag } from '@appTypes/types'
import Select from '@storybook/molecules/Select'
import styles from './styles.module.scss'

type Props = {
  codes: IItemCode[] | undefined
}

const FilterList: FC<Props> = ({ codes }) => {
  const { bind, value } = useInput('')
  const [tag, setTag] = useState('')

  const tags: ITag[] | undefined = codes
    ?.map((c: any) => {
      return c?.tags
    })
    .flat()

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

  const setTagHandler = (tag: any) => {
    console.log(tag)
  }

  return (
    <div className={styles.filter}>
      <div className={styles.search}>
        <BiSearchAlt className={styles.searchIcon} />
        <Input
          {...bind}
          className={styles.searchFild}
          alt="search"
          placeholder="поиск"
        />
      </div>
      <div className={styles.selects}>
        {tagsListClear && (
          <Select
            className={styles.tagsSelect}
            value={tag}
            list={tagsListClear}
            search={true}
            selectHandler={setTagHandler}
          />
        )}

        <Button className={styles.reset}>сбросить фильтр</Button>
      </div>
    </div>
  )
}

export default FilterList
