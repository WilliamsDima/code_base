import { FC } from 'react'
import styles from './styles.module.scss'
import { IItemCode } from '@appTypes/types'
import TagsList from '@molecules/TagsList'

type code = {
  item: IItemCode
}

const CodeItem: FC<code> = ({ item }) => {
  return (
    <li className={styles.item}>
      <h2 className={styles.title}>{item.title}</h2>
      <TagsList tags={item.tags} />
      item
    </li>
  )
}

export default CodeItem
