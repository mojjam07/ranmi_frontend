import React from "react";
import ranmiLogo from "./assets/delivery_bike.png";

const MainContent = () => {
  return (
    <main className="container my-5 flex-grow-1">
      <h1 className="text-center mb-4 text-primary">
        No stress! Ranmi is Here
      </h1>
      <p className="lead text-center" style={{ color: "#ff7700" }}>
        Discover amazing features with our platform
      </p>
      <div className="row">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={ranmiLogo}
                width={250}
                height={200}
                className="card-img-top"
                alt={`Service ${index + 1}`}
              />
              <div className="card-body">
                <h5 className="card-title">Service {index + 1}</h5>
                <p className="card-text">Description of service {index + 1}.</p>
                <a href="#" className="btn btn-primary">
                  Place Order
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg px-5">Get Started</button>
      </div>
    </main>
  );
};

export default MainContent;
