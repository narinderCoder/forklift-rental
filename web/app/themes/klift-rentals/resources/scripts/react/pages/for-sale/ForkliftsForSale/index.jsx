import React,{useEffect, useState} from 'react';
import './forklifts-for-sale.scss';
import ProductCard from '../../../components/product-card';
import EnvProvider from '../../../components/EnvContext';
import Loader from '@scripts/react/components/loader';

const ForkliftsForSale = () => {

  const [loading, setLoading] = useState(false);
  const [products,setProducts] = useState('');
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [slug,setSlug] = useState(null);
  const [title,setTitle] = useState(null);
  useEffect(() => {

    var divElement = document.getElementById('saleProductReact'); 
    // Check if the element exists
    if (divElement) { 
        var slug = divElement.getAttribute('data-slug');
        setSlug(slug);
        var title = divElement.getAttribute('data-name');
        setTitle(title);
        fetchData(slug);
    } else {
        console.error('Element with ID "saleProductReact" not found.');
    } 
    }, []); 

    const fetchData = async (cat_slug) => {
      setLoading(true);
      try {
        const response = await fetch(
          `${EnvProvider.baseUrl}products-by-category/${cat_slug}/${page}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data;
        setProducts(data1); 
        setTotal(jsonData.meta.total);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
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

  return (

    <>
    <Loader loading={loading}/>
    <div className="container mx-auto forklifts-for-sale">
      <h1 className="d-sm-block d-none h1 text-secondary text-center text-break">
        {title}
      </h1>
      <h2 className="d-sm-none d-block h2 text-secondary text-center text-break">
        {title}
      </h2>
      <div className="products">
        {products.length > 0 ? products.map((product,index) => (
           <>
            <ProductCard key={index} product={product} view="spec" sale />
           </>
        )) : 'No Products'}
       

        {/* <ProductCard key={index} product={product} view="spec" sale />
        <ProductCard key={index} product={product} view="spec" sale />   */}
      </div>
{
  page.total > products.length && (
      <div className="d-flex align-items-center justify-content-center w-100">
        <button className="btn-primary" onClick={() => handlePagination(1)}>Load More</button>
      </div>
  )
}
      

      
    </div>
    </>
  );
};

export default ForkliftsForSale;
 