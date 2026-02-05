import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, deleteUser } from "../../redux/slices/adminSlice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  const [userdetail, setuserdetail] = useState({
    name: "",
    email: "",
    password: "",
    role: "Customer",
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setuserdetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(userdetail)).then(() => {
      setuserdetail({
        name: "",
        email: "",
        password: "",
        role: "Customer",
      });
      dispatch(fetchUsers()); // refresh list after adding
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser({ id }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 py-10 tracking-tighter flex flex-col">
      <h1 className="text-2xl font-extrabold mb-8">User Management</h1>

      {/* ✅ ADD USER FORM */}
      <div className="p-4 flex flex-col">
        <h1 className="text-xl font-extrabold mb-4">Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Name</label>
            <input
              type="text"
              required
              name="name"
              value={userdetail.name}
              onChange={handlechange}
              className="p-1 text-gray-500 w-full outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Email</label>
            <input
              type="email"
              required
              name="email"
              value={userdetail.email}
              onChange={handlechange}
              className="p-1 text-gray-500 w-full outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="block text-black mb-2 font-bold">Password</label>
            <input
              type="text"
              required
              name="password"
              value={userdetail.password}
              onChange={handlechange}
              className="p-1 text-gray-500 w-full outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label className="block text-black mb-2 font-bold">Role</label>
            <select
              name="role"
              value={userdetail.role}
              onChange={handlechange}
              className="p-2 text-gray-500 w-full outline-none border rounded-md border-gray-200 focus:ring-2 focus:ring-gray-200 transition-all duration-300"
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <input
            type="submit"
            value={loading ? "Adding..." : "Add User"}
            disabled={loading}
            className="bg-green-600 text-white px-6 py-1 rounded-lg cursor-pointer disabled:opacity-60"
          />
        </form>
      </div>

      {/* ✅ USER TABLE */}
      <div className="relative overflow-hidden rounded-lg mt-10 w-full bg-gray-50 overflow-x-scroll md:overflow-x-hidden shadow-lg">
        {loading ? (
          <div className="text-center py-4 font-semibold text-gray-500">
            Loading users...
          </div>
        ) : error ? (
          <div className="text-center py-4 font-semibold text-red-500">
            {error}
          </div>
        ) : users.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <td className="px-2 py-2 text-center font-bold text-md">Name</td>
                <td className="px-2 py-2 text-center font-bold text-md">Email</td>
                <td className="px-2 py-2 text-center font-bold text-md">Role</td>
                <td className="px-2 py-2 text-center font-bold text-md">Action</td>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="px-2 text-center py-2 font-bold text-gray-500">
                    {item.name}
                  </td>
                  <td className="px-2 text-center py-2 font-bold text-gray-500">
                    {item.email}
                  </td>
                  <td className="px-2 text-center py-2 font-bold text-gray-500">
                    {item.role}
                  </td>
                  <td className="px-2 text-center py-2 font-bold text-gray-500">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-white bg-red-500 hover:bg-red-600 rounded-lg font-bold px-6 text-sm py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="mt-4 font-bold text-xl ml-4 mb-4">No Records Found</h1>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
