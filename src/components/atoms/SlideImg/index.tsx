import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

type loading = {
  active: boolean
  image: {
    url: string
  }
}

const SlideImg: FC<loading> = memo(({ active, image }) => {
  return (
    <div
      className={cn(styles.slide, {
        [styles.active]: active,
      })}
    >
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${image.url})` }}
      />
    </div>
  )
})

export default SlideImg
