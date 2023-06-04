import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import Button from '@storybook/atoms/Button'
import { useAppSelector } from '@hooks/hooks'
import { useActions } from '@hooks/useActions'
import { IItemSelect } from '@storybook/molecules/Select/types'

type Props = {
  item: IItemSelect
}

const Tab: FC<Props> = memo(({ item }) => {
  const { setRoom } = useActions()
  const { room } = useAppSelector((store) => store.main)

  const setTabHandler = () => {
    setRoom(item)
  }

  return (
    <Button
      className={cn(styles.tab, {
        [styles.active]: room.id === item.id,
      })}
      onClick={setTabHandler}
    >
      {item.text}
    </Button>
  )
})

export default Tab
