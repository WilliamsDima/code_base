import { FC, memo, useMemo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import Tab from '@atoms/Tab'
import { sistemsRooms } from '@services/constans'

type Props = {}

const TabsList: FC<Props> = memo(() => {
  const tabs = useMemo(() => {
    return sistemsRooms
  }, [])

  return (
    <div className={cn(styles.tabs)}>
      {tabs.map((item) => {
        return <Tab key={item.id} item={item} />
      })}
    </div>
  )
})

export default TabsList
