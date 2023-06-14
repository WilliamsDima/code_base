import { Route, Routes } from 'react-router-dom'
import Home from '../screens/Home'
import NotFount from '../screens/NotFound'
import { RoutesNames } from './routes-names'
import Auth from '@screens/Auth'

const Navigations = (props: any) => {
  return (
    <>
      <Routes>
        <Route path={RoutesNames.Home} element={<Home />} />
        <Route path={RoutesNames.Auth} element={<Auth />} />

        {/* 404 page */}
        <Route path="*" element={<NotFount />} />
      </Routes>
    </>
  )
}

export default Navigations
