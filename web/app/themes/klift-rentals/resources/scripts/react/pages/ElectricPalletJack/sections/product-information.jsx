import ReactSelect, { components } from "react-select";
import ArrowUpDown from "../../../icons/arrow-up-down";
import { useState } from "react";
import ExpandableCard from "../../../components/expandable-card";
import AddToCart from "@scripts/react/components/add-to-cart";
import DescriptionExpandableCard from "@scripts/react/components/description-expandable-card";

const options = [
  { label: "Product Overview", value: "product-overview" },
  { label: "General Information", value: "general-info" },
  { label: "Dimension Drawing", value: "dimension-drawing" },
];

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <ArrowUpDown className="me-2 text-opacity-40 text-secondary" />
    {children}
  </components.Control>
);

const ProductInformation = ({
  product,
  handleRadio,
  isChecked,
  selectedVariation,
  attributes,
  types,
  setLoading
}) => {

  console.log(product,'variations');
  const [selected, setSelected] = useState("general-info");
  return (
    <div className="w-100 my-4 py-4 text-secondary">
      <h3 className="h3 text-center py-4">Product Information</h3>

      {/* -------------------------------------------------------------------------- */}
      <div className="position-relative d-none d-md-flex align-items-center justify-content-center gap-4 mb-4 electric-pallet-stacker-info">
        <h4
          className={`h4 text-secondary text-center ${
            selected === "product-overview"
              ? "text-opacity-100"
              : "text-opacity-50"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setSelected("product-overview")}
        >
          Product Overview
        </h4>
        <h4
          className={`h4 text-secondary text-center ${
            selected === "general-info" ? "text-opacity-100" : "text-opacity-50"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setSelected("general-info")}
        >
          General Information
        </h4>
        <h4
          className={`h4 text-secondary text-center ${
            selected === "dimension-drawing"
              ? "text-opacity-100"
              : "text-opacity-50"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setSelected("dimension-drawing")}
        >
          Dimension Drawing
        </h4>
        <div
          className={`position-absolute bottom-0 border border-primary ${
            selected === "dimension-drawing"
              ? "dimension-drawing"
              : selected === "general-info"
              ? "general-info"
              : "product-overview"
          }`}
          // style={{ transition: "all 0.35s" }}
        ></div>
      </div>

      {/* ------------------------------------------------------------------------------- */}

      <div className="w-100 d-block d-md-none mb-4">
        <ReactSelect
          unstyled
          classNames={{
            placeholder: () => "text-secondary text-opacity-40",
            singleValue: () => "text-secondary",
            option: () => "bg-white p-2",
            dropdownIndicator: () => "text-secondary text-opacity-40",
            menu: () =>
              "bg-white text-secondary px-4 py-4 border border-top-0 border-opacity-20 rounded-3 rounded-top-0",
            control: (state) =>
              state.menuIsOpen
                ? "select-product-menu-electric p1 rounded-bottom-0"
                : "select-product-menu-electric p1",
          }}
          options={options}
          placeholder=""
          onChange={(e) => {
            setSelected(e.value);
          }}
          value={options.find((item) => item.value === selected)}
          components={{ Control }}
        />
      </div>
      {selected === "product-overview" ? (
        <div className="w-100">
          <img
            src={product?.custom_fields?.overview?.overview_diagram}
            alt=""
            className="mx-auto d-block my-4 py-4 w-100"
            style={{ maxWidth: "45rem" }}
          />
        </div>
      ) : selected === "general-info" ? (
        <div className="overflow-scroll my-4 py-4">
       <table
          className="border border-opacity-20"
          style={{ minWidth: "1270px" }}
        >
          
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
             <>
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
             </>
            ))}
          </tbody>
 
        </table>
        </div>
      ) : (
        <div className="row my-4 py-4 g-4">
          <div className="col-md-6 col-12">
            <img
              src={product?.custom_fields?.overview?.dimension_drawing}
              alt=""
              className="w-100"
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex flex-column gap-4">
            <DescriptionExpandableCard title="Description" description={product?.description} />
            <ExpandableCard title="Specifications" data={product} />
            </div>
          </div>
        </div>
      )}
      {/* <h6 className="my-4 h6 text-secondary">{product?.name}</h6>
      <div className="overflow-scroll">
        <table
          className="border border-opacity-20"
          style={{ minWidth: "1270px" }}
        >
          
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
             <>
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
             </>
            ))}
          </tbody>
 
        </table>
      </div> */}
      <div className="d-flex justify-content-end">
        <p className="p1 mt-4">DROP SHIPS IN 2 DAYS FROM AR</p>
      </div>
    </div>
  );
};

export default ProductInformation;
