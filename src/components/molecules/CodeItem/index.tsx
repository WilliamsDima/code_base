import {
  FC,
  useMemo,
  useEffect,
  useState,
  useCallback,
  StyleHTMLAttributes,
  forwardRef,
  memo,
} from 'react'
import styles from './styles.module.scss'
import { IItemCode, Message } from '@appTypes/types'
import TagsList from '@molecules/TagsList'
import Code from '@molecules/Code'
import { getDateDisplay } from '@hooks/helpers'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'
import { auth, getImagesItem } from '@api/firebase'
import CaruselImg from '@molecules/CaruselImg'
import { useAppContext } from '@context/appContext'
import { useRTKQuery } from '@hooks/useRTKQuery'

type images = {
  images: any[]
  index: number
}

type code = {
  item: IItemCode
  setImagesSlider: (value: images) => void
  clearCashHandler: () => void
  setItem: (item: IItemCode) => void
  updateHandler: (item: IItemCode) => void
  style: StyleHTMLAttributes<HTMLDivElement>
  ref?: any
}

const CodeItem: FC<code> = forwardRef(
  (
    { item, setImagesSlider, setItem, updateHandler, clearCashHandler, style },
    ref: any
  ) => {
    const { deleteItem } = useRTKQuery()
    const { setMessageWarning } = useAppContext()

    const dateText = useMemo(() => {
      return getDateDisplay(item.id)
    }, [item.id])

    const [images, setImages] = useState<null | any[]>(null)

    const copyHandler = () => {
      const data = {
        ...item,
        copy: item.copy + 1,
      }
      updateHandler(data)
    }

    const handleImage = useCallback(
      (images: any[], index: number) => {
        setImagesSlider({ images, index })
      },
      [setImagesSlider]
    )

    const deleteHandler = () => {
      const message: Message = {
        body: `Вы уверены что хотите удалить ${item.title}?`,
        handlerDone: () => deleteItem({ item, images }),
      }
      setMessageWarning(message)
    }

    const getImages = async () => {
      const data = await getImagesItem(item.id)
      if (data) {
        setImages(data)
        clearCashHandler()
      }
    }

    useEffect(() => {
      // console.log('card item', style)

      getImages()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <div style={style} className={styles.itemWrapper}>
        <div className={styles.item} ref={ref}>
          <div className={styles.topCard}>
            <h2 className={styles.title}>{item.title}</h2>
            {item.accessibility?.userIdCreator ===
              auth?.currentUser?.providerData[0].uid && (
              <Button
                onClick={() => setItem(item)}
                shadowClick={false}
                className={cn(styles.btn, styles.btnEdite)}
              >
                Редактировать
              </Button>
            )}
          </div>

          <TagsList tags={item.tags} hiddenBtnDelete={true} />
          <p className={styles.description}>{item.description}</p>
          {item.code && (
            <Code
              code={item.code}
              copy={item.copy}
              language={item.language}
              id={item.id}
              copyHandler={copyHandler}
            />
          )}
          {!!images?.length && (
            <CaruselImg images={images} imgHandler={handleImage} />
          )}
          <div className={styles.bottomCard}>
            <span className={styles.date}>{dateText}</span>

            {item.accessibility?.userIdCreator ===
              auth?.currentUser?.providerData[0].uid && (
              <Button
                shadowClick={false}
                className={cn(styles.btn, styles.btnDelete)}
                onClick={deleteHandler}
              >
                Удалить
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default memo(CodeItem)
