import React from 'react'
import './App.scss'
import { Provider } from 'react-redux'
import { store } from './store/index'
import Navigations from './navigations/routes'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { AppContext } from './context'
import { useThemeApp } from './services/themeController'

function App() {

  const {colorMode, theme} = useThemeApp()


  return (
    <AppContext.Provider value={colorMode}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Navigations />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
