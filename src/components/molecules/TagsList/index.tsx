import { FC, memo } from 'react'
import styles from './styles.module.scss'
import { ITag } from '@appTypes/types'
import Tag from '@storybook/atoms/Tag'

type tag = {
  tags: ITag[]
}

const TagsList: FC<tag> = memo(({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag className={styles.item} key={tag.id}>
          {tag.value}
        </Tag>
      ))}
    </div>
  )
})

export default TagsList
