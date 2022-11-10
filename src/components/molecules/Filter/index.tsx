import { Button } from "@mui/material"
import React, { useState } from "react"
import ModalForm from "../ModalForm"
import './styles.scss'


const Filter = () => {

  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="filter-content">

      <ModalForm show={isModalOpen} setShow={setModalOpen}/>


      <div className="filter-content_item">
        <Button onClick={() => setModalOpen(true)} 
        variant="contained" 
        size="large">
          добавить
        </Button>
      </div>

    </div>
  )
}

export default Filter
