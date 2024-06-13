import React from 'react'
import FaqsSection from './FaqsSection'

export default function Faqs(props) {



  return ( 
    <section className="container px-4 py-10 m-auto my-10">
        <h3 className="text-5xl leading-[64px] text-center font-semibol mb-10">
        Frequently Asked Questions
        </h3>
        <FaqsSection faqs={props.data?.faqs_item} />
   </section>
  )
}
