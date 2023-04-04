import { FC, useEffect } from 'react'
import styles from './styles.module.scss'
import CaruselImg from '@molecules/CaruselImg'

type images = {
  images: any[]
  index: number
}

type modal = {
  images: images | null
}

const ModalSlider: FC<modal> = ({ images }) => {
  useEffect(() => {
    console.log('ModalSlider', images)
  }, [images])
  return (
    <div className={styles.modalSlider}>
      {!!images && <CaruselImg images={images.images} index={images.index} />}
    </div>
  )
}

export default ModalSlider
