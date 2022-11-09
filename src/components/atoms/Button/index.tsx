import React, { FC } from "react"
import './styles.scss';

interface IButton {
  onClick?: () => void
  children: React.ReactNode
}

const Button: FC<IButton> = ({onClick, children}) => {


  return (
    <button className="button" onClick={onClick}>
        {children}
    </button>
  )
}

export default Button
