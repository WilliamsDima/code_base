import { FC, memo } from 'react'
import styles from './styles.module.scss'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import Button from '@storybook/atoms/Button'
import { useAppContext } from '@context/appContext'
import cn from 'classnames'

const ThemeController: FC = memo(() => {
  const { themeAppLS, themeHandler } = useAppContext()

  return (
    <div className={styles.theme}>
      <Button
        className={cn(styles.themeChange, styles[themeAppLS])}
        onClick={themeHandler}
      >
        <BsFillMoonFill className={styles.moon} />
        <BsFillSunFill className={styles.sun} />
      </Button>
    </div>
  )
})

export default ThemeController
