import cn from 'classnames'
import React, { FC, CSSProperties, memo, InputHTMLAttributes } from 'react'
import styles from './style.module.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  overStyle?: CSSProperties
  error?: {
    message: string
  } | null
  block?: boolean
}

const Input: FC<IInput> = memo((props) => {
  const { overStyle, error, block, ...rest } = props
  const classNames = cn(styles.inputWrapp, {
    [styles.block]: block,
  })
  return (
    <div className={classNames} data-error={error?.message} style={overStyle}>
      <input
        className={cn(styles.input, {
          [styles.error]: error,
        })}
        {...rest}
      />
    </div>
  )
})

export default Input
