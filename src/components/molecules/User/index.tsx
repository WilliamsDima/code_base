import { FC, memo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import Avatar from '@storybook/atoms/Avatar'
import { useAuth } from '@hooks/useAuth'
import PopupUser from '@molecules/PopupUser'
import { useOutside } from '@hooks/useOutside'

const User: FC = memo(() => {
  const { user } = useAuth()
  const ref = useRef(null)
  const [isModalOpen, setModalOpen] = useState(false)
  useOutside(ref, () => setModalOpen(false))

  return (
    <div className={styles.auth}>
      {user && (
        <>
          <Button
            className={styles.user}
            shadowClick={false}
            onClick={() => setModalOpen(true)}
          >
            <p className={styles.userName}>{user.displayName}</p>
            <Avatar
              className={styles.avatar}
              alt={user.displayName}
              src={user.photoURL}
            />
          </Button>
          <div ref={ref}>
            <PopupUser show={isModalOpen} setIsShow={setModalOpen} />
          </div>
        </>
      )}
    </div>
  )
})

export default User
