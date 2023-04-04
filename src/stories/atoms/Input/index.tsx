import cn from 'classnames'
import React, { FC, memo, InputHTMLAttributes } from 'react'
import styles from './style.module.scss'

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input: FC<IInput> = memo((props) => {
  const { className, maxLength, value, error = false, ...rest } = props
  const classNames = cn(styles.inputWrapper, className, {
    [styles.error]: error,
  })
  return (
    <label className={classNames}>
      {!!maxLength && (
        <span className={styles.inputCounter}>
          {value?.toString().length}/{maxLength}
        </span>
      )}
      <input {...rest} value={value} maxLength={maxLength} />
      <span className={styles.focusLine} />
    </label>
  )
})

export default Input
