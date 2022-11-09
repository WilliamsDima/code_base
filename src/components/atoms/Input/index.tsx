import React, { FC } from "react"
import './styles.scss';

interface IInput {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => string
  value?: string
}

const Input: FC<IInput> = (props) => {

  const {value, onChange} = props

  return (
    <>
      <input 
      className="input" 
      value={value}
      onChange={onChange}
      {...props} />
    </>
  )
}

export default Input
