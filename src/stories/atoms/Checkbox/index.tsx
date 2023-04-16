import cn from 'classnames'
import React, { FC, memo, HTMLAttributes } from 'react'
import { MdOutlineDone } from 'react-icons/md'
import styles from './style.module.scss'

interface ICheckbox extends HTMLAttributes<HTMLElement> {
  value: boolean
}

const Checkbox: FC<ICheckbox> = memo((props) => {
  const { children, value, className, ...rest } = props
  const classNames = cn(styles.checkbox, className, {
    [styles.checked]: value,
  })
  return (
    <div className={classNames}>
      <MdOutlineDone className={styles.done} />
    </div>
  )
})

export default Checkbox
