import React from 'react'
import { Navigate } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import NoPage from './pages/nopage/NoPage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/pages/AddProduct';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import { ToastContainer } from 'react-toastify'; // alerts dikhane ke liye 
import 'react-toastify/dist/ReactToastify.css';
import AllProduct from '../src/pages/allProducts/AllProducts';

function App() {
  return (
    <MyState>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/order" element={
            <ProtectedRoutes><Order /></ProtectedRoutes>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <ProtectedRouteForAdmin><Dashboard /></ProtectedRouteForAdmin>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/addProduct" element={
            <ProtectedRouteForAdmin><AddProduct /></ProtectedRouteForAdmin>
          } />
          <Route path="/updateProduct" element={
            <ProtectedRouteForAdmin><UpdateProduct /></ProtectedRouteForAdmin>
          } />
          <Route path="/allproducts" element={<AllProduct />} />
          <Route path="/*" element={<NoPage />} />

        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  )
}

export default App;

// iss project mai hum 2 protected route banainge ekk user ke liye aur ekk admin ke liye

// user

export const ProtectedRoutes = ({ children }) => {
  const user = localStorage.getItem('user'); // local storage se user ka data linge
  if (user) {
    return children; // ProtectedRoutes ko jis page par wrap karinge wo page dikhega

  } else {
    return <Navigate to='/login' />
  }

}

// admin 

export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem('user')) // taaki data object ki form mai aaye isliye parse kiya hai 
  if (admin?.user?.email === "shyamupadhya15@gmail.com") {
    return children;

  } else {
    return <Navigate to='/login' />
  }

}


