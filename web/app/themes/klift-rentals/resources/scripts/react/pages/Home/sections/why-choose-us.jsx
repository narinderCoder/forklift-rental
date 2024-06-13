import { useState, useEffect } from "react";
import StyledListItem from "../../../components/styled-list-item";

export default function WhyChooseUs(props) {
  const [description, setDescription] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (props.data !== undefined && props.data !== null && props.data !== "") {
      setItems(props.data.points);
      setDescription(props.data.description);
    }
  }, [props]);

  return (
    <section className="section bg-tertiary">
      <div
        className="container m-auto d-flex flex-column w-100"
        style={{ gap: "5rem" }}
      >
        <div className="text-center w-100">
          <h3 className="h3">Why Choose Us?</h3>
        </div>
        <div className="row">
          {items.length > 0
            ? items.map((item, index) => (
                <div className="col-md-6 col-12" key={index}>
                  <StyledListItem
                    serialNo={index + 1}
                    title={item.title}
                    description={item.description}
                  />
                </div>
              ))
            : ""}
        </div>
        <ul>
          <li className="">{description}</li>
        </ul>
      </div>
    </section>
  );
}
