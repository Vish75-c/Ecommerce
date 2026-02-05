import React, { useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import Cartcontent from '../Cart/Cartcontent';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../redux/slices/cartSlice';

const CardDrawer = ({ open, toggledrawer }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart, loading, error } = useSelector((state) => state.cart);

  // ✅ Only send user._id if user exists
  const userId = user?._id || null;

  useEffect(() => {
    if (userId || guestId) {
      dispatch(fetchCart({ userId, guestId }));
    }
  }, [dispatch, userId, guestId]);

  const handlesubmit = () => {
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-auto h-full z-50 bg-white shadow-lg transform transition-transform duration-300 flex flex-col ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex justify-end p-4">
        <IoMdClose
          onClick={toggledrawer}
          className="h-6 w-6 text-gray-600 hover:text-black cursor-pointer"
        />
      </div>

      {/* cart content */}
      <div className="flex flex-col overflow-y-auto p-4 flex-grow">
        <h2 className="text-xl font-bold">Your Cart</h2>

        {loading && <p>Loading cart...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {cart && cart.products?.length > 0 ? (
          <Cartcontent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          !loading && <p>Your cart is empty</p>
        )}
      </div>

      <div className="sticky bottom-0 p-4 flex flex-col items-center">
        <button
          onClick={handlesubmit}
          className="bg-zinc-700 text-white rounded-lg w-full py-2 hover:bg-zinc-600 transition"
        >
          Checkout
        </button>
        <p className="text-xs text-gray-700">
          Shipping, taxes, and discount codes calculated at checkout
        </p>
      </div>
    </div>
  );
};

export default CardDrawer;
