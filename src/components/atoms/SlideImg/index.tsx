import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

type loading = {
  active: boolean
  image: {
    url: string
  }
  imgSelect: () => void
}

const SlideImg: FC<loading> = memo(({ active, image, imgSelect }) => {
  return (
    <div
      className={cn(styles.slide, {
        [styles.active]: active,
      })}
      onClick={imgSelect}
    >
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${image.url})` }}
      />
    </div>
  )
})

export default SlideImg
