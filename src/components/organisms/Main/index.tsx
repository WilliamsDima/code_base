import { useEffect } from "react"
import { CircularProgress } from "@mui/material"
import "./styles.scss"
import { useAppSelector } from "../../../hooks/hooks"
import Filter from "../../molecules/Filter"
import MainList from "../MainList"

const Main = () => {
	const { loading } = useAppSelector(store => store.main)

	useEffect(() => {}, [loading])

	return (
		<div className='main'>
			<Filter />
			{loading ? (
				<CircularProgress
					style={{ width: 70, height: 70, marginTop: "20%" }}
					color='success'
				/>
			) : (
				<MainList />
			)}
		</div>
	)
}

export default Main
