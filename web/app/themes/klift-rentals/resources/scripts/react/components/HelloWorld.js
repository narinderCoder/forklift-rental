import React from 'react';

const Header2 = () => {

    return (
      <nav className="bg-primary-500">
        <div className="container flex items-center justify-between px-6 py-4 mx-auto md:px-14">
          <a href={"/"}>
            <img
              src={"/logo.png"}
              alt="logo"
              width={150}
              height={45}
              className="h-auto w-36"
            />
          </a>
          <div className="items-center justify-between hidden gap-4 text-white md:flex">
            <div>
              <a href={"/"}>Home</a>
            </div>
            <div className="flex items-center text-white">
              {/* About Us <ChevronDown size={20} /> */}
            </div>
            <div className="text-white">
              <a href={"/products"}>Products</a>
            </div>
            <div className="text-white">Forklift Engines</div>
            <div className="text-white">
              <a href="/forklifts-for-sale">Forklifts for Sale</a>
            </div>
            <div className="text-white">New Forklifts for Sale</div>
            <div className="text-white">Contact Us</div>
          </div>
          <div className="relative">
            {/* <ShoppingCartIcon
              onClick={() => setOpenCart(!openCart)}
              className="text-white cursor-pointer"
            /> */}
            <div className="absolute flex items-center justify-center w-4 h-4 text-xs font-semibold bg-white rounded-full text-primary-500 -top-1 -right-2">
              {/* {cart.length} */}
            </div>
          </div>
        </div>
        {/* <CartSidebar cart={cart} openCart={openCart} setOpenCart={setOpenCart} /> */}
      </nav>
    );
  };

export default Header2;