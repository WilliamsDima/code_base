import { FC, memo, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'
import Button from '@storybook/atoms/Button'
import { IoIosArrowUp } from 'react-icons/io'

const ButtonScrollUp: FC = memo(() => {
  const scrollToHandler = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const [scroll, setScroll] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScroll(true)
    }

    if (window.scrollY < 200) {
      setScroll(false)
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <Button
      onClick={scrollToHandler}
      className={cn(styles.btn, {
        [styles.show]: scroll,
      })}
    >
      <IoIosArrowUp className={styles.up} />
    </Button>
  )
})

export default ButtonScrollUp
