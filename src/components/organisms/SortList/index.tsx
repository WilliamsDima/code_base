import { FC } from 'react'
import styles from './styles.module.scss'
import ButtonSort from '@storybook/atoms/ButtonSort'
import Button from '@storybook/atoms/Button'
import Checkbox from '@storybook/atoms/Checkbox'
import { useCodeListContext } from '@context/codeListContext'

type Props = {}

const SortList: FC<Props> = () => {
  const { sortByDate, sortByCopy, setSortByDate, setSortByCopy } =
    useCodeListContext()

  return (
    <div className={styles.sort}>
      <div className={styles.item}>
        <ButtonSort
          active={sortByDate}
          className={styles.byDate}
          onClick={() => setSortByDate((prev) => !prev)}
        >
          по дате
        </ButtonSort>
      </div>
      <div className={styles.item}>
        <Button
          className={styles.byCopy}
          shadowClick={false}
          onClick={() => setSortByCopy((prev) => !prev)}
        >
          по популярности
          <Checkbox className={styles.checkbox} value={sortByCopy} />
        </Button>
      </div>
    </div>
  )
}

export default SortList
