import { useAuth } from '@hooks/useAuth'
import styles from './styles.module.scss'
import Auth from '@molecules/Auth'

const HomeTemplate = () => {
  const { user, isLoading } = useAuth()
  return (
    <div className={styles.content}>
      {user ? (
        <>
          <p>user</p>
        </>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default HomeTemplate
