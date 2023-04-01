import cn from 'classnames'
import React, { FC, memo, HTMLAttributes } from 'react'
import styles from './style.module.scss'

interface IEmpty extends HTMLAttributes<HTMLDivElement> {}

const Empty: FC<IEmpty> = memo((props) => {
  const { className, ...rest } = props
  const classNames = cn(styles.empty, className)
  return <div className={classNames} {...rest} />
})

export default Empty
