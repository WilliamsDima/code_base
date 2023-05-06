import { FC, memo, useCallback, useEffect, SetStateAction } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import ImgDrop from '@atoms/ImgDrop'
import { getImagesItem } from '@api/firebase'

type IImagesList = {
  file: any[]
  maxFiles: number
  setFile: React.Dispatch<SetStateAction<any[]>>
  setStorageImg: React.Dispatch<SetStateAction<any[]>>
  id: number | undefined
}

const ImagesList: FC<IImagesList> = memo(
  ({ file, id, maxFiles, setFile, setStorageImg }) => {
    const getImages = useCallback(async () => {
      if (id) {
        const images = await getImagesItem(id)
        images && setFile(images)
      }
    }, [id, setFile])

    const deleteImg = useCallback(
      (id: number | string) => {
        const imgFilter = file.filter(
          (t: any) =>
            (t.lastModified && t.lastModified !== id) || (t.url && t.url !== id)
        )
        if (typeof id === 'string') {
          const imgStorageFolter = file.filter(
            (t: any) => t.url && t.url === id
          )
          setStorageImg((prev) => [...prev, ...imgStorageFolter])
        }

        setFile(imgFilter)
      },
      [file, setFile, setStorageImg]
    )

    useEffect(() => {
      if (id) {
        getImages()
      }
    }, [getImages, id])
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
  }
)

export default ImagesList
