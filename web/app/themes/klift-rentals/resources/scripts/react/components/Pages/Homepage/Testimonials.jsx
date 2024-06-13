import React, { useState, useEffect } from 'react';
import TestimonialSlider from './TestimonialSlider';

export default function Testimonials(props) {

    const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {

    console.log(props,'props');
        if(props.data !== undefined && props.data !== null && props.data !== ''){
            setTestimonials(props.data); 
        } 
  }, [props]);

   console.log(props, 'testss');
  return (
    <section className="w-full px-4 py-16 pb-10 bg-primary-900 bg-opacity-10">
    <div className="container w-full m-auto">
      <h3 className="text-4xl md:text-5xl leading-[64px] font-semibold text-center mb-14">
        TESTIMONIALS
      </h3>
       <TestimonialSlider data={testimonials}/>  
    </div>
  </section>
  )
}
