import { useRef } from "react";
import ShareIcon from "../icons/share";
import XIcon from "../icons/x";
import useOutsideClick from "../hooks/useOutsideClick";

const Share = ({ show = false, setShow }) => {
  const ref = useRef(null);

  useOutsideClick(ref, () => setShow(false));

  return (
    <div className={`w-100 h-100 ${show ? "d-block" : "d-none"}`}>
      <div
        className={"container p-4 mx-auto bg-white border rounded-3"}
        style={{
          zIndex: 99,
          position: "fixed",
          transform: "translateX(-50%) translateY(-50%)",
          top: "50%",
          left: "50%",
          height: "38rem",
          weight: "15rem",
        }}
        ref={ref}
      >
        <div className="d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-2 text-primary">
            <ShareIcon size={24} />
            <h6 className="h6 text-secondary">Share</h6>
          </div>

          <div
            onClick={() => setShow(false)}
            className="d-flex align-items-center justify-content-center p-2 rounded-circle text-secondary bg-secondary bg-opacity-40"
            style={{ cursor: "pointer" }}
          >
            <XIcon />
          </div>
        </div>
        <div
          style={{
            height: "calc(100% - 4rem)",
            overflow: "scroll",
          }}
        ></div>
      </div>
      <div
        className={
          show ? "bg-secondary opacity-50 w-100 h-100 d-block" : "d-none"
        }
        style={{
          position: "fixed",
          zIndex: 10,
          left: 0,
          top: 0,
          transition: "all 0.3s",
        }}
      />
    </div>
  );
};

export default Share;
