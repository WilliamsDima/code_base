/* eslint-disable react-hooks/exhaustive-deps */
import { CardContent, Typography, Chip } from "@mui/material"
import "./styles.scss"
import CaruselImg from "../../molecules/CaruselImg"
import Code from "../../atoms/Code"
import { FC } from "react"
import { IItemCode } from "../../../services/types"

type ContentType = {
	item: IItemCode
	images: null | any[]
	handleImage: (value: string) => void
}

const CardItemContent: FC<ContentType> = ({ item, images, handleImage }) => {
	// const links = item.description.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g)
	// const test = item.description.replace(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g, 'тут ссылка')

	// console.log('links', links);

	return (
		<CardContent>
			<Typography gutterBottom variant='h4' component='p'>
				{item.title}
			</Typography>

			<div className='tags'>
				{item.tags.map(tag => {
					return (
						<Chip
							sx={{ mr: 1, mb: 1, fontSize: 14 }}
							key={tag.id}
							label={tag.value}
							variant='outlined'
						/>
					)
				})}
			</div>

			<Typography
				gutterBottom
				variant='h4'
				component='p'
				sx={{ whiteSpace: "pre-line" }}
			>
				{`${item.description}`}
			</Typography>

			{!!item.code && <Code code={item.code} copy={item.copy} id={item.id} />}

			{!!images?.length && (
				<div className='carusel_wrapper'>
					<CaruselImg images={images} handleImage={handleImage} />
				</div>
			)}
		</CardContent>
	)
}

export default CardItemContent
