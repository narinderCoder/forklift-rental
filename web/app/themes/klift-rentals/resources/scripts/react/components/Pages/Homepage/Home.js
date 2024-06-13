import React, { useState, useEffect } from 'react';
import HomeBenefitList from './homeBenefitList';
import EnvProvider from '../../EnvContext';
import WhyChooseUs from './WhyChooseUs';
import Testimonials from './Testimonials';
import ContactUs from './ContactUs';
import Brands from './Brands';
import Faqs from './Faqs';
import ContentCard from './ContentCard';
import AboutUs from './AboutUs';
import FeaturedProducts from './FeaturedProducts';
export default function Home() {
     
    const [data,setData] = useState([]);
    const [benefits,setBenefits] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${EnvProvider.baseUrl}page-custom-fields/2`);
            const jsonData = await response.json(); 
            const data1 = jsonData.data;
            setData(data1); 
            //setBenefits(data1.benefit_section);
            console.log(data1,'homewwsss');
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }; 
        fetchData();
      }, []);
  return (
   <>

<section className="py-16 bg-tertiary-500 relative z-[5]">
        <div className="container px-4 mx-auto">
          <div className="text-lg font-normal leading-8" dangerouslySetInnerHTML={{ __html: data?.custom_description}}> 
           
          </div>
        </div>
      </section>

      <section className="container px-4 py-32 m-auto">
        {data?.warehouse?.title !== undefined ? (
             <ContentCard
             title={data?.warehouse.title}
             description={data?.warehouse.description}
             image={data?.warehouse.image}
           />
        ) : ''}
       
      </section>



   <HomeBenefitList 
     data={data.benefit_section}
   />

   <WhyChooseUs 
     data={data.why_choose_us}
   />   
    <Testimonials 
     data={data.testimonial}
   />   

   <ContactUs data={data.contact_us_section_content}/>
   <Brands/>

   <Faqs data={data?.faqs}/>

   <AboutUs data={data?.services}/>

   {/* <FeaturedProducts/> */}
   </>
  )
}
