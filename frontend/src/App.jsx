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
import AdminLayout from "./components/Admin/AdminLayout";
import AdminProduct from "./components/Admin/AdminProduct";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminOrder from "./components/Admin/AdminOrder";
import AdminHome from "./components/Admin/AdminHome";
import EditOrder from "./components/Admin/EditOrder";
import {Provider} from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
const App = () => {
  return (
    <Provider store={store}>
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
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout/></ProtectedRoute>}>
        <Route path="/admin" element={<AdminHome/>}></Route>
        <Route path="/admin/products" element={<AdminProduct/>}></Route>
        <Route path="/admin/orders" element={<AdminOrder/>}></Route>
        <Route path="/admin/users" element={<AdminUsers/>}></Route>
        <Route path="/admin/edit/:id" element={<EditOrder/>}></Route>
        </Route>

        {/*  */}
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;
