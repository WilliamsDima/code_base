import React, { FC } from "react"
import { useAppSelector, useOutside } from "../../../hooks/hooks"
import { Button } from "@mui/material"
import './styles.scss'

interface IUserInfo {
  logout: () => void
}

const UserInfo: FC<IUserInfo> = ({logout}) => {

  const {isShow, setIsShow, ref} = useOutside(false);

  const logoutHandler = () => {
    setIsShow(false)
    logout()
  }

  const { user } = useAppSelector(store => store.main)

  return (
    <div className="user" ref={ref} onClick={() => setIsShow(true)}>
        <p className="name">{user?.displayName}</p>

        <div className="avatar">
          <img src={user?.photoURL?.toString()} />
        </div>

        <div className={`popin_user ${isShow && 'show'}`}>
          <Button onClick={logoutHandler} 
            variant="contained" 
            size="large">
              выйти
          </Button>
        </div>

    </div>
  )
}

export default UserInfo
