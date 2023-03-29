/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { IconButton } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import "./styles.scss"
import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"
import { useActions } from "../../../hooks/useActions"
import { useAppSelector } from "../../../hooks/hooks"
import { useAuth } from "../../../hooks/useAuth"
import { getDataUser } from "../../../api/firebase"
import { IItemCode } from "../../../appTypes/types"
import FilterParams from "../FilterParams"
import ModalForm from "../ModalForm"

const Filter = () => {
	const { setCodeBase, setLoading, setModal } = useActions()
	const { codeBase, modalOpen } = useAppSelector(store => store.main)

	const { user, storage } = useAuth()

	const getDataHandler = async () => {
		setLoading(true)

		if (user) {
			const res = await getDataUser(user)

			setCodeBase([...res?.codes])
		} else {
			setLoading(false)
		}
	}

	const submit = async (item: IItemCode, file: any[]) => {
		if (user) {
			const pathToFile = user?.providerData[0].uid

			if (file.length) {
				file.forEach((img: any) => {
					const imgeRef = ref(
						storage,
						`images-${pathToFile}/${item.id}/${img.name + v4()}`
					)
					uploadBytes(imgeRef, img)
						.then(() => {
							// console.log("uploadBytes ready")
						})
						.catch(error => {
							console.log("uploadBytes", error)
						})
						.finally(() => {
							setCodeBase([item, ...codeBase])
						})
				})
			} else {
				setCodeBase([item, ...codeBase])
			}

			// console.log("submit")
		}
	}

	useEffect(() => {
		getDataHandler()
		// console.log("Filter")
	}, [])

	return (
		<div className='filter-content'>
			<FilterParams />
			<ModalForm show={!!modalOpen} setShow={setModal} submit={submit} />

			<div className='filter-content_addBtn'>
				<IconButton
					size='large'
					color='primary'
					sx={{ bgcolor: "action.selected" }}
					aria-label='add'
					onClick={() => setModal(true)}
				>
					<AddIcon sx={{ fontSize: 30, color: "#2EE5AC" }} />
				</IconButton>
			</div>
		</div>
	)
}

export default Filter
