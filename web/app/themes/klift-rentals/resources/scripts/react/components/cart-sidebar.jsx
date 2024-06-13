 
import { X } from "lucide-react";
import { useEffect } from "react";
import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import CartItem from "./cart-item";

const CartSidebar = ({ openCart, setOpenCart, items, cart, fetchCartData, setLoading }) => {
  const ref = useRef(null);
  useOutsideClick(ref, () => setOpenCart(false));
  function getPrice(price){
    let result = price / 100;
     return result.toFixed(2);
  }




  return (
    <div className="d-block">
      <div
        className={`cart-sidebar bg-white overflow-scroll position-fixed end-0 top-0 d-flex flex-column justify-content-between`}
        style={{ transform: openCart ? "translateX(0)" : "translateX(100%)" }}
        ref={ref}
      >
        <div
          className="row mx-0 mt-0 p-0 gx-4 align-items-center"
          style={{ marginBottom: "2rem" }}
        >
          <div className="col-10">
            <h5 className="h5 fw-medium text-secondary">
              {cart?.data?.items_count} Item(s) added to your Cart
            </h5>
          </div>
          <div className="col-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                background: "#c2c7c4",
                width: "1.75rem",
                height: "1.75rem",
                cursor: "pointer",
              }}
            >
              <X
                onClick={() => setOpenCart(!openCart)}
                cursor={"pointer"}
                color="#7F807F"
                size={16}
              />
            </div>
          </div>
        </div>
        {items != undefined && items.length > 0 ? (
          <div className="d-flex flex-column gap-4">
            

            {items != undefined && items.length > 0 ? items.map((item,index) => (
                  <CartItem key={index} product={item} fetchCartData={fetchCartData} setLoading={setLoading}/>
            )) : (
                <h2 class="wp-block-heading has-text-align-center with-empty-cart-icon wc-block-cart__empty-cart__title">Your cart is currently empty!</h2>
            )}
            <hr className="border border-secondary border-opacity-50" />
            <div className="d-flex flex-column justify-content-between w-100 gap-1">
              <div className="d-flex justify-content-between w-100 gap-2 text-opacity-50 p3 text-secondary">
                <p>Your cart ({cart?.data?.items_count})</p>
                <p className="text-right">Taxes during checkout</p>
              </div>
              <div className="d-flex justify-content-between w-100 gap-2 p1 text-secondary">
                <p>Subtotal</p>
                <p className="text-right">
                
                <span className="text-secondary text-opacity-50">{cart?.data?.totals?.currency_symbol}</span>{getPrice(cart?.data?.totals?.total_price)}
                  {/* {cart.reduce(
                  (acc, product) => acc + product.price * product.quantity,
                  0
                )} */}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center p2 text-opacity-70 text-secondary">
            Cart is empty
          </p>
        )}



        <div style={{ marginTop: "3rem" }}>
        {items != undefined && items.length > 0 &&
            <a href={"/checkout"}>
                <button className="justify-content-center w-100 mb-3 btn-secondary">
                Checkout
                </button>
            </a>
          }
          <span className="w-100 text-center text-primary">
            <p
              className="p1"
              onClick={() => setOpenCart(false)}
              style={{ cursor: "pointer" }}
            >
              Continue Shopping
            </p>
          </span>
        </div>


      </div>
      <div
        className="position-fixed vh-100 top-0 start-0 bg-secondary bg-opacity-50 overflow-hidden"
        style={{ width: "100%", zIndex: 999, display: openCart ? "" : "none" }}
      ></div>
    </div>
  );
};

export default CartSidebar;
