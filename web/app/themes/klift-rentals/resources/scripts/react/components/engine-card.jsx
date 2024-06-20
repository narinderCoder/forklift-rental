import { ChevronDown, Download } from "lucide-react";
import ShareIcon from "../icons/share";
import Checkbox from "./checkbox";
import { useState } from "react";
import Share from "./share";

const EngineCard = ({ product,handleComparelist }) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const [showShare, setShowShare] = useState(false)
  return (
    <div className="row m-0 gx-4">
                    <div className="col-md-3 col-12 mb-3 mb-md-0">
        <img
          src={
            product?.image
          }
          alt={product.name}
        className="h-auto w-100 rounded-3"
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
          className="flex-row gap-3 align-items-center d-flex"
          style={{ marginTop: "1rem" }}
        >
        {product.isVariable ? 
            (product.variations && product.variations.map((variation, index) => (
                    <>
                      <div>
                        <p className="p1" style={{ opacity: 0.5 }}>
                          {variation?.attributes?.attribute_pa_rental_type}
                        </p>
                        
                        <h6 dangerouslySetInnerHTML={{ __html: variation?.price }}></h6>
                      </div>
                    </>
            )
          )):(
            <>
              <h6 dangerouslySetInnerHTML={{ __html: product?.price }}></h6>
            </>
          )
        }  
        </div>
        {product?.attributes?.length > 0 ? (
          <>    <button  onClick={() => setShowQuickView(!showQuickView)}  className="btn-secondary" style={{ marginTop: "1.5rem" }}>
          Quick view <ChevronDown size={14}  style={{
                  transform: showQuickView ? "rotate(180deg)" : "rotate(0deg)",
                }} />
        </button></>
        ) : ''}
    
    <ul className={`mt-2 text-opacity-50 ps-4 text-secondary p2 ${showQuickView ? "d-block": "d-none"}`}>
            {product?.attributes?.length > 0 ? product.attributes.map((item, index) => (
                  <li><strong>{item.title}</strong> : {item.info}</li>
            )): null}  
        </ul>
      </div>
  <div className="col-md-2 col-12">
  <div className="gap-3 text-opacity-50 d-flex align-items-center text-secondary justify-content-end">
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
        <div className="gap-2 d-flex flex-column mt-4">
         
          {/* <a href={product.detail_page_url}>
          <button
            className="justify-content-center btn-secondary" 
          >
            Add to cart
          </button>
          </a> */}
          <a href={product.detail_page_url}>
            <button className="w-100 justify-content-center btn-secondary">
              View Details
            </button>
          </a>
        
      </div>
  </div>
  <Share show={showShare} setShow={setShowShare} shareUrl={`${product.detail_page_url}`} />
    </div>
  );
};

export default EngineCard;
