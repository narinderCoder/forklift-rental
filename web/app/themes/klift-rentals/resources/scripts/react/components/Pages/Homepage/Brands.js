import React, { useState,useEffect } from 'react';
import EnvProvider from '../../EnvContext';
export default function Brands() {
 
    const [brands,setBrands] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${EnvProvider.baseUrl}custom-taxonomy/brand`);
          const jsonData = await response.json();
          setBrands(jsonData.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }; 
      fetchData();
    }, []);

      
  
 
  return (
    <>
    <section className="container px-4 py-32 m-auto">
      <div className="w-full text-center mb-14">
        <h6 className="mb-4 text-2xl font-normal text-primary-500">
          Brands of forklift
        </h6>
        <h3 className="text-5xl font-semibold leading-[64px]">
          We rent in Houston, Texas area
        </h3>
      </div>
      <div className="flex flex-wrap justify-around gap-8">
        {brands.map((item, index) => (
          <img
            key={index}
            src={item.image_url}
            alt={item.name}
            className="w-1/6"
          />
        ))}
      </div>
    </section>
    </>
  )
}
