import cn from 'classnames'
import React, { FC, memo, HTMLAttributes } from 'react'
import styles from './style.module.scss'

interface ITag extends HTMLAttributes<HTMLDivElement> {}

const Tag: FC<ITag> = memo((props) => {
  const { children, className, ...rest } = props
  const classNames = cn(styles.tag, className)
  return (
    <span className={classNames} {...rest}>
      {children}
    </span>
  )
})

export default Tag
