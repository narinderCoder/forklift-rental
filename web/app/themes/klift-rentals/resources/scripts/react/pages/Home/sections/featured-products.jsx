import { useState, useEffect } from "react";
import EnvContext from "../../../components/EnvContext";
import ProductCard from "../../../components/product-card";

export default function FeaturedProducts() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${EnvContext.baseUrl}get-featured-products/1?per_page=3`
        );
        const jsonData = await response.json();
        setProduct(jsonData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="container m-auto section">
      <div className="text-center w-100 mb-custom">
        <h3 className="h3">Featured Products</h3>
      </div>
      <div className="flex-column w-100 h-100 d-flex" style={{ gap: "3.5rem" }}>
        {products.map((product, index) => (
          <>
            <ProductCard key={index} product={product} />
            {index < products.length - 1 ? (
              <hr className="border-secondary" style={{ opacity: 0.1 }} />
            ) : null}
          </>
        ))}
      </div>
    </section>
  );
}
