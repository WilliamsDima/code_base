import { FC, useState } from 'react'

import Carusel from '@molecules/Carusel'
import SlideImg from '@atoms/SlideImg'

type IImgs = {
  images: any[]
  imgHandler?: (value: any[], index: number) => void
  index?: number
  isModal?: boolean
}

const CaruselImg: FC<IImgs> = ({ images, isModal, imgHandler, index }) => {
  const [currentSlide, setCurrentSlide] = useState(() => index || 0)
  const handlePrevClick = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  const handleNextClick = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <Carusel
      handlePrevClick={handlePrevClick}
      handleNextClick={handleNextClick}
      dots={images}
      currentSlide={currentSlide}
      setSlide={setCurrentSlide}
      showButton={images.length > 1}
      overStyle={{ marginTop: '1rem' }}
    >
      {images.map((img, i) => (
        <SlideImg
          isModal={isModal}
          imgSelect={() => imgHandler && imgHandler(images, i)}
          key={i.toString()}
          active={currentSlide === i}
          image={img}
        />
      ))}
    </Carusel>
  )
}

export default CaruselImg
