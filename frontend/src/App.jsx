import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserLayout/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      {/*  */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
