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
const productsInfo = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/b7ed/0b38/3641fda0d815442c43bf968a1153bae0?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OnStqpvCQhGlG0iY1pT0LUYlF9VWAwusc~ju2HGVA7-FKZiU2bMr5oskPTu8kgpgbD4UP~Rdb5WG4AGRflfWUN6qy~R-Jl3id8fetzlxDxpeTmFhokNwjLvyPCGk9Ikd6vVKSnah3clj-BKc85xpGam4GBPRxcwBM28H5MmAvoyc2gCPhYWbhEu7NA0h2m6FgPeNL58UpKc~gohZc6g3kVkS7nPWC9w8ZU5Zq38nW6-dVQ6ipIiGJ2imnVp1tXSsCg2jNQUBni1cY9a8JaGE8QXyp8LYv-Zod2Df2rbmAY-gJm42zs~nZ2BBl11y5pAJYU59kW6kUhW6c1kfHoDNvg__",
    title: "Instrument Panel",
    description: "Emergency stop Key Switch Hour Meter",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/ed61/fc2a/b26f7c8693fef0ec09b8ab2c31b00260?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cXdrbuM2qEF57NY7gqOKLS0pIMLFVxJzyA8SWU4Kae2ud5RbrzWrSu1GOeGY~YEDizzdsPYVLW-tMIcrFON7TTyuouEbyfC2M2JqTUNH6x3fPhhKZmHZYBAJSXRelttIn-QXIhnLm0P6WxcHE2hZyGe6s964nR~D6AgP6Ga7Jc2IMdbuOs1sUDsBw3x4yQh7JJ8gELcg8FyCuyD1iSPsFLNT4lFPKV0j9oygGecEuS8nSgOALyn4nEF3gC8o0MVVfra1irhb5rVVdXPsKpL5xhjj-HK386eNOWj9iU02oiASf1vUawYwKPt0mOkoJKVfZVNdhS9DT1W2A3yL9equeA__",
    title: "Built-in Charger",
    description: "Easy to access to power supply",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/9f2b/6fc1/94cb308fb0b04ce7ca0c8705b0fef51b?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CC~jhH394actCgVWUNnTbCAR44TMcSab-0-SxtB-GfhIq3pZ7rmOwwpEPn9dkYbwFiHW57ZQRBP~AM81c0qQQzd8RW5PJ-rj2kT7w~uJgi8qvrJrKizhyVrqT8XhtOybtZe1FevMkRxnfBLAgjekgS2sMLV3gVt-29ouBrY44shFyCXEJbR8D6EZWv7D-Ptp0gE7Gf3e~DsSLZLjv7ysnviO9rkd50FXn7-u3wc7tOxwxUHfHKufmOtfDVerI3IEMd6DC6QwdASiPyzInMfiGbxEpifeWnt-skvmcWyqAs~A4aGQxEpwbQOD6M-s~oVvJimpZjPtZ7BP6LDW9-6UeA__",
    title: "Multifunctional Handle",
    description: "Integrated control. Tiller head with comfortable design",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/b7ed/0b38/3641fda0d815442c43bf968a1153bae0?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OnStqpvCQhGlG0iY1pT0LUYlF9VWAwusc~ju2HGVA7-FKZiU2bMr5oskPTu8kgpgbD4UP~Rdb5WG4AGRflfWUN6qy~R-Jl3id8fetzlxDxpeTmFhokNwjLvyPCGk9Ikd6vVKSnah3clj-BKc85xpGam4GBPRxcwBM28H5MmAvoyc2gCPhYWbhEu7NA0h2m6FgPeNL58UpKc~gohZc6g3kVkS7nPWC9w8ZU5Zq38nW6-dVQ6ipIiGJ2imnVp1tXSsCg2jNQUBni1cY9a8JaGE8QXyp8LYv-Zod2Df2rbmAY-gJm42zs~nZ2BBl11y5pAJYU59kW6kUhW6c1kfHoDNvg__",
    title: "Instrument Panel",
    description: "Emergency stop Key Switch Hour Meter",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/ed61/fc2a/b26f7c8693fef0ec09b8ab2c31b00260?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cXdrbuM2qEF57NY7gqOKLS0pIMLFVxJzyA8SWU4Kae2ud5RbrzWrSu1GOeGY~YEDizzdsPYVLW-tMIcrFON7TTyuouEbyfC2M2JqTUNH6x3fPhhKZmHZYBAJSXRelttIn-QXIhnLm0P6WxcHE2hZyGe6s964nR~D6AgP6Ga7Jc2IMdbuOs1sUDsBw3x4yQh7JJ8gELcg8FyCuyD1iSPsFLNT4lFPKV0j9oygGecEuS8nSgOALyn4nEF3gC8o0MVVfra1irhb5rVVdXPsKpL5xhjj-HK386eNOWj9iU02oiASf1vUawYwKPt0mOkoJKVfZVNdhS9DT1W2A3yL9equeA__",
    title: "Built-in Charger",
    description: "Easy to access to power supply",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/9f2b/6fc1/94cb308fb0b04ce7ca0c8705b0fef51b?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CC~jhH394actCgVWUNnTbCAR44TMcSab-0-SxtB-GfhIq3pZ7rmOwwpEPn9dkYbwFiHW57ZQRBP~AM81c0qQQzd8RW5PJ-rj2kT7w~uJgi8qvrJrKizhyVrqT8XhtOybtZe1FevMkRxnfBLAgjekgS2sMLV3gVt-29ouBrY44shFyCXEJbR8D6EZWv7D-Ptp0gE7Gf3e~DsSLZLjv7ysnviO9rkd50FXn7-u3wc7tOxwxUHfHKufmOtfDVerI3IEMd6DC6QwdASiPyzInMfiGbxEpifeWnt-skvmcWyqAs~A4aGQxEpwbQOD6M-s~oVvJimpZjPtZ7BP6LDW9-6UeA__",
    title: "Multifunctional Handle",
    description: "Integrated control. Tiller head with comfortable design",
  },
];

const information = [
  { title: "Shipping information", info: "" },
  { title: "Warranty", info: "" },
  { title: "Order delivery time", info: "" },
  { title: "Return", info: "" },
];

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
        <Advantages />
      </div>
      <div className="container px-4 mx-auto">
        <ProductInfoSlider data={productsInfo} setLoading={setLoading} types={types} attributes={attributes} product={product} handleRadio={handleRadio} isChecked={isChecked} selectedVariation={selectedVariation}/>
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
        <ProductRelatedInfo information={information} />
      </div>
    </div>
  );
};

export default ElectricPalletJack;
