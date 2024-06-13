import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });

  const fetchCartData = async () => {
    try {
      const response = await fetch(`https://klifts.test/wp-json/wc/store/v1/cart`);
      const jsonData = await response.json();
      setCart({
        items: jsonData.items,
        total: jsonData.items_count
      });


    } catch (error) {
      console.error('Failed to fetch cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const addItemToCart =  () => {
    // Example logic to add an item to the cart
    // You would replace this with actual logic for adding an item
      fetchCartData();
    //  window.location.reload();
  };

 

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
