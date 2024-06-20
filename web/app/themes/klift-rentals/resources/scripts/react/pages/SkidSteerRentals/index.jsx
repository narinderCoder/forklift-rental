import { useEffect, useState } from "react";
import "./skid-steer-rentals.scss";
import ReactSelect from "react-select";
import axios from 'axios';
import EnvProvider from '@scripts/react/EnvVar';
import Banner from "@scripts/react/components/banner";
import Loader from "@scripts/react/components/loader";

const options = [
  { label: "Skid Steers For Rent", value: "Rent" },
  { label: "Skid Steers For Sale", value: "Sale" },
];

const SkidSteerRentals = () => {
  const [selectedTab, setSelectedTab] = useState(options[0].value);
  const [pageData,setPageData] = useState([]);
  const [loading,setLoading] = useState(false);
  const [total,setTotal] = useState(0);
  const [limit,setLimit] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
        try {
          setLoading(true);
          var divElement = document.getElementById('skidSteers');
          let $_ID = parseInt(divElement.getAttribute('data-id')); 
          const response = await fetch(
            `${EnvProvider.baseUrl}custom-page/${$_ID}`
          );
          const jsonData = await response.json();
          const data1 = jsonData.data; 
          setPageData(data1); 
          fetchProducts(data1?.custom_fields?.category,options[0].value);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };
    fetchData();
  }, []);

   

  const changeProductType = (type) => {
    setSelectedTab(type);
    fetchProducts(pageData?.custom_fields?.category,type);
  }

const [products,setProducts] = useState([]);
const fetchProducts = async (cates,type) => { 
    if(cates.length > 0){
      setLoading(true);
    //  const cates = selectedCategories.filter((c) => c > 0);
     const response = await axios.post(`${EnvProvider.baseUrl}skid-steer-products-by-category/${type}/1`, { 
       limit:limit, 
       categories:cates 
     }); 
     const data1 = response.data;
      
     setProducts(data1?.data); 
     setTotal(data1?.meta?.total);
     setLoading(false);
    }
 }


 const handlePagination = (type = 0) => {
    let lmt = products.length + 10;
    setLimit(lmt);
    fetchProducts(pageData?.custom_fields?.category,selectedTab);
  };

  return (
     <>
       <Loader loading={loading}/>
    <div className="skid-steer-rentals-page">

<Banner
        image={pageData.custom_fields?.banner_image}
        height="90vh"
        filter="brightness(0.4) blur(1.2px) grayscale(100%)"
      >
         <h1
            className="h1 text-white text-center"
            style={{ marginBottom: "1.75rem" }}
          >
           {pageData?.title}
          </h1>
          <p className="p1 text-center text-white text-opacity-80"  dangerouslySetInnerHTML={{ __html: pageData?.content }}>
          </p>
      </Banner>
      
      <section className="container mx-auto section px-4">
        <div className="skid-steer-categories d-none d-md-flex align-items-center justify-content-center position-relative">
          <h4
            className={`text-secondary h4 ${
              selectedTab === "Rent"
                ? "text-opacity-100"
                : "text-opacity-50"
            }`}
            onClick={() => changeProductType("Rent")}
            style={{ cursor: "pointer" }}
          >
            Skid Steers For Rent
          </h4>
          <div
            className={`position-absolute bottom-0 border border-primary ${
              selectedTab === "Sale" ? "on-sale" : "on-rent"
            }`}
            // style={{ transition: "all 0.35s" }}
          ></div>
          <h4
            className={`text-secondary h4 ${
              selectedTab === "Sale"
                ? "text-opacity-100"
                : "text-opacity-50"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => changeProductType("Sale")}
          >
            Skid Steers For Sale
          </h4>
        </div>

        <div className="w-100 d-block d-md-none mb-4">
          <ReactSelect
            unstyled
            classNames={{
              placeholder: () => "text-secondary text-opacity-40",
              singleValue: () => "text-secondary",
              option: () => "bg-white p-2",
              dropdownIndicator: () => "text-secondary text-opacity-40",
              menu: () =>
                "bg-white text-secondary px-4 py-4 border border-top-0 border-opacity-20 rounded-3 rounded-top-0",
              control: (state) =>
                state.menuIsOpen
                  ? "select-product-menu-electric p1 rounded-bottom-0"
                  : "select-product-menu-electric p1",
            }}
            options={options}
            placeholder=""
            onChange={(e) => {
              setSelectedTab(e.value);
            }}
            value={options.find((item) => item.value === selectedTab)}
          />
        </div>

        <div className="d-flex flex-column" style={{ gap: "2.5rem" }}>
          {products && products.length > 0 && products.map((product, index) => (
            <div
              key={index}
              className="d-flex flex-column flex-md-row skid-steer-card align-items-center"
              style={{ borderRadius: "10px" }}
            >
              <img
                src={product?.image}
                alt="skid steer"
                className="skid-steer-image"
              />
              <div className="separator"></div>
              <div
                className="d-flex flex-column justify-between flex-grow-1"
                style={{ gap: "2.5rem" }}
              >
                <div className="d-flex flex-column gap-3">
                  <p className="p1">Equipment ID: {product?.id}</p>
                  <h4 className="h4 font-medium">
                   {product?.name}
                  </h4>
                </div>
                <div className="d-flex skid-options">
                {product?.isVariable ? (product?.variations && product?.variations.map((variation, index) => (
                        <>
                          <div>
                            <p className="p1 text-center text-uppercase" style={{ opacity: 0.8 }}>
                              {variation?.attributes?.attribute_pa_rental_type}
                            </p>
                            
                            <h6 dangerouslySetInnerHTML={{ __html: variation?.price }}></h6>
                          </div>
                        </>
                 )
                )): (
                    <>
                    <h6 dangerouslySetInnerHTML={{ __html: product?.price }}></h6>
                    </>
                  )
                } 
                 
                </div>
           
                <a href={product.detail_page_url}>
                  <button className="btn-secondary">View Details</button>
                </a>
              </div>
            </div>
          ))}
        </div>

 
        {
  total > products.length && (
      <div className="d-flex align-items-center justify-content-center w-100">
        <button className="btn-primary" onClick={() => handlePagination(1)}>Load More</button>
      </div>
  )
}
   

        {/* <div className="d-flex">
          <button
            className="mx-auto justify-content-center btn-secondary"
            style={{ marginTop: "3.5rem" }}
          >
            View All Skid Steers
          </button>
        </div> */}
      </section>
    </div>
     </>
  );
};

export default SkidSteerRentals;