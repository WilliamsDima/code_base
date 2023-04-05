import { FC, memo, HTMLAttributes } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

interface ILoader extends HTMLAttributes<HTMLDivElement> {
  active: boolean
}

export const Loading: FC<ILoader> = memo((props) => {
  const { active, className, ...prev } = props
  const classnames = cn(styles.loader, className, {
    [styles.active]: active,
  })
  return (
    <div className={classnames} {...prev}>
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
