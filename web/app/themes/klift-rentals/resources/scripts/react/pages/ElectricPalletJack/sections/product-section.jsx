import AddToCart from "@scripts/react/components/add-to-cart";
import ExpandableCard from "../../../components/expandable-card";
import Rating from "../../../components/rating";
import ProductSlider from "@scripts/react/components/product-slider";
import DescriptionExpandableCard from "@scripts/react/components/description-expandable-card";
import { ChevronDown } from "lucide-react";

const ProductSection = ({
  product,
  handleRadio,
  isChecked,
  selectedVariation,
  attributes,
  types,
  setLoading
}) => {

  console.log(product?.description);
  return (
    <div className="row g-4">
      <div className="col-lg-5 col-md-6 col-12">
        <ProductSlider data={product} className="col-12 w-100" />
      </div>
      <div className="col-lg-7 col-md-6 col-12">
        <div>
          <h3 className="h3 text-secondary" style={{ marginBottom: "2.5rem" }}>
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
            <div className="text-secondary text-opacity-80 p3">
              <p>Pickup available at LA</p>
              <p>Usually ready in 2-4 days</p>
            </div>

           
            <div className="d-flex flex-column gap-4">
                {attributes.map((attr, index) => (
                  <div className={`expandable-card open`} key={index}>
                    <div className="w-100 d-flex align-items-center text-secondary" style={{ gap: '0.75rem' }}>
                      <p className="p1">{attr.title}</p>
                    </div>
                    <div className="flex-row gap-5 justify-content-start d-flex align-items-center" style={{ gap: '1.25rem' }}>
                      <div className="flex-row w-100 justify-content-between align-items-center d-flex">
                        {/* {attr.values.map((a) => (
                          <div className="form-check" key={a}>
                            <input
                              className="form-check-input"
                              type="radio"
                              id={`variation${a?.slug}`}
                              value={a?.slug}
                              name={attr.name}
                              onChange={(e) => handleRadio(attr.name, e)}
                              checked={isChecked(attr.name, a?.slug)}
                            />
                            <label className="form-check-label" htmlFor={`variation${a?.slug}`}>
                              {a}
                            </label>
                          </div>
                        ))} */}

                        <div className='position-relative w-100'>
                         <select className="w-100 custom-select" onChange={(e) => handleRadio(attr?.name, e)}>
                          {attr?.values &&
                            attr?.values.map((a, k) => (
                             <> <option value={a?.slug} selected={isChecked(attr.name, a.slug)}>{a?.name}</option> </>
                            ))}
                          </select>
                          <ChevronDown className="position-absolute" style={{top: "16px", right: "8px"}} />
                         </div>
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
          </div>
          <p className="mb-2 p3">Shipping calculated at checkout.</p>
          <div
              className="d-flex"
              style={{ marginBottom: "5rem", gap: "1.25rem" }}
            ><AddToCart options={types} productId={product?.id} variationId={selectedVariation?.id } setLoading={setLoading}/></div>
          <div className="d-flex flex-column gap-4">
            <DescriptionExpandableCard title="Description" description={product?.description} />
            <ExpandableCard title="Specifications" data={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
