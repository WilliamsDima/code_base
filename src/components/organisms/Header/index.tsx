import React, { useEffect } from "react"
import {AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material/'
import { useTheme } from '@mui/material/styles'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import LightModeIcon from '@mui/icons-material/LightMode'
import './styles.scss'
import { useAppDispatch } from "../../../hooks/hooks"
import { setUser } from "../../../store/redusers/main/main"
import { useAuth } from "../../../api/firebase"
import UserInfo from "../../molecules/UserInfo"
import { AppContext } from "../../../context"


const Header = () => {

  const dispatch = useAppDispatch()

  const { logout, signIn, user } = useAuth()
  const theme = useTheme();

  const authHandler = async () => {
    user ? logout() : signIn()
    user && dispatch(setUser(null))
  }

  const colorMode = React.useContext(AppContext)

  const chandeThemeHandler = () => {
    colorMode.toggleColorMode()
    localStorage.setItem('themeApp', theme.palette.mode === 'dark' ? 'light' : 'dark')
  }


  useEffect(() => {

    console.log('Header');

    
    dispatch(setUser(user))

  }, [user])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{zIndex: 100}}>
        <Toolbar>
          <Typography 
          variant="h3" 
          fontWeight={500} 
          component="p" 
          className="logo"
          sx={{ flexGrow: 1 }}>
            CODE BASE
          </Typography>

          <Button 
          sx={{borderRadius: '50%', height: '50px', minWidth: '50px', mr: 2}}
          onClick={chandeThemeHandler}
          className={theme.palette.mode === 'dark' ? "theme_app dark" : "theme_app"}>
            <IconButton 
            className="moon"
            color="primary">
              <ModeNightIcon sx={{fontSize: 30, color: '#2EE5AC'}}/>
            </IconButton>

            <IconButton 
            className="sun"
            color="primary">
              <LightModeIcon sx={{fontSize: 30, color: '#2EE5AC'}}/>
            </IconButton>
          </Button>

          {user ? <UserInfo logout={logout}/> : <Button 
          onClick={authHandler}
          color="inherit">Войти</Button>}

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
