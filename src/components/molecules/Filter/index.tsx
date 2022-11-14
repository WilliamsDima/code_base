import React, { useState } from "react"
import ModalForm from "../ModalForm"
import {Icon, IconButton} from '@mui/material'
import { green } from '@mui/material/colors'
import './styles.scss'


const Filter = () => {

  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="filter-content">

      <ModalForm show={isModalOpen} setShow={setModalOpen}/>


      <div className="filter-content_addBtn">
        <IconButton onClick={() => setModalOpen(true)} >
          <Icon fontSize="large" sx={{ color: green[500], fontSize: 80 }}>add_circle</Icon>
        </IconButton>
      </div>

    </div>
  )
}

export default Filter
