import React, { useEffect, useState } from 'react'
import EnvProvider from '../../../EnvVar';
import { Minus, Plus } from 'lucide-react';
import Checkbox from '@scripts/react/components/checkbox';
import CategoryTree from '../../Products/sections/category-filter';
import Filters from '@scripts/react/icons/filters';
// import CategoryTree from './category-filter';
 
export default function EngineSidebar(props) {

    const [filter_options, setFilterOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [attributes, setAttributes] = useState([]);
    useEffect(() => {
    //  setSelectedSubOption(parseInt(props.params.parent)); 
      getFilters();
    }, []);
  
    const getFilters = async () => {
      var divElement = document.getElementById('engineListingApp');
      // Check if the element exists
      var parent = 0;
      let $type = 'Engine';
      if (divElement) {
         parent = divElement.getAttribute('data-parent');
         $type = divElement.getAttribute('data-type');
      }
      try {
        const response = await fetch(
          `${EnvProvider.baseUrl}get-product-filters?parent=${parent}&category_type=${$type}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data;
  
        setCategories(data1.categories);
        setAttributes(data1.attributes);
        // console.log(data1.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const [selectedOption, setSelectedOption] = useState(0);
    const handleOption = (option) => {
      setSelectedOption(option == selectedOption ? '' : option);
    };
    const [selectedSubOption, setSelectedSubOption] = useState(0);
    const handleSubOption = (option) => {
      setSelectedSubOption(option == selectedSubOption ? '' : option);
    };
  


  return (

   
    <>
        <div className="col-md-4 col-12 d-flex flex-column gap-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="text-secondary text-opacity-50 d-flex gap-2 align-items-center">
                <Filters />
                <p className="p1">Filters</p>
              </div>
              <p className="p3 text-primary text-opacity-80">Clear Filters</p>
            </div>
    {categories !== undefined && categories && categories.length > 0 ? categories.map((parent, index) => (      
     <div className="position-relative">
        <button
          onClick={() => handleOption(parseInt(index))}
          className={
            'd-flex align-items-center justify-content-between w-100 bg-5 rounded-3'
          }
          style={{ padding: '0.75rem', gap: '0.5rem' }}
        >
          <p className="text-opacity-50 text-secondary">{parent.name}</p>
          {selectedOption === parseInt(index) ? (
            <Minus className="text-opacity-50 text-secondary" />
          ) : (
            <Plus className="text-opacity-50 text-secondary" />
          )}
        </button>
       
        <div className={`filter-options ${
                                selectedOption === parseInt(index) ? 'open' : ''
                              }`} > 

          {parent.children !== undefined && parent.children.length > 0 ? (
              <>
                  {parent.children !== undefined && parent.children.length > 0 && parent.children.map((category, index) => (
                  <>  
                    {category?.children && category?.children.length > 0 ? (
                       <>
                            <button
                            onClick={() => handleSubOption(parseInt(category.id))}
                            className={
                              'd-flex align-items-center justify-content-between w-100 bg-5 rounded-3'
                            }
                            style={{ padding: '0.75rem', gap: '0.5rem' }}
                            >
                            <p className="text-opacity-50 text-secondary">
                              {category.name}
                            </p>
                            {selectedSubOption === parseInt(category.id) ? (
                              <Minus className="text-opacity-50 text-secondary" />
                            ) : (
                              <Plus className="text-opacity-50 text-secondary" />
                            )}
                            </button> 
                          <div className={`filter-options ${
                                selectedSubOption === parseInt(category.id) ? 'open' : ''
                              }`} > 
                            <CategoryTree categories={category.children}  handleSubOptions={props.handleSubOptions} selectedCategories={props.selectedCategories}/>
                          </div>
                       </>
                    ) : (
                      <Checkbox name={'category'} label={category.name} onChange={props.handleSubOptions} val={category.id}/>
                    )}
                  </>
                ))}
              </>
          ):(
                 <> <Checkbox name={'category'} label={parent.name} onChange={props.handleSubOptions} val={parent.id}/></>
          )}
        </div>
        </div>
      ))
       : ''}
        </div>
    </>
  )
}
