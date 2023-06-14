/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState, useCallback } from 'react'
import styles from './styles.module.scss'
import CodeItem from '@molecules/CodeItem'
import { IItemCode } from '@appTypes/types'
import {
  WindowScroller,
  CellMeasurerCache,
  CellMeasurer,
  AutoSizer,
  List,
} from 'react-virtualized'
import 'react-virtualized/styles.css' // only needs to be imported once
import { useCodeListContext } from '@context/codeListContext'
import { useAppSelector } from '@hooks/hooks'

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

const cache = new CellMeasurerCache({})

// обновление высоты после удаление, добавление, изменение элемента в списке, а так же обновлять кэш для всего списка при фильтре
// https://stackoverflow.com/questions/43837279/dynamic-row-heights-with-react-virtualized-and-new-cellmeasurer

const VirtualListRender: FC<Props> = ({
  setImagesSlider,
  setItem,
  updateHandler,
  codes,
}) => {
  const { codesFilter, tagsSelect } = useCodeListContext()

  const { room } = useAppSelector((store) => store.main)

  const [forseUpdate, setforseUpdate] = useState(false)

  const clearCashHandler = useCallback(() => {
    setTimeout(() => {
      cache.clearAll()
    }, 100)
    setforseUpdate((prev) => !prev)
  }, [])

  const row = (props: any) => {
    const { index, style, parent } = props

    // console.log('row', parent)

    const item: IItemCode = codes[index]

    return (
      <CellMeasurer
        key={item.id}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <CodeItem
          item={item}
          style={style}
          setImagesSlider={setImagesSlider}
          clearCashHandler={clearCashHandler}
          setItem={setItem}
          updateHandler={updateHandler}
        />
      </CellMeasurer>
    )
  }

  useEffect(() => {
    clearCashHandler()
  }, [codesFilter, tagsSelect, room])

  useEffect(() => {}, [forseUpdate, room])

  return (
    <WindowScroller>
      {({ scrollTop }) => (
        <>
          <p className={styles.total}>Всего найдено: {codes?.length || 0}</p>
          <AutoSizer style={{ width: '100%' }}>
            {({ width, height }) => (
              <List
                className={styles.list}
                autoHeight
                height={height}
                width={width}
                scrollTop={scrollTop}
                deferredMeasurementCache={cache}
                rowHeight={cache?.rowHeight}
                rowRenderer={row}
                rowCount={codes.length}
              />
            )}
          </AutoSizer>
        </>
      )}
    </WindowScroller>
  )
}

export default memo(VirtualListRender)
