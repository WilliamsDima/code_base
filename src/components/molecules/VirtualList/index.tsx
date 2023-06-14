/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo } from 'react'
// import styles from './styles.module.scss'
import { IItemCode } from '@appTypes/types'
import 'react-virtualized/styles.css' // only needs to be imported once
import VirtualListRender from '@molecules/VirtualListRender'

type images = {
  images: any[]
  index: number
}

type Props = {
  setItem: (item: IItemCode) => void
  setImagesSlider: (value: null | images) => void
  updateHandler: (item: IItemCode) => void
  codes: IItemCode[]
}

const VirtualList: FC<Props> = ({
  setImagesSlider,
  setItem,
  updateHandler,
  codes,
}) => {
  return (
    <VirtualListRender
      codes={codes}
      setImagesSlider={setImagesSlider}
      setItem={setItem}
      updateHandler={updateHandler}
    />
  )
}

export default memo(VirtualList)
