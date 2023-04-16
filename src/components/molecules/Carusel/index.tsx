import { FC, ReactNode, CSSProperties } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import styles from './styles.module.scss'
import Button from '@storybook/atoms/Button'
import cn from 'classnames'

type IImgs = {
  handlePrevClick: () => void
  handleNextClick: () => void
  children: ReactNode
  dots?: any[]
  currentSlide?: number
  setSlide?: (value: number) => void
  showButton?: boolean
  overStyle?: CSSProperties
}

const Carusel: FC<IImgs> = ({
  handlePrevClick,
  handleNextClick,
  children,
  dots,
  currentSlide,
  setSlide,
  overStyle,
  showButton = true,
}) => {
  return (
    <div className={styles.slider} style={overStyle}>
      <div className={styles.sliderContent}>{children}</div>
      {!!dots?.length && dots?.length > 1 && (
        <ul className={styles.dots}>
          {dots.map((el, i) => (
            <li
              key={i.toString()}
              onClick={() => setSlide && setSlide(i)}
              className={cn(styles.dot, {
                [styles.dotActive]: currentSlide === i,
              })}
            ></li>
          ))}
        </ul>
      )}
      {showButton && (
        <>
          <Button className={styles.prev} onClick={handlePrevClick}>
            <IoIosArrowBack />
          </Button>
          <Button className={styles.next} onClick={handleNextClick}>
            <IoIosArrowForward />
          </Button>
        </>
      )}
    </div>
  )
}

export default Carusel
