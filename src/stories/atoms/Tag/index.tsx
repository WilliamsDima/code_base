import cn from 'classnames'
import React, { FC, memo, HTMLAttributes } from 'react'
import styles from './style.module.scss'
import { IoCloseCircle } from 'react-icons/io5'
import Button from '../Button'

interface ITag extends HTMLAttributes<HTMLDivElement> {
  deleteHandler?: () => void
}

const Tag: FC<ITag> = memo((props) => {
  const { deleteHandler, children, className, ...rest } = props
  const classNames = cn(styles.tag, className)
  return (
    <span className={classNames} {...rest}>
      {children}
      {deleteHandler && (
        <Button className={styles.deleteTag} onClick={deleteHandler}>
          <IoCloseCircle />
        </Button>
      )}
    </span>
  )
})

export default Tag
