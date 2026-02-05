import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserOrders } from "../../redux/slices/orderSlice";

const MyOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleProduct = (id) => {
    navigate(`/order/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col max-w-7xl mx-auto p-4">
      <h1 className="font-bold text-2xl mb-4">My Orders</h1>

      {/* 🖥️ Table for Desktop */}
      <div className="hidden sm:block shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-gray-700 text-left">
          <thead className="bg-gray-100 uppercase text-sm">
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Shipping</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.length > 0 ? (
              orders.map((item) => {
                const firstItem = item.orderItem?.[0] || {};
                const date = new Date(item.createdAt);
                return (
                  <tr
                    key={item._id}
                    onClick={() => handleProduct(item._id)}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={firstItem.image}
                        alt={firstItem.name}
                        className="w-10 h-10 rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{item._id}</td>
                    <td className="px-4 py-3 text-sm">
                      {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {item.shippingAddress?.city}, {item.shippingAddress?.country}
                    </td>
                    <td className="px-4 py-3 text-sm">{firstItem.quantity}</td>
                    <td className="px-4 py-3 text-sm">${item.totalPrice}</td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-lg text-white text-xs ${
                          item.isPaid ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {item.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Mobile Card View */}
      <div className="sm:hidden flex flex-col gap-4">
        {orders && orders.length > 0 ? (
          orders.map((item) => {
            const firstItem = item.orderItem?.[0] || {};
            const date = new Date(item.createdAt);
            return (
              <div
                key={item._id}
                onClick={() => handleProduct(item._id)}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={firstItem.image}
                    alt={firstItem.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div>
                    <p className="text-gray-700 font-semibold">#{item._id}</p>
                    <p className="text-sm text-gray-500">
                      {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Shipping:</span>{" "}
                  {item.shippingAddress?.city}, {item.shippingAddress?.country}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {firstItem.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Price:</span> ${item.totalPrice}
                </p>
                <div className="mt-2">
                  <span
                    className={`px-3 py-1 text-xs rounded-lg text-white ${
                      item.isPaid ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {item.isPaid ? "Paid" : "Pending"}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
