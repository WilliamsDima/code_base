import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'
import Header from '@organisms/Header'
import { useAuth } from '@hooks/useAuth'
import Loading from '@atoms/Loading'
import ButtonScrollUp from '@atoms/ButtonScrollUp'

type layout = {
  children: ReactNode
}

const Layout: FC<layout> = ({ children }) => {
  const { isLoading } = useAuth()

  return (
    <div className={styles.app}>
      <Header />
      <Loading active={isLoading} />

      <main className={styles.main}>{children}</main>
      <ButtonScrollUp />
    </div>
  )
}

export default Layout
