import { FC, memo, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import CodeItem from '@molecules/CodeItem'
import { IItemCode } from '@appTypes/types'
import {
  WindowScroller,
  AutoSizer,
  List,
  CellMeasurerCache,
  CellMeasurer,
} from 'react-virtualized'
import 'react-virtualized/styles.css' // only needs to be imported once
import { useCodeListContext } from '@context/codeListContext'

type images = {
  images: any[]
  index: number
}

type Props = {
  setItem: (item: IItemCode) => void
  setImagesSlider: (value: null | images) => void
  updateHandler: (item: IItemCode) => void
  isLoading: boolean
  codes: IItemCode[]
}

const cache = new CellMeasurerCache({})

// обновление высоты после удаление, добавление, изменение элемента в списке, а так же обновлять кэш для всего списка при фильтре
// https://stackoverflow.com/questions/43837279/dynamic-row-heights-with-react-virtualized-and-new-cellmeasurer

const VirtualList: FC<Props> = memo(
  ({ setImagesSlider, setItem, updateHandler, codes }) => {
    const { codesFilter, tagsSelect } = useCodeListContext()

    const [forseUpdate, setforseUpdate] = useState(false)

    const row = (props: any) => {
      const { index, style, parent } = props

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
            setItem={setItem}
            updateHandler={updateHandler}
          />
        </CellMeasurer>
      )
    }

    useEffect(() => {
      let id = setTimeout(() => {
        cache.clearAll()
        setforseUpdate((prev) => !prev)
      }, 100)

      return () => clearTimeout(id)
    }, [codesFilter, tagsSelect])

    useEffect(() => {}, [forseUpdate])

    return (
      <WindowScroller>
        {({ scrollTop }) => (
          <AutoSizer style={{ width: '100%' }}>
            {({ width, height }) => (
              <List
                className={styles.list}
                autoHeight
                height={height}
                width={width}
                scrollTop={scrollTop}
                deferredMeasurementCache={cache}
                rowHeight={cache.rowHeight}
                rowRenderer={row}
                rowCount={codes.length}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    )
  }
)

export default VirtualList
