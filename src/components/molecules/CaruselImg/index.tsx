import { FC, useCallback, useState } from "react"
import { useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MobileStepper from "@mui/material/MobileStepper"
import Button from "@mui/material/Button"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import SwipeableViews from "react-swipeable-views"

type IImgs = {
	images: any[]
	handleImage: (value: string) => void
}

const style = {
	carusel: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		maxWidth: "250px",
	},
}

const CaruselImg: FC<IImgs> = ({ images, handleImage }) => {
	const theme = useTheme()
	const [activeStep, setActiveStep] = useState(0)
	const maxSteps = images.length

	const imgHandler = useCallback(handleImage, [handleImage])

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	const handleStepChange = (step: number) => {
		setActiveStep(step)
	}

	return (
		<Box sx={style.carusel}>
			<SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{images.map((step, index) => (
					<div key={index}>
						{Math.abs(activeStep - index) <= 2 ? (
							<Box
								component='img'
								onClick={() => imgHandler(step?.url)}
								sx={{
									height: "auto",
									display: "block",
									maxWidth: 400,
									overflow: "hidden",
									width: "100%",
								}}
								src={step?.url}
							/>
						) : null}
					</div>
				))}
			</SwipeableViews>
			<MobileStepper
				steps={maxSteps}
				position='static'
				sx={{ width: "100%", backgroundColor: "transparent" }}
				activeStep={activeStep}
				nextButton={
					<Button
						size='small'
						onClick={handleNext}
						sx={{ fontSize: 14 }}
						disabled={activeStep === maxSteps - 1}
					>
						{theme.direction === "rtl" ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				}
				backButton={
					<Button
						sx={{ fontSize: 14 }}
						size='small'
						onClick={handleBack}
						disabled={activeStep === 0}
					>
						{theme.direction === "rtl" ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
					</Button>
				}
			/>
		</Box>
	)
}

export default CaruselImg
