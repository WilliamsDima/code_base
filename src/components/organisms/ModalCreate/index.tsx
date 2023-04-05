import { FC, useState, KeyboardEvent, useCallback } from 'react'
import styles from './styles.module.scss'
import { IItemCode, ITag } from '@appTypes/types'
import Input from '@storybook/atoms/Input'
import { useInput } from '@hooks/useInput'
import TagsList from '@molecules/TagsList'

type modal = {
  item: IItemCode | null
  close: () => void
}

const ModalCreate: FC<modal> = ({ item, close }) => {
  const {
    bind: bindTitle,
    value: title,
    error: errorTitle,
    setError: setErrorTitle,
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

  const deleteHandler = useCallback(
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
  } = useInput(() => item?.description || '')
  const maxDescription = 500

  const {
    bind: bindCode,
    value: code,
    error: errorCode,
    setError: setErrorCode,
  } = useInput(() => item?.code || '')
  const maxCode = 10000

  return (
    <div className={styles.modalCreateContent}>
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
            deleteHandler={deleteHandler}
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
    </div>
  )
}

export default ModalCreate
