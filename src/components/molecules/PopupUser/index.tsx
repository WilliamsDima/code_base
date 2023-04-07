import { FC, memo } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'
import { useAuth } from '@hooks/useAuth'
import { getDateDisplay } from '@hooks/helpers'

type popup = {
  show: boolean
  setIsShow: (value: boolean) => void
}

const PopupUser: FC<popup> = ({ show, setIsShow }) => {
  const { logout, user } = useAuth()

  const logoutHandler = () => {
    logout()
    setIsShow(false)
  }

  return (
    <div
      className={cn(styles.popupUser, {
        [styles.show]: show,
      })}
    >
      <p>{user?.displayName}</p>
      <Button onClick={logoutHandler}>выйти</Button>
      {user && (
        <p>
          Последний вход был:{' '}
          {getDateDisplay(user?.metadata?.lastSignInTime as string)}
        </p>
      )}
    </div>
  )
}

export default memo(PopupUser)
