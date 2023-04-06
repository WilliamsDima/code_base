import { FC, memo } from 'react'
import styles from './styles.module.scss'
import { useAppContext } from '@context/appContext'
import Button from '@storybook/atoms/Button'
import { IoMdClose } from 'react-icons/io'
import { MdOutlineDone } from 'react-icons/md'

type modal = {}

const ModalMessage: FC<modal> = memo(() => {
  const { messageWarning, setMessageWarning } = useAppContext()

  const closeHandler = () => {
    setMessageWarning(null)
  }

  const doneHandler = () => {
    messageWarning?.handlerDone && messageWarning?.handlerDone()
    closeHandler()
  }
  return (
    <div className={styles.message}>
      {messageWarning?.title && (
        <p className={styles.title}>{messageWarning.title}</p>
      )}

      <p className={styles.body}>{messageWarning?.body}</p>

      <div className={styles.btns}>
        <Button className={styles.btn} onClick={closeHandler}>
          <IoMdClose />
        </Button>
        <Button className={styles.btn} onClick={doneHandler}>
          <MdOutlineDone />
        </Button>
      </div>
    </div>
  )
})

export default ModalMessage
