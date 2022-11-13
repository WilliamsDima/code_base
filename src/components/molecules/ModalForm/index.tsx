import React, { FC } from "react"
import './styles.scss'
import {Modal, Box, Typography, TextField, Button} from '@mui/material';

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
    fontSize: 20
  },
}


interface IModalForm {
  show: boolean
  setShow: ((target: any) => any)
}

const ModalForm: FC<IModalForm> = React.forwardRef(({ show, setShow }) => {

  return (

    <div>
    <Modal
      keepMounted
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style.box}>
        <TextField 
        InputProps={{
          style: style.input,
        }}
        sx={{width: '100%'}}
        label="Заголовок" 
        variant="filled" 
        size="small"/>

        <TextField 
        InputProps={{
          style: style.input,
        }}
        sx={{width: '100%', mt: 3}}
        label="Ключевые слова" 
        variant="filled" 
        size="small"/>

        <TextField 
        InputProps={{
          style: style.input,
        }}
        sx={{width: '100%', mt: 3}}
        multiline
        label="Описание" 
        variant="filled" 
        size="medium"/>

        <TextField 
        InputProps={{
          style: style.input,
        }}
        sx={{width: '100%', mt: 3}}
        multiline
        label="Код" 
        variant="filled" 
        size="medium"/>

        <Button onClick={() => setShow(false)} 
        sx={{ mt: 3}}
        variant="contained" 
        size="large">
          Создать
        </Button>

      </Box>
    </Modal>
  </div>
  )
})

export default ModalForm
