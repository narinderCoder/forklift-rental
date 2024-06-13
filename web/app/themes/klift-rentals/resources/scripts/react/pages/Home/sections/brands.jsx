import { useState, useEffect } from "react";
import EnvContext from "../../../components/EnvContext";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${EnvContext.baseUrl}custom-taxonomy/brand`
        );
        const jsonData = await response.json();
        setBrands(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className="container m-auto section-alt">
        <div className="text-center w-100 mb-custom">
          <h6 className="h6 text-primary" style={{ marginBottom: "1rem" }}>
            Brands of forklift
          </h6>
          <h3 className="h3">We rent in Houston, Texas area</h3>
        </div>
        <div className="row g-4 m-0 p-0">
          {brands.map((item, index) => (
            <div key={index} className="col-md-3 col-12">
              <div style={{ width: "10rem", margin: "auto" }}>
                <img src={item.image_url} alt={item.name} className="w-100" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
