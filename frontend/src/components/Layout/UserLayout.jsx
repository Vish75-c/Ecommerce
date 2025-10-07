import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Home from '../Pages/Home'
const UserLayout = () => {
  return (
    <>
    {/* Header */}
    <Header/>
    {/* Main Content */}
    <Home/>
    {/* Footer Section */}
     <Footer/> 
    </>
  )
}

export default UserLayout
