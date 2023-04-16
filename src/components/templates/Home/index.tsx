import { useAuth } from '@hooks/useAuth'
import styles from './styles.module.scss'
import Auth from '@molecules/Auth'
import CodeList from '@organisms/CodeList'
import { CodeListProvider } from '@context/codeListContext'

const HomeTemplate = () => {
  const { user } = useAuth()

  return (
    <div className={styles.content}>
      {user ? (
        <CodeListProvider>
          <CodeList />
        </CodeListProvider>
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default HomeTemplate
