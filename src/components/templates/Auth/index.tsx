import styles from './styles.module.scss'
import Auth from '@molecules/Auth'

const AuthTemplate = () => {
  return (
    <div className={styles.content}>
      <Auth />
    </div>
  )
}

export default AuthTemplate
