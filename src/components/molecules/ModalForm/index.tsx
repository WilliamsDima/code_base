import React, { FC, useState, useEffect } from "react"
import './styles.scss'
import { green } from '@mui/material/colors'
import {Modal, Box, Typography, TextField, Button, Input, Icon, IconButton, InputAdornment} from '@mui/material'
import Highlight from 'react-highlight'
import "../../../../node_modules/highlight.js/styles/tomorrow.css"
import PopinAttantions from "../../atoms/PopinAttantions"

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
    p: 4,
  },
  input:{
    fontSize: 20,
    mb: 3,
  },
  note: {
    flexGrow: 1, 
    mb: 1,
    opacity: 0.5,
  }
}


interface IModalForm {
  show: boolean
  setShow: ((target: any) => any)
}

const ModalForm: FC<IModalForm> = React.forwardRef(({ show, setShow }) => {

  const [showAttantion, setShowAttantion] = useState(false)

  const maxTitle = 80
  const [title, setTitle] = useState('')

  const maxDescription = 500
  const [description, setDescription] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: any) => {
    func(event.target.value)
  }

  const closeHandler = (value: boolean) => {
    if (value) {
      setShow(false)
      setShowAttantion(false)
      // все закрывается и отчищается

      setTitle('')
      // ...
    } else {
      // закрывается предупреждение
      setShowAttantion(false)
    }
  }

  const addHandler = () => {
    setShow(false)
  }

  return (

    <div>

    <PopinAttantions 
    show={showAttantion} 
    text={'Вы уверены что хотите закрыть? Все данные будут стёрты.'}
    setShow={closeHandler}/>

    <Modal
      keepMounted
      sx={{zIndex: 100}}
      open={show}
      onClose={() => setShowAttantion(true)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style.box}>
        <Typography fontWeight={500} component="p" sx={style.note}>
            * Краткое описание кода
        </Typography>
        <TextField 
        color="success"
        error={title.length > maxTitle}
        value={title}
        onChange={(event) => handleChange(event, setTitle)}
        fullWidth
        InputProps={{
          style: style.input,
          endAdornment: <InputAdornment position="end">{title.length}/{maxTitle}</InputAdornment>,
        }}
        sx={{mb: 3}}
        label="Заголовок" 
        variant="filled" 
        size="small"/>

        <Typography fontWeight={500} component="p" sx={style.note}>
            * Ключевые слова по которым можно будет найти
        </Typography>

        <TextField 
        color="success"
        fullWidth
        InputProps={{
          style: style.input,
          endAdornment: <InputAdornment position="end">0/100</InputAdornment>,
        }}
        sx={{mb: 3}}
        label="Ключевые слова" 
        variant="filled" 
        size="small"/>

        <Typography fontWeight={500} component="p" sx={style.note}>
            * Развернутое описание
        </Typography>

        <TextField 
        error={description.length > maxDescription}
        value={description}
        onChange={(event) => handleChange(event, setDescription)}
        color="success"
        fullWidth
        InputProps={{
          style: style.input,
          endAdornment: <InputAdornment position="end">{description.length}/{maxDescription}</InputAdornment>,
        }}
        sx={{mb: 3}}
        multiline
        label="Описание" 
        variant="filled" 
        size="medium"/>

        <Typography fontWeight={500} component="p" sx={style.note}>
            * Пример кода (необязательно)
        </Typography>

        <TextField 
        color="success"
        fullWidth
        InputProps={{
          style: style.input,
        }}
        sx={{mb: 3}}
        multiline
        label="Код" 
        variant="filled" 
        size="medium"/>

{/* <div className='language-javascript-of-snippet'>
<Highlight
language="javascript" >
{`const test = () => {
  return 'hello'
}`}
</Highlight>
</div> */}

        <div className="btns">

          <div>
            <Typography fontWeight={500} component="p" sx={style.note}>
                * Скриншот (необязательно)
            </Typography>
            <Input type="file" />
          </div>

          <IconButton onClick={addHandler} >
            <Icon fontSize="large" sx={{ color: green[500], fontSize: 50 }}>done</Icon>
          </IconButton>

        </div>
      </Box>
    </Modal>
  </div>
  )
})

export default ModalForm
