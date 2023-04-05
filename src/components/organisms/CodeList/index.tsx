import { FC, useState, useRef } from 'react'
import styles from './styles.module.scss'
import Empty from '@storybook/atoms/Empty'
import CodeItem from '@molecules/CodeItem'
import Modal from '@storybook/organisms/Modal'
import ModalCreate from '@organisms/ModalCreate'
import { useOutside } from '@hooks/useOutside'
import { IItemCode } from '@appTypes/types'
import Button from '@storybook/atoms/Button'
import { IoAdd } from 'react-icons/io5'
import ModalSlider from '@organisms/ModalSlider'
import { useFetchCodeListUserQuery } from '@services/UserServices'
import { useAuth } from '@hooks/useAuth'
import Loading from '@atoms/Loading'

type images = {
  images: any[]
  index: number
}

const CodeList: FC = () => {
  const refCreate = useRef(null)
  const [item, setItem] = useState<null | IItemCode>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const closeModalCreater = () => {
    setModalOpen(false)
    setItem(null)
  }

  useOutside(refCreate, () => {
    closeModalCreater()
  })

  const refSlider = useRef(null)
  const [images, setImages] = useState<null | images>(null)
  const [isModalOpenSlider, setModalOpenSlider] = useState(false)

  useOutside(refSlider, () => {
    setModalOpenSlider(false)
    setImages(null)
  })

  const imagesHandler = (value: null | images) => {
    setImages(value)
    setModalOpenSlider(true)
  }

  const { user } = useAuth()
  const { data: codes, isLoading } = useFetchCodeListUserQuery(user)

  return (
    <div className={styles.contentList}>
      <Loading active={isLoading} />
      <Modal open={isModalOpen} ref={refCreate}>
        <ModalCreate item={item} close={closeModalCreater} />
      </Modal>
      <Modal open={isModalOpenSlider} ref={refSlider}>
        <ModalSlider images={images} />
      </Modal>
      {!!codes?.length ? (
        <ul className={styles.list}>
          {codes.map((item) => {
            return (
              <CodeItem
                key={item.id}
                item={item}
                setImagesSlider={imagesHandler}
              />
            )
          })}
        </ul>
      ) : (
        <div className={styles.empty}>
          {!isLoading && (
            <>
              <Empty />
              <p>кодавая база пуста</p>
            </>
          )}
        </div>
      )}
      <Button className={styles.btnAdd} onClick={() => setModalOpen(true)}>
        <IoAdd />
      </Button>
    </div>
  )
}

export default CodeList
