import { CheckCheck } from "lucide-react";

const Advantages = ({
  product
}) => {
  return (
    <div className="row g-4">
      <div className="col-lg-5 col-md-6 col-12 mb-custom">
        <iframe
          src="https://www.youtube.com/embed/xD9CYjql0Pk"
          className="col-12 rounded-4"
          style={{ height: "25rem" }}
        />
      </div>
      <div className="col-lg-7 col-md-6 col-12">
        <h4 className="h4 mb-4 pb-2 fw-medium">Features & Advantages</h4>
        <ul className="list-group-flushed p1 text-secondary p-0 m-0 d-flex gap-4 flex-column">

          {
            product?.custom_fields?.features_and_advantages?.features && product?.custom_fields?.features_and_advantages?.features.map((feature) => (
              <li className="list-group-item">
                <CheckCheck className="text-secondary text-opacity-80" /> {feature?.feature_item}
               </li>
            ))
          }
        
          
         
          
          
          
        </ul>
      </div>
    </div>
  );
};

export default Advantages;
