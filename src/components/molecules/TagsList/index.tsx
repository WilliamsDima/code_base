import { FC, memo } from 'react'
import styles from './styles.module.scss'
import { ITag } from '@appTypes/types'
import Tag from '@storybook/atoms/Tag'
import cn from 'classnames'

type tag = {
  tags: ITag[]
  deleteHandler?: (id: number) => void
  maxTagLength?: number
  hiddenBtnDelete?: boolean
}

const TagsList: FC<tag> = memo(
  ({ tags, deleteHandler, maxTagLength, hiddenBtnDelete }) => {
    return (
      <div
        className={cn(styles.tags, {
          [styles.maxError]: maxTagLength ? maxTagLength < tags.length : false,
        })}
      >
        {tags.map((tag) => (
          <Tag
            className={styles.item}
            key={tag.id.toString()}
            hiddenBtnDelete={hiddenBtnDelete}
            deleteHandler={() => deleteHandler && deleteHandler(tag.id)}
          >
            {tag.value}
          </Tag>
        ))}
        {!!maxTagLength && (
          <div className={styles.tegsCounter}>
            <span>{tags.length}</span>/<span>{maxTagLength}</span>
          </div>
        )}
      </div>
    )
  }
)

export default TagsList
