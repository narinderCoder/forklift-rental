import CatalogueCard from "@scripts/react/components/catalogue-card";
import CompareModal from "@scripts/react/components/compare-modal";
import CompareProducts from "@scripts/react/components/compare-products";
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
    <div className="col-12 col-md-8">
      <div className="flex-row mb-8 justify-content-between w-100 d-flex align-items-center">
        <input placeholder="Search" className="search-input" onChange={(e) => handleSearch(e)}/>

        <button className="text-white btn-secondary bg-primary" onClick={() => setCompareModel(true)}>
          Compare Products ({compareList.length})
        </button>
      </div>
      <div
        className="d-flex flex-column"
        style={{ gap: "2.5rem", marginTop: "2.5rem" }}
      > 

<Loader loading={loading}/>

      {loading ? (
        <> 
        </>
      ) : (
         <>
         {products.length > 0 ? products.map( (product,index) => (
            <div key={index}>
              <CatalogueCard product={product} setShowModal={() => {}} handleComparelist={handleComparelist}/>
               <hr className="border-secondary opacity-20" /> 
            </div>
        )) : ''}
         </>
      )}


        
      </div>
      <div
        className="gap-2 justify-content-end d-flex align-items-center text-secondary"
        style={{ marginTop: "2rem" }}
      >
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

      <CompareModal
        showModal={compareModelShow}
        setShowModal={() => handleCompareModel()}
        clearProducts={() => setCompareList([])}
        onShow={() => {}}
      >
        <div className="flex-row flex-wrap d-flex align-items-center">
          {compareList.length > 0 && compareList.map((p, index) => (
            <div
              key={index}
              className={"rounded-2 position-relative m-2 px-2 py-3"}
              style={{
                cursor: "pointer",
                width: "calc(25% - 1.25rem)",
                boxShadow:
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
            >
              <div onClick={() => {}}>
                <img
                  src={p?.image}
                  className="h-auto w-100"
                  style={{ aspectRatio: "1", margin: "1rem auto" }}
                />
                <p className="text-center">
                 {p?.name}
                </p>
              </div>
              <X
                className="p-1 bg-primary text-white opacity-75 rounded-circle position-absolute"
                style={{ top: "0.25rem", right: "0.25rem", cursor: "pointer" }}
                onClick={() => handleRemoveCompare(p)}
              />
            </div>
          ))}
        </div>
      </CompareModal>

      <CompareProducts
        show={false}
        setShow={() => {}}
        specs={[]}
        products={[]}
        showModal={false}
        onAdd={() => {}}
      />
    </div>

    </>
  );
};

export default MainProducts;
