import React from "react"
import { useAppSelector } from "../../../hooks/hooks"

const UserInfo = () => {

  const { user } = useAppSelector(store => store.main)

  return (
    <div className="">
        <p>{user?.displayName}</p>
    </div>
  )
}

export default UserInfo
