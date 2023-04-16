import React, { FC, memo, HTMLAttributes } from 'react'
import styles from './style.module.scss'
import cn from 'classnames'

interface IAvatar extends HTMLAttributes<HTMLDivElement> {
  src: string | undefined | null
  name: string | undefined | null
}

const Avatar: FC<IAvatar> = memo((props) => {
  const { src = '', name = '', className, ...rest } = props

  const classNames = cn(styles.avatar, className)
  return (
    <div className={classNames} {...rest}>
      {src ? <img src={src} alt={name || 'img'} /> : <p>{name?.[0]}</p>}
    </div>
  )
})

export default Avatar
