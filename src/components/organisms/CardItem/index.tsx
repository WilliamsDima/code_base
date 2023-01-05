/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState } from "react"
import Card from "@mui/material/Card"
import { CardActions, Button } from "@mui/material"
import "./styles.scss"
import { IItemCode } from "../../../services/types"
import { listAll, ref, getDownloadURL, deleteObject } from "firebase/storage"
import { useAuth } from "../../../api/firebase"
import PopinAttantions from "../../atoms/PopinAttantions"
import ImgModal from "../../atoms/ImgModal"
import { useActions } from "../../../hooks/useActions"
import CardItemContent from "../../molecules/CardContent"

type ICard = {
	item: IItemCode
}

const style = {
	card: {
		mb: 4,
		width: "100%",
		position: "relative",
	},
}

const CardItem: FC<ICard> = memo(({ item }) => {
	const { deleteCode, setModal } = useActions()

	const { storage, user } = useAuth()

	const [deleteModal, setDeleteModal] = useState<boolean>(false)

	const [open, setOpen] = useState(false)
	const [image, setImage] = useState<null | string>(null)
	const [images, setImages] = useState<null | any[]>(null)

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

	useEffect(() => {
		// console.log("card item")

		if (!images) {
			getImages()
		}
	}, [images])

	return (
		<Card sx={style.card}>
			<div className='edite'>
				<Button size='large' color='success' onClick={() => setModal(item)}>
					редактировать
				</Button>
			</div>
			<PopinAttantions
				show={deleteModal}
				text={`Вы уверены что хотите удалить ${item.title}?`}
				setShow={deleteHandler}
			/>

			<CardItemContent item={item} images={images} handleImage={handleImage} />

			<ImgModal open={open} image={image} handleClose={handleClose} />

			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button size='large' color='error' onClick={() => setDeleteModal(true)}>
					Удалить
				</Button>
			</CardActions>
		</Card>
	)
})

export default CardItem
