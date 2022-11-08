import './App.scss'
import { Provider } from 'react-redux'
import { store } from './store/index'
import Navigations from './navigations/routes'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navigations />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
