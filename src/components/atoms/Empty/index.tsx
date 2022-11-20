import React, { FC } from "react"
import {Typography} from '@mui/material'
import './styles.scss'

interface IEmpty {
  
}

const Empty: FC<IEmpty> = () => {


  return (
    <div className="empty">
        <Typography variant="h3" fontWeight={500} component="p" sx={{color: 'text.primary', textAlign: 'center'}}>
          не авторизован
        </Typography>
        <img src={require('../../../assets/images/empty.png')} />
    </div>
  )
}

export default Empty
