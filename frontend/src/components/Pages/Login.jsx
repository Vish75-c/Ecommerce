import React, { useEffect, useState } from "react";
import img from "../../assets/login.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../../redux/slices/cartSlice";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [hasMerged, setHasMerged] = useState(false); // ✅ prevents double merge
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId } = useSelector((state) => state.auth);
   let userId = undefined;
if (user) {
  userId = user._id; // ✅ fixed typo
}
 
  
  // Get redirect query (if user came from checkout or product page)
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (userId && !hasMerged) {
      if (guestId) {
        // ✅ Merge guest cart once after successful login
        console.log(userId,guestId);
        dispatch(mergeCart({ guestId, userId })).then(() => {
          
          setHasMerged(true);
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        // ✅ No merge needed
        navigate(isCheckoutRedirect ? "/checkout" : redirect);
      }
    }
  }, [userId, guestId, hasMerged, navigate, isCheckoutRedirect, dispatch, redirect]);

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="md:flex flex-row mt-10">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
        <form
          onSubmit={handlesubmit}
          className="p-8 rounded-lg flex flex-col justify-center items-center max-w-md shadow-md border border-gray-300"
        >
          <h1 className="font-bold text-xl mb-4">
            <span className="text-xl">ꙮ</span> BuyHive
          </h1>

          <h1 className="text-xl font-bold mb-3">Hey there! 👋🏻</h1>
          <p className="font-semibold mb-4">
            Enter your Email and password to Login.
          </p>

          <div className="w-full mb-4">
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter your email"
              value={email}
              className="py-2 px-4 w-full outline-none border text-sm border-gray-200 rounded-md"
              required
            />
          </div>

          <div className="w-full mb-4">
            <label className="block font-bold mb-1">Password</label>
            <input
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Enter your password"
              value={password}
              className="py-2 px-4 w-full outline-none border text-sm border-gray-200 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 w-full text-white bg-black rounded-md text-center text-sm mb-4"
          >
            Sign In
          </button>

          <div className="mb-4 w-full text-sm text-center flex justify-center font-medium">
            <p>Don't have an account?&nbsp;</p>
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Register
            </Link>
          </div>
        </form>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/2 hidden md:flex">
        <img
          src={img}
          alt="login"
          className="w-full h-[650px] object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
