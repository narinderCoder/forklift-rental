import { ChevronDown, Download } from "lucide-react";
import Share from "../icons/share";
import Checkbox from "./checkbox";
import { useState } from "react";

const CatalogueCard = ({ product,handleComparelist }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  return (
    <div className="row m-0 p-0">
      <div className="col-md-3 col-12">
        <img
          src={
            product?.image
          }
          alt="telehandler-forklift"
          className="h-auto w-100 rounded-3 mb-3"
        />
      </div>
      <div className="col-md-7 col-12">
        <div>
          <h6 className="h6">
           {product.name}
          </h6>
          <p className="p1" style={{ marginTop: "0.75rem" }}>
            {product.short_description}
          </p>
        </div>
        <div
          className="product-variations flex-row gap-3 align-items-center justify-content-between d-flex"
          style={{ marginTop: "1rem" }}
        >
        {product.isVariable ? 
            (product.variations && product.variations.map((variation, index) => (
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
        <button  onClick={() => setShowQuickView(!showQuickView)} className="btn-secondary" style={{ marginTop: "1.5rem" }}>
          Quick view <ChevronDown size={14}  style={{
                  transform: showQuickView ? "rotate(180deg)" : "rotate(0deg)",
                }} />
        </button>
        <ul className={`mt-2 text-opacity-50 ps-4 text-secondary p2 ${showQuickView ? "d-block": "d-none"}`}>
            {product?.attributes?.length > 0 ? product.attributes.map((item, index) => (
                  <li><strong>{item?.title}</strong> : {item.info}</li>
            )): ''}  
        </ul>
      </div>
      <div className="gap-4 d-flex flex-column col-md-2 col-12">
        <div className="gap-3 text-opacity-50 d-flex align-items-center text-secondary justify-content-end">
          <Download />
          <Share />
        </div>
        <div className="gap-2 d-flex flex-column">
         
          <a href={product.detail_page_url}>
          <button
            className="w-100 justify-content-center btn-secondary" 
          >
            Add to cart
          </button>
          </a>
          <a href={product.detail_page_url}>
            <button className="w-100 justify-content-center btn-secondary">
              View Details
            </button>
          </a>
        </div>
       <div className="d-flex">
       <Checkbox label="Compare" reverse={true} onChange={(e) => handleComparelist(e,product)} className={"justify-content-start"}/>
       </div>
      </div>
    </div>
  );
};

export default CatalogueCard;
