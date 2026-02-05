import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts, deleteProduct } from "../../redux/slices/adminProductSlice";

const AdminProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 my-10 flex flex-col">
      <h1 className="text-2xl font-extrabold mb-8">Product Management</h1>
      <div className="relative overflow-hidden rounded-lg overflow-x-scroll md:overflow-x-hidden shadow-lg bg-gray-50">
        {loading ? (
          <div className="text-center py-4 font-semibold text-gray-500">Loading products...</div>
        ) : error ? (
          <div className="text-center py-4 font-semibold text-red-500">{error}</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 uppercase">
                <td className="px-2 py-2 font-bold text-md text-center">Name</td>
                <td className="px-2 py-2 font-bold text-md text-center">Price</td>
                <td className="px-2 py-2 font-bold text-md text-center">SKU</td>
                <td className="px-2 py-2 font-bold text-md text-center">Actions</td>
              </tr>
            </thead>

            <tbody>
              {products && products.length > 0 ? (
                products.map((item, index) => (
                  <tr className="w-full" key={item._id || index}>
                    <td className="px-2 py-2 font-bold text-center text-gray-500">{item.name}</td>
                    <td className="px-2 py-2 font-bold text-center text-gray-500">${item.price}</td>
                    <td className="px-2 py-2 font-bold text-center text-gray-500">
                      {item.sku || item._id?.slice(-6) || "N/A"}
                    </td>
                    <td className="px-2 py-2 font-bold text-center">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="py-1 text-xs px-2 mr-2 rounded-lg hover:bg-amber-600 bg-amber-500 text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="py-1 text-xs px-2 mr-2 rounded-lg hover:bg-red-700 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 font-semibold text-gray-500">
                    No Record Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminProduct;
