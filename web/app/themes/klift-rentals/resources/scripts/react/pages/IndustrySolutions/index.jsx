import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
//  
const IndustrySolutions = () => {
  const [pageData,setPageData] = useState([]);
  const [solutions,setSolutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var divElement = document.getElementById('IndustrySolutionsReact');
        let $_ID = parseInt(divElement.getAttribute('data-id')); 
        const response = await fetch(
          `${EnvProvider.baseUrl}custom-page/${$_ID}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data;


        setPageData(data1);

        setSolutions(data1.custom_fields?.solutions?.solution_item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto section-alt px-4">
      <div>
        <h1 className="h1 mb-4">{pageData?.title}</h1>
        <p className="p1 mb-custom"  dangerouslySetInnerHTML={{ __html: pageData?.content }}></p>

        <div className="row g-4">
          {solutions.length > 0 && solutions.map((solution, index) => (
            <div
              key={index}
              className="position-relative col-12 col-md-6 col-lg-4 col-xxl-3"
              style={{ height: "25rem", borderRadius: "10px" }}
            >
              <img
                src={solution.picture}
                alt={solution.title}
                className="w-100 h-100"
                style={{ objectFit: "cover", borderRadius: "10px" }}
              />
              <h5
                className="bg-primary text-white text-center py-4 bg-opacity-90 h5 position-absolute bottom-0"
                style={{
                  width: "calc(100% - 1.5rem)",
                  borderBottomLeftRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                {solution.title}
              </h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustrySolutions;
