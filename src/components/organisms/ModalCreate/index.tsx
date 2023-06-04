import {
  useState,
  KeyboardEvent,
  useCallback,
  forwardRef,
  RefObject,
  useMemo,
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
import { deleteImagesItem } from '@api/firebase'
import Select from '@storybook/molecules/Select'
import { codeLanguges } from '@services/listLanguages'
import { IItemSelect } from '@storybook/molecules/Select/types'
import cn from 'classnames'
import { sistemsTabsForCreate } from '@services/constans'

type modal = {
  item: IItemCode | null
  close: (handler?: () => void) => void
}

type Ref = any

const ModalCreate = forwardRef<Ref, modal>((props, ref) => {
  const { item, close } = props

  const { setMessageWarning, messageWarning } = useAppContext()
  const { addItemCode, updateItem, codes } = useRTKQuery()

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

  const maxFiles = 3
  const [file, setFile] = useState<any[]>([])
  const [storageImg, setStorageImg] = useState<any[]>([])

  const [tab, setTab] = useState<IItemSelect>(sistemsTabsForCreate[1])

  const [typeCode, setTypeCode] = useState<string>(
    () => item?.language || 'javascript'
  )

  const setTabHandler = useCallback((item: IItemSelect) => {
    setTab(item)
  }, [])

  const setTypeCodeHandler = useCallback((item: IItemSelect) => {
    setTypeCode(item.value as string)
  }, [])

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
    setTypeCode('javascript')
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
      title.length > 0 &&
      tags.length <= maxTagLength &&
      tags.length > 0 &&
      description.length <= maxDescription &&
      description.length > 0

    if (done) {
      const data: IItemCode = {
        id: item ? item?.id : +new Date(),
        title,
        description,
        code,
        tags,
        language: typeCode,
        copy: item ? item?.copy : 0,
      }

      if (item && codes) {
        const newCodes = updateItemCode(codes, data)

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
      const message: Message = {
        body: 'Не все поля заполнены!',
      }

      !messageWarning && setMessageWarning(message)
    }
  }

  const tabs = useMemo(() => {
    return sistemsTabsForCreate
  }, [])

  return (
    <div className={styles.modalCreateContent}>
      <div className={cn(styles.item, styles.tabsBlock)}>
        <p className={styles.itemText}>* Кто будет видеть?</p>
        <Select
          className={styles.tabs}
          classList={styles.tabsPopup}
          value={tab.value as string}
          list={tabs}
          selectHandler={setTabHandler}
        />
      </div>

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
          className={cn(styles.input, styles.textareaDescription)}
          inputType="textarea"
          maxLength={maxDescription}
          error={errorDescription}
          placeholder="Описание"
        />
      </div>

      <div className={styles.item}>
        <Select
          className={styles.codeSelect}
          value={typeCode}
          list={codeLanguges}
          search={true}
          selectHandler={setTypeCodeHandler}
        />
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
        <ImagesList
          setFile={setFile}
          id={item?.id}
          setStorageImg={setStorageImg}
          file={file}
          maxFiles={maxFiles}
        />
      </div>

      <div className={styles.item}>
        <p className={styles.itemText}>
          * Скриншот (необязательно) .png, .jpg, .jpeg
        </p>
        <div className={styles.dropBlock}>
          <DropImg maxFiles={maxFiles} setFile={setFile} />

          <Button className={styles.btnSubmit} onClick={submitHandler}>
            <MdOutlineDone />
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ModalCreate
