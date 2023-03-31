import { FC, memo } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'
import { useAuth } from '@hooks/useAuth'

type popup = {
  show: boolean
}

const PopupUser: FC<popup> = ({ show }) => {
  const { logout } = useAuth()
  return (
    <div
      className={cn(styles.popupUser, {
        [styles.show]: show,
      })}
    >
      <Button onClick={logout}>выйти</Button>
    </div>
  )
}

export default memo(PopupUser)
