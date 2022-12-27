import { FC, ReactNode } from "react"
import { Typography, TextField, InputAdornment } from "@mui/material"
import "./styles.scss"

type IModalFormItem = {
	onChange: (e: any) => any
	keyPress?: (e: any) => any
	text: string
	error?: boolean
	value: any
	maxValue?: number
	label: string
	size?: any
	multiline?: boolean
	children?: ReactNode
}

const style = {
	input: {
		fontSize: 20,
		mb: 3,
	},
	note: {
		flexGrow: 1,
		mb: 1,
		opacity: 0.5,
		color: "text.primary",
	},
}

const ModalFormItem: FC<IModalFormItem> = ({
	onChange,
	text,
	error,
	value,
	maxValue,
	label,
	size = "small",
	keyPress,
	multiline,
	children,
}) => {
	return (
		<>
			<Typography fontWeight={500} component='p' sx={style.note}>
				{text}
			</Typography>

			<TextField
				color='success'
				error={error}
				value={value}
				onChange={onChange}
				fullWidth
				multiline={multiline}
				onKeyDown={keyPress}
				InputProps={{
					style: style.input,
					endAdornment: maxValue && (
						<InputAdornment position='end'>
							{value.length}/{maxValue}
						</InputAdornment>
					),
				}}
				sx={{ mb: 3 }}
				label={label}
				variant='filled'
				size={size}
			/>

			{children}
		</>
	)
}

export default ModalFormItem
