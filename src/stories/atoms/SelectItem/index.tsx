import { memo, FC } from 'react'
import styles from './styles.module.scss'
import { IItemSelect } from '@storybook/molecules/Select/types'

interface ISelect {
  onSelect: (value: IItemSelect) => void
  item: IItemSelect
}

const SelectItem: FC<ISelect> = (props) => {
  const { onSelect, item } = props
  return (
    <li className={styles.item} onClick={() => onSelect(item)}>
      <label>{item.text}</label>
    </li>
  )
}

export default memo(SelectItem)
