import ProductSlider from "./product-slider";
import { ChevronDown, Download } from "lucide-react";
import ProductButton from "./product-button";
import ExpandableCard from "./expandable-card";
import ShareIcon from "../icons/share";
import ImagesIcon from "../icons/images";
import Quote from "../icons/quote";
import Trade from "../icons/trade";
import Settings from "../icons/settings";
import { useState } from "react";
import Share from "./share";

export default function ProductCard({ product, view = "quick", sale = false }) {
  const [showQuickView, setShowQuickView] = useState(false);
  const [showShare, setShowShare] = useState(false)
  return (
    <div className="row g-md-4 w-100 m-0 p-0 w-100">
      <div className="col-lg-5 col-md-6 col-12">
        <ProductSlider data={product} />
      </div>
      <div className="col-lg-7 col-md-6 col-12">
        <div className="row m-0 p-0 w-100">
          <div className="col-md-10 col-12">
          <a href={product.detail_page_url}> <h4 className="h4">{product.name}</h4></a>
            <p className="p1">{product.short_description}</p>
          </div>
          <div className="col-md-2 col-12 my-md-4 my-2">
            <div className="d-flex align-items-center gap-2 opacity-50 text-secondary">
            
            {product?.custom_fields?.upload_file !== undefined && product?.custom_fields?.upload_file !== '' && (
            <Download style={{cursor: "pointer"}} onClick={() => {
              
                var a = document.createElement('a');
                a.href = product?.custom_fields?.upload_file;
                a.download = product.name; 
                document.body.appendChild(a);  
                a.click();  
                document.body.removeChild(a);
            }}  />  
        )}
            <ShareIcon style={{cursor: "pointer"}} onClick={() => setShowShare(!showShare)} />
            </div>
          </div>
        </div>

        {view === "quick" ? (
          <>
            <div
              className="flex-wrap flex-column w-100 d-flex align-items-center flex-md-row  my-4"
              style={{ gap: "1rem" }}
            >
              <ProductButton
                title="More Images"
                icon={ImagesIcon}
                className={"text-primary"}
              />
              <ProductButton
                title="Get Quotes"
                icon={Quote}
                className={"text-primary"}
              />
              <ProductButton
                title="Value Your Trade"
                icon={Trade}
                className={"text-primary"}
              />
              <ProductButton
                title="View Details"
                icon={Settings}
                className={"text-primary"}
              />
            </div>
            <div
              className="flex-row align-items-center d-flex my-4"
              style={{ gap: "1rem" }}
            >
              {/* {product.variations &&
                product.variations.map((variation) => (
                  <>
                    <div>
                      <p className="p1" style={{ opacity: 0.5 }}>
                        {variation?.attributes?.attribute_pa_rental_type}
                      </p>
                      <h6 className="h6">$ {variation?.price}</h6>
                    </div>
                  </>
                ))} */}
                
            </div>

            <button
              onClick={() => setShowQuickView(!showQuickView)}
              className="quick-btn font-weight-normal align-items-center justify-content-center d-flex text-secondary my-4"
            >
              <p className="p1">Quick view</p>
              <ChevronDown
                size={24}
                style={{
                  transform: showQuickView ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            <ul
              className={`${
                showQuickView ? "d-block" : "d-none"
              } mt-2 text-opacity-50 ps-4 text-secondary p2`}
            >
              <li>Used</li>
              <li>Engine Size: 10000.0</li>
              <li>Stock</li>
            </ul>
          </>
        ) : (
          <>
           <div className="d-flex flex-column flex-md-row align-items-md-center align-items-start justify-content-between w-100 mb-2 mb-md-0">
           <button className="gap-0 font-weight-medium btn-primary my-md-4 my-2">
                  <p  dangerouslySetInnerHTML={{ __html: product.price }}></p>
                </button>

                <a href={product.detail_page_url}>
                <button className="gap-0 font-weight-medium btn-primary my-md-4 my-2">
                    View Details
                  </button>
                </a>
           </div>
            <ExpandableCard
              title="Specifications"
              data={product}
            />


          </>
        )}
      </div>
      <Share show={showShare} setShow={setShowShare} shareUrl={`${product.detail_page_url}`} />
    </div>
  );
}
