import React, { useState } from 'react'

export default function ContactUs(props) {
 
  return (
    <section className="w-full relative min-h-[900px] md:min-h-[650px] bg-center bg-cover bg-home-contact-banner" 
    style={{ backgroundImage: `url(${props.data?.background_image})` }}>
    <div className="absolute w-9/12 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-primary-500">
      <div className="p-6 md:p-16">
        <h3 className="text-white text-center font-bold text-5xl leading-[64px]">
         {props.data?.title}
        </h3>
        <p className="text-center text-white text-lg leading-[32px] ">
          {props.data?.description}
        </p>
      </div>
    </div>
  </section>
  )
}
