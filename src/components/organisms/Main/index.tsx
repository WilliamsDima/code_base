import React from "react"
import Filter from "../../molecules/Filter"
import MainList from "../MainList"
import { CircularProgress } from "@mui/material"
import './styles.scss'
import { useAppSelector } from "../../../hooks/hooks"


const Main = () => {

  const { codeBase } = useAppSelector(store => store.main)

  return (
    <div className="main">
            
      <Filter />
      {codeBase === null ? 
      <CircularProgress 
      style={{width: 70, height: 70, marginTop: '20%'}}
      color="success" /> 
      : <MainList />}
      
    </div>
  )
}

export default Main
