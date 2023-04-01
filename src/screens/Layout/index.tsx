import { FC, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Header from '@organisms/Header'
import { useAuth } from '@hooks/useAuth'
import Loading from '@atoms/Loading'

type layout = {
  children: ReactNode
}

const Layout: FC<layout> = ({ children }) => {
  const { isLoading } = useAuth()

  const scrollToHandler = () => {
    document.body.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  const [scroll, setScroll] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScroll(true)
    }

    if (window.scrollY < 200) {
      setScroll(false)
    }
  }

  useEffect(() => {
    document.body.addEventListener('scroll', handleScroll)
    return () => document.body.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className={styles.app}>
      <Header />
      <Loading active={isLoading} />

      <main className={styles.main}>{children}</main>
      <button onClick={scrollToHandler}>top</button>
    </div>
  )
}

export default Layout
