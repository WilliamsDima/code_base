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
import FilterParams from "../FilterParams"


const Filter = () => {

  const dispatch = useAppDispatch()
  const { codeBase } = useAppSelector(store => store.main)

  const [isModalOpen, setModalOpen] = useState(false)

  const { user, storage } = useAuth()

  const getDataHandler = async () => {

    if (user) {
      const res = await getDataUser(user)

      dispatch(setCodeBase([...res?.codes]))
      
    }
  }

  const submit = async (item: IItemCode, file: any[]) => {

    if (user) {
      const pathToFile = user?.providerData[0].uid

      if (file.length) {
        file.forEach((img: any) => {

          const imgeRef = ref(storage, `images-${pathToFile}/${item.id}/${img.name + v4()}`)
          uploadBytes(imgeRef, img).then(() => {
            console.log('uploadBytes ready')
          }).catch(error => {
            console.log('uploadBytes', error)
          }).finally(() => {
            
            addCode(user, [...codeBase, item])
            getDataHandler()
          })
        })
      } else {
        addCode(user, [...codeBase, item])
        getDataHandler()
      }
    }
  }

  useEffect(() => {
    
    getDataHandler()
    console.log('Filter')
  }, [])

  return (
    <div className="filter-content">

      <FilterParams />
      <ModalForm show={isModalOpen} setShow={setModalOpen} submit={submit}/>


      <div className="filter-content_addBtn">
        <Fab 
        size="large"
        color="primary"
        sx={{bgcolor: 'action.selected',}}
        aria-label="add" 
        onClick={() => setModalOpen(true)}>
          <AddIcon sx={{fontSize: 30, color: '#2EE5AC'}}/>
        </Fab>
      </div>

    </div>
  )
}

export default Filter
