import React, { useEffect } from "react"
import { Box } from '@mui/material/'
import './styles.scss'
import { useAppSelector } from "../../../hooks/hooks"
import CardItem from "../../atoms/CardItem"


const MainList = () => {

  const { codeBase } = useAppSelector(store => store.main)
  
  useEffect(() => {

    console.log('codeBase', codeBase);
  }, [codeBase])

  return (
    <Box sx={{ flexGrow: 1 }}>
        {!!codeBase.length ? codeBase.map((item) => {
          return <CardItem key={item.id} item={item}/>
        }) : <div>empty</div>}
    </Box>
  )
}

export default MainList
