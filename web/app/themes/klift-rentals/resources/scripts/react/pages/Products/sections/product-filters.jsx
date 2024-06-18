import DatePicker from "@scripts/react/components/date-picker";
import Delivery from "@scripts/react/icons/delivery";
import { CalendarDays, MapPin } from "lucide-react";

const ProductFilterSection = ({ icon, src, children, handleSearch }) => {
  const Icon = icon ? icon : null;
  return (
    <div className="col-lg col-md-6 col-12">
      <div className="products-filter-icon-section">
      {Icon ? (
        <Icon
          style={{ width: "1.5rem", height: "1.5rem" }}
          className="text-primary"
        />
      ) : null}
      {src ? <img src={src} alt={src} width={"2rem"} height={"2rem"} /> : null}
      {children}
    </div>
    </div>
  );
};

const ProductFilters = ({
  data
}) => {
  return (
    <div className="row m-0 gx-4 product-filters">
      <ProductFilterSection icon={MapPin}>
        <div className="d-flex flex-column w-100">
          <label htmlFor="location" className="text-opacity-50 text-secondary">
            Location
          </label>
          <input
            name="location"
            placeholder="Set your city or zip/postal code"
            className="bg-transparent border-none outline-none w-100 text-secondary"
          />
        </div>
      </ProductFilterSection>
      <ProductFilterSection icon={CalendarDays}>
        <div className="flex-row gap-2 d-flex w-100" style={{ gap: "0.5rem" }}>
          <div className="w-100 d-flex flex-column">
            <label
              htmlFor="start_date"
              className="text-opacity-50 text-secondary"
            >
              Start Date
            </label>
            <DatePicker />
          </div>
          <div className="w-100 d-flex flex-column">
            <label
              htmlFor="end_date"
              className="text-opacity-50 text-secondary"
            >
              End Date
            </label>
            <DatePicker />
          </div>
        </div>
      </ProductFilterSection>
      <ProductFilterSection icon={Delivery}>
        <div className="d-flex flex-column w-100">
          <input
            name="delivery"
            placeholder="UR Delivery & Pickup"
            className="bg-transparent w-100 text-secondary"
          />
        </div>
      </ProductFilterSection>
      <div className="col-12 col-sm-6 col-lg-4 col-xl-1">
      <button className="product-filters-button p1 w-100">
        Apply
      </button>
      </div>
    </div>
  );
};

export default ProductFilters;
