import React, { useState } from "react";
import "../src/styles/maincontent.css";
import logistic from "./assets/logistic.jpg";
import laundry from "./assets/laundry.jpg";
import restaurant from "./assets/restaurant.jpg";
import Offcanvas from "react-bootstrap/Offcanvas";
import SignupModal from "./SignupModal";

const services = [
  {
    id: 1,
    name: "Logistic",
    description: "Reliable and fast logistic services.",
    image: logistic,
  },
  {
    id: 2,
    name: "Laundry Service",
    description: "Professional laundry and dry cleaning.",
    image: laundry,
  },
  {
    id: 3,
    name: "Restaurant Treat",
    description: "Delicious meals delivered to your door.",
    image: restaurant,
  },
];

const OrderFormModal = ({ show, onHide, service }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Place Order - {service?.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="orderName"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              id="orderContact"
              placeholder="Enter your contact number"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="orderAddress"
              placeholder="Enter Your Current Address"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="orderDestination"
              placeholder="Enter Your Destination Address"
            />
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              id="orderDetails"
              rows="3"
              placeholder={`Details for ${service?.name}`}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100 submit">
            Submit Order
          </button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const AvailableOrdersModal = ({ show, onHide, orders }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Available Orders</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {orders.length === 0 ? (
          <p>No available orders at the moment.</p>
        ) : (
          orders.map((order) => (
            <div className="card mb-3" key={order.id}>
              <div className="card-body">
                <h5 className="card-title">Order #{order.id}</h5>
                <p className="card-text">Service: {order.serviceName}</p>
                <p className="card-text">Details: {order.details}</p>
              </div>
            </div>
          ))
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const MainContent = () => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showAvailableOrders, setShowAvailableOrders] = useState(false);
  const [selectedServiceForOrders, setSelectedServiceForOrders] = useState(null);

  const sampleOrders = [
    { id: 101, serviceName: "Logistic", details: "Deliver package to NY" },
    { id: 102, serviceName: "Laundry Service", details: "Wash and fold clothes" },
    { id: 103, serviceName: "Restaurant Treat", details: "Order dinner for 2" },
  ];

  const handleOpenOrderForm = (service) => {
    setSelectedService(service);
    setShowOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    setShowOrderForm(false);
    setSelectedService(null);
  };

  const handleOpenAvailableOrders = (service) => {
    setSelectedServiceForOrders(service);
    setShowAvailableOrders(true);
  };

  const handleCloseAvailableOrders = () => {
    setShowAvailableOrders(false);
    setSelectedServiceForOrders(null);
  };

  const filteredOrders = selectedServiceForOrders
    ? sampleOrders.filter(
        (order) => order.serviceName === selectedServiceForOrders.name
      )
    : [];

  return (
    <main className="container my-5 flex-grow-1">
      <h1 className="text-center mb-4" style={{ color: "#ff4d00" }}>
        No stress! Ranmi is Here
      </h1>
      <p className="lead text-center" style={{ color: "#ff7700" }}>
        Discover amazing features with our platform
      </p>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4 mb-4" key={service.id}>
            <div className="card">
              <img
                src={service.image}
                width={250}
                height={200}
                className="card-img-top"
                alt={service.name}
              />
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <div className="d-flex">
                  <button
                    className="btn btn-primary submit"
                    onClick={() => handleOpenOrderForm(service)}
                  >
                    Place Order
                  </button>
                  <button
                    className="btn btn-get-order ms-auto"
                    onClick={() => handleOpenAvailableOrders(service)}
                  >
                    Get Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary btn-lg px-5 submit">
          Get Started
        </button>
      </div>
      <OrderFormModal
        show={showOrderForm}
        onHide={handleCloseOrderForm}
        service={selectedService}
      />
      <AvailableOrdersModal
        show={showAvailableOrders}
        onHide={handleCloseAvailableOrders}
        orders={filteredOrders}
      />
    </main>
  );
};

export default MainContent;
