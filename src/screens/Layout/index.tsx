import { FC, ReactNode, useRef } from 'react'
import styles from './styles.module.scss'
import Header from '@organisms/Header'
import { useAuth } from '@hooks/useAuth'
import Loading from '@atoms/Loading'
import ButtonScrollUp from '@atoms/ButtonScrollUp'
import Modal from '@storybook/organisms/Modal'
import ModalMessage from '@organisms/ModalMessage'
import { useAppContext } from '@context/appContext'
import { useOutside } from '@hooks/useOutside'

type layout = {
  children: ReactNode
}

const Layout: FC<layout> = ({ children }) => {
  const { isLoading } = useAuth()
  const { messageWarning, setMessageWarning } = useAppContext()
  const refMessage = useRef(null)

  useOutside(refMessage, () => {
    setMessageWarning(null)
  })

  return (
    <div className={styles.app}>
      <Header />
      <Loading active={isLoading} />
      <Modal
        className={styles.modalMessage}
        open={!!messageWarning}
        ref={refMessage}
      >
        {messageWarning && <ModalMessage />}
      </Modal>

      <main className={styles.main}>{children}</main>
      <ButtonScrollUp />
    </div>
  )
}

export default Layout
