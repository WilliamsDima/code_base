import React, { FC } from "react"
import './styles.scss'

interface IEmpty {
  
}

const Empty: FC<IEmpty> = () => {


  return (
    <div className="empty">
        <p>не авторизован</p>
        <img src={require('../../../assets/images/empty.png')} />
    </div>
  )
}

export default Empty
