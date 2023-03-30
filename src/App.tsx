import './App.scss'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import Navigations from './navigations/routes'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigations />
      </BrowserRouter>
    </Provider>
  )
}

export default App
