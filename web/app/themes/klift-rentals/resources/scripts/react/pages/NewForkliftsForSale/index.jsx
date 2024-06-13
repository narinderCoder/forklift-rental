import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar'; 
import axios from 'axios';
const NewForkliftsForSale = () => {
  const [category,setCategory] = useState(null); 
  const [page,setPage] = useState({
    p:1,
    pages:0,
    total:0,
    limit:10
  });
  const [slug,setSlug] = useState(null);
  const [pageData,setPageData] = useState(null); 
  const [loading,setLoading] = useState(false);   
  const [params,setParams] = useState({
    parent:0
  });

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        var divElement = document.getElementById('newForkliftsListingApp');
        let $_ID = parseInt(divElement.getAttribute('data-page')); 
        const response = await fetch(
          `${EnvProvider.baseUrl}custom-page/${$_ID}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data; 
        setPageData(data1); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPageData();
  }, []);
 
   

    useEffect(() => { 
        var divElement = document.getElementById('newForkliftsListingApp');
        // Check if the element exists
        if (divElement) { 
            var slug = divElement.getAttribute('data-slug');
             setSlug(slug);
            var title = divElement.getAttribute('data-name');
            var id = parseInt(divElement.getAttribute('data-id')); 
             var parent = divElement.getAttribute('data-parent');
                  setParams({
                      ...params,
                      parent:parent
           })
           fetchData(slug);
        } else {
            console.error('Element with ID "saleProductReact" not found.');
        } 
      }, []); 
  
   

  // Fetch Data Function

  const fetchData = async (cat_slug) => {
    try {
      handleLoading(true);
     
      const response = await axios.post(`${EnvProvider.baseUrl}products-new-forklifts/${cat_slug}/${page.p}`, { 
        type: 'new-forklist',
        limit: page.limit,
      }); 
      const data1 = response.data;
      setCategory(response.data.data);
       
      handleLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      handleLoading(false);
    }
  };

  
   
 
 
const handleLoading = (e) => setLoading(e);
  return (
    <div className="container section-alt">
      <h1 className="h1 mb-4">
          {pageData?.title} </h1>
      <p className="p1 text-secondary" style={{ marginBottom: "5rem" }} dangerouslySetInnerHTML={{ __html: pageData?.content }}>
          </p>
      <div className="d-flex flex-column" style={{ gap: "7.5rem" }}>
        {
          category && category.subcategories.length > 0 && category.subcategories.map((item,index) => (
          <div key={index}>
            <div
              className="d-flex flex-column w-100 h-100"
              style={{ gap: "3.75rem" }}
            >
              <h4 className="h4 text-center">{item.name}</h4>
              <div className="row g-4">
                {item.products.length > 0 && item.products.map((product, ind) => (
                  <a href={product.detail_page_url}  key={ind} className="col-md-4 col-12">
                    <div className="border d-flex flex-column align-items-center gap-2 rounded-4 p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="p-2 w-100"
                      />
                      <p className="p1 text-center">{product.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          ))
        }
       
      </div>
    </div>
  );
};

export default NewForkliftsForSale;
