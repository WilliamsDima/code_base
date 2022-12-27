/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react"
import Card from "@mui/material/Card"
import {
	CardActions,
	CardContent,
	Button,
	Typography,
	Chip,
} from "@mui/material"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import "./styles.scss"
import { IItemCode } from "../../../services/types"
import { listAll, ref, getDownloadURL, deleteObject } from "firebase/storage"
import { useAuth } from "../../../api/firebase"
import Highlight from "react-highlight"
import CaruselImg from "../../molecules/CaruselImg"
import { green, grey } from "@mui/material/colors"
import PopinAttantions from "../../atoms/PopinAttantions"
import ImgModal from "../../atoms/ImgModal"
import { useActions } from "../../../hooks/useActions"
type ICard = {
	item: IItemCode
}

const style = {
	card: {
		mb: 4,
		width: "100%",
	},
}

const CardItem: FC<ICard> = ({ item }) => {
	const { deleteCode, copyCode } = useActions()
	const { storage, user } = useAuth()

	const [images, setImages] = useState<null | any[]>(null)
	const [copy, setCope] = useState<boolean>(false)
	const [deleteModal, setDeleteModal] = useState<boolean>(false)

	const [open, setOpen] = useState(false)
	const [image, setImage] = useState<null | string>(null)

	const handleClose = () => {
		setOpen(false)
	}

	const handleImage = (value: string) => {
		setImage(value)
		setOpen(true)
	}

	const pathToFile = user?.providerData[0].uid

	const getImages = async () => {
		const imageListRef = ref(storage, `images-${pathToFile}/${item.id}/`)
		const { items } = await listAll(imageListRef)

		const data = items.map(async (item: any) => {
			return {
				path: item?._location?.path_,
				url: await getDownloadURL(item),
			}
		})

		Promise.all(data).then(values => {
			setImages(values)
		})
	}

	const copyHandler = () => {
		navigator.clipboard.writeText(item.code).then(
			function () {
				console.log("Async: Copying to clipboard was successful!")
				copyCode(item.id)
				setCope(true)
			},
			function (err) {
				console.error("Async: Could not copy text: ", err)
			}
		)
	}

	const deleteHandler = (value: boolean) => {
		if (value) {
			setDeleteModal(false)
			deleteCode(item.id)

			if (images?.length) {
				images?.forEach(img => {
					const imageListRef = ref(storage, `${img?.path}`)
					deleteObject(imageListRef)
						.then(() => {
							console.log("file delited!")
						})
						.catch(error => {
							console.log("deleteHandler", error)
						})
				})
			}
		} else {
			// закрывается предупреждение
			setDeleteModal(false)
		}
	}

	// const links = item.description.match(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g)
	// const test = item.description.replace(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g, 'тут ссылка')

	// console.log('links', links);

	useEffect(() => {
		if (!images) {
			getImages()
		}
	}, [images])

	return (
		<Card sx={style.card}>
			<PopinAttantions
				show={deleteModal}
				text={`Вы уверены что хотите удалить ${item.title}?`}
				setShow={deleteHandler}
			/>

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

				{!!item.code && (
					<Typography variant='h5'>
						<div className='language-javascript-of-snippet'>
							<Highlight>{`${item.code}`}</Highlight>

							<div className='copy_btn'>
								<Button
									sx={{ border: "none", minWidth: "5px" }}
									variant='outlined'
									onClick={copyHandler}
								>
									<ContentCopyIcon
										sx={copy ? { color: green[500] } : { color: grey[500] }}
										fontSize='large'
									/>
								</Button>
								<Typography variant='h6'>: {item.copy}</Typography>
							</div>
						</div>
					</Typography>
				)}

				{!!images?.length && (
					<div className='carusel_wrapper'>
						<CaruselImg images={images} handleImage={handleImage} />
					</div>
				)}
			</CardContent>

			<ImgModal open={open} image={image} handleClose={handleClose} />

			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button size='large' color='error' onClick={() => setDeleteModal(true)}>
					Удалить
				</Button>
			</CardActions>
		</Card>
	)
}

export default CardItem
