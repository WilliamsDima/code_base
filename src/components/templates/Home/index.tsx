import { useAuth } from '@hooks/useAuth'
import styles from './styles.module.scss'
import Auth from '@molecules/Auth'
import CodeList from '@organisms/CodeList'

const HomeTemplate = () => {
  const { user } = useAuth()

  return <div className={styles.content}>{user ? <CodeList /> : <Auth />}</div>
}

export default HomeTemplate
