import ProductSection from "./sections/product-section";
import Advantages from "./sections/advantages";
import ProductInfoSlider from "./sections/product-info-slider";
import ProductInformation from "./sections/product-information";
import Banner from "../../components/banner";
import ProductRelatedInfo from "./sections/product-related-info";
import "./electric-pallet-stacker.scss";
import { useContext, useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import { CartContext } from "@scripts/react/components/CartProvider";
 
 
const ElectricPalletJack = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState([]);

  // const { cart, addItemToCart } = useContext(CartContext);

  const handleAddToCart = () => { 
    addItemToCart();
  };
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        var divElement = document.getElementById('PackingPallet');
        let $_ID = parseInt(divElement.getAttribute('data-id')); 
        const response = await fetch(
          `${EnvProvider.baseUrl}single-product/${$_ID}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data; 
        setProduct(data1); 

        let attributes = data1.variation_attributes;
        let attribute_data = data1.attributes.filter((a) => attributes.includes(a.name));
        setAttributes(attribute_data);
        /// console.log(data1.selected_variation,'attribute_data')
        if (data1.selected_variation.atts !== undefined) {
          let newData = { ...types }; // Start with the current state of types 
          data1.selected_variation.atts.forEach((a) => {
            newData[a.key] = a.value; // Update newData with the new key-value pair
          }); 
          setTypes(newData); // Update the state with the accumulated data
          setSelectedVariation(data1.selected_variation);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const handleRadio = (type, e) => {
    let val = e.target.value;
    let data = {
      ...types,
      [type]: val
    };
    setTypes(data);
    //console.log(types, 'selectTypes');
    setVariation(data);
  };

  function setVariation(type_values) { 
    let data = product.variations.filter((v) => {
      return v.atts.every((val) => { 
        return (type_values[val.key] !== undefined && val.value.toLowerCase() === type_values[val.key].toLowerCase());
      });
    });

    
      setSelectedVariation(data[0]);
   
      console.log(data[0].id, 'selected-Variation',type_values);
  }

  function isChecked(name, value) {
    if (types[name] !== undefined) {
      if (types[name].toLowerCase() == value.toLowerCase()) {
        return true;
      }
    }
    return false;
  }



  const addToCart = async () => {
    setLoading(true);
    try { 
      const response = await axios.post(`${EnvProvider.baseUrl}add-to-cart`, { 
        product_id:product.id,
        quantity:1,
        variation_id:selectedVariation.id,
        options: types
      });   
     // handleAddToCart(); 
      if (response.status === 200) {
        alert('Form submission successful!');
       
      
      } else {
        alert('Form submission failed.');
      }
      setLoading(false);
       
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }




  return (
    <div
      className="d-flex flex-column section-alt electric-pallet-stacker-page"
      style={{ gap: "3.5rem" }}
    >
      <div className="container px-4 mx-auto">
  
        <ProductSection setLoading={setLoading} types={types} attributes={attributes} product={product} handleRadio={handleRadio} isChecked={isChecked} selectedVariation={selectedVariation}/>
      </div>
      <div className="container px-4 mx-auto">
        <Advantages product={product}/>
      </div>
      <div className="container px-4 mx-auto">
        <ProductInfoSlider  setLoading={setLoading} types={types} attributes={attributes} product={product} handleRadio={handleRadio} isChecked={isChecked} selectedVariation={selectedVariation}/>
      </div>
      <div className="container px-4 mx-auto">
        <ProductInformation setLoading={setLoading} types={types} attributes={attributes} product={product} handleRadio={handleRadio} isChecked={isChecked} selectedVariation={selectedVariation}/>
      </div>

      <Banner
        height={"50vh"}
        image={
          "https://xilinamerica.com/cdn/shop/files/CTD10R-E_509dde91-c7b3-4231-b4d9-ecce6452515b_1358x350_crop_center.jpg?v=1648802597"
        }
        className="w-100"
        childrenClassName="w-90"
      >
        <div className="text-white">
          <h4 className="h4 mb-2">Get a subscribe and save discount</h4>
          <div className="border border-white rounded-2 row p-1 gx-2">
            <div className="col-9 align-self-center">
              <input
                className="bg-transparent text-white p1 w-100"
                placeholder="Email address"
              />
            </div>
            <div className="col-3 align-self-center">
              <button className="btn-secondary bg-primary text-white w-100">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </Banner>
      <div className="container px-4 mx-auto">
        <ProductRelatedInfo information={product?.custom_fields?.shipping} />
      </div>
    </div>
  );
};

export default ElectricPalletJack;
