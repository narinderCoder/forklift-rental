import { useEffect, useState } from "react";
import EnvProvider from '@scripts/react/EnvVar';
import axios from 'axios';
import AddToCart from "@scripts/react/components/add-to-cart";
import PuffLoader from "react-spinners/PuffLoader";
import Loader from "@scripts/react/components/loader";

const NewForkliftsForSaleDetails = () => {
  const [product,setProduct] = useState([]);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        var divElement = document.getElementById('NewForkLiftsDetailPage');
        let $_ID = parseInt(divElement.getAttribute('data-id')); 
        const response = await fetch(
          `${EnvProvider.baseUrl}single-product/${$_ID}`
        );
        const jsonData = await response.json();
        const data1 = jsonData.data; 
        setProduct(data1); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


 

  return (
    <>
     
     <Loader loading={loading}/>
    <div className="container section-alt px-4">
      <div className="row g-4 mb-custom">
        <div className="col-12 col-md-4">
          <img
            src={product?.image}
            alt="forklift"
            className="w-100"
          />
        </div>
        <div className="col-12 col-md-8 text-secondary">
          <h3 className="h3 mb-3">{product?.name}</h3>
          <p className="p1 mb-4" dangerouslySetInnerHTML={{ __html: product?.description }}>
          </p>
          <ul
            className="list-group-flushed p-0 mt-2 p1"
            style={{ lineHeight: "2.5rem" }}
          >
            <li className="list-group-item">{`Compact 54" turning radius.`}</li>
            <li className="list-group-item">{`700-watt drive motor, 2,000-watt lift motor.`}</li>
            <li className="list-group-item">
              {`24" load center accommodates pallets up to 48".`}{" "}
            </li>
            <li className="list-group-item">{`Legs adjust from 38" to 52" to fit most pallets.`}</li>
            <li className="list-group-item">
              {`4 hours service per charge: two 12-volt, 75 Ah rechargeable
              batteries with built-in charger.`}
            </li>
            <li className="list-group-item">{`Smooth rolling polyurethane wheels. 180° steering arc.`}</li>
          </ul>
        </div>
      </div>
      <h6 className="my-4 h6 text-secondary">{product?.name}</h6>
      <div className="overflow-scroll">
      <table className="border border-opacity-20" style={{ minWidth: "1270px" }}>
  <thead>
    <tr className="text-uppercase text-center bg-secondary bg-opacity-5">
      <th className="fw-medium h6 px-1 py-4">Model No.</th>
      <th className="fw-medium h6 px-1 py-4">
        Fork Size l <span className="text-lowercase">x</span> w
      </th>
      <th className="fw-medium h6 px-1 py-4">LOAD CAPACITY</th>
      <th className="fw-medium h6 px-1 py-4">HEIGHT LOWERED</th>
      <th className="fw-medium h6 px-1 py-4">HEIGHT RAISED</th>
      <th className="fw-medium h6 px-1 py-4">WHEEL DIAMETER</th>
      <th className="fw-medium h6 px-1 py-4">WT.(LBS.)</th>
      <th className="fw-medium h6 px-1 py-4">PRICE EACH</th>
      <th className="fw-medium h6 px-1 py-4">ADD TO CART</th>
    </tr>
  </thead>
  <tbody>
    {product?.variations?.length > 0 && product.variations.map((variation, index) => (
      <tr className="text-center fw-normal" key={index}>
        <td className="p1 px-1 py-4">{variation?.fields.model_no}</td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation?.fields.fork_size }}></td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation?.fields.load_capacity }}></td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation?.fields.height_lowered }}></td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation?.fields.height_raised }}></td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation?.fields.wheel_diameter }}></td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation?.fields.wt_lbs }}></td>
        <td className="p1 px-1 py-4" dangerouslySetInnerHTML={{ __html: variation.price }}></td>
        <td className="p1 px-1 py-4"> 
          <AddToCart type={2} options={variation?.attributes} productId={product?.id} variationId={variation?.id } setLoading={setLoading}/>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
      <div className="d-flex justify-content-end">
        <p className="p1 mt-4">DROP SHIPS IN 2 DAYS FROM AR</p>
      </div>
    </div>
    </>
  );
};

export default NewForkliftsForSaleDetails;
