import React, { useEffect } from "react"
import {AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material/';
import './styles.scss'
import { useAppDispatch } from "../../../hooks/hooks"
import { setUser } from "../../../store/redusers/main/main"
import { useAuth } from "../../../api/firebase"
import UserInfo from "../../molecules/UserInfo"


const Header = () => {

  const dispatch = useAppDispatch()

  const { logout, signIn, user } = useAuth()

  const authHandler = async () => {
    user ? logout() : signIn()
    user && dispatch(setUser(null))
  }


  useEffect(() => {

    console.log('Header');

    dispatch(setUser(user))

  }, [user])


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h3" fontWeight={500} component="p" sx={{ flexGrow: 1 }}>
            CODE BASE
          </Typography>

          {user ? <UserInfo logout={logout}/> : <Button 
          onClick={authHandler}
          color="inherit">Войти</Button>}

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
