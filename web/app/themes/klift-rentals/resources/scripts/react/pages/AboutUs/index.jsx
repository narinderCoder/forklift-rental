import ContentCard from "@scripts/react/components/content-card";
import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import Banner from "@scripts/react/components/banner";

const AboutUs = () => {

  const [pageData,setPageData] = useState([]);
  const [solutions,setSolutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var divElement = document.getElementById('aboutPageReactApp');
        let $_ID = parseInt(divElement.getAttribute('data-id')); 
        const response = await fetch(
          `${EnvProvider.baseUrl}custom-page/${$_ID}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data;


        setPageData(data1);

        setSolutions(data1.custom_fields?.sections?.section_items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="about-us-page">
          <Banner
        image={pageData.custom_fields?.banner_image}
        height="90vh"
        filter="brightness(0.4) blur(1.2px) grayscale(100%)"
      >
         <h1
            className="h1 text-white text-center"
            style={{ marginBottom: "1.75rem" }}
          >
           {pageData?.title}
          </h1>
          <p className="p1 text-center text-white text-opacity-80"  dangerouslySetInnerHTML={{ __html: pageData?.content }}>
          </p>
      </Banner>
    
      {solutions.length > 0 && solutions.map((s, index) => (
        <>
          
            <div className={`section ${index % 2 == 0 ? '' : 'bg-tertiary'}`}>

            {index % 2 == 0 ? 
            (
              <ContentCard
                image={s?.picture}
                title={s?.title}
                description={s?.description}
                className="container mx-auto section"
                flip
              />
            ) : (
              <ContentCard
              image={s?.picture}
              title={s?.title}
              description={s?.description}
                className="container mx-auto section"
                
              />
            )}
             
            </div>
        </> 
      ))}
 
    </div>
  );
};

export default AboutUs;
