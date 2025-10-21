import React, { useEffect, useState } from "react";

const AdminUsers = () => {
  const [user, setuser] = useState([]);
  const [userdetail,setuserdetail]=useState({
    name:"",
    email:"",
    password:"",
    role:"customer"
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
    setuser((prevUsers) => [ {...userdetail},...prevUsers]);
    setuserdetail({
      name:"",
      role:"customer",
      password:"",
      email:""
    })
  }
  const handleDelete=(email)=>{
    console.log(email);
    console.log("Clicked");
    setuser((prev)=>prev.filter((item)=>item.email!==email))
    
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
              className="p-1 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Email</label>
            <input
              type="email"
              name="email"
              required={true}
              value={userdetail.email}
              onChange={handlechange}
              className="p-1 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
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
              className="p-1 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="block text-black mb-2 font-bold">Role</label>
            <select name="role" value={userdetail.role} onChange={handlechange} className="p-2 text-gray-500 w-[70%] outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300">
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <input type="submit" className="bg-green-600 text-white px-6 py-1 rounded-lg"/>
        </form>
      </div>
      <div className="relative overflow-hidden rounded-lg mt-10 w-full bg-gray-50 overflow-x-scroll md:overflow-x-hidden shadow-lg">
        <table className="w-full  ">
          <thead>
            <tr className="bg-gray-200">
              <td className="px-2 py-2 text-center font-bold text-md">Name</td>
              <td className="px-2 py-2 text-center font-bold text-md">Email</td>
              <td className="px-2 py-2 text-center font-bold text-md">Role</td>
              <td className="px-2 py-2 text-center font-bold text-md">Action</td>
            </tr>
          </thead>
          <tbody>
            {user.length>0&&user.map((item,index)=>{
              return (<tr key={index}>
                <td className="px-2 text-center py-2 font-bold text-gray-500">{item.name}</td>
                <td className="px-2 text-center py-2 font-bold text-gray-500">{item.email}</td>
                <td className="px-2 text-center py-2 font-bold text-gray-500">{item.role}</td>
                <td className="px-2 text-center py-2 font-bold text-gray-500">
                  <button onClick={()=>handleDelete(item.email)} className="text-white bg-red-500 hover:bg-red-600 rounded-lg  font-bold px-6 text-sm py-1">Delete</button>
                </td>
              </tr>)
            })}
            {user.length==0&&<h1 className="mt-4 font-bold text-2xl ml-4 mb-4">No Records Found</h1>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
