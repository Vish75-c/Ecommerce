import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import Profile from "./components/Pages/Profile";
import Collections from "./components/Pages/Collections";
import Product from "./components/Common/Product";
import Home from "./components/Pages/Home";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./components/Pages/OrderConfirmation";
import Orderdetail from "./components/Pages/Orderdetail";
import Order from "./components/Pages/orders";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route
            path="/collections/:collection"
            element={<Collections />}
          ></Route>
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path='/checkout' element={<Checkout/>}></Route>
          <Route path='/order-confirmation' element={<OrderConfirmation/>}></Route>
          <Route path='/order/:id' element={<Orderdetail/>}></Route>
          <Route path="/my-orders" element={<Order/>}></Route>
        </Route>

        {/*  */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
