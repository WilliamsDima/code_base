import { FC } from 'react'
import styles from './styles.module.scss'
import ThemeController from '@molecules/ThemeController'
import User from '@molecules/User'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>code base</h1>
      <div className={styles.headerRigth}>
        <ThemeController />
        <User />
      </div>
    </header>
  )
}

export default Header
