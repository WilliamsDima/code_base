import React, { FC, useState, useEffect } from "react"
import './styles.scss'
import { green } from '@mui/material/colors'
import {Modal, Box, Typography, TextField, Button, Input, Icon, IconButton, InputAdornment, Chip} from '@mui/material'
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
  },
}


type IModalForm = {
  show: boolean
  setShow: ((target: any) => any)
}

type ITag = {
  id: number
  value: string
}

const ModalForm: FC<IModalForm> = React.forwardRef(({ show, setShow }) => {

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
  const [file, setFile] = useState<any>([])

  const dragHandler = (e: any, value: boolean) => {
    e.preventDefault()
    setDrag(value)
  }

  const onDropHandler = (e: any) => {
    // console.log(e.target.value);
    // const url = URL.createObjectURL(e.target.files[0])
    
    const files = [...e?.target?.files]

    setFile(files)
    setDrag(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, func: any) => {
    func(event.target.value)
  }

  const closeHandler = (value: boolean) => {
    if (value) {
      setShow(false)
      setShowAttantion(false)
      // все закрывается и отчищается

      setTitle('')
      setDescription('')
      setTagText('')
      setTags([])
      // ...
    } else {
      // закрывается предупреждение
      setShowAttantion(false)
    }
  }

  const addHandler = () => {
    setShow(false)
  }

  const keyPress = (e: any) => {
    if (e.keyCode == 13) {

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
            * Ключевые слова по которым можно будет найти - Enter для добавления
        </Typography>

        <TextField 
        color="success"
        fullWidth
        value={tagText}
        onChange={(event) => handleChange(event, setTagText)}
        error={tagText.length > maxTagsText}
        onKeyDown={keyPress}
        InputProps={{
          style: style.input,
          endAdornment: <InputAdornment position="end">{tagText.length}/{maxTagsText}</InputAdornment>,
        }}
        sx={{mb: 3}}
        label="Ключевые слова" 
        variant="filled" 
        size="small"/>

        {!!tags.length && <div className={ tags.length > maxTags ? "tags_list error" : "tags_list"}>
          {tags.map((item: ITag) => {
            return <Chip 
            key={item.id} 
            label={item.value} 
            sx={{mr: 1, mb: 1, fontSize: 14}}
            variant="outlined" 
            onDelete={() => deleteTag(item.id)} />
          })}
          <Typography 
          sx={{mt: -1}}
          fontWeight={500} 
          variant="h5" 
          component="p">
            {tags.length}/{maxTags}
          </Typography>
        </div>}


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
        value={code}
        onChange={(event) => handleChange(event, setCode)}
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

          <div style={{width: '90%'}}>
            <Typography fontWeight={500} component="p" sx={style.note}>
                * Скриншот (необязательно) .png, .jpg, .jpeg
            </Typography>

            {drag ? 
            
            <div 
            onDragStart={(e) => dragHandler(e, true)}
            onDragOver={(e) => dragHandler(e, false)}
            onDragLeave={(e) => dragHandler(e, true)}
            className="grag">
              <input 
              accept=".png, .jpg, .jpeg"
              type="file" 
              multiple={true}
              onDrop={onDropHandler}
              onChange={onDropHandler}/>
              Отпустите файл для загрузки</div> 

            : <div 
            onDragStart={(e) => dragHandler(e, true)}
            onDragOver={(e) => dragHandler(e, false)}
            onDragLeave={(e) => dragHandler(e, true)}
            className="grag">
              <input 
              accept=".png, .jpg, .jpeg"
              multiple={true}
              type="file" 
              onDrop={onDropHandler}
              onChange={onDropHandler}/>
              перетащите файл для загрузки</div>}
            
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
