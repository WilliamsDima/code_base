import { FC, memo } from 'react'
import styles from './styles.module.scss'
import cn from 'classnames'

type loading = {
  active: boolean
  image: {
    url: string
  }
  imgSelect: () => void
  isModal?: boolean
}

const SlideImg: FC<loading> = memo(
  ({ active, isModal = false, image, imgSelect }) => {
    return (
      <div
        onClick={imgSelect}
        className={cn(styles.slider, {
          [styles.active]: active,
          [styles.modal]: isModal,
        })}
      >
        <div
          role="img"
          className={styles.img}
          style={{
            backgroundImage: `url(${image.url})`,
          }}
        />
      </div>
    )
  }
)

export default SlideImg
