import { FC } from 'react'
import styles from './styles.module.scss'
import ThemeController from '@molecules/ThemeController'
import User from '@molecules/User'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Link to={'/'}>
        <h1 className={styles.logo}>code base</h1>
      </Link>

      <div className={styles.headerRigth}>
        <ThemeController />
        <User />
      </div>
    </header>
  )
}

export default Header
