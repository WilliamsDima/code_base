import React, { useState, useEffect } from "react"
import ModalForm from "../ModalForm"
import {Fab} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import './styles.scss'
import { IItemCode } from "../../../services/types"
import { addCode, getDataUser, useAuth } from "../../../api/firebase"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { setCodeBase } from "../../../store/redusers/main/main"
import { ref, uploadBytes } from 'firebase/storage'
import { v4 } from 'uuid'


const Filter = () => {

  const dispatch = useAppDispatch()
  const { codeBase } = useAppSelector(store => store.main)

  const [isModalOpen, setModalOpen] = useState(false)

  const { user, storage } = useAuth()

  const getDataHandler = async () => {
    if (user) {
      const res = await getDataUser(user)
      dispatch(setCodeBase(res?.codes))
    }
  }

  const submit = (item: IItemCode, file: any[]) => {

    if (user) {
      const pathToFile = user?.providerData[0].uid

      addCode(user, [...codeBase, item])

      file.forEach((img: any) => {

        const imgeRef = ref(storage, `images-${pathToFile}/${item.id}/${img.name + v4()}`)
        uploadBytes(imgeRef, img)
      });
    }
    getDataHandler()
  }

  useEffect(() => {
    
    getDataHandler()

  }, [])

  return (
    <div className="filter-content">

      <ModalForm show={isModalOpen} setShow={setModalOpen} submit={submit}/>


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
