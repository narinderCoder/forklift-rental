import { ChevronDown, Download } from "lucide-react";
import Share from "../icons/share";
import Checkbox from "./checkbox";

const CatalogueCard = ({ product,handleComparelist }) => {
  return (
    <div className="row">
      <div className="col-3">
        <img
          src={
            product?.image
          }
          alt="telehandler-forklift"
          className="h-auto w-100"
        />
      </div>
      <div className="col-7">
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
          )): (
            <>
             <h6 dangerouslySetInnerHTML={{ __html: product?.price }}></h6>
            </>
          )
        }  
        </div>
        <button className="btn-secondary" style={{ marginTop: "1.5rem" }}>
          Quick view <ChevronDown size={14} />
        </button>
        <ul className="mt-2 text-opacity-50 ps-4 text-secondary p2">
            {product?.attributes?.length > 0 ? product.attributes.map((item, index) => (
                  <li><strong>{item.name}</strong> : {item.info}</li>
            )): ''}  
        </ul>
      </div>
      <div className="gap-4 d-flex flex-column col-2">
        <div className="gap-3 text-opacity-50 d-flex align-items-center text-secondary justify-content-end">
          <Download />
          <Share />
        </div>
        <div className="gap-2 d-flex flex-column">
         
          <a href={product.detail_page_url}>
          <button
            className="justify-content-center btn-secondary" 
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
        <Checkbox label="Compare" reverse={true} onChange={(e) => handleComparelist(e,product)}/>
      </div>
    </div>
  );
};

export default CatalogueCard;
