import { FC, memo } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import Avatar from '@storybook/atoms/Avatar'
import { useAuth } from '@hooks/useAuth'
import PopupUser from '@molecules/PopupUser'
import { useOutside } from '@hooks/useOutside'

const User: FC = memo(() => {
  const { user } = useAuth()
  const { isShow, ref, setIsShow } = useOutside(false)

  return (
    <div className={styles.auth}>
      {user && (
        <>
          <Button
            className={styles.user}
            shadowClick={false}
            onClick={() => setIsShow(true)}
          >
            <p className={styles.userName}>{user.displayName}</p>
            <Avatar
              className={styles.avatar}
              name={user.displayName}
              src={user.photoURL}
            />
          </Button>
          <div ref={ref}>
            <PopupUser show={isShow} setIsShow={setIsShow} />
          </div>
        </>
      )}
    </div>
  )
})

export default User
