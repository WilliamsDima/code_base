import React, { useState } from "react"
import ModalForm from "../ModalForm"
import {Icon, IconButton, Fab} from '@mui/material'
import { green } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add';
import './styles.scss'


const Filter = () => {

  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <div className="filter-content">

      <ModalForm show={isModalOpen} setShow={setModalOpen}/>


      <div className="filter-content_addBtn">
        <Fab 
        size="large"
        color="primary"
        aria-label="add" 
        onClick={() => setModalOpen(true)}>
          <AddIcon sx={{fontSize: 30}}/>
        </Fab>
      </div>

    </div>
  )
}

export default Filter
