import React, { FC } from "react"
import './styles.scss'
import {Modal, Box, Typography} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

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
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  </div>
  )
})

export default ModalForm
