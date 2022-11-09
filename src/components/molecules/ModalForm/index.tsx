import React, { FC } from "react"
import Input from "../../atoms/Input"
import './styles.scss'

interface IModalForm {
  show: boolean
  setShow: ((target: any) => any)
}

const ModalForm: FC<IModalForm> = React.forwardRef(({ show, setShow }) => {


  return (
    <div className={`modal-form ${show ? 'show': ''}`} onClick={setShow}>

      <div className={`modal-form_content`}>

        <div className="modal-form_content_item">
          <p>Заголовок:</p>
          <Input />
        </div>
        
      </div>
       
    </div>
  )
})

export default ModalForm
