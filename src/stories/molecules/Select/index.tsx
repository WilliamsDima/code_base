import { HTMLAttributes, memo, useState, FC, useRef, useCallback } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import Button from '@storybook/atoms/Button'
import PopupSelect from '../PopupSelect'
import { useOutside } from '@hooks/useOutside'
import { IItemSelect } from './types'

interface ISelect extends HTMLAttributes<HTMLElement> {
  value: string | number
  list: IItemSelect[]
  selectHandler?: (value: IItemSelect) => void
  search?: boolean
}

const Select: FC<ISelect> = (props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const { value, search, list, selectHandler, className, children, ...rest } =
    props
  const classnames = cn(styles.select, className, {
    [styles.open]: open,
  })

  useOutside(ref, () => {
    setOpen(false)
  })

  const selectItem = useCallback(
    (item: any) => {
      selectHandler && selectHandler(item)
      setOpen(false)
    },
    [selectHandler]
  )

  return (
    <div className={classnames} ref={ref}>
      <Button onClick={() => setOpen((prev) => !prev)} {...rest}>
        <div className={styles.selectContent}>
          <span className={styles.value}>{value}</span>
          <MdOutlineArrowDropDown className={styles.icon} />
        </div>
      </Button>
      <PopupSelect
        search={search}
        open={open}
        selectHandler={selectItem}
        list={list}
      />
    </div>
  )
}

export default memo(Select)
