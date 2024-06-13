import React, { useState,useEffect } from 'react';
import StyledListItem from './StyledListItem';

export default function WhyChooseUs(props) {

    const [description,setDescription] = useState();
    const [items,setItems] = useState([]);
    //------------------------------------
    useEffect(() => { 
          if(props.data !== undefined && props.data !== null && props.data !== ''){
              setItems(props.data.points);
              setDescription(props.data.description);
          } 
    }, [props]);
  
   
  return (
    <section className="px-4 py-16 bg-tertiary-500">
    <div className="container flex flex-col w-full gap-20 m-auto ">
      <div className="w-full text-center">
        <h3 className="font-semibold text-5xl leading-[64px]">
          Why Choose Us?
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2"> 
        {items.length > 0 ?  items.map((item, index) => ( 
            <> 
                <StyledListItem
                serialNo={(index + 1)}
                title={item.title}
                description={item.description}
                /> 
                 
            </> 
        )) : '' } 
      </div>
      <ul>
        <li className="list-disc">
          {description}
        </li>
      </ul>
    </div>
  </section>
  )
}
