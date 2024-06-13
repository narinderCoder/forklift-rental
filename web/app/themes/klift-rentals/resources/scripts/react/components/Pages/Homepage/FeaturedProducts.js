import React, {useState, useEffect} from 'react';
import EnvProvider from '../../EnvContext';
import ProductCard from './ProductCard';
export default function FeaturedProducts() { 

   const [products,setProduct] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${EnvProvider.baseUrl}get-featured-products/1?per_page=3`);
            const jsonData = await response.json();
            setProduct(jsonData.data);  
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }; 
        fetchData();
      }, []);

  return (
    <section className="container px-4 py-16 m-auto">
      <div className="w-full text-center mb-14">
        <h3 className="text-5xl leading-[64px] font-semibold">Featured Products</h3>
      </div>
      <div className="flex flex-col w-full h-full gap-14">
        {products.map((product, index) => (
          <>
            <ProductCard key={index} product={product} />
            <hr className="border-secondary-500 border-opacity-10" />
          </>
        ))}
      </div>
    </section>
  )
}
