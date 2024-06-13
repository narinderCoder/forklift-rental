import { useState, useEffect } from "react";

export default function AboutUs(props) {
  const [services, setServices] = useState([]);
  useEffect(() => {
    if (props.data !== undefined && props.data !== null && props.data !== "") {
      setServices(props.data);
    }
  }, [props]);

  return (
    <section className="section bg-tertiary">
      <div className="container m-auto">
        <div className="text-center w-100 mb-custom">
          <h6 className="h6 text-primary" style={{ marginBottom: "1rem" }}>
            {services.tagline}
          </h6>
          <h3 className="h3">{services.title}</h3>
        </div>
        <div className="flex-wrap d-flex" style={{ gap: "2rem" }}>
          {services?.service_list?.length > 0
            ? services?.service_list.map((item, index) => (
                <div
                  key={index}
                  className={"mx-auto d-flex align-items-center hover-primary"}
                  style={{ gap: "0.25rem" }}
                >
                  <p className="p1 text-center">{item.point}</p>
                </div>
              ))
            : ""}
        </div>
      </div>
    </section>
  );
}
