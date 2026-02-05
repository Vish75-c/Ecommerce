import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAdminProducts } from '../../redux/slices/adminProductSlice';
import { fetchAllOrders } from '../../redux/slices/adminOrderSlice';

const AdminHome = () => {
  const dispatch = useDispatch();

  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.adminProducts);
  const { orders, totalOrders, totalSales, loading: orderLoading, error: ordersError } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  useEffect(() => {
    console.log(products);
    console.log(orders);
  }, [products, orders]);

  return (
    <div className='max-w-6xl mx-auto p-6 py-10 flex flex-col tracking-tighter'>
      <h1 className='text-2xl font-extrabold mb-4'>Admin DashBoard</h1>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
        <div className='p-4 flex flex-col bg-gray-200 rounded-lg shadow-4xl shadow-emerald-950 hover:scale-105 duration-500 transition-all min-h-[100px]'>
          <span className='font-bold text-xl'>Revenue</span>
          <span className='font-bold text-lg'>
            ${totalSales || 0}
          </span>
        </div>
        <div className='p-4 flex flex-col bg-gray-200 rounded-lg shadow-4xl shadow-emerald-950 hover:scale-105 duration-500 transition-all min-h-[100px]'>
          <span className='font-bold text-xl'>Total Orders</span>
          <span className='font-bold text-lg'>
            {totalOrders || orders?.length || 0}
          </span>
          <Link to='/admin/orders' className='text-blue-500 text-sm tracking-normal font-semibold'>Manage Orders</Link>
        </div>
        <div className='p-4 flex flex-col bg-gray-200 rounded-lg shadow-4xl shadow-emerald-950 hover:scale-105 duration-500 transition-all min-h-[100px]'>
          <span className='font-bold text-xl'>Total Products</span>
          <span className='font-bold text-lg'>
            {products?.length || 0}
          </span>
          <Link to='/admin/products' className='text-blue-500 text-sm tracking-normal font-semibold'>Manage Products</Link>
        </div>
      </div>

      <div className='w-full rounded-md p-4'>
        <h1 className='font-bold text-2xl'>Recent Orders</h1>
        <div className='relative overflow-hidden rounded-lg bg-gray-50 shadow-lg overflow-x-scroll md:overflow-x-hidden'>
          <table className='w-full '>
            <thead>
              <tr className='bg-gray-200 font-bold text-md'>
                <td className='px-4 py-2 text-center'>Orders</td>
                <td className='px-4 py-2 text-center'>Users</td>
                <td className='px-4 py-2 text-center'>Total Price</td>
                <td className='px-4 py-2 text-center'>Status</td>
              </tr>
            </thead>
            <tbody>
              {(orders && orders.length > 0 ? orders : []).slice(0, 5).map((item, index) => (
                <tr key={item._id || index}>
                  <td className='px-4 py-2 text-center font-bold text-black'>{item._id}</td>
                  <td className='px-4 py-2 text-center text-gray-500 font-semibold'>{item.user?.name || "Unknown"}</td>
                  <td className='px-4 py-2 text-center text-gray-500 font-semibold'>${item.totalPrice || item.totalprice}</td>
                  <td className='px-4 py-2 text-center text-gray-500 font-semibold'>{item.status || "Pending"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
