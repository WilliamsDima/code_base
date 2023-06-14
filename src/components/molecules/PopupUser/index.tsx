import { FC, memo } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'
import { useAuth } from '@hooks/useAuth'
import { getDateDisplay } from '@hooks/helpers'
import Avatar from '@storybook/atoms/Avatar'
import { BiLogOutCircle } from 'react-icons/bi'

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
      <div className={styles.user}>
        <Avatar
          className={styles.avatar}
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <p className={styles.userName}>{user?.displayName}</p>
      </div>

      <Button className={styles.logout} onClick={logoutHandler}>
        <BiLogOutCircle className={styles.logoutIcon} />
        выйти
      </Button>
      {user && (
        <p className={styles.lastIn}>
          Последний вход был:{' '}
          {getDateDisplay(user?.metadata?.lastSignInTime as string)}
        </p>
      )}
    </div>
  )
}

export default memo(PopupUser)
