import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';



import productsData from "./data/products.json";

import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";

import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";

function App() {

  useEffect(() => {
    console.log("[App] đang chạy useEffect() của component App !");

    // hàm cleanup
    return () => {
        console.log("[App] đang chạy hàm cleanup của useEffect() !");
    };
  });

  console.log("[App] component App render !");

  return (
    <>
      <ProductProvider>
        <CartProvider>
          <Header/>
          <SubHeader/>

          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/products" element={<ProductsPage/>} />
            <Route path="/cart" element={<CartPage/>} />
            <Route path="/contact" element={<ContactPage/>} />
          </Routes>
        </CartProvider>
      </ProductProvider>

      <Footer/>
    </>
  )
}

export default App
