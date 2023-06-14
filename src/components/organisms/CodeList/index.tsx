import { FC, useState, useRef, useCallback, memo } from 'react'
import styles from './styles.module.scss'
import Empty from '@storybook/atoms/Empty'
import Modal from '@storybook/organisms/Modal'
import ModalCreate from '@organisms/ModalCreate'
import { useOutside } from '@hooks/useOutside'
import { IItemCode } from '@appTypes/types'
import Button from '@storybook/atoms/Button'
import { IoAdd } from 'react-icons/io5'
import ModalSlider from '@organisms/ModalSlider'
import Loading from '@atoms/Loading'
import FilterList from '@organisms/FilterList'
import { useCodeListContext } from '@context/codeListContext'
import SortList from '@organisms/SortList'
import VirtualList from '@molecules/VirtualList'
import Rooms from '@molecules/Rooms'
import { useRTKQuery } from '@hooks/useRTKQuery'
import { useAuth } from '@hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { RoutesNames } from '../../../navigations/routes-names'

type images = {
  images: any[]
  index: number
}

const CodeList: FC = memo(() => {
  const navigate = useNavigate()
  const { updateItem } = useRTKQuery()
  const { codesFilter, isLoading } = useCodeListContext()
  const { user } = useAuth()

  const [item, setItem] = useState<null | IItemCode>(null)
  const [isModalOpen, setModalOpen] = useState(false)

  const closeModalCreater = useCallback((closeHandler?: () => void) => {
    setModalOpen(false)
    setItem(null)
    closeHandler && closeHandler()
  }, [])

  const editeItemHandler = useCallback((itemSelect: IItemCode) => {
    setItem(itemSelect)
    setModalOpen(true)
  }, [])

  const refModalCreater = useRef(null)

  const refSlider = useRef(null)
  const [images, setImages] = useState<null | images>(null)
  const [isModalOpenSlider, setModalOpenSlider] = useState(false)

  useOutside(refSlider, () => {
    setModalOpenSlider(false)
    setImages(null)
  })

  const imagesHandler = useCallback((value: null | images) => {
    setImages(value)
    setModalOpenSlider(true)
  }, [])

  const updateHandler = useCallback(
    (item: IItemCode) => {
      updateItem({ images: [], item, prevRoom: item.accessibility?.value })
    },
    [updateItem]
  )

  const setModalHandler = () => {
    if (user) {
      setModalOpen(true)
    } else {
      navigate(RoutesNames.Auth)
    }
  }

  return (
    <div className={styles.contentList}>
      <Rooms />
      <FilterList />
      <SortList />
      <Modal open={isLoading}>
        <Loading active={isLoading} className={styles.listLoader} />
      </Modal>

      <Modal open={isModalOpen} ref={refModalCreater}>
        {isModalOpen && (
          <ModalCreate
            item={item}
            close={closeModalCreater}
            ref={refModalCreater}
          />
        )}
      </Modal>
      <Modal open={isModalOpenSlider} ref={refSlider}>
        <ModalSlider images={images} />
      </Modal>

      {!!codesFilter?.length ? (
        <VirtualList
          setItem={editeItemHandler}
          setImagesSlider={imagesHandler}
          updateHandler={updateHandler}
          codes={codesFilter}
        />
      ) : (
        <div className={styles.empty}>
          {!isLoading && (
            <>
              <Empty />
              <p>ничего не найдено...</p>
            </>
          )}
        </div>
      )}

      <Button className={styles.btnAdd} onClick={setModalHandler}>
        <IoAdd />
      </Button>
    </div>
  )
})

export default CodeList
