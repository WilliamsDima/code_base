import styles from './styles.module.scss'
import CodeList from '@organisms/CodeList'
import { CodeListProvider } from '@context/codeListContext'

const HomeTemplate = () => {
  return (
    <div className={styles.content}>
      <CodeListProvider>
        <CodeList />
      </CodeListProvider>
    </div>
  )
}

export default HomeTemplate
