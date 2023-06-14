import { FC, memo, useMemo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import Tab from '@atoms/Room'
import { sistemsRooms } from '@services/constans'

type Props = {}

const Rooms: FC<Props> = memo(() => {
  const tabs = useMemo(() => {
    return sistemsRooms
  }, [])

  return (
    <div className={cn(styles.rooms)}>
      {tabs.map((item) => {
        return <Tab key={item.id} item={item} />
      })}
    </div>
  )
})

export default Rooms
