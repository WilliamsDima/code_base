import { FC } from "react"
import { green } from "@mui/material/colors"
import { Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import "./styles.scss"

type IImagesList = {
	file: any[]
	maxFiles: number
	deleteImg: (id: number) => void
}

const ImagesList: FC<IImagesList> = ({ file, maxFiles, deleteImg }) => {
	return (
		<div
			className={file.length > maxFiles ? "imgs_screens error" : "imgs_screens"}
		>
			{!!file.length &&
				file.map((item: any) => {
					const urlImg = item && URL.createObjectURL(item)
					return (
						<div
							key={item.lastModified}
							style={{ backgroundImage: `url(${urlImg})` }}
							className='img_item'
						>
							<button
								className='delete_img'
								onClick={() => deleteImg(item.lastModified)}
							>
								<CloseIcon
									sx={{ fontSize: 22, color: green[500] }}
									fontSize='large'
								/>
							</button>
						</div>
					)
				})}

			{!!file.length && (
				<Typography fontWeight={500} variant='h5' component='p'>
					{file.length}/{maxFiles}
				</Typography>
			)}
		</div>
	)
}

export default ImagesList
