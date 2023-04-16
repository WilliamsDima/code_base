import { memo, FC } from 'react'
import styles from './styles.module.scss'
import { IItemSelect } from '@storybook/molecules/Select/types'
import Checkbox from '../Checkbox'

interface ISelect {
  onSelect: (value: IItemSelect) => void
  item: IItemSelect
  multiselect?: boolean
  checked: boolean
}

const SelectItem: FC<ISelect> = (props) => {
  const { onSelect, multiselect, checked, item } = props
  return (
    <li className={styles.item} onClick={() => onSelect(item)}>
      <label>{item.text || item.value}</label>
      {multiselect && <Checkbox value={checked} />}
    </li>
  )
}

export default memo(SelectItem)
