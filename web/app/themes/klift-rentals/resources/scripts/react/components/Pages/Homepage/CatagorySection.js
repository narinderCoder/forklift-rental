import React, { useState,useEffect } from 'react';
import EnvProvider from '../../EnvContext';
export default function CatagorySection() {

    const [categories,setCategory] = useState([]);
    const [activeTab, setActiveTab] = useState("liftsForSale");
    const [selectedCategory, setSelectedCategory] = useState("");

    const [subcategories,setSubcategory] = useState([]);
    const [selectedSubcategories,setSelectedSubcategory] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${EnvProvider.baseUrl}product-categories`);
          const jsonData = await response.json();
          setCategory(jsonData.categories);
        
          setSubcategory(jsonData.subcategories);
          setSelectedSubcategory(jsonData.subcategories);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }; 
      fetchData();
    }, []);

     
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
  
    const handleCategorySelect = (category) => {
        if(category != ''){
          setSelectedCategory(category.slug); 
          const filteredItems = subcategories.filter(cate => cate.parent === category.slug); 
          setSelectedSubcategory(filteredItems);
        }else{
          setSelectedSubcategory(subcategories);
        }
      
      
    };
  
 
  return (
    <section className="position-relative zindex-sticky pt-2 bg-white">
      <div className="container"> 
          <div className='row'>
              <ul class="nav justify-content-center"> 
                <li class="nav-item">
                  <a class="nav-link" href="#">Lifts for Sale</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Lifts for Rent</a>
                </li> 
              </ul> 
          </div>

          <div className='row justify-content-between'>
              <div className='col-6'>
                 <p className="text-lg leading-8 text-primary-500">Equipment</p>
                  <h4 className="text-3xl leading-10 text-secondary-500">
                    Quality equipment, ready to go
                  </h4>
              </div>
              <div className='col-4'>
                  
                    <input
                      placeholder="Search equipment"
                      className="w-full p-2 bg-transparent border-none outline-none h-9"
                    />
                    <button className="px-4 text-base leading-8 text-white rounded-lg h-9 bg-primary-500">
                      Search
                    </button>
                  
              </div>
          </div>


         
        <ul className="d-flex flex-row flex-wrap items-center justify-start gap-y-8 gap-x-11 text-secondary-500 text-opacity-60">
          <li
            key="all"
            onClick={() => handleCategorySelect("")}
            className="text-secondary-500 text-opacity-60 cursor-pointer transition-all duration-300 hover:text-opacity-80">
            All
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategorySelect(category)}
               className= "text-secondary-500 text-opacity-60 cursor-pointer transition-all duration-300 hover:text-opacity-80" dangerouslySetInnerHTML={{ __html: category.name }}> 
            </li>
          ))}
        </ul>

        <ul className="d-flex flex-wrap w-full gap-5 items-normal">
          {selectedSubcategories.map((subcategory, index) => (
            <a key={index} href={subcategory.link}>
              <li className="w-full md:w-[280px] px-4 py-5 bg-white border border-gray-200 rounded-lg hover:shadow-md">
                <img
                  src={subcategory.image_url}
                  alt={subcategory.name}
                  className="mx-auto"
                />
                <p className="text-center text-secondary-500">
                  {subcategory.name}
                </p>
              </li>
            </a>
          ))}
        </ul>
      </div>
    </section>
  )
}
