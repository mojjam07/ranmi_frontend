import React, { useState, useEffect } from "react";
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

const OrderFormModal = ({ show, onHide, service, onOrderPlaced }) => {
  const [orderName, setOrderName] = useState("");
  const [orderContact, setOrderContact] = useState("");
  const [orderAddress, setOrderAddress] = useState("");
  const [orderDestination, setOrderDestination] = useState("");
  const [orderDetails, setOrderDetails] = useState("");
  const [orderBudget, setOrderBudget] = useState("");
  const [orderRestaurant, setOrderRestaurant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      service_name: service?.name,
      details: orderDetails,
      budget: orderBudget,
      user_id: null, // Assuming no user auth yet, set to null or handle accordingly
    };
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
    if (response.ok) {
        onOrderPlaced(orderData);
        onHide();
        // Clear form
        setOrderName("");
        setOrderContact("");
        setOrderDetails("");
        setOrderBudget("");
        if (service?.name === "Logistic") {
          setOrderAddress("");
          setOrderDestination("");
        }
      } if (service?.name === "Restaurant Treat") {
          setOrderRestaurant("")
      } else {
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Place Order for {service?.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="orderName"
              placeholder="Enter your name"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              id="orderContact"
              placeholder="Enter your contact number"
              value={orderContact}
              onChange={(e) => setOrderContact(e.target.value)}
              required
            />
          </div>
          {service?.name === "Logistic" && (
            <>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="orderAddress"
                  placeholder="Enter Your Current Address"
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="orderDestination"
                  placeholder="Enter Your Destination Address"
                  value={orderDestination}
                  onChange={(e) => setOrderDestination(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          {service?.name === "Restaurant Treat" && (
            <>
              <div className="mb-3">
                <select
                  name="restaurant"
                  required
                  value={orderRestaurant}
                  onChange={(e) => setOrderRestaurant(e.target.value)}
                  className="p-2"
                >
                  <option value="">Pick a Restaurant</option>
                  <option value="domino">Domino</option>
                  <option value="buka">Buka Hut</option>
                  <option value="chinese">Chinese Restaurant</option>
                  <option value="donald">McDonald</option>
                </select>
              </div>
            </>
          )}
          <div className="mb-3">
            <textarea
              className="form-control"
              id="orderDetails"
              rows="3"
              placeholder={`Provide more Details for ${service?.name}`}
              value={orderDetails}
              onChange={(e) => setOrderDetails(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              id="orderBudget"
              placeholder="How much do you want to spend?"
              value={orderBudget}
              onChange={(e) => setOrderBudget(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 submit">
            Submit Order
          </button>
        </form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

const AvailableOrdersModal = ({ show, onHide, orders, onPlaceOrder }) => {
  const [processingOrderId, setProcessingOrderId] = useState(null);

  const handlePlaceOrder = async (order) => {
    setProcessingOrderId(order.id);
    try {
      const orderData = {
        service_name: order.service_name || order.serviceName,
        details: order.details,
        user_id: order.user_id || null,
      };
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        alert("Order placed successfully");
        onPlaceOrder();
        onHide();
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    } finally {
      setProcessingOrderId(null);
    }
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Available Orders</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {orders.length === 0 ? (
          <p>No available orders at the moment.</p>
        ) : (
          orders.map((order, index) => (
            <div className="card mb-3" key={order.id ?? index}>
              <div className="card-body">
                <h5 className="card-title">{order.service_name || order.serviceName} Order #{order.id}</h5>
                <p className="card-text">Service: {order.service_name || order.serviceName}</p>
                <p className="card-text">Details: {order.details}</p>
                <button
                  className="btn btn-get-order"
                  onClick={() => handlePlaceOrder(order)}
                  disabled={processingOrderId === order.id}
                >
                  {processingOrderId === order.id ? "...processing" : "Take Order"}
                </button>
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
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

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

  const handleOpenSignupModal = () => {
    setShowSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  const filteredOrders = selectedServiceForOrders
    ? orders.filter(
        (order) => order.service_name === selectedServiceForOrders.name
      )
    : [];

  // Remove addOrder function to prevent updating AvailableOrdersModal with new order
  // const addOrder = (newOrder) => {
  //   setOrders((prevOrders) => [newOrder, ...prevOrders]);
  // };

  const refreshOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

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
        <button
          className="btn btn-primary btn-lg px-5 submit"
          onClick={handleOpenSignupModal}
        >
          Get Started
        </button>
      </div>
      <OrderFormModal
        show={showOrderForm}
        onHide={handleCloseOrderForm}
        service={selectedService}
        onOrderPlaced={refreshOrders}
      />
      <AvailableOrdersModal
        show={showAvailableOrders}
        onHide={handleCloseAvailableOrders}
        orders={filteredOrders}
        onPlaceOrder={refreshOrders}
      />
      <SignupModal show={showSignupModal} onHide={handleCloseSignupModal} />
    </main>
  );
};

export default MainContent;
