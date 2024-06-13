import { useState, useEffect } from "react";
import ContentCard from "../../../components/content-card";

const Benefits = (props) => {
  const [benefitItems, setBenefitItems] = useState([]);
  const [heading, setHeading] = useState([]);
  const [main_benefit, setMainBenefits] = useState([]);

  useEffect(() => {
    if (props.data !== undefined && props.data !== null && props.data !== "") {
      setHeading(props.data.benefit_heading);
      setMainBenefits(props.data.main_benefit);
      setBenefitItems(props.data.other_benefit_list);
    }
  }, [props]);

  return (
    <>
      <section className="section bg-tertiary">
        <div
          className="container m-auto d-flex flex-column"
          style={{ gap: "3.5rem" }}
        >
          <div className="text-center w-100">
            <h6 className="mb-4 h6 text-primary">{heading.tagline}</h6>
            <h4 className="h4">{heading.title}</h4>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-12">
              <img
                src={main_benefit.main_benefit_image}
                alt=""
                className="w-100"
              />
            </div>
            <div className="col-md-6 col-12">
              <div className="d-flex h-100 flex-column justify-content-between gap-md-2 gap-4">
                {main_benefit.main_benefit_list &&
                  main_benefit.main_benefit_list.map((item, index) => (
                    <div
                      className={"d-flex align-items-start hover-primary"}
                      key={index}
                      style={{ gap: "0.25rem" }}
                    >
                      <svg
                        width="29"
                        height="30"
                        viewBox="0 0 29 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 15.7506C0.0200745 15.6929 0.0432856 15.6358 0.0602235 15.5774C0.372005 14.5129 1.58965 14.2011 2.35311 15.0103C3.63286 16.3672 4.89378 17.7417 6.16287 19.108C6.50163 19.4725 6.84101 19.8364 7.2011 20.2222C7.55867 19.8382 7.89869 19.4756 8.23682 19.1112C11.8013 15.2688 15.3677 11.4283 18.9277 7.58214C19.3073 7.17249 19.7332 6.91404 20.3047 7.02633C21.3417 7.23021 21.7419 8.43907 21.0305 9.23829C20.3938 9.95407 19.732 10.6485 19.0802 11.3511C15.8193 14.8642 12.5535 18.3722 9.30327 21.8946C8.81584 22.4228 8.27947 22.8287 7.57687 22.9994H6.82533C6.24442 22.8381 5.73064 22.5759 5.31284 22.1211C3.77526 20.448 2.22827 18.7837 0.676887 17.1238C0.38267 16.8089 0.114174 16.4877 0.000627328 16.0624C0.000627328 15.9582 0 15.8547 0 15.7506Z"
                          fill="currentColor"
                        />
                        <path
                          d="M28.0629 8.3421C28.0704 8.73104 27.9017 9.04157 27.6438 9.31948C25.2744 11.8702 22.9069 14.4228 20.5381 16.9741C18.9428 18.693 17.3456 20.4106 15.7522 22.132C15.3827 22.5316 14.9405 22.7173 14.4035 22.5906C13.3891 22.3516 13.0334 21.1515 13.7479 20.3711C14.7548 19.272 15.7735 18.1836 16.7873 17.0914C19.7439 13.9052 22.7024 10.7209 25.6565 7.53222C26.0498 7.10815 26.5027 6.89674 27.0818 7.05169C27.6809 7.21166 28.0654 7.72418 28.0629 8.3421Z"
                          fill="currentColor"
                        />
                      </svg>

                      <p>{item.main_benefit_list_item}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column" style={{ gap: "1.25rem" }}>
            <p className="p1">
              Therefore we urge our customers to give us an opportunity to serve
              your Forklift & Aerial lift needs. We Rent on daily or monthly
              basis within Houston and surrounding areas in Texas.
            </p>
            <p className="p1">
              We carry Toyota, Komatsu & Catepillar warehouse forklifts and
              Genie Scissor lifts, Articulating boom lifts and Telescopic
              forklifts for rent.
            </p>
          </div>
        </div>
      </section>

      <section
        className="container m-auto d-flex flex-column section-alt"
        style={{ gap: "5rem" }}
      >
        {benefitItems.benefit_list_item &&
          benefitItems.benefit_list_item.map((item, index) => (
            <>
              <ContentCard
                title={item.benefit_title}
                description={item.benefit_description}
                image={item.benefit_image}
                variant="sm"
                flip={index % 2 == 0}
              />
              <hr className="border-secondary" style={{ opacity: 0.2 }} />
            </>
          ))}
      </section>
    </>
  );
};

export default Benefits;
