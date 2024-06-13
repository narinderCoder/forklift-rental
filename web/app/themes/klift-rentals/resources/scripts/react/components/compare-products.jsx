import { Plus, X } from "lucide-react";

const CompareProducts = ({ products, showModal, onAdd }) => {
  return (
    <div
      className={`w-100 bg-white ${showModal? "d-block": "d-none"}`}
      style={{
        position: "fixed",
        height: "100vh",
        overflow: showModal ? "auto" : "hidden",
        zIndex: 1000,
        padding: "2.5rem auto",
        overflowX: "hidden",
        inset: 0,
      }}
    >
      <div className="container gap-4 mx-auto row">
        <div className="p-4 d-flex flex-column justify-content-end">
          <div className="flex-column d-flex">
            <h2 className="mb-4 h2 max-h-80"></h2>
            <div
              className="w-auto mb-4"
              style={{ aspectRatio: "4/3", height: "10rem" }}
            />
            {/* ------------------- specs title -------------------- */}
            {Array.from({ length: 10 }).map((spec, ind) => (
              <p key={ind} className="my-4 font-semibold">
                Manufacturer
              </p>
            ))}
          </div>
        </div>
        {/* ------------------- products -------------------- */}
        {Array.from({ length: 4 }).map((product, index) => (
          <div
            key={index}
            className="p-4 justify-content-between flex-column d-flex"
          >
            <div className="w-100 d-flex">
              <h2 className="flex-1 h-20 mb-4 text-xl font-semibold line-clamp-3">
                TOYOTA 6500 FORKLIFT FOR RENT OR SALE IN HOUSTON
              </h2>
              <X style={{ cursor: "pointer" }} onClick={() => {}} />
            </div>

            <img
              src="https://www.mechanicalpower.net/wp-content/uploads/2022/04/Components-of-a-Forklift-Truck-980x655.jpg"
              //   alt={product.id}
              className="w-auto"
              style={{ aspectRatio: "4/3", height: "10rem" }}
            />

            {Array.from({ length: 10 }).map((spec, ind) => (
              <p key={ind} className="my-4">
                Toyota
              </p>
            ))}
          </div>
        ))}
        {products.length < 4 ? (
          <div
            className="relative flex flex-col items-center justify-start p-4 mt-28"
            onClick={onAdd}
          >
            <div className="aspect-[4/3] h-32 w-32 mb-4 border flex items-center justify-center rounded-full cursor-pointer">
              <Plus />
            </div>
          </div>
        ) : null}
      </div>
      <X
        onClick={() => {}}
        className="position-absolute"
        style={{ zIndex: 100, top: "2rem", right: "2.5rem" }}
      />
    </div>
  );
};

export default CompareProducts;
