import React, { useState } from "react";

const AdminOrder = () => {
  const [orders, setOrders] = useState([
    { id: 101, name: "Sneaker Shoes", price: 2499, action: "Delivered", status: "Completed" },
    { id: 102, name: "Casual Shirt", price: 1399, action: "Pending", status: "Pending" },
    { id: 103, name: "Smart Watch", price: 4999, action: "Undelivered", status: "Cancelled" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((order) => {
      if (order.id === id) {
        let newAction;
        switch (newStatus) {
          case "Pending":
            newAction = "Pending";
            break;
          case "Shipped":
            newAction = "Delivering";
            break;
          case "Completed":
            newAction = "Delivered";
            break;
          case "Cancelled":
            newAction = "Undelivered";
            break;
          default:
            newAction = order.action;
        }
        return { ...order, status: newStatus, action: newAction };
      }
      return order;
    });

    setOrders(updated);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 flex flex-col rounded-xl bg-white">
      <h1 className="text-2xl font-extrabold mb-6 text-black">Orders</h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">ID</th>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Status</th>
              <th className="px-4 py-2 text-left font-semibold">Action</th>
              <th className="px-4 py-2 text-left font-semibold">Price</th>
            </tr>
          </thead>

          <tbody className="font-bold  text-gray-500">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-all duration-200`}
              >
                <td className="px-4 py-3 text-gray-700">{order.id}</td>
                <td className="px-4 py-3 text-gray-700">{order.name}</td>

                {/* Status dropdown */}
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md p-1.5 text-sm text-gray-700 outline-none
                               focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Action label (auto updates) */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1.5 rounded-md text-white text-sm font-medium 
                    ${
                      order.action === "Delivered"
                        ? "bg-green-600"
                        : order.action === "Delivering"
                        ? "bg-blue-600"
                        : order.action === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {order.action}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700 font-semibold">
                  ${order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrder;
