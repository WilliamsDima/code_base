import Layout from '@screens/Layout'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const NotFount = () => {
  return (
    <Layout>
      <div className={styles.emptyPage}>
        <div className={styles.empty}>
          <h1>404 page :(</h1>
          <h1>Страница не найдена</h1>
          <Link to={'/'}>на главную</Link>
        </div>
        <img
          className={styles.jhon}
          src={require('../../assets/images/what.gif')}
          alt="404"
        />
      </div>
    </Layout>
  )
}

export default NotFount
