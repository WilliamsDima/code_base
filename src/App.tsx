import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import Navigations from './navigations/routes'
import { AppProvider } from '@context/appContext'
import { AuthProvider } from '@hooks/useAuth'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppProvider>
          <AuthProvider>
            <Navigations />
          </AuthProvider>
        </AppProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
