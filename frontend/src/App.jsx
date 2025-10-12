import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import Profile from './components/Pages/Profile'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UserLayout/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      {/*  */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
