import { FC, memo } from 'react'
import styles from './styles.module.scss'
import { IoMdClose } from 'react-icons/io'
import Button from '@storybook/atoms/Button'

type img = {
  item: any
  deleteImg: (id: number) => void
}

const ImgDrop: FC<img> = memo(({ item, deleteImg }) => {
  const urlImg = item && URL.createObjectURL(item)

  return (
    <div
      key={item.lastModified}
      style={{ backgroundImage: `url(${urlImg})` }}
      className={styles.img}
    >
      <Button
        className={styles.delete}
        onClick={() => deleteImg(item.lastModified)}
      >
        <IoMdClose />
      </Button>
    </div>
  )
})

export default ImgDrop
