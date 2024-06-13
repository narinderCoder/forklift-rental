import ReactSelect, { components } from "react-select";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Checkbox from "../../components/checkbox";
import ArrowUpDown from "../../icons/arrow-up-down";

const Control = ({ children, ...props }) => (
  <components.Control {...props}>
    <ArrowUpDown className="me-2 text-opacity-40 text-secondary" />
    {children}
  </components.Control>
);

const filterOptions = [
  {
    id: "forklift",
    name: "Forklifts",
  },
  {
    id: "price",
    name: "Price",
  },
  {
    id: "product-type",
    name: "Product Type",
  },
];

const RentForkliftWithAttachments = () => {
  const [showFilter, setShowFilter] = useState("");

  return (
    <div className="container p-4 mx-auto text-secondary section-alt">
      <h2 className="h2">Rent forklift with attachments</h2>
      <p className="p1">
        {`Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.`}
      </p>
      <div className="row">
        <div
          className="d-flex align-items-center justify-content-between col-12 col-md-9 offset-md-3"
          style={{ marginBlock: "2.5rem" }}
        >
          <p className="p1">4 Products</p>
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
                  ? "select-product-menu p1 rounded-bottom-0"
                  : "select-product-menu p1",
            }}
            options={[
              { label: "Name", value: "name" },
              { label: "Price", value: "price" },
            ]}
            placeholder="Sort"
            components={{ Control }}
          />
        </div>
      </div>
      <div className="row g-4">
        <div className="d-flex flex-column col-12 col-md-3 gap-3">
          {filterOptions.map((filterOption, index) => (
            <div
              key={index}
              className=""
              onClick={() => {
                if (showFilter === filterOption.id) {
                  setShowFilter("");
                } else setShowFilter(filterOption.id);
              }}
            >
              <div
                className="d-flex align-items-center justify-content-between gap-2 text-xl 2xl:text-2xl text-black text-opacity-40"
                style={{ cursor: "pointer" }}
              >
                <p className="font-normal">{filterOption.name}</p>
                <ChevronDown
                  className={`transition-all duration-200 ${
                    showFilter === filterOption.id ? "-rotate-90" : ""
                  }`}
                />
              </div>
              <div
                className={`overflow-hidden`}
                style={{
                  maxHeight: showFilter === filterOption.id ? "720px" : "0",
                  transition: "all 0.25s",
                }}
              >
                {Array.from({ length: 4 }).map((_, ind) => (
                  <div key={ind}>
                    <Checkbox label="forklift" className="px-0 pe-1" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --------------------------------- */}
        <div className="col-12 col-md-9">
          <div className="row g-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <a key={index} className="col-12 col-md-6 col-lg-4 col-xl-3">
                <div className="border border-gray bg-white rounded-4 product-card p-2">
                  <img
                    src={
                      "https://s3-alpha-sig.figma.com/img/b991/5868/9d97c2b580fa8710a583a8e84db65bd5?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NA9C1SK8NqqEznhphtwdy7yjr6gkUb3GAMAaCtDyn3Y1YQ8IWCiAC1NmBT-6g6hEkNUhVdQi-gLhS04xEk42dGB4nkSX0bdBhaWeyO0zRbscwIyGsBDBg3StnXdGawaSy4TdUyf3KpET3qaAeDqh9NnxNdWiszAviu1GS7MlAJsdDNxjn7L-bP3JFC0kYCC2s6DwsP-ydYeja2ivyDEeJN97-zZlJlCmgI1FM--zkWsUGwinvAmFqG6TANb5fkB0zK-mWhTaLhcaa-YoY3tfAHRStmkDjfpzIxyFtpn6-0jlecEw7j36tSjWIuY1lX3dG3618XDy-XbmkaijbRBwIQ__"
                    }
                    alt={"Forklift 7000-10000lbs"}
                    className="w-100 h-auto mb-3 rounded-3"
                  />
                  <h6 className="h6 text-center">Forklift 7000-10000lbs</h6>
                </div>
              </a>
            ))}
          </div>
        </div>
        {/* --------------------------------- */}
      </div>
    </div>
  );
};

export default RentForkliftWithAttachments;
