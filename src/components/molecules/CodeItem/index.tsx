import { FC, useMemo, useEffect, useState, useCallback, memo } from 'react'
import styles from './styles.module.scss'
import { IItemCode } from '@appTypes/types'
import TagsList from '@molecules/TagsList'
import Code from '@molecules/Code'
import { getDateDisplay } from '@hooks/helpers'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'
import { useAuth } from '@hooks/useAuth'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { storage } from '@api/firebase'
import CaruselImg from '@molecules/CaruselImg'

type images = {
  images: any[]
  index: number
}

type code = {
  item: IItemCode
  setImagesSlider: (value: images) => void
}

const CodeItem: FC<code> = memo(({ item, setImagesSlider }) => {
  const dateText = useMemo(() => {
    return getDateDisplay(item.id)
  }, [item.id])

  const { user } = useAuth()

  const [images, setImages] = useState<null | any[]>(null)
  const pathToFile = user?.providerData[0].uid

  const handleImage = useCallback(
    (images: any[], index: number) => {
      setImagesSlider({ images, index })
    },
    [setImagesSlider]
  )

  const getImages = useCallback(async () => {
    const imageListRef = ref(storage, `images-${pathToFile}/${item.id}/`)
    const { items } = await listAll(imageListRef)

    const data = items.map(async (item: any) => {
      return {
        path: item?._location?.path_,
        url: await getDownloadURL(item),
      }
    })

    if (data.length) {
      Promise.all(data).then((values) => {
        setImages(values)
      })
    }
  }, [item.id, pathToFile])
  useEffect(() => {
    // console.log('card item', images)

    if (!images) {
      getImages()
    }
  }, [getImages, images])
  return (
    <li className={styles.item}>
      <div className={styles.topCard}>
        <h2 className={styles.title}>{item.title}</h2>
        <Button shadowClick={false} className={cn(styles.btn, styles.btnEdite)}>
          Редактировать
        </Button>
      </div>

      <TagsList tags={item.tags} />
      <p className={styles.description}>{item.description}</p>
      {item.code && (
        <Code
          code={item.code}
          copy={item.copy}
          language={item.language}
          id={item.id}
        />
      )}
      {!!images?.length && (
        <CaruselImg images={images} imgHandler={handleImage} />
      )}
      <div className={styles.bottomCard}>
        <span className={styles.date}>{dateText}</span>
        <Button
          shadowClick={false}
          className={cn(styles.btn, styles.btnDelete)}
        >
          Удалить
        </Button>
      </div>
    </li>
  )
})

export default CodeItem
