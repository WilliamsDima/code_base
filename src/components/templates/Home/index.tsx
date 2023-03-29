import "./styles.scss"
import { Container } from "@mui/material"
import { useAppSelector } from "../../../hooks/hooks"
import Main from "../../organisms/Main"
import Empty from "../../atoms/Empty"

const HomeTemplate = () => {
	const { user } = useAppSelector(store => store.main)
	return (
		<Container maxWidth='lg' sx={{ mt: 5 }}>
			{user ? <Main /> : <Empty />}
		</Container>
	)
}

export default HomeTemplate
