import {
  HTMLAttributes,
  memo,
  useState,
  FC,
  useRef,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { MdOutlineArrowDropDown } from 'react-icons/md'
import Button from '@storybook/atoms/Button'
import PopupSelect from '../PopupSelect'
import { useOutside } from '@hooks/useOutside'
import { IItemSelect } from './types'

interface ISelect extends HTMLAttributes<HTMLElement> {
  value?: string | number
  list: IItemSelect[]
  multiselect?: boolean
  multiselectChecked?: IItemSelect[]
  selectHandler?: (value: IItemSelect) => void
  search?: boolean
  classList?: string
  placeholder?: string
}

const Select: FC<ISelect> = (props) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const {
    value,
    search,
    classList,
    list,
    selectHandler,
    multiselectChecked = [],
    multiselect,
    className,
    placeholder,
    children,
    ...rest
  } = props
  const classnames = cn(styles.select, className, {
    [styles.open]: open,
  })

  useOutside(ref, () => {
    setOpen(false)
  })

  const selectItem = useCallback(
    (item: any) => {
      selectHandler && selectHandler(item)
      !multiselect && setOpen(false)
    },
    [selectHandler]
  )

  const selectText = useMemo(() => {
    return multiselectChecked
      ? multiselectChecked.map((it) => it.value).join(', ') || placeholder
      : value || placeholder
  }, [multiselectChecked, value])

  return (
    <div className={classnames} ref={ref}>
      <Button
        className={styles.btn}
        onClick={() => setOpen((prev) => !prev)}
        {...rest}
      >
        <div className={styles.selectContent}>
          <span className={styles.value}>
            {selectText?.toString()?.length &&
            selectText?.toString()?.length > 20
              ? selectText?.toString().slice(0, 20) + '...'
              : selectText}
          </span>
          <MdOutlineArrowDropDown className={styles.icon} />
        </div>
      </Button>
      <PopupSelect
        search={search}
        open={open}
        multiselect={multiselect}
        multiselectChecked={multiselectChecked}
        className={classList}
        selectHandler={selectItem}
        list={list}
      />
    </div>
  )
}

export default memo(Select)
