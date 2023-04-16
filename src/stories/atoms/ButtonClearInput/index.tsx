import cn from 'classnames'
import React, { FC, memo, ButtonHTMLAttributes } from 'react'
import styles from './style.module.scss'
import Button from '../Button'
import { GrClose } from 'react-icons/gr'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  clear: () => void
}

const ButtonClearInput: FC<IButton> = memo((props) => {
  const { children, clear, className, ...rest } = props
  const classNames = cn(styles.clear, className)
  return (
    <Button {...rest} className={classNames} onClick={clear}>
      <GrClose />
    </Button>
  )
})

export default ButtonClearInput
