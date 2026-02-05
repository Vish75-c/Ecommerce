import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrders,
  deleteOrder,
} from "../../redux/slices/adminOrderSlice";

const AdminOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateOrders({ id, status: { status: newStatus } }));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      dispatch(deleteOrder({ id }));
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 flex flex-col rounded-xl bg-white">
      <h1 className="text-2xl font-extrabold mb-6 text-black">Orders</h1>

      {loading && <p className="text-gray-500">Loading orders...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && orders.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-black">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Order ID</th>
                <th className="px-4 py-2 text-left font-semibold">User</th>
                <th className="px-4 py-2 text-left font-semibold">Total</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
                <th className="px-4 py-2 text-left font-semibold">Delete</th>
              </tr>
            </thead>

            <tbody className="font-bold text-gray-600">
              {orders.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-all duration-200`}
                >
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3">
                    {order.userId?.name || "Unknown"}
                  </td>
                  <td className="px-4 py-3">${order.totalPrice}</td>

                  {/* ✅ Status dropdown */}
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1.5 text-sm text-gray-700 outline-none
                                 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* ✅ Action badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1.5 rounded-md text-white text-sm font-medium 
                      ${
                        order.status === "Delivered"
                          ? "bg-green-600"
                          : order.status === "Shipped"
                          ? "bg-blue-600"
                          : order.status === "Pending"
                          ? "bg-yellow-500"
                          : order.status === "Processing"
                          ? "bg-purple-500"
                          : "bg-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* ✅ Delete button */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500 mt-5">No orders found.</p>
      )}
    </div>
  );
};

export default AdminOrder;
