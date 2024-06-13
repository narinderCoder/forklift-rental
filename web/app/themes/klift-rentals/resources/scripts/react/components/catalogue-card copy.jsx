import { ChevronDown, Download } from "lucide-react";
import Checkbox from "./checkbox";
import Share from "../icons/share";
import { useState } from "react";

const CatalogueCard = ({ product, onCheckboxChange }) => {
  const [quickView, setQuickView] = useState(false);
  return (
    <div className="row m-0 p-0">
      <div className="col-md-3 col-12">
        <img
          src={
            "https://www.mechanicalpower.net/wp-content/uploads/2022/04/Components-of-a-Forklift-Truck-980x655.jpg"
          }
          alt="telehandler-forklift"
          className="h-auto w-100 rounded-3 mb-3"
        />
      </div>
      <div className="col-md-7 col-12">
        <div>
          <h6 className="h6">
            TOYOTA 6500 FORKLIFT FOR RENT OR SALE IN HOUSTON
          </h6>
          <p className="p1" style={{ marginTop: "0.75rem" }}>
            This is Toyota Forklift 8FGCU32 is in excellent condition. Has only
            5890 hours.
          </p>
        </div>

        <div
          className="flex-row gap-3 align-items-center d-flex"
          style={{ marginTop: "1rem" }}
        >
          <div>
            <p className="text-opacity-50 text-secondary p3">Daily</p>
            <p className="p1 text-secondary">$99.00</p>
          </div>
          <div>
            <p className="text-opacity-50 text-secondary p3">Weekly</p>
            <p className="p1 text-secondary">$99.00</p>
          </div>
          <div>
            <p className="text-opacity-50 text-secondary p3">Monthly</p>
            <p className="p1 text-secondary">$99.00</p>
          </div>
        </div>
        <button
          className="btn-secondary"
          style={{ marginTop: "1.5rem" }}
          onClick={() => setQuickView(!quickView)}
        >
          Quick view{" "}
          <ChevronDown
            size={14}
            style={{
              transform: quickView ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </button>
        <ul
          className={`${
            quickView ? "d-block" : "d-none"
          } mt-2 text-opacity-50 ps-4 text-secondary p2`}
        >
          <li>Used</li>
          <li>Engine Size: 10000.0</li>
          <li>Stock</li>
        </ul>
      </div>
      <div className="gap-4 d-flex flex-column col-md-2 col-12">
        <div className="gap-3 text-opacity-50 d-flex align-items-center text-secondary justify-content-end">
          <Download />
          <Share />
        </div>
        <div className="gap-2 d-flex flex-column">
          <button
            className="justify-content-center btn-secondary"
            onClick={() => {}}
          >
            Add to cart
          </button>
          <a href={`/products/${product.id}`}>
            <button className="w-100 justify-content-center btn-secondary">
              View Details
            </button>
          </a>
        </div>
        <div className="d-flex">
          <Checkbox
            label="Compare"
            reverse={true}
            onChange={onCheckboxChange}
            className={"justify-content-start"}
          />
        </div>
      </div>
    </div>
  );
};

export default CatalogueCard;
