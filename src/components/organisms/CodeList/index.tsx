import { FC } from 'react'
import styles from './styles.module.scss'
import { useAppSelector } from '@hooks/hooks'
import Empty from '@storybook/atoms/Empty'
import CodeItem from '@molecules/CodeItem'

const CodeList: FC = () => {
  const { codeBase } = useAppSelector((store) => store.main)
  return (
    <div className={styles.contentList}>
      {!!codeBase.length ? (
        <ul className={styles.list}>
          {codeBase.map((item) => {
            return <CodeItem key={item.id} item={item} />
          })}
        </ul>
      ) : (
        <div className={styles.empty}>
          <Empty />
          <p>кодавая база пуста</p>
        </div>
      )}
    </div>
  )
}

export default CodeList
