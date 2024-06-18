import Rating from "../../components/rating";
import ExpandableCard from "../../components/expandable-card";
import ProductSlider from "../../components/product-slider";
import Breadcrumbs from "../../components/breadcrumbs";
import {  useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import axios from 'axios';
import DescriptionExpandableCard from "@scripts/react/components/description-expandable-card";
import AddToCart from "@scripts/react/components/add-to-cart";
import Loader from "@scripts/react/components/loader";
import Badge from "@scripts/react/icons/badge";
import Truck from "@scripts/react/icons/truck";
import CoinBag from "@scripts/react/icons/coin-bag";
import TruckAlt from "@scripts/react/icons/truck-alt";
const features = [
  {
    image: <TruckAlt/>,
    title: "Nationwide Delivery",
    description: "In-house logistics team and truck fleet",
  },
  {
    image: <Badge/>,
    title: "Customer Reviews",
    description: "#1 ranked forklift dealer on Google",
  },
  {
    image: <Truck/>,
   title: "Biggest Selection",
    description: "800+ great machines in stock",
  },
  {
    image: <CoinBag/>,
     title: "Lowest Prices",
    description: "Fast, quick, and easy financing",
  },
];


const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState([]);

  // const { cart, addItemToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const item = { id: 1, name: 'Product 1', price: 10 };
    // addItemToCart();
  };
 

  useEffect(() => {
    const fetchData = async () => {
     
      try {
        var divElement = document.getElementById('RentalDetailPage');
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

   <>
    <Loader loading={loading}/>
    <div
      className="container d-flex flex-column px-4 mx-auto"
      style={{ gap: "5rem", paddingBlock: "2.5rem" }}
    >
      <Breadcrumbs
        data={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
          { name: "10,000 LBS FORKLIFT FOR RENT IN HOUSTON" },
        ]}
      />
      <div className="row g-4">
        <div className="col-lg-5 col-md-6 col-12 mb-custom">
          <ProductSlider data={product} className="mb-custom col-12 w-100" />

          {
            product?.custom_fields?.youtube_video_url && (
              <iframe
                src={product?.custom_fields?.youtube_video_url}
                className="col-12 rounded-4"
                style={{ height: "25rem" }}
              />
            )
          }

        </div>
        <div className="col-lg-7 col-md-6 col-12">
          <div>
            <h3
              className="h3 text-secondary"
              style={{ marginBottom: "2.5rem" }}
            >
              {product?.name}
            </h3>
            <div
              className="d-flex flex-column gap-4"
              style={{ marginBottom: "2.5rem" }}
            >
              <div className="d-flex align-items-center text-secondary">
                <Rating initialRating={product?.average_rating} maxRating={10} />{" "}
                <span className="p1">{product?.review_count} Reviews</span>
              </div>
              <div className="text-secondary text-opacity-80 p3" dangerouslySetInnerHTML={{ __html: product?.short_description }}></div>



              <div className="d-flex flex-column gap-4">
                {attributes.map((attr, index) => (
                  <div className={`expandable-card open`} key={index}>
                    <div className="w-100 d-flex align-items-center text-secondary" style={{ gap: '0.75rem' }}>
                      <p className="p1">{attr.title}</p>
                    </div>
                    <div className="flex-row gap-5 justify-content-start d-flex align-items-center" style={{ gap: '1.25rem' }}>
                      <div className="flex-row w-100 justify-content-between align-items-center d-flex">
                        {attr.values.map((a) => (
                          <div className="form-check" key={a}>
                            <input
                              className="form-check-input"
                              type="radio"
                              id={`variation${a}`}
                              value={a}
                              name={attr.name}
                              onChange={(e) => handleRadio(attr.name, e)}
                              checked={isChecked(attr.name, a)}
                            />
                            <label className="form-check-label" htmlFor={`variation${a}`}>
                              {a}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

              </div>
 




             

               {product?.isVariable ? (
                  <div className="d-flex flex-row align-items-center gap-2" dangerouslySetInnerHTML={{ __html: selectedVariation?.price }}></div>
               ):(
                  <div className="d-flex flex-row align-items-center gap-2" dangerouslySetInnerHTML={{ __html: product?.price }}></div>
               )}
 
              {/* <div className="d-flex flex-row align-items-center gap-2" >
                <p className="p3 text-opacity-50 text-decoration-line-through text-secondary">
                   $99.99
                </p>
                <p className="p1 text-secondary">$90.00</p>
                <button className="px-2 py-0.5 text-white rounded-4 bg-primary p3">
                  Save 15%
                </button>
              </div> */}
 
            </div>

            <p className="mb-2 p3">Shipping calculated at checkout.</p>
            <div
              className="d-flex"
              style={{ marginBottom: "5rem", gap: "1.25rem" }}
            >
              {/* <button
                onClick={addToCart}
                className="w-100 justify-content-center text-white border-none bg-primary btn-secondary p1"
              >
                Add to cart
              </button> */}
              <AddToCart options={types} productId={product?.id} variationId={selectedVariation?.id } setLoading={() => setLoading}/>
              {/* <a href={"/billing-address"} className="w-100">
                <button className="w-100 justify-content-center btn-secondary p1">
                  Buy now
                </button>
              </a> */}
            </div>

            <div className="d-flex flex-column gap-4">
              <DescriptionExpandableCard title="Description" description={product?.description} />
              <ExpandableCard title="Specifications" data={product} />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {features.map((feature, index) => (
          <div
            key={index}
            className="col-12 col-md-6 col-lg-3 gy-4 gy-lg-0 d-lg-flex"
          >
            <div
              className="d-flex flex-column align-items-center justify-content-center gap-2 text-center border border-secondary border-opacity-10"
              style={{
                padding: "2.5rem 1.25rem",
                borderRadius: "14px",
              }}
            >
              {/* <img
                src={feature.image}
                alt={feature.title}
                style={{ width: "3.75rem", height: "3.75rem" }}
              /> */}
              {feature.image}
              <h6 className="h6 text-secondary">{feature.title}</h6>
              <p className="p1 text-secondary">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
   </>
  );
};

export default SingleProduct;
