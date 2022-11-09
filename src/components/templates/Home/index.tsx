import React from "react"
import './styles.scss'
import { useAppSelector } from "../../../hooks/hooks"
import Empty from "../../atoms/Empty"
import Main from "../../organisms/Main"

const HomeTemplate = () => {

  const { user } = useAppSelector(store => store.main)

  return (
    <div className="content">
        {user ? <Main /> :  <Empty />}
    </div>
  )
}

export default HomeTemplate
