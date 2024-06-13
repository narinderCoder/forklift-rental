import Rating from "../../components/rating";
import ExpandableCard from "../../components/expandable-card";
import ProductSlider from "../../components/product-slider";
import Breadcrumbs from "../../components/breadcrumbs";
import { useContext, useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import axios from 'axios';
import { CartContext } from "@scripts/react/components/CartProvider";
import DescriptionExpandableCard from "@scripts/react/components/description-expandable-card";
import AddToCart from "@scripts/react/components/add-to-cart";
import Loader from "@scripts/react/components/loader";
const features = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/4a19/b760/259c3d911b501fd0984acbc102e7df9e?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gdJhM9Yiwm5Tf6FZlgQJzjGJboOVlTe9EuquP8R2BbBHgMTmWGwr-H6CduLi~YoX6EV9sx6hs1x8cnynMZDvejGz61FhQfvXWaRjozOU6IcpiSvjMg4rkyU~6bhbM8rmOkZG6JGMcRpBlg4qcgFozrf8P~GWc51CfefoOXk56H6WK7m3J6xMKZ1h1I9kOpWg5qcyusmHHm9wse3KpuFZwZ4G6PFXSgByon0wJIZ6DBnwyJUlTlg4ZUJnK8PgkJm4Mr-GHsywh03xTXEC3JS37ALDaA7hH0dGf6DEXVHpcqhFWn4vzXtxZyeu5Nu9nt-fR8up7CgCjLvEIyg1NARHAQ__",
    title: "Nationwide Delivery",
    description: "In-house logistics team and truck fleet",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/fe2f/ffa1/b41d8fd0c96615949e4cc01bc1e2b6ac?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XwtzargbW3Il7uyWYeQskh5I~JWjzdpQiN1C3EOjPya5vG3YTnMzmiv0w5k6oSeKGRYNbiHhOn08c6Dudr6RkJSzYh0TabGSy9OQCCwjbH6Mw0VI3PyKFbo2gxsU3KG0O5iVnFeSLH8JU8Sdk27YqQZwswJ3ixCY0weEB5zx0eaPdE2KSDT4JXkq5sj~r1z3sKzCRnb7lI60Ytn6hlKULoREgOZEx8S8N5GhK0aADzzUJAua~URv70oQ~6nfrj~A5LgIZ9YLtzFeQ7Rqkt8VrgYYd7493q-P~LtCky3gvvk6tbuRCWA7PXYs0xXFC6kSLZW9GIeqGqIVOvfY9NADSw__",
    title: "Customer Reviews",
    description: "#1 ranked forklift dealer on Google",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/79ff/8328/a2bf331fe9e57eba9eaee113b8fb6b78?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=m1o17Mlq2DEEHtaUFpITTTiTpgj6iuUoLYBROZKCYNxHubIkz6x0dKUH~zlE-gGDs-VJU8gv9wT8EeBYwAzE5bkUyJg-WgZtqeVoFeFN8u8vqdxgz-ZVQIyngHyWnG0j~UhrDsDvOgXoASRqXbW2mxvI~kNGKXJk5K7K9PbVGHcdaaCe3rkdSHtiWJTLXHrvYpHZtAcqkzps10vT8z8X7d-9hVisdhUowBMp-EIMo1drQroTV5d4V36qx9M4iK6GgSqSs8t2gxUpuYa8o21GQk6XmZSj2ezH1W4xXvs1axtHw~gxnWP3PGsHs0d4sCidqNlxCiMvS1BRXqEehBBgaA__",
    title: "Biggest Selection",
    description: "800+ great machines in stock",
  },
  {
    image:
      "https://s3-alpha-sig.figma.com/img/d7af/8c2c/f91100df25215e7d043bda10158725fe?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fVU3Djfp2AitbHoui7iw4r6hMazBUdN9CO9AERgerJ0tl2Astj8AUtks1Q2ISBqBxvOc43cU-Z4QAQtJIjNigyj5M-FwOrGOc4dd6K6lMWMB37WTEgmLpBKoSw0-Ajg4iYAR2li7sqPOQ8i6JxroEu-lnskBKK9iNYXYaUociOvzPcSUy5HZ~d9AYV9j5RpZUEwIhuaIleDlzdIuXMAhf93cMQLHctjD-YVEoZ5I9wGqfxLE9s5RLSogPZ9gg8YNEPNn6cUM64rKmqusGOPT4WUnogBmdUGdBwy~LgCgQ6fAUy5PVonjUrlmUIcuk0sw1zBeYMt3WO~r7ki~ozOQfA__",
    title: "Lowest Prices",
    description: "Fast, quick, and easy financing",
  },
];

const product = {
  title: "LA Houston",
  images: [
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
  ],
};
const SingleProduct = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState([]);

  const { cart, addItemToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const item = { id: 1, name: 'Product 1', price: 10 };
    addItemToCart();
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
              <img
                src={feature.image}
                alt={feature.title}
                style={{ width: "3.75rem", height: "3.75rem" }}
              />
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
