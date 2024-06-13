import React,{useState,useEffect} from 'react'
import Catagories from './sections/categories';
import EnvProvider from '../../EnvVar';
import ContentCard from '@scripts/react/components/content-card';
import Benefits from './sections/benefits';
import WhyChooseUs from './sections/why-choose-us';
import ContactUs from './sections/contact-us';
import Brands from './sections/brands';
import AboutUs from './sections/about-us';
import Testimonials from './sections/testimonials';
import Faqs from './sections/faqs';
import FeaturedProducts from './sections/featured-products';
import "./home.scss";
import HeaderContent from '@scripts/react/components/HeaderContent';
import Hero from './sections/hero';

const Home = () => {
    const [data, setData] = useState([]);
    const [benefits, setBenefits] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${EnvProvider.baseUrl}page-custom-fields/2`
          );
          const jsonData = await response.json();
          const data1 = jsonData.data;
          setData(data1);
          //setBenefits(data1.benefit_section);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  return (
    <div className="home-page">
      <Hero />
      <Catagories />  
      <section
        className="bg-tertiary position-relative section"
        style={{ zIndex: 99 }}
      >
        <div className="container mx-auto">
          <div
            className="p1"
            dangerouslySetInnerHTML={{ __html: data?.custom_description }}
          ></div>
        </div>
      </section>

      <section className="container mx-auto section-alt">
        {data?.warehouse?.title !== undefined ? (
          <ContentCard
            title={data?.warehouse.title}
            description={data?.warehouse.description}
            image={data?.warehouse.image}
          />
        ) : null}
      </section>

    <Benefits data={data.benefit_section} />

      <WhyChooseUs data={data.why_choose_us} />
        <ContactUs data={data.contact_us_section_content} />
      <Brands />
      <AboutUs data={data?.services} />
          <FeaturedProducts />
      <Testimonials data={data.testimonial} />
     <Faqs data={data?.faqs} />
    </div>
  )
}

export default Home