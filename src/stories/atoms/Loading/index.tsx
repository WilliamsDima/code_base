import { FC, memo, HTMLAttributes } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

interface ILoader extends HTMLAttributes<HTMLDivElement> {
  active: boolean
}

export const Loading: FC<ILoader> = memo((props) => {
  const { active, className, ...prev } = props
  return (
    <div
      className={cn(styles.loader, {
        [styles.active]: active,
      })}
      {...prev}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
})
