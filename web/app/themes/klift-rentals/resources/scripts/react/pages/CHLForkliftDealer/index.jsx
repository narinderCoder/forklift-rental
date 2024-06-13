import { useEffect, useState } from "react";
import { ChevronRight, PrinterIcon, ShareIcon } from "lucide-react";
import ProductSlider from "@scripts/react/components/Pages/Homepage/ProductSlider";
import Trade from "@scripts/react/icons/trade";
import Finance from "@scripts/react/icons/finance copy";
import Message from "@scripts/react/icons/message copy";
import Quote from "@scripts/react/icons/quote";
import ExpandableCard from "@scripts/react/components/expandable-card";
import QuoteForm from "@scripts/react/components/quote-form";
import Share from "@scripts/react/icons/share";
import Loader from "@scripts/react/components/loader";
import EnvProvider from '@scripts/react/EnvVar';
import axios from 'axios';
import DescriptionExpandableCard from "@scripts/react/components/description-expandable-card";
const product = {
  title: "LA Houston",
  images: [
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
    "https://s3-alpha-sig.figma.com/img/5ad1/a678/5a83c0d3d59daf5bf3953cb52d26ea83?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPDeIAUd~2ufIuF4nJhjf5gaV6dSaixr~7pbmG0MK3Dw4con0spIY3JJwWLfJ04udmgBylODafzbghjfGRuAxsYRAElUrom4ecCyK-4fj3bw~sKoRmao~t0t9SswVeqH8kO3rRq9uqXFhGGvYnWCXMZqEIUStsd6RwKfdB3sjwbcSoJZBWqkQ44q-9DzUpBXhsJUsthTqW6hBNHtu5vWQERyoicpNfAAwkBWHhmX5-ts7lZti8Q5OTOGw9Fgb84xnbuTVoc7J7q5L857Cl3skDQtO9XLH9ncdCEtfw8ojMl0xy1j7V7AB8rl4LpNgL~ci~S-s45DI22XMzXkn0GFGg__",
  ],
};

const CHLForkliftDealer = () => {
  const [showQuote, setShowQuote] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedVariation, setSelectedVariation] = useState([]);
  const [selectedCategories,setSelectedCategories] = useState([]);
  const [slug, setSlug] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
     
      try {
        var divElement = document.getElementById('chlForkliftDealerProduct');
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
        
        let newData = []; 
        let s =null;
        data1.product_cats.forEach((a) => {  
              s = a.slug; 
            newData.push(a.term_id);
        }); 
     

        setSelectedCategories(newData);
        fetchProducts(s,newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const fetchProducts = async (cate_slug,cates) => {
    if(cates.length > 0){
    //  const cates = selectedCategories.filter((c) => c > 0);
     const response = await axios.post(`${EnvProvider.baseUrl}products-by-category/${cate_slug}/1`, { 
       limit:5, 
       categories:cates 
     }); 
     const data1 = response.data;
     setProducts(data1.data);
    }
    
     
 };

  
  return (
    <>
    <Loader loading={loading}/>
    <div className="container mx-auto section-alt px-4">
      <h3 className="h3 mb-4">{product?.name}</h3>
      <p className="p1" style={{ marginBottom: "2.5rem" }} dangerouslySetInnerHTML={{ __html: product?.short_description }}>
      </p>
      <div className="row mb-custom">
        <div className="col-md-5 col-12 mb-custom">
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
        <div className="col-md-7 col-12">
          <h5 className="h5 text-end">Click for quote!</h5>
          <h6 className="h6" style={{ marginBottom: "1.75rem" }}>
            Selling Price
          </h6>
          <div
            className="d-flex flex-column align-items-start w-100"
            style={{ gap: "1.5rem", marginBottom: "1.5rem" }}
          >
            
            <DealershipButton 
               
              icon={Quote}
              title="Get a quote"
              onClick={() => setShowQuote(!showQuote)}
              
            />
            <DealershipButton icon={Trade} title="Value your trade" />
            <DealershipButton icon={Finance} title="Get Financing " />
            <DealershipButton icon={Message} title="Contact Us" />
            <DealershipButton icon={PrinterIcon} title="Print" />
            <DealershipButton
              icon={ShareIcon}
              title="Share"
              onClick={() => setShowShare(!showShare)}
            />
          </div>
          <div className="d-flex flex-column" style={{ gap: "1.5rem" }}>
           
              <DescriptionExpandableCard title="Info" description={product?.description} />
              <ExpandableCard title="Specifications" data={product} />
            </div>
        </div>
      </div>
      <div className="">
        <h3
          className="h3"
          style={{ marginBottom: "2.5rem", overflow: "hidden" }}
        >
          Recommendations
        </h3>
        <div className="row g-4">
          {products !== undefined && products.length > 0 && products.map( (p,index) => (
            <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-12">
              <div className="p-2">
                <img
                  src={p.image}
                  alt="alt"
                  className="w-100 h-auto"
                />
                {/* <p className="p1">2024</p> */}
               <a href={p.detail_page_url}><h6 className="h6">{p.name}</h6></a> 
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="p1" style={{ marginTop: "2.5rem" }}>
        Advertised pricing excludes applicable taxes title and licensing and are
        subject to change without notice. Pricing may exclude any added parts,
        accessories or installation unless otherwise noted. Sale prices include
        all applicable offers. Not all options listed available on pre-owned
        models. Contact dealer for details.
      </p>
      {<QuoteForm show={showQuote} setShow={setShowQuote} product={product} setLoading={setLoading} />}
      {<Share show={showShare} setShow={setShowShare} />}
    </div>
    </>
  );
};

const DealershipButton = ({ icon, title, onClick }) => {
  const Icon = icon;
  return (
    <button
      className="justify-content-between align-items-center d-flex w-100 gap-2 text-opacity-50 btn-secondary p1 hover-text-primary"
      onClick={onClick}
    >
      <div className="d-flex align-items-center gap-2">
        <Icon />
        <p>{title}</p>
      </div>
      <ChevronRight />
    </button>
  );
};

export default CHLForkliftDealer;
