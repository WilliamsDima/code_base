import React, { useEffect } from "react"
import './styles.scss'
import { useAppDispatch } from "../../../hooks/hooks"
import { setUser } from "../../../store/redusers/main/main"
import { useAuth } from "../../../api/firebase"
import UserInfo from "../../molecules/UserInfo"
import { Button } from "@mui/material"


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
    <header className="header">

        <div className="logo">
          <p>code base</p>
        </div>

        <div className="auth">

          {user ? <UserInfo logout={logout}/> : <Button onClick={authHandler} 
          variant="contained" 
          size="large">
            Войти
        </Button>}

        </div>

    </header>
  )
}

export default Header
