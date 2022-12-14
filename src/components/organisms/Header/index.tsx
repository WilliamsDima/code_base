/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from "react"
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material/"
import { useTheme } from "@mui/material/styles"
import ModeNightIcon from "@mui/icons-material/ModeNight"
import LightModeIcon from "@mui/icons-material/LightMode"
import "./styles.scss"
import { useAuth } from "../../../api/firebase"
import UserInfo from "../../molecules/UserInfo"
import { AppContext } from "../../../context"
import { useActions } from "../../../hooks/useActions"
import { useLocalStorage } from "../../../hooks/useLocalStorage"

const Header = () => {
	const { setUser } = useActions()
	const [, setThemeLocal] = useLocalStorage("themeApp", "")

	const { logout, signIn, user } = useAuth()
	const theme = useTheme()

	const authHandler = async () => {
		user ? logout() : signIn()
		user && setUser(null)
	}

	const colorMode = useContext(AppContext)

	const chandeThemeHandler = () => {
		colorMode.toggleColorMode()

		setThemeLocal(theme.palette.mode === "dark" ? "light" : "dark")
	}

	useEffect(() => {
		// console.log('Header');

		setUser(user)
	}, [user])

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static' sx={{ zIndex: 100 }}>
				<Toolbar>
					<Typography
						variant='h3'
						fontWeight={500}
						component='p'
						className='logo'
						sx={{ flexGrow: 1 }}
					>
						CODE BASE
					</Typography>

					<Button
						sx={{
							borderRadius: "50%",
							height: "50px",
							minWidth: "50px",
							mr: 2,
						}}
						onClick={chandeThemeHandler}
						className={
							theme.palette.mode === "dark" ? "theme_app dark" : "theme_app"
						}
					>
						<div className='moon' color='primary'>
							<ModeNightIcon sx={{ fontSize: 30, color: "#2EE5AC" }} />
						</div>
						<div className='sun' color='primary'>
							<LightModeIcon sx={{ fontSize: 30, color: "#2EE5AC" }} />
						</div>
					</Button>

					{user ? (
						<UserInfo logout={logout} />
					) : (
						<Button onClick={authHandler} color='inherit'>
							??????????
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Header
