import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import ImgDrop from '@atoms/ImgDrop'

type IImagesList = {
  file: any[]
  maxFiles: number
  deleteImg: (id: number | string) => void
}

const ImagesList: FC<IImagesList> = memo(({ file, maxFiles, deleteImg }) => {
  return (
    <div
      className={cn(styles.images, {
        [styles.error]: file.length > maxFiles,
      })}
    >
      {!!file.length &&
        file.map((item: any) => {
          const key = item.url ? item.url : URL.createObjectURL(item)
          return <ImgDrop key={key} item={item} deleteImg={deleteImg} />
        })}

      {!!file.length && (
        <p className={styles.counterImg}>
          {file.length}/{maxFiles}
        </p>
      )}
    </div>
  )
})

export default ImagesList
