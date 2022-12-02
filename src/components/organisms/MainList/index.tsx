import React, { useEffect } from "react"
import { Box, Typography, Zoom, IconButton } from '@mui/material/'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import './styles.scss'
import { useAppSelector } from "../../../hooks/hooks"
import CardItem from "../CardItem"


const MainList = () => {

  const { filterList } = useAppSelector(store => store.main)

  const scrollToHandler = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  const [scroll, setScroll] = React.useState(false)

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScroll(true)
    }

    if (window.scrollY < 200) {
      setScroll(false)
    }
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  useEffect(() => {
    console.log('filterList')
  }, [filterList])

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
        {filterList && !!filterList.length ? filterList.map((item) => {
          return <CardItem key={item.id} item={item}/>
        }) : <div className="empty_list">
            
          <Typography 
          sx={{mt: '20%'}}
          variant="h2" 
          color="text.secondary">
            нет записей
          </Typography>
        </div>}

        <Zoom in={scroll} style={{ transitionDelay: scroll ? '500ms' : '0ms' }}>
          <IconButton 
          sx={{position: 'fixed', right: '3rem', bottom: '5rem'}}
          color="primary" 
          aria-label="add" 
          onClick={scrollToHandler}>
            <ExpandLessIcon sx={{fontSize: 40, color: '#2EE5AC'}}/>
          </IconButton>
        </Zoom>
    </Box>
  )
}

export default MainList
