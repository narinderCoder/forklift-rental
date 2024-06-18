import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const CompareModal = ({
  children,
  showModal,
  setShowModal,
  clearProducts,
  onShow,
}) => {
  const ref = useRef(null);

  useOutsideClick(ref, () => setShowModal(false));

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [showModal]);

  return (
    <div className={`w-100 h-100 ${showModal ? "d-block" : "d-none"}`}>
      <div
        className={"compare-modal container p-4 mx-auto bg-white rounded-2"}
        style={{
          zIndex: 2000,
          width: "calc(100% - 1rem)",
          position: "fixed",
          transform: "translateX(-50%) translateY(-50%)",
          inset: "50%",
        }}
        ref={ref}
      >
        <div
          className="px-md-10 px-0 justify-content-between align-items-center d-flex flex-md-row flex-column gap-2 gap-md-4"
          style={{ padding: "inital 2.5rem" }}
        >
          <div className="">
            <h2 className="h2-alt">Compare Products</h2>
            <p className="p1">You can compare upto 4 products</p>
          </div>
          <div className="gap-2 d-flex mb-2 mb-md-0">
            <button
              className="text-white btn-secondary bg-primary"
              onClick={onShow}
            >
              Show Compare
            </button>
            <button className="btn-secondary" onClick={clearProducts}>
              Clear Products
            </button>
          </div>
          <X
            className="position-absolute top-4 right-4"
            style={{ top: "1rem", right: "1rem" }}
            cursor={"pointer"}
            onClick={() => setShowModal(false)}
          />
        </div>
        <hr className="my-2" />
        <div className="overflow-scroll compare-modal-data">{children}</div>
      </div>
      <div
        className={`${
          showModal ? "bg-secondary opacity-50 d-block w-100 h-100" : "d-none"
        }`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1999,
          transition: "all 0.3s",
        }}
      />
    </div>
  );
};
export default CompareModal;

// import { X } from "lucide-react";
// import { useRef } from "react";

// const CompareModal = ({
//   children,
//   showModal,
//   clearProducts,
//   setShowModal,
//   onShow,
// }) => {
//   const ref = useRef(null);

//   return (
//     <div className={`w-100 h-100 ${showModal ? "d-block" : "d-none"}`}>
//       <div
//         className={"container p-4 mx-auto bg-white rounded-2"}
//         style={{
//           zIndex: 50,
//           width: "calc(100% - 1rem)",
//           position: "fixed",
//           transform: "translateX(-50%) translateY(-50%)",
//           inset: "50%",
//           height: "38rem",
//         }}
//         ref={ref}
//       >
//         <div
//           className="px-10 justify-content-between align-items-center d-flex"
//           style={{ padding: "inital 2.5rem" }}
//         >
//           <div className="">
//             <h2 className="h2">Compare Products</h2>
//             <p className="p1">You can compare upto 4 products</p>
//           </div>

//           <div className="gap-2 d-flex">
//             <button
//               className="text-white btn-secondary bg-primary"
//               onClick={onShow}
//             >
//               Show Compare
//             </button>
//             <button className="btn-secondary" onClick={clearProducts}>
//               Clear Products
//             </button>
//           </div>
//           <X
//             className="cursor-pointer position-absolute top-4 right-4"
//             style={{ top: "1rem", right: "1rem" }}
//             onClick={() => setShowModal(false)}
//           />
//         </div>
//         <hr className="my-2" />
//         <div className="overflow-scroll" style={{ height: "80%" }}>
//           {children}
//         </div>
//       </div>
//       <div
//         className={`${
//           showModal ? "bg-secondary opacity-50 d-block w-100 h-100" : "d-none"
//         }`}
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           zIndex: 40,
//           transition: "all 0.3s",
//         }}
//       />
//     </div>
//   );
// };

// export default CompareModal;
