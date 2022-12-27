/* eslint-disable jsx-a11y/alt-text */
import "./styles.scss"
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

const NotFount = () => {
	const theme = useTheme()

	return (
		<Box
			sx={{
				maxWidth: "100vw",
				minHeight: "100vh",
				bgcolor:
					theme.palette.mode === "dark"
						? "background.default"
						: "background.paper",
			}}
		>
			<div className='empty_pagy'>
				<Box sx={{ justifyContent: "center" }}>
					<Typography variant='h1' color='red'>
						404 Page : (
					</Typography>

					<Button size='large' sx={{ fontSize: 30 }}>
						<Link to='/' className='link'>
							на главную
						</Link>
					</Button>
				</Box>

				<img className='jhon' src={require("../../assets/images/what.gif")} />
			</div>
		</Box>
	)
}

export default NotFount
