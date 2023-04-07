import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import { Loading } from '@storybook/atoms/Loading'

type loading = {
  active: boolean
  className?: string
}

const LoadingModal: FC<loading> = memo(
  ({ active, className = '', ...rest }) => {
    const classnames = cn(styles.loader, className, {
      [styles.active]: active,
    })
    return (
      <div className={classnames}>
        <Loading active={active} {...rest} />
      </div>
    )
  }
)

export default LoadingModal
