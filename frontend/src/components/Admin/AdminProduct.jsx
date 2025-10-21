import React from "react";
import { useNavigate } from "react-router-dom";
const AdminProduct = () => {
  const navigate=useNavigate();
  
  const product = [
    {
      _id: 123,
      name: "Shirt",
      price: 110,
      sku: "hfc-006",
    },
  ];
  const handleDelete=(id)=>{
    alert('Product Deleted')
  }
  const handleEdit=(id)=>{
    navigate(`/admin/edit/${id}`)
  }
  return (
    <div className="max-w-6xl mx-auto p-4 my-10 flex flex-col">
      <h1 className="text-2xl font-extrabold mb-8">Product Management</h1>
      <div className="relative overflow-hidden rounded-lg overflow-x-scroll md:overflow-x-hidden shadow-lg bg-gray-50">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 uppercase">
              <td className="px-2 py-2 font-bold text-md text-center">Name</td>
              <td className="px-2 py-2 font-bold text-md text-center">price</td>
              <td className="px-2 py-2 font-bold text-md text-center">sku</td>
              <td className="px-2 py-2 font-bold text-md text-center">
                actions
              </td>
            </tr>
          </thead>

          <tbody>
            {product.length > 0 ? (
              product.map((item, index) => {
                return (
                  <tr className="w-full" key={index}>
                    <td className="px-2 py-2 font-bold text-center text-gray-500">
                      {item.name}
                    </td>
                    <td className="px-2 py-2 font-bold text-center text-gray-500">
                      ${item.price}
                    </td>
                    <td className="px-2 py-2 font-bold text-center text-gray-500">
                      {item.sku}
                    </td>
                    <td className="px-2 py-2 font-bold text-center">
                      <button onClick={()=>handleEdit(item._id)} className="py-1 text-xs px-2 mr-2 rounded-lg hover:bg-amber-600 bg-amber-500 text-white">
                        Edit
                      </button>
                      <button onClick={()=>handleDelete(item.id)} className="py-1 text-xs px-2 mr-2 rounded-lg hover:bg-red-700 bg-red-500 text-white">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr >No Record Found</tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProduct;
