import {
  FC,
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
  useEffect,
} from 'react'
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
import Loading from '@atoms/Loading'
import { listSortByDate, sortByCopyList, updateItemCode } from '@hooks/helpers'
import FilterList from '@organisms/FilterList'
import { useCodeListContext } from '@context/codeListContext'
import SortList from '@organisms/SortList'

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

  const { codes, isLoading, updateItem } = useCodeListContext()

  const [sortByDate, setSortByDate] = useState(true)
  const [sortByCopy, setSortByCopy] = useState(false)

  const sortCodes = useMemo(() => {
    let sort
    sort = listSortByDate(codes, sortByDate)
    if (sortByCopy) {
      sort = sortByCopyList(sort, sortByCopy)
    }

    return sort
  }, [codes, sortByDate, sortByCopy])

  const updateHandler = useCallback(
    (item: IItemCode) => {
      if (codes) {
        const newCodes = updateItemCode(codes, item)
        updateItem({ codes: newCodes })
      }
    },
    [codes, updateItem]
  )
  return (
    <div className={styles.contentList}>
      <FilterList />
      <SortList
        sortByDate={sortByDate}
        setSortByCopy={setSortByCopy}
        setSortByDate={setSortByDate}
        sortByCopy={sortByCopy}
      />
      <Modal open={isLoading}>
        <Loading active={isLoading} className={styles.listLoader} />
      </Modal>

      <Modal open={isModalOpen} ref={refModalCreater}>
        {isModalOpen && (
          <ModalCreate
            item={item}
            codes={codes}
            close={closeModalCreater}
            ref={refModalCreater}
          />
        )}
      </Modal>
      <Modal open={isModalOpenSlider} ref={refSlider}>
        <ModalSlider images={images} />
      </Modal>
      {!!sortCodes?.length ? (
        <ul className={styles.list}>
          {sortCodes.map((item) => {
            return (
              <CodeItem
                key={item.id}
                item={item}
                setItem={editeItemHandler}
                setImagesSlider={imagesHandler}
                updateHandler={updateHandler}
              />
            )
          })}
        </ul>
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
