import { FC, memo } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'
import { useAuth } from '@hooks/useAuth'

type popup = {
  show: boolean
  setIsShow: (value: boolean) => void
}

const PopupUser: FC<popup> = ({ show, setIsShow }) => {
  const { logout } = useAuth()

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
      <Button onClick={logoutHandler}>выйти</Button>
    </div>
  )
}

export default memo(PopupUser)
