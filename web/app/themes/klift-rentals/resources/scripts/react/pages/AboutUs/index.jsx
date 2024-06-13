import ContentCard from "@scripts/react/components/content-card";
import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';

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
      <div className="position-relative w-100" style={{ height: "90vh" }}>
      <div
        className="w-100 bg-tertiary bg-opacity-100"
        style={{
          backgroundImage: `url(${pageData.custom_fields?.banner_image})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          zIndex: 10,
          height: "90vh",
          transform: "scaleX(-1)",
          filter: "brightness(0.4) blur(1.2px) grayscale(100%)",
        }}
      ></div>
        <div
          className="position-absolute d-flex flex-column align-items-center"
          style={{
            zIndex: 20,
            transform: "translateX(-50%) translateY(-50%)",
            top: "50%",
            left: "50%",
          }}
        >
          <h1
            className="h1 text-white text-center"
            style={{ marginBottom: "1.75rem" }}
          >
           {pageData?.title}
          </h1>
          <p className="p1 text-center text-white text-opacity-80"  dangerouslySetInnerHTML={{ __html: pageData?.content }}>
          </p>
        </div>
      </div>

      {solutions.length > 0 && solutions.map((s, index) => (
        <>
          
            <div className={index % 2 == 0 ? '' : 'bg-tertiary'}>

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
