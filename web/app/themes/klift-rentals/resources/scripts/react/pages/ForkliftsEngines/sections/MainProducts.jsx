import CatalogueCard from "@scripts/react/components/catalogue-card";
import CompareModal from "@scripts/react/components/compare-modal";
import CompareProducts from "@scripts/react/components/compare-products";
import EngineCard from "@scripts/react/components/engine-card";
import Loader from "@scripts/react/components/loader";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { X } from "lucide-react";
import { useState } from "react";

const MainProducts = ({
  products, 
  page,
  handleSearch,
  loading,
  handleLoading,
  handlePagination
}) => {

const [compareList,setCompareList] = useState([]);
  
const handleComparelist = (e,product) => {
  if(compareList.length > 3){
    alert('You can only compare upto 4 products');
  }else{
    let compare_list = [...compareList];
    const p_id = product.id; 
    if (e.target.checked) {  
      const hasId = compare_list.some(obj => obj.id === p_id);
      if (!hasId) {
          compare_list.push(product);
      }
    } else { 
      compare_list = compare_list.filter(obj => obj.id !== p_id);
    }  
    setCompareList(compare_list);
  } 
}

const handleRemoveCompare = (product) => {
  let compare_list = [...compareList];
  const p_id = product.id; 
  
    const hasId = compare_list.some(obj => obj.id === p_id);
    if (hasId) {
      compare_list = compare_list.filter(obj => obj.id !== p_id);
    } 
    setCompareList(compare_list);
}

const handleCompareModel = (e) => setCompareModel(e);

const [compareModelShow,setCompareModel] = useState(false);

  return (
    <>
    <Loader loading={loading}/>
      <div className="col-md-8 col-12 text-secondary">
      <div className="flex-md-row flex-column mb-8 justify-content-between w-100 d-flex align-items-md-start align-items-center">
              <p className="p1">{page.total} Results Found</p>

              <div className="gap-2 justify-content-md-end justify-content-center d-flex align-items-center text-secondary mt-1">
                <ArrowLeft
                    onClick={() => handlePagination(0)}
                    className={`text-primary-alt ${page.p > 1 ? '' : 'text-opacity-50'}`}
                    style={{ cursor: "pointer" }}
                    />
                    <p>
                    Page: {page.p} of {page.pages}{" "}
                    <span className="text-opacity-50 text-secondary">({page.total} units)</span>
                    </p>
                    <ArrowRight
                    onClick={() => handlePagination(1)}
                    className={`text-primary ${page.p == page.pages ? 'text-opacity-50' : ''}`}
                    style={{ cursor: "pointer" }}
                    />
              </div>

               
   </div>




       <div className="d-flex flex-column mt-4">

      {loading ? (
        <>
           Loading ....
        </>
      ) : (
         <>
         {products.length > 0 ? products.map( (product,index) => (
            <div key={index}>
              <EngineCard product={product} setShowModal={() => {}} handleComparelist={handleComparelist}/>
              <hr className="border-secondary opacity-10 my-4" />
            </div>
        )) : ''}
         </>
      )}


        
      </div>
      <div className="gap-2 mt-4 justify-content-md-end justify-content-center d-flex align-items-center text-secondary mt-1 mb-4">
           <ArrowLeft
            onClick={() => handlePagination(0)}
            className={`text-primary-alt ${page.p > 1 ? '' : 'text-opacity-50'}`}
            style={{ cursor: "pointer" }}
            />
            <p>
            Page: {page.p} of {page.pages}{" "}
            <span className="text-opacity-50 text-secondary">({page.total} units)</span>
            </p>
            <ArrowRight
            onClick={() => handlePagination(1)}
            className={`text-primary ${page.p == page.pages ? 'text-opacity-50' : ''}`}
            style={{ cursor: "pointer" }}
            />
        </div>

       </div>

  

    </>
  );
};

export default MainProducts;
