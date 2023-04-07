import {
  useState,
  KeyboardEvent,
  useCallback,
  forwardRef,
  RefObject,
  useEffect,
} from 'react'
import styles from './styles.module.scss'
import { IItemCode, ITag, Message } from '@appTypes/types'
import Input from '@storybook/atoms/Input'
import { useInput } from '@hooks/useInput'
import TagsList from '@molecules/TagsList'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineDone } from 'react-icons/md'

import Button from '@storybook/atoms/Button'
import { useOutside } from '@hooks/useOutside'
import { useAppContext } from '@context/appContext'
import DropImg from '@molecules/DropImg'
import ImagesList from '@molecules/ImagesList'
import { updateItemCode } from '@hooks/helpers'
import { useRTKQuery } from '@hooks/useRTKQuery'
import { deleteImagesItem, getImagesItem } from '@api/firebase'

type modal = {
  item: IItemCode | null
  close: (handler?: () => void) => void
  codes: IItemCode[] | undefined
}

type Ref = any

const ModalCreate = forwardRef<Ref, modal>((props, ref) => {
  const { item, close, codes = [] } = props

  const { setMessageWarning, messageWarning } = useAppContext()
  const { addItemCode, updateItem } = useRTKQuery()

  const {
    bind: bindTitle,
    value: title,
    error: errorTitle,
    setError: setErrorTitle,
    reset: resetTitle,
  } = useInput(() => item?.title || '')
  const maxTitle = 80

  const {
    bind: bindTag,
    value: tag,
    error: errorTag,
    setError: setErrorTag,
    reset: clearTag,
  } = useInput('')
  const maxTag = 20
  const maxTagLength = 5
  const [tags, setTags] = useState<ITag[]>(() => item?.tags || [])

  const keyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (tag.trim()) {
        const tagItem = {
          id: +new Date(),
          value: tag,
        }
        setTags((prev) => [...prev, tagItem])
        clearTag()
      }
    }
  }

  const deleteTagHandler = useCallback(
    (id: number) => {
      const filterTag = tags.filter((t) => t.id !== id)
      setTags(filterTag)
    },
    [tags]
  )

  const {
    bind: bindDescription,
    value: description,
    error: errorDescription,
    setError: setErrorDescription,
    reset: resetDescription,
  } = useInput(() => item?.description || '')
  const maxDescription = 500

  const {
    bind: bindCode,
    value: code,
    error: errorCode,
    setError: setErrorCode,
    reset: resetCode,
  } = useInput(() => item?.code || '')
  const maxCode = 10000

  const [drag, setDrag] = useState(false)
  const maxFiles = 3
  const [file, setFile] = useState<any[]>([])
  const [storageImg, setStorageImg] = useState<any[]>([])

  const deleteImg = useCallback(
    (id: number | string) => {
      const imgFilter = file.filter(
        (t: any) =>
          (t.lastModified && t.lastModified !== id) || (t.url && t.url !== id)
      )
      if (typeof id === 'string') {
        const imgStorageFolter = file.filter((t: any) => t.url && t.url === id)
        console.log([...storageImg, ...imgStorageFolter])
        setStorageImg((prev) => [...prev, ...imgStorageFolter])
      }

      setFile(imgFilter)
    },
    [file, storageImg]
  )

  const dragHandler = useCallback((e: any, value: boolean) => {
    e.preventDefault()
    setDrag(value)
  }, [])

  const onDropHandler = useCallback(
    (e: any) => {
      const files = [...e?.target?.files]

      setFile((prev) => [...prev, ...files])
      setDrag(false)
    },
    [setFile, setDrag]
  )

  const clearHandler = useCallback(() => {
    resetTitle()
    clearTag()
    resetDescription()
    resetCode()
    setErrorCode(false)
    setErrorDescription(false)
    setErrorTag(false)
    setErrorTitle(false)
    setTags([])
    setFile([])
    setDrag(false)
  }, [
    setErrorTitle,
    setErrorTag,
    setErrorDescription,
    setErrorCode,
    resetCode,
    clearTag,
    resetDescription,
    resetTitle,
  ])

  const closeHandler = useCallback(() => {
    const message: Message = {
      body: 'Вы уверены что хотите закрыть? Все данные формы будут стёрты.',
      handlerDone: () => close(clearHandler),
    }

    !messageWarning && setMessageWarning(message)
  }, [messageWarning, setMessageWarning, close, clearHandler])

  useOutside(ref as RefObject<HTMLElement>, () => {
    closeHandler()
  })

  const submitHandler = () => {
    const done =
      title.length <= maxTitle &&
      title.length >= 0 &&
      tags.length <= maxTagLength &&
      tags.length >= 0 &&
      description.length <= maxDescription &&
      description.length >= 0

    if (done) {
      const data: IItemCode = {
        id: item ? item?.id : +new Date(),
        title,
        description,
        code,
        tags,
        copy: item ? item?.copy : 0,
      }

      if (item) {
        const newCodes = updateItemCode(codes, data)
        // console.log('update', newCodes)
        const filterFile = file.filter((f) => !f.url)
        if (storageImg.length) {
          deleteImagesItem(storageImg)
        }
        updateItem({ codes: newCodes, images: filterFile, idItem: item.id })
      } else {
        // console.log('add', data)
        addItemCode({ code: data, images: file })
      }

      clearHandler()
      close()
    } else {
      alert('не все поля заполнены!')
    }
  }

  const getImages = useCallback(async () => {
    if (item) {
      const images = await getImagesItem(item?.id)
      console.log(images)
      images && setFile(images)
    }
  }, [item])

  useEffect(() => {
    if (item) {
      getImages()
    }
  }, [getImages, item])

  return (
    <div className={styles.modalCreateContent}>
      <Button className={styles.btnClose} onClick={closeHandler}>
        <IoMdClose />
      </Button>
      <div className={styles.item}>
        <p className={styles.itemText}>* Краткое описание кода</p>
        <Input
          {...bindTitle}
          className={styles.input}
          maxLength={maxTitle}
          error={errorTitle}
          placeholder="Заголовок"
        />
      </div>
      <div className={styles.item}>
        <p className={styles.itemText}>
          * Ключевые слова по которым можно будет найти - Enter для добавления
          (максимум {maxTagLength})
        </p>
        <Input
          {...bindTag}
          className={styles.input}
          maxLength={maxTag}
          error={errorTag}
          onKeyDown={keyPress}
          placeholder="Ключевые слова"
        />
      </div>
      {!!tags.length && (
        <div className={styles.item} style={{ margin: 0 }}>
          <TagsList
            tags={tags}
            deleteHandler={deleteTagHandler}
            maxTagLength={maxTagLength}
          />
        </div>
      )}
      <div className={styles.item}>
        <p className={styles.itemText}>* Развернутое описание</p>
        <Input
          {...bindDescription}
          className={styles.input}
          inputType="textarea"
          maxLength={maxDescription}
          error={errorDescription}
          placeholder="Описание"
        />
      </div>
      <div className={styles.item}>
        <p className={styles.itemText}>* Пример кода (необязательно)</p>
        <Input
          {...bindCode}
          className={styles.input}
          inputType="textarea"
          maxLength={maxCode}
          error={errorCode}
          isCode
          placeholder="Код"
        />
      </div>

      <div className={styles.item}>
        <ImagesList deleteImg={deleteImg} file={file} maxFiles={maxFiles} />
      </div>

      <div className={styles.item}>
        <p className={styles.itemText}>
          * Скриншот (необязательно) .png, .jpg, .jpeg
        </p>
        <div className={styles.dropBlock}>
          <DropImg
            drag={drag}
            dragHandler={dragHandler}
            maxFiles={maxFiles}
            onDropHandler={onDropHandler}
          />
          <Button className={styles.btnSubmit} onClick={submitHandler}>
            <MdOutlineDone />
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ModalCreate
