import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import XIcon from "../icons/x";
import Quote from "../icons/quote";

const QuoteForm = ({ show = false, setShow }) => {
  const ref = useRef(null);

  useOutsideClick(ref, () => setShow(false));

  return (
    <div className={`w-100 h-100 ${show ? "d-block" : "d-none"}`}>
      <div
        className={
          "container p-md-4 py-2 px-1 mx-auto bg-white border rounded-3"
        }
        style={{
          zIndex: 99,
          position: "fixed",
          transform: "translateX(-50%) translateY(-50%)",
          top: "50%",
          left: "50%",
          height: "calc(100% - 4rem)",
          weight: "calc(100% - 1rem)",
        }}
        ref={ref}
      >
        <div
          className="d-flex align-items-center justify-content-between px-10"
          style={{ padding: "0 2.5rem" }}
        >
          <div className="d-flex align-items-center gap-md-4 gap-2 text-primary">
            <Quote size={40} />
            <h4 className="h4 text-secondary">Get a quote</h4>
          </div>

          <div
            onClick={() => setShow(false)}
            className="d-flex align-items-center justify-content-center p-2 rounded-circle text-secondary bg-secondary bg-opacity-40"
            style={{ cursor: "pointer" }}
          >
            <XIcon />
          </div>
        </div>
        <div className="quote-form-modal-data">
          <p className="my-4 text-center p1">
            Asterisk indicates <span className="text-primary">Required</span>{" "}
            Field
          </p>

          <form className="d-flex flex-column gap-4 px-4">
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <input className="input-primary" placeholder="First Name" />
              <input className="input-primary" placeholder="Last Name" />
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center gap-4">
              <input className="input-primary" placeholder="Email" />
              <input className="input-primary" placeholder="Phone" />
            </div>
            <input className="input-primary" placeholder="Address" />
            <input className="input-primary" placeholder="City" />
            <input className="input-primary" placeholder="State" />
            <input className="input-primary" placeholder="Zip code" />
            <input className="input-primary" placeholder="Company Name" />
            <input className="input-primary" placeholder="Comments/Questions" />
            <div className="mx-auto">
              <button className="justify-content-center btn-secondary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className={
          show ? "bg-secondary opacity-50 w-100 h-100 d-block" : "d-none"
        }
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transition: "all 0.3s",
        }}
      />
    </div>
  );
};

export default QuoteForm;
