import React, { useEffect } from "react"
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
    <header className="header">

        <div className="auth">

          <UserInfo />

          <button onClick={authHandler}>
            {user ? <span>выйти</span> : <span>Войти</span>}
          </button>
        </div>

    </header>
  )
}

export default Header
