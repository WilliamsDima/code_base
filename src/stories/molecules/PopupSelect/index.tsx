import { memo, HTMLAttributes, FC, useMemo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import SelectItem from '@storybook/atoms/SelectItem'
import { IItemSelect } from '../Select/types'
import Input from '@storybook/atoms/Input'
import { useInput } from '@hooks/useInput'

interface IPopup extends HTMLAttributes<HTMLElement> {
  open: boolean
  selectHandler: (value: IItemSelect) => void
  list: IItemSelect[]
  search?: boolean
}

const PopupSelect: FC<IPopup> = (props) => {
  const { open, search, selectHandler, list } = props
  const { bind, value } = useInput('')

  const listFilter = useMemo(() => {
    return list.filter((it) =>
      it.text.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    )
  }, [list, value])

  return (
    <div
      className={cn(styles.selectList, {
        [styles.open]: open,
      })}
    >
      {search && (
        <Input {...bind} placeholder="поиск..." className={styles.search} />
      )}
      <ul>
        {listFilter.map((item) => {
          return (
            <SelectItem
              key={item.id.toString()}
              onSelect={selectHandler}
              item={item}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default memo(PopupSelect)
