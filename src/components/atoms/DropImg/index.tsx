import { FC } from "react"
import { Typography } from "@mui/material"
import "./styles.scss"

type IDropImg = {
	drag: boolean
	maxFiles: number
	dragHandler: (e: any, value: boolean) => any
	onDropHandler: (e: any) => any
}

const style = {
	note: {
		flexGrow: 1,
		mb: 1,
		opacity: 0.5,
		color: "text.primary",
	},
}

const DropImg: FC<IDropImg> = ({
	drag,
	dragHandler,
	maxFiles,
	onDropHandler,
}) => {
	return (
		<div style={{ width: "90%" }}>
			<Typography fontWeight={500} component='p' sx={style.note}>
				* Скриншот (необязательно) .png, .jpg, .jpeg
			</Typography>

			{drag ? (
				<div
					onDragStart={e => dragHandler(e, true)}
					onDragOver={e => dragHandler(e, false)}
					onDragLeave={e => dragHandler(e, true)}
					className='drag'
				>
					<input
						accept='.png, .jpg, .jpeg'
						type='file'
						multiple={true}
						maxLength={maxFiles}
						onDrop={onDropHandler}
						onChange={onDropHandler}
					/>
					<Typography
						fontWeight={500}
						component='p'
						sx={{ color: "text.primary", textAlign: "center" }}
					>
						Отпустите файл для загрузки
					</Typography>
				</div>
			) : (
				<div
					onDragStart={e => dragHandler(e, true)}
					onDragOver={e => dragHandler(e, false)}
					onDragLeave={e => dragHandler(e, true)}
					className='drag'
				>
					<input
						accept='.png, .jpg, .jpeg'
						multiple={true}
						type='file'
						onDrop={onDropHandler}
						onChange={onDropHandler}
					/>
					<Typography
						fontWeight={500}
						component='p'
						sx={{ color: "text.primary", textAlign: "center" }}
					>
						перетащите файл для загрузки
					</Typography>
				</div>
			)}
		</div>
	)
}

export default DropImg
