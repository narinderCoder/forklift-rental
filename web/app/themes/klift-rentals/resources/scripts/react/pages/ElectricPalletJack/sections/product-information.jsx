import ReactSelect, { components } from "react-select";
import ArrowUpDown from "../../../icons/arrow-up-down";
import { useState } from "react";
import ExpandableCard from "../../../components/expandable-card";
import AddToCart from "@scripts/react/components/add-to-cart";

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
            src="https://s3-alpha-sig.figma.com/img/c4b2/ef2d/afbc09601783c82f85f33e3222268da7?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QOj152jV-5q3MXUnZPlw1FSdtK3IAtyTBwvR1ezRTjXeQs3UUs9tPq4Tut2bKCFwxeh2sjrCW~QunzyOajP5-LIUhxOsIBTWqTgmRLnTdp7C5QX2TRrrnpsbVVWg1CrQVNQ6id0LXai9FD5iutQxVJSfUY3VsiEM1LOqVigF1hLEwoiVCvhd~ZdWDV2J-W7DTKBwZUeKfbRVKuBCitJ-VOl1vYga0PbPQhnRhqmXr9JAnMK7u6-xKU1gIErCnMZhFx7nF2GNQ5WjBoTluZ-3rV9nA4dzYIoPN2Ow34KyBo3oeZIyNyBLKQUbmuyPhtH9j~sdI~n6jS6W~~cORR-vRA__"
            alt=""
            className="mx-auto d-block my-4 py-4 w-100"
            style={{ maxWidth: "45rem" }}
          />
        </div>
      ) : selected === "general-info" ? (
        <div className="overflow-scroll my-4 py-4">
          <table
            className="border border-secondary border-opacity-10 rounded-2 mb-4"
            style={{ minWidth: "1270px", borderCollapse: "separate" }}
          >
            <tr className="text-center bg-secondary bg-opacity-10">
              <th className="p-4 h6 fw-medium">SKU</th>
              <th className="p-4 h6 fw-medium">Load Capacity</th>
              <th className="p-4 h6 fw-medium">Max. lift height</th>
              <th className="p-4 h6 fw-medium">Mast Extended Height</th>
              <th className="p-4 h6 fw-medium">Mast Lowered Height</th>
              <th className="p-4 h6 fw-medium">Battery Voltage</th>
              <th className="p-4 h6 fw-medium">Price Each</th>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">CTD10RE-19-98</td>
              <td className="px-4 py-2">2200lbs</td>
              <td className="px-4 py-2">98inch</td>
              <td className="px-4 py-2">122inch</td>
              <td className="px-4 py-2">74.6inch</td>
              <td className="px-4 py-2">24V/105AH</td>
              <td className="px-4 py-2">$5499</td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">CTD10RE-19-98</td>
              <td className="px-4 py-2">2200lbs</td>
              <td className="px-4 py-2">98inch</td>
              <td className="px-4 py-2">122inch</td>
              <td className="px-4 py-2">74.6inch</td>
              <td className="px-4 py-2">24V/105AH</td>
              <td className="px-4 py-2">$5499</td>
            </tr>
            <tr className="text-center">
              <td className="px-4 py-2">CTD10RE-19-98</td>
              <td className="px-4 py-2">2200lbs</td>
              <td className="px-4 py-2">98inch</td>
              <td className="px-4 py-2">122inch</td>
              <td className="px-4 py-2">74.6inch</td>
              <td className="px-4 py-2">24V/105AH</td>
              <td className="px-4 py-2">$5499</td>
            </tr>
          </table>
        </div>
      ) : (
        <div className="row my-4 py-4 g-4">
          <div className="col-md-6 col-12">
            <img
              src="https://s3-alpha-sig.figma.com/img/950e/3a01/2f1a8f40b283f7478582dee265b955a3?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HbAPjlMeKJFLoko6FU00iRK7YeM74EIGpTTOwczFduw0TcW6F4-kbbu3kYOqXsaZRi2-mRNGOy1~6UUJqZJ6VL4R7GaG0-pyGO587SOsuQsjsu5It9zaHXtY~e84P6YovFpvibg2B-qrBUASuhaK4keHRPI~moTbqBlbFCiZn-K7KYl3Hjn9HYomCxiHcg0iRiMgERrQ8yH2d9kUOluw8aFX425cc0IN43AVaaa0TjKjjRbXMGy43uhkdMbZMnTRWG~i-KuU-5NyLBHuiT3mwbR6jcE~4eJV~kL~hO3Bow79hTCGYyzYK0JBQ9rVjONRDj~JHeJsPNOfX9fsKbvDuQ__"
              alt=""
              className="w-100"
            />
          </div>
          <div className="col-md-6 col-12">
            <div className="d-flex flex-column gap-4">
              <ExpandableCard title="Info" data={[]} />
              <ExpandableCard title="Specification" data={[]} />
            </div>
          </div>
        </div>
      )}
      <h6 className="my-4 h6 text-secondary">{product?.name}</h6>
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
      </div>
      <div className="d-flex justify-content-end">
        <p className="p1 mt-4">DROP SHIPS IN 2 DAYS FROM AR</p>
      </div>
    </div>
  );
};

export default ProductInformation;
