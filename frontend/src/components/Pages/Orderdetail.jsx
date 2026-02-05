import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("userInfo");
        const user = storedUser ? JSON.parse(storedUser) : null;
        const token = user?.token;

        const { data } = await axios.get(
          `http://localhost:3000/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setDetail(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError("Unable to load order details. Please try again.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500 font-bold">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto flex flex-col p-4 my-6 mt-10">
      <h1 className="text-3xl text-emerald-800 mb-2 font-bold">
        Order Details
      </h1>

      {detail && (
        <div className="w-full bg-gray-50 rounded-lg p-4 border border-gray-200 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">
              Order Id: #{detail._id}
            </span>
            <span className="py-1 px-2 rounded-lg text-gray-700 font-bold bg-green-300 text-xs">
              Approved
            </span>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-gray-500 font-bold">
              {new Date(detail.createdAt).toLocaleDateString()}
            </span>
            <span className="py-1 px-2 rounded-lg text-gray-700 font-bold bg-yellow-300 text-xs">
              {detail.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col">
              <span className="mb-1 text-md font-bold">Payment Info</span>
              <div>
                <span className="text-gray-500 font-bold text-xs">Method: </span>
                <span className="text-gray-500 font-bold text-xs">
                  {detail.paymentMethod}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-bold text-xs">Status: </span>
                <span className="text-gray-500 font-bold text-xs">
                  {detail.isPaid ? "Paid" : "Not Paid"}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <span className="mb-1 text-md font-bold">Shipping Info</span>
              <div>
                <span className="text-gray-500 font-bold text-xs">Method: </span>
                <span className="text-gray-500 font-bold text-xs">
                  {detail.shippingMethod || "Standard"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-bold text-xs">Address: </span>
                <span className="text-gray-500 font-bold text-xs">
                  {detail.shippingAddress?.city}, {detail.shippingAddress?.country}
                </span>
              </div>
            </div>
          </div>

          <div className="relative rounded-sm w-full overflow-hidden mb-5">
            <table className="w-full">
              <thead className="bg-gray-200 font-bold">
                <tr>
                  <td className="p-1 text-center">Name</td>
                  <td className="p-1 text-center">Unit Price</td>
                  <td className="p-1 text-center">Quantity</td>
                  <td className="p-1 text-center">Total</td>
                </tr>
              </thead>
              <tbody>
                {detail.orderItem.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-1 px-3 flex items-center">
                      <img
                        src={item.image}
                        alt="item-img"
                        className="h-10 w-10 rounded-md mr-2"
                      />
                      <span className="text-blue-500 text-sm">{item.name}</span>
                    </td>
                    <td className="py-1 px-3 font-bold text-sm text-gray-500">
                      ${item.price}
                    </td>
                    <td className="py-1 px-3 font-bold text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="py-1 px-3 font-bold text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            to="/my-orders"
            className="font-bold text-sm text-gray-500 hover:underline"
          >
            Back to My Orders
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
