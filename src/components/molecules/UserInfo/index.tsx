import React, { FC } from "react"
import { useAppSelector } from "../../../hooks/hooks"
import { Button, Menu, MenuItem, Avatar, Typography } from "@mui/material"
import './styles.scss'

interface IUserInfo {
  logout: () => void
}

const UserInfo: FC<IUserInfo> = ({logout}) => {

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    logout()
  }

  const { user } = useAppSelector(store => store.main)

  return (
    <div className="user" >
        <Typography className="user_name" variant="h4" component="p" sx={{mr: 2}}>
          {user?.displayName}
        </Typography>

        <Button className="avatar" onClick={handleClick}>
          <Avatar
            src={user?.photoURL?.toString()}
          />
        </Button>

        <div>
          <Menu
            id="user-menu"
            sx={{mt: 2}}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={logoutHandler}>
              <Typography variant="button" component="p">
                Выйти
              </Typography>
            </MenuItem>
          </Menu>
        </div>

    </div>
  )
}

export default UserInfo
