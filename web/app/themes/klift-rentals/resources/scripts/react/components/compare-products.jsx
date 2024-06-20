import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

const CompareProducts = ({ show, setShow, products, onAdd, removeProduct }) => {

  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [show]);
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    let attributeObject = {};
  
    if (products && products.length > 0) {
      products.forEach((product) => {
        if (product.attributes && product.attributes.length > 0) {
          product.attributes.forEach((attr) => {
            if (!attributeObject[attr.name]) {
              attributeObject[attr.name] = {};
            }
            attributeObject[attr.name]['title'] = attr.title;
            attributeObject[attr.name][product.id] = {
              name: attr.title,
              values: attr.values,
            };
          });
        }
      });
    }
  
    setAttributes(attributeObject);
    // console.log('attributeObject', attributeObject);
  }, [products]);
  

  function makeCompareType(){
    
  }

  const attributeArray = Object.keys(attributes).map((key) => {
    return {
      name: key,
      details: attributes[key]
    };
  });
  console.log(attributeArray);

  return (
    <div className="compare-custom-container">
      <div className="compare-left-fixed-item">
          <div className="compare-product">
            <h4></h4>
            <div className="compare-img-container"></div>
            {attributeArray && attributeArray.map((spec, ind) => (
              <p key={ind} className="compare-th">
                {spec?.details?.title}
              </p>
            ))}
          </div>
      </div>
      <div className="compare-right-items-container">
        
        <ul>
        {products && products.length > 0 && products.map((product, index) => (
 
         <li>
           <div className="compare-product">

<h4 className="line-clamp-3">{product.name}</h4>
<div className="compare-img-container">
<img
      src={product?.image} 
      className="w-auto rounded-4" 
    />
</div>

{attributeArray.map((spec, ind) => (
                    <p key={ind} className="compare-th line-clamp-1 fw-normal">
                        {spec.details[product.id]?.values?.length ? spec.details[product.id]?.values.join(", ") : '--' }
                    </p>
 ))}

 </div>
         </li>

 


            //  <div key={index} >
            //    <div className="compare-product-column mt-4 mt-md-0">
            //     <div className="py-4 justify-content-between flex-column d-flex">
            //       <div className="w-100 d-flex">
            //         <p
            //           className="flex-grow-1 h6 fw-semibold line-clamp-3"
            //           style={{ height: "6rem" }}
            //         >
            //           {product.name}
            //         </p>
            //         <X
            //           style={{ cursor: "pointer", width: "4rem" }}
            //           onClick={removeProduct}
            //         />
            //       </div>
            //       <div className="img-container">
            //       <img
            //         src={product?.image}
            //         //   alt={product.id}
            //         className="w-auto rounded-4"
            //         // style={{height: "10rem"}}
            //       />
            //       </div>
                 
            //       {attributeArray.map((spec, ind) => (
            //         <p key={ind} className="my-4 text-center">
            //             {spec.details[product.id]?.values?.length ? spec.details[product.id]?.values.join(", ") : '--' }
            //         </p>
            //       ))}
            //     </div>
            //   </div>
            //   </div>
            ))}
          {/* <li>
          <div className="compare-product">
            <h4></h4>
            <div className="compare-img-container"></div>
            {attributeArray && attributeArray.map((spec, ind) => (
              <p key={ind} className="compare-th">
                {spec?.details?.title}
              </p>
            ))}
          </div>
          </li> */}
          
        </ul>
      </div>
    </div>
    // <div
    //   className={`bg-white overflow-x-hidden text-secondary w-100 h-100 top-0 start-0 ${
    //     show ? "d-block" : "d-none"
    //   }`}
    //   style={{
    //     // position: "fixed",
    //     overflow: show ? "auto" : "hidden",
    //     zIndex: 1000,
    //   }}
    // >
    //   <div className="overflow-y-scroll overflow-x-hidden position-relative row">
    //     <div
    //       className="position-absolute bg-white col-2"
    //       style={{  zIndex: 99 }}
    //     >
    //       <div className="py-4 justify-content-between flex-column d-flex">
    //         <div className="w-100 d-flex" style={{height: "6rem"}}>
    //           <p className="compare-product-spec-name flex-grow-1 mb-4 p1 fw-semibold line-clamp-3"></p>
    //         </div>
    //         <div
    //           className="img-container"
    //         />
    //         {attributeArray && attributeArray.map((spec, ind) => (
    //           <p key={ind} className="my-4 text-center fw-semibold">
    //             {spec?.details?.title}
    //           </p>
    //         ))}
    //       </div>
    //     </div>
    //     <div className="col-10 overflow-x-hidden mr-4" style={{marginLeft: "14rem"}}>
    //       <div
    //         className="d-flex gap-4 overflow-x-scroll"
            
    //       >
    //         {products && products.length > 0 && products.map((product, index) => (
    //          <div key={index} style={{
    //           width: "500px",
    //         }}>
    //            <div className="compare-product-column mt-4 mt-md-0">
    //             <div className="py-4 justify-content-between flex-column d-flex">
    //               <div className="w-100 d-flex">
    //                 <p
    //                   className="flex-grow-1 h6 fw-semibold line-clamp-3"
    //                   style={{ height: "6rem" }}
    //                 >
    //                   {product.name}
    //                 </p>
    //                 <X
    //                   style={{ cursor: "pointer", width: "4rem" }}
    //                   onClick={removeProduct}
    //                 />
    //               </div>
    //               <div className="img-container">
    //               <img
    //                 src={product?.image}
    //                 //   alt={product.id}
    //                 className="w-auto rounded-4"
    //                 // style={{height: "10rem"}}
    //               />
    //               </div>
                 
    //               {attributeArray.map((spec, ind) => (
    //                 <p key={ind} className="my-4 text-center">
    //                     {spec.details[product.id]?.values?.length ? spec.details[product.id]?.values.join(", ") : '--' }
    //                 </p>
    //               ))}
    //             </div>
    //           </div>
    //           </div>
    //         ))}
    //         {products.length < 4 ? (
    //           <div
    //             className="position-relative d-flex flex-column align-items-center justify-content-start p-4"
    //             style={{ marginTop: "7rem", width: "220px" }}
    //           >
    //             <div
    //               className="mb-4 border d-flex align-items-center justify-content-center rounded-circle"
    //               style={{
    //                 width: "8rem",
    //                 height: "8rem",
    //                 aspectRatio: "4/3",
    //                 cursor: "pointer",
    //               }}
    //               onClick={onAdd}
    //             >
    //               <Plus cursor={"pointer"} />
    //             </div>
    //           </div>
    //         ) : null}
    //       </div>
    //     </div>
    //   </div>
    //   {/* <X
    //     onClick={() => setShow(false)}
    //     className="position-fixed"
    //     cursor={"pointer"}
    //     style={{ zIndex: 1400, top: "1rem", right: "0.5rem" }}
    //   /> */}
    // </div>
  );
};

export default CompareProducts;
{
  /* <div className="container mx-auto">
        <div className="row m-0 p-0">
          <div className="w-25">
            {Array.from({ length: 1 }).map((product, index) => (
              <div key={index} className="col-3">
                <div className="py-4 justify-content-between flex-column d-flex">
                  <div className="w-100 d-flex">
                    <p
                      className="flex-grow-1 mb-4 p1 fw-semibold line-clamp-3"
                      style={{ height: "5.5rem" }}
                    />
                  </div>
                  <span
                    className="w-auto"
                    style={{ aspectRatio: "4/3", height: "10rem" }}
                  />
                  {Array.from({ length: 10 }).map((spec, ind) => (
                    <p key={ind} className="my-4 fw-semibold">
                      Manufactor
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-75">
            <div className="row p-0 m-0">
              {Array.from({ length: 3 }).map((product, index) => (
                <div key={index} className="col-3">
                  <div className="py-4 justify-content-between flex-column d-flex">
                    <div className="w-100 d-flex">
                      <p
                        className="flex-grow-1 mb-4 p1 fw-semibold line-clamp-3"
                        style={{ height: "5.5rem" }}
                      >
                        TOYOTA 6500 FORKLIFT FOR RENT OR SALE IN HOUSTON
                      </p>
                      <X
                        style={{ cursor: "pointer", width: "4rem" }}
                        onClick={() => {}}
                      />
                    </div>
                    <img
                      src="https://www.mechanicalpower.net/wp-content/uploads/2022/04/Components-of-a-Forklift-Truck-980x655.jpg"
                      //   alt={product.id}
                      className="w-auto rounded-4"
                      style={{ aspectRatio: "4/3", height: "10rem" }}
                    />
                    {Array.from({ length: 10 }).map((spec, ind) => (
                      <p key={ind} className="my-4 text-center">
                        Toyota
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {products.length < 4 ? (
                <div className="col-3">
                  <div
                    className="position-relative d-flex flex-column align-items-center justify-content-start p-4"
                    style={{ marginTop: "7rem" }}
                  >
                    <div
                      className="mb-4 border d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "8rem",
                        height: "8rem",
                        aspectRatio: "4/3",
                        cursor: "pointer",
                      }}
                      onClick={onAdd}
                    >
                      <Plus cursor={"pointer"} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div> */
}