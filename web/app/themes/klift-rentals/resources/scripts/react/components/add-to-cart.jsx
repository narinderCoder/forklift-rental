import React, { useState } from 'react'
import axios from 'axios';
import EnvProvider from '@scripts/react/EnvVar';
export default function AddToCart({
    setLoading,
    productId, 
    variationId,
    options,
    type=1
}) {

const [qty,setQty]=useState(1);
     
    const addProductToCart = async () => {
        setLoading(true);
        try {
          //  const nonce = await getNonce();
            const response = await axios.post(`${EnvProvider.ajaxUrl}?action=custom_add_to_cart&product_id=${productId}&variation_id=${variationId}&quantity=${qty}`, {
                
                    product_id: productId,
                    quantity: qty,
                    variation_id:variationId,
                    options:options 
                } 
            );  
            if(response.data.success){ 
                alert(response.data.message);
                //   
                const cartA = document.getElementById('cartA');
                console.log(cartA,'cartA');
                if(cartA){
                    cartA.click(true);
                }else{
                    window.location.reload();
                }
            }else{
                alert(response.data.message);
            }
        
             setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };


  return (
    <>
       
       {type == 1 ? (
        <> <button
        onClick={addProductToCart}
        className="w-100 justify-content-center text-white border-none bg-primary btn-secondary p1"
        >
        Add to cart
       </button></>
       ):(
        <div className="d-flex align-items-center gap-2">
                <input
                type="number"
                onChange={(e) => {
                    setQty(e.target.value)
                }}
                placeholder=""
                className="border border-opacity-20 rounded-2 py-1 px-2"
                value={qty}
                style={{ width: "5rem" }}
                />
             
                 <button
                    onClick={addProductToCart}
                    className="p3"
                    >
                    Add
                </button>
          </div>
       )}
    
    </>
   
  )
}