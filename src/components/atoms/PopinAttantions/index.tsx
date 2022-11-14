import React, { FC } from "react"
import './styles.scss'
import { green, red } from '@mui/material/colors'
import {Modal, Box, Typography, TextField, Button, Input, Icon, IconButton} from '@mui/material'

const style = {
  box: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 4,
  },
  text: {
    flexGrow: 1, 
    mb: 1,
    opacity: 0.5,
  }
}


interface IPopinAttantions {
  show: boolean
  setShow: ((target: any) => any)
  text: string
}

const PopinAttantions: FC<IPopinAttantions> = React.forwardRef(({ show, setShow, text }) => {

  return (

    <div>
    <Modal
      keepMounted
      sx={{zIndex: 1000}}
      open={show}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style.box}>
        <Typography variant="h3" fontWeight={500} component="p" sx={style.text}>
            {text}
        </Typography>

        <div className="btns">

          <IconButton onClick={() => setShow(false)} >
            <Icon fontSize="large" sx={{ color: red[500], fontSize: 50 }}>close</Icon>
          </IconButton>

          <IconButton onClick={() => setShow(true)} >
            <Icon fontSize="large" sx={{ color: green[500], fontSize: 50 }}>done</Icon>
          </IconButton>

        </div>

      </Box>
    </Modal>
  </div>
  )
})

export default PopinAttantions
