import React, { useState } from "react";
import img from "../../assets/register.webp";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/slices/authSlice.js";
const Register = () => {
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const dispatch=useDispatch();
    const handlesubmit=(e)=>{
        e.preventDefault();
        dispatch(registerUser({name,email,password}));


    }
  return (
    <>
      
      <div className="md:flex flex-row mt-10">
        <div className=" w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <form onSubmit={(e)=>handlesubmit(e)} className=" p-8 rounded-lg flex flex-col justify-center items-center max-w-md shadow-md border border-gray-300">
            <h1 className="font-bold text-xl mb-4"><span className='text-xl'>ꙮ</span>BuyHive</h1>
            <h1 className="text-xl font-bold mb-3">Hey there!👋🏻</h1>
            <p className=" font-semibold mb-4">Enter your name,email and password to register.</p>
            <div className="w-full mb-4">
                <label className="block font-bold mb-1">Name</label>
                <input type="text" onChange={(e)=>setname(e.target.value)} placeholder="Enter your name" value={name} className="py-2 px-4 w-full outline-none border text-sm border-gray-200 rounded-md" required={true}/>
            </div>
            <div className="w-full mb-4">
                <label className="block font-bold mb-1">Email</label>
                <input type="text" onChange={(e)=>setemail(e.target.value)} placeholder="Enter your email" value={email} className="py-2 px-4 w-full outline-none border text-sm border-gray-200 rounded-md" required={true}/>
            </div>
            <div className="w-full mb-4">
                <label className="block font-bold mb-1">Password</label>
                <input type="text" onChange={(e)=>setpassword(e.target.value)} placeholder="Enter your password" value={password} className="py-2 px-4 w-full outline-none border text-sm border-gray-200 rounded-md" required={true}/>
            </div>
            <button type="submit" className="py-2 px-4 w-full text-white bg-black rounded-md text-center text-sm mb-4">Sign In</button>

            <div className="mb-4 w-full text-sm text-center flex justify-center font-medium">
                <p className="">Already have an account? </p>
                <Link to="/login" className=" text-blue-500">Login</Link>
            </div>
        </form>
        </div>
        <div className="w-1/2 hidden md:flex  ">
          <img
            src={img}
            alt="login-Img"
            className="w-full h-[650px] object-cover"
          />
        </div>
      </div>

     
    </>
  );
};

export default Register;
