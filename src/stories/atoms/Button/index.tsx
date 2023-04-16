import cn from 'classnames'
import React, { FC, memo, ButtonHTMLAttributes } from 'react'
import styles from './style.module.scss'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  pulseAnim?: boolean
  shadowClick?: boolean
}

const Button: FC<IButton> = memo((props) => {
  const { children, pulseAnim, shadowClick = true, className, ...rest } = props
  const classNames = cn(styles.btn, className, {
    [styles.pulse]: pulseAnim,
    [styles.shadowClick]: shadowClick,
  })
  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  )
})

export default Button
