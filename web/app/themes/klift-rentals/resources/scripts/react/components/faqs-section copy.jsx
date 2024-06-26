import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FaqsSection({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div
      className="d-flex flex-column"
      style={{ gap: "1rem", cursor: "pointer" }}
    >
      {faqs !== undefined
        ? faqs.map((item, index) => (
            <div
              key={item.id}
              className={`border-opacity-20 position-relative w-100 p-4
                ${open == index ? "bg-tertiary" : ""}`}
              style={{ borderRadius: "0.5rem" }}
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
                  {item.question}
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
                <p>{item.answer}</p>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}
