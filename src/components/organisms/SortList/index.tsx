import { FC } from 'react'
import styles from './styles.module.scss'
import ButtonSort from '@storybook/atoms/ButtonSort'
import { useCodeListContext } from '@context/codeListContext'
import Button from '@storybook/atoms/Button'
import Checkbox from '@storybook/atoms/Checkbox'

type Props = {
  sortByCopy: boolean
  sortByDate: boolean
  setSortByDate: (value: boolean) => void
  setSortByCopy: (value: boolean) => void
}

const SortList: FC<Props> = ({
  sortByCopy,
  sortByDate,
  setSortByCopy,
  setSortByDate,
}) => {
  return (
    <div className={styles.sort}>
      <div className={styles.item}>
        <ButtonSort
          active={sortByDate}
          className={styles.byDate}
          onClick={() => setSortByDate(!sortByDate)}
        >
          по дате
        </ButtonSort>
      </div>
      <div className={styles.item}>
        <Button
          className={styles.byCopy}
          shadowClick={false}
          onClick={() => setSortByCopy(!sortByCopy)}
        >
          по популярности
          <Checkbox className={styles.checkbox} value={sortByCopy} />
        </Button>
      </div>
    </div>
  )
}

export default SortList
