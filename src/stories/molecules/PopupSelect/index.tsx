import { memo, HTMLAttributes, FC, useMemo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import SelectItem from '@storybook/atoms/SelectItem'
import { IItemSelect } from '../Select/types'
import Input from '@storybook/atoms/Input'
import { useInput } from '@hooks/useInput'
import ButtonClearInput from '@storybook/atoms/ButtonClearInput'

interface IPopup extends HTMLAttributes<HTMLElement> {
  open: boolean
  selectHandler: (value: IItemSelect) => void
  list: IItemSelect[]
  multiselectChecked: IItemSelect[]
  search?: boolean
  multiselect?: boolean
}

const PopupSelect: FC<IPopup> = (props) => {
  const {
    open,
    search,
    className,
    multiselect,
    multiselectChecked,
    selectHandler,
    list,
  } = props
  const { bind, value, reset } = useInput('')
  const classnames = cn(styles.selectList, className, {
    [styles.open]: open,
    [styles.searchList]: search,
  })

  const listFilter = useMemo(() => {
    return list.filter(
      (it) =>
        it?.text?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
        it?.value
          ?.toString()
          .toLocaleLowerCase()
          .includes(value.toLocaleLowerCase())
    )
  }, [list, value])

  const onSelect = (value: IItemSelect) => {
    !multiselect && reset()
    selectHandler(value)
  }

  return (
    <div className={classnames}>
      {search && (
        <div className={styles.searchWrapper}>
          <Input {...bind} placeholder="поиск..." className={styles.search} />
          {!!value.length && (
            <ButtonClearInput className={styles.clear} clear={reset} />
          )}
        </div>
      )}
      {listFilter.length > 0 ? (
        <ul>
          {listFilter.map((item) => {
            return (
              <SelectItem
                key={item.id.toString()}
                onSelect={onSelect}
                item={item}
                multiselect={multiselect}
                checked={multiselectChecked.some((it) => it.id === item.id)}
              />
            )
          })}
        </ul>
      ) : (
        <p className={styles.emptyList}>ничего не найдено...</p>
      )}
    </div>
  )
}

export default memo(PopupSelect)
