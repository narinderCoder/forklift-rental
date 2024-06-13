import { ProductFilters, ProductSideOptions, MainProducts } from "./sections";
import "./products.scss";
import { useEffect, useState } from "react";
import EnvProvider from '../../EnvVar';
import axios from 'axios';
const Products = () => {

  const [products,setProducts] = useState(''); 
  const [page,setPage] = useState({
    p:1,
    pages:0,
    total:0,
    limit:10
  });
  const [slug,setSlug] = useState(null);
  const [search,setSearch] = useState(null);
  const [loading,setLoading] = useState(false);
  const [title,setTitle] = useState(null);
  const [filterData,setFilterData] = useState([]);
  const [attributeOptions,setAttributeOptions] = useState([]);
  const [selectedCategories,setSelectedcategories] = useState([]);
  const [params,setParams] = useState({
    parent:0
  });

  // useEffect(() => { 
  //   var divElement = document.getElementById('rentProductReact');
  //   // Check if the element exists
  //   if (divElement) { 
  //       var slug = divElement.getAttribute('data-slug');
  //       setSlug(slug);
  //       var title = divElement.getAttribute('data-name');
  //       var parent = divElement.getAttribute('data-parent');
  //       var id = divElement.getAttribute('data-id');
  //       setTitle(title);
  //       fetchData(slug);
  //        setParams({
  //         ...params,
  //         parent:parent
  //        })
  //   } else {
  //       console.error('Element with ID "saleProductReact" not found.');
  //   } 
  //   }, [attributeOptions, search, selectedCategories]); 



    
  useEffect(() => { 
    if(slug !== null){
      fetchData(slug);
    } 
    }, [attributeOptions, search, selectedCategories,slug]); 



    useEffect(() => { 
        var divElement = document.getElementById('rentProductReact');
        // Check if the element exists
        if (divElement) { 
            var slug = divElement.getAttribute('data-slug');
             setSlug(slug);
            var title = divElement.getAttribute('data-name');
            var id = parseInt(divElement.getAttribute('data-id'));
            setTitle(title);
            // fetchData(slug);
            let updatedCategories = [ ...selectedCategories ]; 
             if (!updatedCategories.includes(id) && id !== null){
                updatedCategories.push(id);
             }
             setSelectedcategories(updatedCategories);
             var parent = divElement.getAttribute('data-parent');
                  setParams({
                      ...params,
                      parent:parent
                     })
        } else {
            console.error('Element with ID "saleProductReact" not found.');
        } 
      }, [page.p]); 
  
   

  // Fetch Data Function

  const fetchData = async (cat_slug) => {
    try {
      handleLoading(true);
      const cates = selectedCategories.filter((c) => c > 0);
      const response = await axios.post(`${EnvProvider.baseUrl}products-by-category/${cat_slug}/${page.p}`, {
        attributes: attributeOptions,
        limit: page.limit,
        search:search,
        categories:cates 
      }); 
      const data1 = response.data;
      setProducts(response.data.data);
      const totalPages = Math.ceil(data1.meta.total / page.limit);
      setPage({
        p: page.p,
        limit: page.limit,
        total: data1.meta.total,
        pages: totalPages
      });
      handleLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      handleLoading(false);
    }
  };

  function settingFilterOptions(e) { 
      let updatedAttributes = { ...attributeOptions }; 
      const attributeName = e.target.name;
      const checkboxValue = e.target.value; 
      let attributeValues = updatedAttributes[attributeName] !== undefined ? updatedAttributes[attributeName] : []; 
      if (e.target.checked) { 
        if (!attributeValues.includes(checkboxValue)) {
          attributeValues.push(checkboxValue);
        }
      } else { 
        attributeValues = attributeValues.filter(value => value !== checkboxValue);
      } 
      updatedAttributes[attributeName] = attributeValues;
      if (attributeValues.length === 0) {
        delete updatedAttributes[attributeName];
      } 
      setAttributeOptions(updatedAttributes);
  }

  

  function handleSubOptions(e) { 
    let updatedCategories = [ ...selectedCategories ]; 
    const attributeName = e.target.name;
    const checkboxValue = parseInt(e.target.value); 
  
    if (e.target.checked) {  
      if (!updatedCategories.includes(checkboxValue)){
           updatedCategories.push(checkboxValue);
      }
    } else { 
      if(updatedCategories.length > 0){
         updatedCategories = updatedCategories.filter(value => value !== checkboxValue); 
      }
    }  
    setSelectedcategories(updatedCategories);
    console.log(updatedCategories,'hhh');
  }



  const handleResetFilter = () => {
    setAttributeOptions([]);
    setSelectedcategories([]);
  }


  let searchTimeout; 
 const handleSearch = (e) => {
      // Clear the previous timeout to prevent it from executing
      clearTimeout(searchTimeout); 
      // Set a new timeout to execute the search after a delay
      searchTimeout = setTimeout(() => {
        setSearch(e.target.value);
      }, 300); // Adjust the delay as needed (e.g., 300 milliseconds)
};


const handlePagination = (type = 0) => {
  if (page.p > 0) {
    switch (type) {
      case 0: // Previous page
        if (page.p > 1) {
          setPage((prevPage) => ({
            ...prevPage,
            p: prevPage.p - 1
          }));
        } 
        break;
      case 1: // Next page
        if (page.p < page.pages) {
          setPage((prevPage) => ({
            ...prevPage,
            p: prevPage.p + 1
          }));
        } 
        break;
      default:
        break;
    }
  }
};
const handleLoading = (e) => setLoading(e);

  return (
    <div className="container products-page">
      <h1 className="text-center text-secondary h1">
        {title}
      </h1>
      <div>
        <ProductFilters />
        <div
          className="row d-flex"
          style={{ gap: "5rem", padding: "2rem 0.25rem" }}
        >
          <ProductSideOptions data={filterData} 
          handleOptions={settingFilterOptions} 
          handleSubOptions={handleSubOptions}
          resetFilter={handleResetFilter} 
          params={params}
          selectedCategories={selectedCategories}
          attributeChecked={attributeOptions}/>
          <MainProducts products={products} handlePagination={handlePagination} page={page} handleSearch={handleSearch} loading={loading} handleLoading={handleLoading}/>
        </div>
      </div>
    </div>
  );
};

export default Products;
