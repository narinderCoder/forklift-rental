import React, { useState, useEffect } from 'react';
import ContentCard from './ContentCard';
import { Forklift } from 'lucide-react';

 

  const HomeBenefitList = (props) => {


    const [benefitItems, setBenefitItems] = useState([]); 
    const [heading, setHeading] = useState([]);
    const [main_benefit, setMainBenefits] = useState([]);
  useEffect(() => {

    console.log(props,'props');
        if(props.data !== undefined && props.data !== null && props.data !== ''){
            setHeading(props.data.benefit_heading);
            setMainBenefits(props.data.main_benefit);
            setBenefitItems(props.data.other_benefit_list);
        } 
  }, [props]);

   console.log(props, 'test');
  return (


    <>
      <section className="px-4 py-16 bg-tertiary-500">
        <div className="container m-auto">
          <div className="w-full text-center mb-14">
            <h6 className="mb-4 text-2xl font-normal text-primary-500">
              {heading.tagline}
            </h6>
            <h4 className="text-[34px] font-medium leading-[50px]">
              {heading.title}
            </h4>
          </div>
          <div className="flex flex-col gap-8 md:flex-row mb-14">
            <img
              src={main_benefit.main_benefit_image}
              alt=""
              className="w-1/2 h-auto"
            />
            <div className="flex flex-col justify-between w-full gap-4">
              {main_benefit.main_benefit_list &&
                main_benefit.main_benefit_list.map((item, index) => (
                  <div className={'flex items-start gap-1'} key={index}>
                     <p> {item.main_benefit_list_item}</p>
                  </div>
                ))} 
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lg font-normal">
              Therefore we urge our customers to give us an opportunity to serve
              your Forklift & Aerial lift needs. We Rent on daily or monthly
              basis within Houston and surrounding areas in Texas.
            </p>
            <p className="text-lg font-normal">
              We carry Toyota, Komatsu & Catepillar warehouse forklifts and
              Genie Scissor lifts, Articulating boom lifts and Telescopic
              forklifts for rent.
            </p>
          </div>
        </div>
         
      </section>

      <section className="container flex flex-col gap-20 px-4 py-32 m-auto">
           {benefitItems.benefit_list_item &&
                benefitItems.benefit_list_item.map((item, index) => (
                   <>
                    <ContentCard
                    title={item.benefit_title}
                    description={item.benefit_description}
                    image={item.benefit_image}
                    variant="sm"
                    flip={index % 2 == 0}
                  />
                  <hr className="border-secondary-500 opacity-20" />
                   </>
                ))}
       
        </section>

       
    </>
  );
}

export default HomeBenefitList;