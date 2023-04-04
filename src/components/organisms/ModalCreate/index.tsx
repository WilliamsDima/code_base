import { FC } from 'react'
import styles from './styles.module.scss'
import { IItemCode } from '@appTypes/types'
import Input from '@storybook/atoms/Input'
import { useInput } from '@hooks/useInput'

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
    </div>
  )
}

export default ModalCreate
