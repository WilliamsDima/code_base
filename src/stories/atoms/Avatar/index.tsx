import React, { FC, memo, DOMAttributes } from 'react'
import styles from './style.module.scss'

interface IAvatar extends DOMAttributes<HTMLDivElement> {
  src: string | undefined | null
  name: string | undefined | null
}

const Avatar: FC<IAvatar> = memo((props) => {
  const { src = '', name = '', ...rest } = props
  return (
    <div className={styles.avatar} {...rest}>
      {src ? <img src={src} /> : <p>{name?.[0]}</p>}
    </div>
  )
})

export default Avatar
