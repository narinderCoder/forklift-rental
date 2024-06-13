import React, { useState,useEffect } from "react";
import { cn } from "../../utils";
export default function AboutUs(props) {

    const [services, setServices] = useState([]);
    useEffect(() => {
  
      console.log(props,'props');
          if(props.data !== undefined && props.data !== null && props.data !== ''){
              setServices(props.data); 
              console.log(props.data, 'services');
          } 
    }, [props]);
  
    
    return (
        <section className="px-4 py-16 bg-tertiary-500">
          <div className="container m-auto">
            <div className="w-full text-center mb-14">
              <h6 className="mb-4 text-2xl font-normal text-primary-500">
               {services.tagline}
              </h6>
              <h3 className="text-5xl font-semibold leading-[64px]">
              {services.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-8">
              {services?.service_list?.length > 0 ? services?.service_list.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "mx-auto flex items-center gap-1 hover:text-primary-500"
                  )}
                > 
                  <p className="text-lg font-normal leading-8">{item.point}</p>
                </div>
              )) : ''}
            </div>
          </div>
        </section>
      );
}
