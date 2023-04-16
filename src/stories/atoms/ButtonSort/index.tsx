import cn from 'classnames'
import React, { FC, memo, ButtonHTMLAttributes } from 'react'
import styles from './style.module.scss'
import Button from '../Button'
import { MdKeyboardArrowDown } from 'react-icons/md'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  active: boolean
}

const ButtonSort: FC<IButton> = memo((props) => {
  const { children, className, active, ...rest } = props
  const classNames = cn(styles.sortBtn, className, {
    [styles.active]: !active,
  })
  return (
    <Button {...rest} className={classNames} shadowClick={false}>
      {children}
      <MdKeyboardArrowDown className={styles.icon} />
    </Button>
  )
})

export default ButtonSort
