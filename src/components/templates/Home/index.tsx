import { useAuth } from '@hooks/useAuth'
import styles from './styles.module.scss'
import Auth from '@molecules/Auth'
import CodeList from '@organisms/CodeList'
import { useEffect } from 'react'
import { getDataUser } from '@api/firebase'
import { useActions } from '@hooks/useActions'
import { useCallback } from 'react'

const HomeTemplate = () => {
  const { user } = useAuth()
  const { setCodeBase } = useActions()

  const getData = useCallback(async () => {
    if (user) {
      const data = await getDataUser(user)
      data && setCodeBase(data.codes)
    }
  }, [setCodeBase, user])

  useEffect(() => {
    if (user) {
      getData()
    }
  }, [getData, user])

  return <div className={styles.content}>{user ? <CodeList /> : <Auth />}</div>
}

export default HomeTemplate
