import { ChevronDown } from "lucide-react";
import { useState } from "react";

const ProductRelatedInfo = ({ information }) => {
  const [open, setOpen] = useState(null);
  return (
    <div
      className="d-flex flex-column"
      style={{ gap: "1rem", cursor: "pointer" }}
    >
      {information !== undefined
        ? information.map((item, index) => (
            <div
              key={item.id}
              className={`border-opacity-10 border-secondary border position-relative w-100 p-4
            ${open == index ? "bg-tertiary" : ""}`}
              style={{
                borderRadius: "0.5rem",
                boxShadow: "4px 4px 50px 0px rgba(0, 0, 0, 0.05)",
              }}
              onClick={() => {
                if (index === open) {
                  setOpen(null);
                } else {
                  setOpen(index);
                }
              }}
            >
              <div
                className={"d-flex align-items-center justify-content-between"}
              >
                <p
                  className={`font-weight-normal ${
                    open === index ? "font-weight-semibold" : ""
                  }`}
                  style={{ transition: "all 0.2s" }}
                >
                  {item.title}
                </p>
                <div
                  style={{
                    transform: open === index ? "rotate(-180deg)" : "rotate(0)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <ChevronDown />
                </div>
              </div>

              <div
                style={{
                  transition: "all 0.25s ease",
                  maxHeight: open === index ? "600px" : "0",
                  overflow: "hidden",
                  paddingTop: open === index ? "2.5rem" : "0",
                }}
              >
                <p>{item.description}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default ProductRelatedInfo;
