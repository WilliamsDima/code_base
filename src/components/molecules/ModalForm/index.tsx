import React, { FC, useState } from "react"
import './styles.scss'
import { green } from '@mui/material/colors'
import {Modal, Box, IconButton} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import "../../../../node_modules/highlight.js/styles/tomorrow.css"
import PopinAttantions from "../../atoms/PopinAttantions"
import ModalFormItem from "../../atoms/ModalFormItem"
import Tags from "../../atoms/Tags"
import ImagesList from "../../atoms/ImagesList"
import DropImg from "../../atoms/DropImg"
import { IItemCode, ITag } from "../../../services/types"

type IModalFormItem = {
  id: number
  onChange: (e: any) => any
  keyPress?: (e: any) => any
  text: string
  error?: boolean
  value: any
  maxValue?: number
  label: string
  size?: any
  multiline?: boolean
  children?: React.ReactNode
}

const style = {
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    maxHeight: '75vh',
    p: 4,
    overflowY: 'scroll'
  },
  modal: {
    // top: 1,
    zIndex: 100, 
    // maxHeight: '75vh', 
    // display: 'flex', 
    // justifyContent: 'center', 
    // alignItems: 'center',
  }
}


type IModalForm = {
  show: boolean
  setShow: ((target: any) => any)
  submit: ((item: IItemCode, file: any[]) => any)
}

const ModalForm: FC<IModalForm> = React.forwardRef(({ show, setShow, submit }) => {

    const [showAttantion, setShowAttantion] = useState(false)

    const maxTitle = 80
    const [title, setTitle] = useState('')

    const maxDescription = 500
    const [description, setDescription] = useState('')

    const maxTags = 5
    const maxTagsText = 20
    const [tags, setTags] = useState<ITag[]>([])
    const [tagText, setTagText] = useState('')

    const [code, setCode] = useState('')

    const [drag, setDrag] = useState(false)
    const maxFiles = 3
    const [file, setFile] = useState<any>([])

    const dragHandler = (e: any, value: boolean) => {
      e.preventDefault()
      setDrag(value)
    }

    const onDropHandler = (e: any) => {
      
      const files = [...e?.target?.files]

      setFile([...file, ...files])
      setDrag(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: any) => {
      func(event.target.value)
    }

    const clear = () => {
      setTitle('')
      setDescription('')
      setTagText('')
      setTags([])
      setFile([])
      setDrag(false)
      setCode('')
    }

    const closeHandler = (value: boolean) => {
      if (value) {
        setShow(false)
        setShowAttantion(false)
        // все закрывается и отчищается
        clear()
        // ...
      } else {
        // закрывается предупреждение
        setShowAttantion(false)
      }
    }

    const keyPress = (e: any) => {
      if (e.keyCode === 13) {

        if (tagText.trim() && tagText.trim().length <= maxTagsText) {
          const tag = {
            id: +new Date(),
            value: tagText
          }
          setTags([...tags, tag])
          setTagText('')
        }
      }
  }

  const deleteTag = (id: number) => {
    const tagsFilter = tags.filter((t) => t.id !== id)
    setTags(tagsFilter)
  }

  const deleteImg = (id: number) => {
    const imgFilter = file.filter((t: any) => t.lastModified !== id)
    setFile([...imgFilter])
  }

  const itemsForm: IModalFormItem[] = [
    {
      id: 1,
      onChange: (e: any) => handleChange(e, setTitle),
      text: '* Краткое описание кода',
      error: title.length > maxTitle,
      value: title,
      maxValue: maxTitle,
      label: "Заголовок",
    },
    {
      id: 2,
      onChange: (e: any) => handleChange(e, setTagText),
      keyPress,
      text: '* Ключевые слова по которым можно будет найти - Enter для добавления',
      error: tagText.length > maxTagsText,
      value: tagText,
      maxValue: maxTagsText,
      label: "Ключевые слова",
      children: !!tags.length && <Tags tags={tags} maxTags={maxTags} deleteTag={deleteTag}/>,
    },
    {
      id: 3,
      onChange: (e: any) => handleChange(e, setDescription),
      text: '* Развернутое описание',
      error: description.length > maxDescription,
      value: description,
      maxValue: maxDescription,
      multiline: true,
      label: "Описание" ,
      size: "medium"
    },
    {
      id: 4,
      onChange: (e: any) => handleChange(e, setCode),
      text: '* Пример кода (необязательно)',
      value: code,
      multiline: true,
      label: "Код" ,
      size: "medium"
    },
  ]

  const submitHandler = () => {

    const done = title.length < maxTitle && title.length > 0
    && tags.length < maxTags && tags.length > 0
    && description.length < maxDescription && description.length > 0

    if (done) {
      const data: IItemCode = {
        id: +new Date(),
        title,
        description,
        code,
        file: [],
        tags,
        copy: 0
      }

      submit(data, file)
      setShow(false)
      clear()
    } else {
      alert('не все поля заполнены!')
    }
  }

  return (

    <div className="modal">

    <PopinAttantions 
    show={showAttantion} 
    text={'Вы уверены что хотите закрыть? Все данные будут стёрты.'}
    setShow={closeHandler}/>

    <Modal
      keepMounted
      sx={style.modal}
      open={show}
      onClose={() => setShowAttantion(true)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style.box} className="modal_content">
        {itemsForm.map((item) => {
          return <ModalFormItem key={item.id} {...item}/>
        })}

        <ImagesList file={file} maxFiles={maxFiles} deleteImg={deleteImg}/>

        <div className="btns">

          <DropImg drag={drag} dragHandler={dragHandler} maxFiles={maxFiles} onDropHandler={onDropHandler}/>

          <IconButton 
            size="large"
            sx={{backgroundColor: green[500], ml: 2}}
            onClick={submitHandler}>

            <DoneIcon sx={{ fontSize: 30}} fontSize="large"/>
          </IconButton>
          
        </div>
      </Box>
    </Modal>
  </div>
  )
})

export default ModalForm
