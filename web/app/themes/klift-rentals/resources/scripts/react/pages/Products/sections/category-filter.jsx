import Checkbox from '@scripts/react/components/checkbox';
import { Minus, Plus } from 'lucide-react';
import React, { useState } from 'react';

export default function CategoryTree({ categories,handleSubOptions, selectedCategories }) {
    const [selectedOption, setSelectedOption] = useState(0);
    const handleOption = (option) => setSelectedOption(option);
 
  return (
    <>
     
      {categories != undefined && categories.length > 0 && categories.map((category, index) => (
        <React.Fragment key={index}>

                    {selectedCategories !== undefined &&
                      selectedCategories.includes(parseInt(category.id)) ? (
                        <>
                           
                           <Checkbox name={'category'} label={category.name} onChange={handleSubOptions} val={category.id}  checked={true}/>
                        </>
                      ) : (
                        <>
                         <Checkbox name={'category'} label={category.name} onChange={handleSubOptions} val={category.id}/>
                          
                        </>
                      )}
             
                   
                    {category?.children && category?.children.length > 0 && (
                        <CategoryTree categories={category.children} handleSubOptions={handleSubOptions} selectedCategories={selectedCategories}/>
                    )}  
        </React.Fragment>
      ))}
      
    </>
  );
}






