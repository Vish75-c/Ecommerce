import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [user, setuser] = useState([]);
  const [userdetail,setuserdetail]=useState({
    name:"",
    email:"",
    password:"",
    role:""
  })
  useEffect(()=>{
    console.log(user);
  },[user])
  const handlechange=(e)=>{
    const dub={...userdetail}
    dub[e.target.name]=e.target.value
    setuserdetail(dub);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    setuser((prevUsers) => [...prevUsers, {userdetail}]);
    
    setuserdetail({
      name:"",
      role:"customer",
      password:"",
      email:""
    })
    
  }
  
  return (
    <div className="max-w-6xl mx-auto p-6 py-10 tracking-tighter flex flex-col">
      <h1 className="text-2xl font-extrabold mb-8">User Management</h1>
      <div className="p-4 flex flex-col">
        <h1 className="text-xl font-extrabold mb-4">Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Name</label>
            <input
              type="text"
              required={true}
              name="name"
              value={userdetail.name}
              onChange={handlechange}
              className="p-1 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring ring-4 focus:ring-gray-500 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Email</label>
            <input
              type="text"
              name="email"
              required={true}
              value={userdetail.email}
              onChange={handlechange}
              className="p-1 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring ring-4 focus:ring-gray-500 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Password</label>
            <input
              type="text"
              name="password"
              required={true}
              value={userdetail.password}
              onChange={handlechange}
              className="p-1 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring ring-4 focus:ring-gray-500 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="block text-black mb-2 font-bold">Role</label>
            <select name="role" value={userdetail.role} onChange={handlechange} className="p-2 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring ring-4 focus:ring-gray-500 transition-all duration-300">
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <input type="submit" className="bg-green-600 text-white px-6 py-1 rounded-lg"/>
        </form>
      </div>
    </div>
  );
};

export default AdminUsers;
