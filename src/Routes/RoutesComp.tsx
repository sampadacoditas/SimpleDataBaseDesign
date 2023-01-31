import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import { AppContext } from '../Context/AppContext'

const RoutesComp: React.FC = () => {
  const { appState } = useContext(AppContext);
  const { loginData } = appState
  const { isLogin } = loginData

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        {isLogin &&
          <Route path='/home' element={<Home />} />
        }
      </Routes>
    </>
  )
}

export default RoutesComp