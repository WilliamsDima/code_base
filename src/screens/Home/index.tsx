import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Header from '../../components/organisms/Header'
import HomeTemplate from '../../components/templates/Home'

const Home = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        maxWidth: '100vw',
        minHeight: '100vh',
        bgcolor:
          theme.palette.mode === 'dark' ? 'background.default' : 'lightgray',
      }}
    >
      <Header />
      <HomeTemplate />
    </Box>
  )
}

export default Home
