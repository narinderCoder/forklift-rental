import React, { useContext, useEffect, useState } from 'react';
import Cart from '../icons/cart';
import EnvProvider from '@scripts/react/EnvVar';
import CartSidebar from './cart-sidebar';
import axios from 'axios';
import Loader from './loader';
export default function CartTotal() {
  const [open, setOpen] = useState(false)
  const [loading,setLoading] = useState(false)
  // const { cart, fetchCartData } = useContext(CartContext);

  const [cart, setCart] = useState({ items: [], total: 0 ,data:[]});

  const fetchCartData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${EnvProvider.wcUrl}wc/store/v1/cart`);
      const jsonData = await response.json();
      setCart({
        items: jsonData.items,
        data: jsonData,
        total: jsonData.items_count
      }); 
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch cart data:', error);
      setLoading(false);
    }
  };

 
  useEffect(() => { 
    fetchCartData();
  }, []); // Add cart as a dependency to run useEffect only when cart changes

const handleOpenCartSidebar = () => {
  setOpen(!open);
  fetchCartData();
  
}

 
  return (
    <>
    <Loader loading={loading}/>
    <div className="d-flex align-items-center position-relative">
      <div onClick={() => handleOpenCartSidebar()} id='cartA'>
        <Cart />
            <p
            className="bg-white text-primary position-absolute d-flex align-items-center justify-content-center rounded-circle"
            style={{
                width: '1rem',
                height: '1rem',
                top: '-0.5rem',
                right: '-0.5rem',
                fontSize: '12px',
                padding: '10px',
            }}
            >
            {cart ? cart.total : 0} {/* Ensure cart.total is accessed safely */}
        </p>
      </div>
      <CartSidebar openCart={open} setOpenCart={setOpen} fetchCartData={fetchCartData}  items={cart.items} cart={cart} setLoading={setLoading}/>
    </div>
    </>
  );
}
