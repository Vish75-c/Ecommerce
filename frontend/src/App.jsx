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
        </Route>

        {/*  */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
