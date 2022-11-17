import React from "react"
import Filter from "../../molecules/Filter"
import MainList from "../MainList"
import './styles.scss'


const Main = () => {


  return (
    <div className="main">
      <Filter />
      <MainList />
    </div>
  )
}

export default Main
