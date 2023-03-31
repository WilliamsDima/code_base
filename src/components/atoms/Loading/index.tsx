import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { Loading } from '@storybook/atoms/Loading'

type loading = {
  active: boolean
}

const LoadingModal: FC<loading> = memo(({ active }) => {
  return (
    <div
      className={cn(styles.loader, {
        [styles.active]: active,
      })}
    >
      <Loading active={active} />
    </div>
  )
})

export default LoadingModal
