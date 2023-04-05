import cn from 'classnames'
import React, {
  FC,
  memo,
  InputHTMLAttributes,
  useRef,
  RefObject,
  useEffect,
} from 'react'
import styles from './style.module.scss'
import autosize from 'autosize'

interface IInput
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  error?: boolean
  inputType?: 'textarea' | 'input'
  isCode?: boolean
}

const Input: FC<IInput> = memo((props) => {
  const {
    className,
    inputType,
    maxLength,
    value,
    isCode,
    error = false,
    ...rest
  } = props
  const classNames = cn(styles.inputWrapper, className, {
    [styles.error]: error,
  })

  const ref = useRef(null) as RefObject<HTMLTextAreaElement>

  useEffect(() => {
    ref.current && autosize(ref.current)
  }, [])

  return (
    <label className={classNames}>
      {!!maxLength && (
        <span className={styles.inputCounter}>
          {value?.toString().length}/{maxLength}
        </span>
      )}
      {inputType === 'textarea' ? (
        <textarea
          ref={ref}
          {...rest}
          value={value}
          maxLength={maxLength}
          className={isCode ? styles.code : ''}
        />
      ) : (
        <input {...rest} value={value} maxLength={maxLength} />
      )}

      <span className={styles.focusLine} />
    </label>
  )
})

export default Input
