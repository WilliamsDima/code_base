import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import Header from '@organisms/Header'
import { useAuth } from '@hooks/useAuth'

type layout = {
  children: ReactNode
}

const Layout: FC<layout> = ({ children }) => {
  const { isLoading } = useAuth()
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>{children}</main>
      {isLoading && <p>loading...</p>}
    </div>
  )
}

export default Layout
