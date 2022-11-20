import React from "react"
import Header from "../../components/organisms/Header"
import HomeTemplate from "../../components/templates/Home"
import { useTheme } from '@mui/material/styles'
import { Box } from "@mui/material"

const Home = () => {

  const theme = useTheme();

  return (
    <Box sx={{maxWidth: '100vw', minHeight: '100vh', 
    bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'background.paper'}}>
        <Header />
        <HomeTemplate />
    </Box>
  )
}

export default Home
