import { FC, useCallback, useState } from 'react'

type IImgs = {
  images: any[]
  handleImage: (value: string) => void
}

const CaruselImg: FC<IImgs> = ({ images, handleImage }) => {
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = images.length

  const imgHandler = useCallback(handleImage, [handleImage])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return <div></div>
}

export default CaruselImg
