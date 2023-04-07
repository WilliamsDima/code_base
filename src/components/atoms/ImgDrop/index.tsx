import { FC, memo } from 'react'
import styles from './styles.module.scss'
import { IoMdClose } from 'react-icons/io'
import Button from '@storybook/atoms/Button'

type img = {
  item: any
  deleteImg: (id: number | string) => void
}

const ImgDrop: FC<img> = memo(({ item, deleteImg }) => {
  const urlImg = item.url ? item.url : URL.createObjectURL(item)
  const id = item.url ? item.url : item.lastModified

  return (
    <div style={{ backgroundImage: `url(${urlImg})` }} className={styles.img}>
      <Button className={styles.delete} onClick={() => deleteImg(id)}>
        <IoMdClose />
      </Button>
    </div>
  )
})

export default ImgDrop
