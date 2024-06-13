import { Plus, X } from "lucide-react";

const CompareProducts = ({ show, setShow, products, onAdd }) => {
  return (
    <div
      className={`bg-white text-secondary w-100 h-100 top-0 start-0 ${
        show ? "d-block" : "d-none"
      }`}
      style={{
        position: "fixed",
        overflow: show ? "auto" : "hidden",
        zIndex: 1000,
      }}
    >
      <div className="overflow-hidden">
        <div
          className="bg-white position-absolute"
          style={{ width: "160px", zIndex: 99 }}
        >
          <div className="py-4 justify-content-between flex-column d-flex">
            <div className="w-100 d-flex">
              <p className="compare-product-spec-name flex-grow-1 mb-4 p1 fw-semibold line-clamp-3"></p>
            </div>

            <div
              className="w-auto rounded-4"
              style={{ aspectRatio: "4/3", height: "10rem" }}
            />

            {Array.from({ length: 10 }).map((spec, ind) => (
              <p key={ind} className="my-4 text-center fw-semibold">
                Manufacturer
              </p>
            ))}
          </div>
        </div>

        <div className="overflow-scroll">
          <div
            className="d-flex gap-4"
            style={{
              marginInline: "10.5rem",
            }}
          >
            {Array.from({ length: 3 }).map((product, index) => (
              <div
                key={index}
                className="mt-4 mt-md-0"
                style={{ width: "210px" }}
              >
                <div className="py-4 justify-content-between flex-column d-flex">
                  <div className="w-100 d-flex">
                    <p
                      className="flex-grow-1 mb-4 h6 fw-semibold line-clamp-3"
                      style={{ height: "5.5rem" }}
                    >
                      TOYOTA 6500 FORKLIFT FOR RENT OR SALE IN HOUSTON
                    </p>
                    <X
                      style={{ cursor: "pointer", width: "4rem" }}
                      onClick={() => {
                        setShow(false);
                      }}
                    />
                  </div>

                  <img
                    src="https://www.mechanicalpower.net/wp-content/uploads/2022/04/Components-of-a-Forklift-Truck-980x655.jpg"
                    //   alt={product.id}
                    className="w-auto rounded-4"
                    style={{ aspectRatio: "4/3", height: "10rem" }}
                  />

                  {Array.from({ length: 10 }).map((spec, ind) => (
                    <p key={ind} className="my-4 text-center">
                      Toyota
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {products.length < 4 ? (
              <div
                className="position-relative d-flex flex-column align-items-center justify-content-start p-4"
                style={{ marginTop: "7rem", width: "220px" }}
              >
                <div
                  className="mb-4 border d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    aspectRatio: "4/3",
                    cursor: "pointer",
                  }}
                  onClick={onAdd}
                >
                  <Plus cursor={"pointer"} />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <X
        onClick={() => setShow(false)}
        className="position-fixed"
        cursor={"pointer"}
        style={{ zIndex: 1400, top: "1rem", right: "0.5rem" }}
      />
    </div>
  );
};

export default CompareProducts;
{
  /* <div className="container mx-auto">
        <div className="row m-0 p-0">
          <div className="w-25">
            {Array.from({ length: 1 }).map((product, index) => (
              <div key={index} className="col-3">
                <div className="py-4 justify-content-between flex-column d-flex">
                  <div className="w-100 d-flex">
                    <p
                      className="flex-grow-1 mb-4 p1 fw-semibold line-clamp-3"
                      style={{ height: "5.5rem" }}
                    />
                  </div>

                  <span
                    className="w-auto"
                    style={{ aspectRatio: "4/3", height: "10rem" }}
                  />

                  {Array.from({ length: 10 }).map((spec, ind) => (
                    <p key={ind} className="my-4 fw-semibold">
                      Manufactor
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-75">
            <div className="row p-0 m-0">
              {Array.from({ length: 3 }).map((product, index) => (
                <div key={index} className="col-3">
                  <div className="py-4 justify-content-between flex-column d-flex">
                    <div className="w-100 d-flex">
                      <p
                        className="flex-grow-1 mb-4 p1 fw-semibold line-clamp-3"
                        style={{ height: "5.5rem" }}
                      >
                        TOYOTA 6500 FORKLIFT FOR RENT OR SALE IN HOUSTON
                      </p>
                      <X
                        style={{ cursor: "pointer", width: "4rem" }}
                        onClick={() => {}}
                      />
                    </div>

                    <img
                      src="https://www.mechanicalpower.net/wp-content/uploads/2022/04/Components-of-a-Forklift-Truck-980x655.jpg"
                      //   alt={product.id}
                      className="w-auto rounded-4"
                      style={{ aspectRatio: "4/3", height: "10rem" }}
                    />

                    {Array.from({ length: 10 }).map((spec, ind) => (
                      <p key={ind} className="my-4 text-center">
                        Toyota
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {products.length < 4 ? (
                <div className="col-3">
                  <div
                    className="position-relative d-flex flex-column align-items-center justify-content-start p-4"
                    style={{ marginTop: "7rem" }}
                  >
                    <div
                      className="mb-4 border d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: "8rem",
                        height: "8rem",
                        aspectRatio: "4/3",
                        cursor: "pointer",
                      }}
                      onClick={onAdd}
                    >
                      <Plus cursor={"pointer"} />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div> */
}
