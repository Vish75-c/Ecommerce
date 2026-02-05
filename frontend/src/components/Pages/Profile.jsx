import React from 'react'
import { Link } from 'react-router-dom'
import MyOrder from '../Layout/MyOrder'
import { logout } from '../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
const Profile = () => {
  const dispatch=useDispatch();
  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <>
      <div className='flex min-h-screen mt-14'>
        <div className=' container mx-auto'>
            <div className='flex flex-col md:flex-row p-6 '>
                {/* Left Section */}
                <div className='flex flex-col w-full md:w-1/3 lg:w-1/4 md:space-x-6 shadow-md p-6 rounded-lg'>
                <h1 className='text-3xl font-bold mb-1'>John Doe</h1>
                <p className='text-lg font-bold mb-4'>johndoe123@gmail.com</p>
                <Link onClick={handleLogout} to='/login' className='w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md text-center text-white'>Logout</Link>
                </div>
                {/* Right Section */}
                <div className='w-full md:w-2/3 lg:3/4 md:p-6'>
                <MyOrder/>
                </div>
            </div>

    
        </div>
      </div>
    
    </>
  )
}

export default Profile
