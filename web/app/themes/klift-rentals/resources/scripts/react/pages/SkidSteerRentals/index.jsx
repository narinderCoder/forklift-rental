import { useState } from "react";
import "./skid-steer-rentals.scss";
import Banner from "@scripts/react/components/banner";

const SkidSteerRentals = () => {
  const [selectedTab, setSelectedTab] = useState("rent");
  return (
    <div className="skid-steer-rentals-page">
       <Banner
        image="https://images8.alphacoders.com/476/thumb-1920-476107.jpg"
        height="90vh"
      >
        <h1
          className="h1 text-white mb-7 text-center"
          style={{ marginBottom: "1.75rem" }}
        >
          Skid Steer Rentals
        </h1>
        <h6
          className="h6 text-center text-white"
          style={{ marginBottom: "3.5rem" }}
        >
          All your equipment rental needs covered.
        </h6>
        <button
          className="bg-white text-center"
          style={{
            padding: "0.75rem 2rem",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <p className="p1">View All Skid Steers</p>
        </button>
      </Banner>
      <section className="container mx-auto section px-4">
        <div className="skid-steer-categories d-flex align-items-center justify-content-center position-relative">
          <h4
            className={`text-secondary h4 ${
              selectedTab === "rent" ? "text-opacity-100" : "text-opacity-50"
            }`}
            onClick={() => setSelectedTab("rent")}
            style={{ cursor: "pointer" }}
          >
            Skid Steers For Rent
          </h4>
          <div
            className={`position-absolute bottom-0 border border-primary ${
              selectedTab === "sale" ? "on-sale" : "on-rent"
            }`}
            // style={{ transition: "all 0.35s" }}
          ></div>
          <h4
            className={`text-secondary h4 ${
              selectedTab === "sale" ? "text-opacity-100" : "text-opacity-50"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedTab("sale")}
          >
            Skid Steers For Sale
          </h4>
        </div>

        <div className="d-flex flex-column" style={{ gap: "2.5rem" }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="d-flex flex-column flex-md-row skid-steer-card align-items-center"
              style={{ borderRadius: "10px" }}
            >
              <img
                src={
                  "https://kcbobcat.com/wp-content/uploads/2023/03/pallet-fork-frame.png"
                }
                alt="skid steer"
                className="skid-steer-image"
              />
              <div className="separator"></div>
              <div
                className="d-flex flex-column justify-between flex-grow-1"
                style={{ gap: "2.5rem" }}
              >
                <div className="d-flex flex-column gap-3">
                  <p className="p1">Equipment ID: 23-100</p>
                  <h4 className="h4 font-medium">
                    1000-1299 lbs Skid Steer Loader
                  </h4>
                </div>
                <div className="d-flex skid-options">
                  <div>
                    <p className="text-opacity-50 p1 text-secondary">Daily</p>
                    <h6 className="h6">$99.00</h6>
                  </div>
                  <div>
                    <p className="text-opacity-50 p1 text-secondary">Weekly</p>
                    <h6 className="h6">$99.00</h6>
                  </div>
                  <div>
                    <p className="text-opacity-50 p1 text-secondary">Monthly</p>
                    <h6 className="h6">$99.00</h6>
                  </div>
                </div>
                <a href="/products/skid-steer-loader">
                  <button className="btn-secondary">View Details</button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex">
          <button
            className="mx-auto justify-content-center btn-secondary"
            style={{ marginTop: "3.5rem" }}
          >
            View All Skid Steers
          </button>
        </div>
      </section>
    </div>
  );
};

export default SkidSteerRentals;
