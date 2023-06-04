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
import { updateItemCode } from '@hooks/helpers'
import FilterList from '@organisms/FilterList'
import { useCodeListContext } from '@context/codeListContext'
import SortList from '@organisms/SortList'
import VirtualList from '@molecules/VirtualList'
import TabsList from '@molecules/TabsList'

type images = {
  images: any[]
  index: number
}

const CodeList: FC = memo(() => {
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

  const { codesData, codesFilter, isLoading, updateItem } = useCodeListContext()

  const updateHandler = useCallback(
    (item: IItemCode) => {
      if (codesData) {
        const newCodes = updateItemCode(codesData, item)
        updateItem({ codes: newCodes })
      }
    },
    [updateItem, codesData]
  )

  return (
    <div className={styles.contentList}>
      <TabsList />
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

      {codesFilter ? (
        <VirtualList
          setItem={editeItemHandler}
          setImagesSlider={imagesHandler}
          updateHandler={updateHandler}
          codes={codesFilter}
          isLoading={isLoading}
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

      <Button className={styles.btnAdd} onClick={() => setModalOpen(true)}>
        <IoAdd />
      </Button>
    </div>
  )
})

export default CodeList
