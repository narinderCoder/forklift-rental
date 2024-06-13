import { Minus, Plus } from "lucide-react";
import axios from 'axios';
import EnvProvider from '@scripts/react/EnvVar';
const CartItem = ({ product, fetchCartData,setLoading }) => {

  function getPrice(price){
    let result = price / 100;
     return result.toFixed(2);
  }

  const updateQtyItem = async (item,type=1) =>  {
    setLoading(true);
  try { 
       let quantity = parseInt(item.quantity);
       if(type == 1){
          quantity = quantity + 1;
       }else{
          quantity = quantity - 1;
       }

       if(quantity > 0){
          const response = await axios.post(`${EnvProvider.ajaxUrl}?action=custom_update_cart_item_quantity&cart_item_key=${item.key}&quantity=${quantity}`, { 
              cart_item_key: item.key,
              quantity: quantity,
            } 
          );  

          console.log(response.data.success,'response');
          if(response.data.success){ 
              fetchCartData();
              console.log(response.data.success,'response2');
          }else{
              alert(response.data.message);
              setLoading(false);
          }
       }else{
        setLoading(false);
       } 
    } catch (error) {
        console.error(error);
        setLoading(false);
    }
  };



  const removeCartItem = async (item) =>  {
    setLoading(true);
    try { 
          const response = await axios.post(`${EnvProvider.ajaxUrl}?action=custom_update_cart_item_quantity&cart_item_key=${item.key}&type=remove`, { 
                cart_item_key: item.key,
                type: 'remove',
              } 
            );   
            if(response.data.success){ 
                fetchCartData(); 
            }else{
                alert(response.data.message);
                setLoading(false);
            }
        
      } catch (error) {
          console.error(error);
          setLoading(false);
      }
  }; 
  return (
    <div className="row g-2 p-0 m-0">
      <div className="col-md-4 col-12">
        <img
          src={product?.images?.[0].src}
          alt={product?.name}
          className="w-100 rounded-3"
        />
      </div>
      <div className="col-md-8 col-12">
        <div className="d-flex flex-column gap-0">
          <p className="p1" style={{ marginBottom: "1.75rem" }}>
           {product?.name}
          </p>
          <div className="d-flex flex-xl-row flex-column align-items-xl-center gap-2 align-items-start justify-content-between mb-2">

            {product?.quantity_limits?.editable && (
                <div className="d-flex align-items-center gap-2 px-3 py-1 border rounded-2 border-secondary border-opacity-50">
                <Minus
                  cursor={"pointer"}
                  size={16}
                  className="text-secondary"
                  onClick={() =>updateQtyItem(product,2)}
                />
                <p
                  className="text-center text-opacity-50 text-secondary p3"
                  style={{ minWidth: "1.25rem" }}
                >
                  {product?.quantity || 1}
                </p>
                <Plus
                  cursor={"pointer"}
                  size={16}
                  className="text-opacity-100 text-secondary"
                  onClick={() =>updateQtyItem(product)}
                />
              </div> 
            )}
           
               {product?.prices.regular_price && parseInt(product?.prices.regular_price) > parseInt(product?.prices.sale_price) ? ( 
                <p className="p2">
                      <del><span className="text-secondary text-opacity-50">{product?.prices?.currency_symbol}</span> {getPrice(product?.prices.regular_price)}</del>
                      <span className="ms-2"><span className="text-secondary text-opacity-50">{product?.prices?.currency_symbol}</span> {getPrice(product?.prices.price)}</span>
                  </p> 
            ) : (
              <p className="p2"><span className="text-secondary text-opacity-50">{product?.prices?.currency_symbol}</span> {getPrice(product?.prices.price)}</p>
            )}

           
          </div>

          <div> {product?.variation && product?.variation.map((v) => (
              <>
                 <p>{v.attribute} : {v.value}</p>
              </>
            ))}</div>
          <div className="d-flex align-items-center gap-2">
            {/* <p
              className="p3 text-secondary text-opacity-40"
              style={{ cursor: "pointer" }}
            >
              Save for later
            </p>
            <div
              className="bg-secondary bg-opacity-20"
              style={{ width: "1px", height: "0.75rem" }}
            /> */}
            <p
              className="p3 text-secondary text-opacity-40"
              style={{ cursor: "pointer" }}
              onClick={() => removeCartItem(product)}
            >
              Remove
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
