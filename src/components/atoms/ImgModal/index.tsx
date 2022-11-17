import React, { FC, useState } from "react"
import { Modal, Backdrop, Fade } from '@mui/material'
import './styles.scss';

type IModal = {
  open: boolean
  handleClose: () => void
  image: string | null
}

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundcolor: "red"
    },
  },
};


const ImgModal: FC<IModal> = ({open, handleClose, image}) => {


  return (
    <Modal
      sx={styles.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500
      }}
  >
    <Fade in={open} timeout={500} className="img_fade">
      <img
        src={image || ''}
        alt="asd"
        style={{ maxHeight: "90%", maxWidth: "90%" }}
      />
    </Fade>
  </Modal>
  )
}

export default ImgModal
