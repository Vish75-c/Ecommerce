import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const Orderdetail = () => {
  const { id } = useParams();
  const [detail, setdetail] = useState(null);
  useEffect(() => {
    const mockorder = {
      _id: id,
      createdAt: new Date().toLocaleDateString(),
      isPaid: true,
      isDelivered: false,
      paymentmethod: "paypal",
      shippingmethod: "Standard",
      shippingaddress: { city: "New York", country: "USA" },
      orderitems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image: "https://picsum.photos/150?random=1",
        },
        {
          productId: "2",
          name: "T-Shirt",
          price: 520,
          quantity: 5,
          image: "https://picsum.photos/150?random=1",
        },
      ],
    };
    setdetail(mockorder);
  }, [id]);
  return (
    <div className="max-w-5xl mx-auto flex flex-col p-4 my-6">
      <h1 className="text-3xl text-emerald-800 mb-2 font-bold">
        Order Details
      </h1>
      {detail && (
        <div className="w-full bg-gray-50 rounded-lg p-4  border border-gray-200 mb-2">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-md">
              Order Id: #{detail._id}
            </span>
            <span className="py-1 px-2 rounded-lg text-gray-500 font-bold bg-green-300 text-xs ">
              Approved
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs text-gray-500 font-bold ">
              {detail.createdAt}
            </span>
            <span className="py-1 px-2 rounded-lg text-gray-500 font-bold bg-yellow-300 text-xs ">
              {detail.isDelivered ? "Delivered" : "Pending Delivery"}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col">
                <span className="mb-1 text-md font-bold">Payment Info</span>
              <div className=""><span className="text-gray-500 font-bold text-xs">Payment Method:</span>
              <span className="text-gray-500 font-bold text-xs">Paypal</span></div>
              <div><span className=" text-gray-500 font-bold text-xs ">Status:</span>
              <span className="text-gray-500 font-bold text-xs">{detail.isPaid?'Paid':'Not Paid'}</span></div>
            </div>
           <div className="flex flex-col">
                <span className="mb-1 text-md font-bold">Shipping Info</span>
              <div className=""><span className="text-gray-500 font-bold text-xs">Shipping Method:</span>
              <span className="text-gray-500 font-bold text-xs">{detail.shippingmethod}</span></div>
              <div><span className=" text-gray-500 font-bold text-xs ">Address:</span>
              <span className="text-gray-500 font-bold text-xs">{detail.shippingaddress.city}{","}{detail.shippingaddress.country}</span></div>
            </div>
            
          </div>
          <div className="relative rounded-sm w-full overflow-hidden mb-5">
            <table className="w-full ">
                <thead className="bg-gray-200 font-bold">
                    <tr>
                        <td className="p-1 text-center">Name</td>
                        <td className="p-1 text-center">Unit Price</td>
                        <td className="p-1 text-center">Quantity</td>
                        <td className="p-1 text-center">Total</td>
                    </tr>
                </thead>
                <tbody>
                    {detail.orderitems.map((item,index)=>{
                        return (<tr key={index} className="border-b border-gray-200">
                            <td className="py-1 px-3 flex items-center "><img src={item.image} alt="item-img" className="h-10 w-10 rounded-md mr-2"/>
                            <span className="text-blue-500 text-sm">{item.name}</span>
                            </td>
                            <td className="py-1 px-3 font-bold text-sm text-gray-500">${item.price}</td>
                            <td className="py-1 px-3 font-bold text-sm text-gray-500">{item.quantity}</td>
                            <td className="py-1 px-3 font-bold text-sm text-gray-500">${item.price}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
          </div>
          <Link to='/my-orders' className="font-bold text-sm text-gray-500">Back to My Orders</Link>
        </div>
      )}
    </div>
  );
};

export default Orderdetail;
