import React, { useState, useEffect } from "react";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "123",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderitems: [
            { name: "Product 1", image: "https://picsum.photos/500/500?random=21" },
          ],
          quantity: 1,
          totalprice: 100,
          ispaid: true,
        },
        {
          _id: "124",
          createdAt: new Date(),
          shippingAddress: { city: "Arizona", country: "USA" },
          orderitems: [
            { name: "Product 2", image: "https://picsum.photos/500/500?random=22" },
          ],
          quantity: 1,
          totalprice: 200,
          ispaid: false,
        },
      ];
      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col max-w-7xl mx-auto ">
      <h1 className="font-bold text-2xl mb-4">My Orders</h1>

      {/* 🖥️ Table View for medium+ screens */}
      <div className="hidden sm:block shadow-md rounded-md sm:rounded-lg overflow-hidden">
        <table className="min-w-full text-gray-500 text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr className="text-sm">
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
            {orders.length > 0 ? (
              orders.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={item.orderitems[0].image}
                      alt={item.orderitems[0].name}
                      className="w-10 h-10 rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3">{item._id}</td>
                  <td className="px-4 py-3">
                    {item.createdAt.toLocaleDateString()}{" "}
                    {item.createdAt.toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-3">
                    {item.shippingAddress.city}, {item.shippingAddress.country}
                  </td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3">${item.totalprice}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`p-1 text-xs px-2 rounded-lg ${
                        item.ispaid
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {item.ispaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📱 Card View for mobile screens */}
      <div className="sm:hidden flex flex-col gap-4">
        {orders.length > 0 ? (
          orders.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={item.orderitems[0].image}
                  alt={item.orderitems[0].name}
                  className="w-16 h-16 rounded-md"
                />
                <div>
                  <p className="text-gray-700 font-semibold">#{item._id}</p>
                  <p className="text-sm text-gray-500">
                    {item.createdAt.toLocaleDateString()}{" "}
                    {item.createdAt.toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Shipping:</span>{" "}
                {item.shippingAddress.city}, {item.shippingAddress.country}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Quantity:</span> {item.quantity}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Price:</span> ${item.totalprice}
              </p>
              <div className="mt-2">
                <span
                  className={`p-1 text-xs px-3 rounded-lg ${
                    item.ispaid
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {item.ispaid ? "Paid" : "Pending"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
