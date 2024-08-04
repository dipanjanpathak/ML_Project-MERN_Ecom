import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  const stepStyle = {
    // fontWeight: "bold",
    fontSize: "1rem",
    padding: "10px 5px",
    color: "black",
    border: "1px solid #dee2e6",
    borderRadius: "5px",
    marginRight: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
    
  };

  const completedStepStyle = {
    ...stepStyle,
    backgroundColor: "#28a745",
    borderColor: "#28a745",
    color: "blue",
  };

  const upcomingStepStyle = {
    ...stepStyle,
    // backgroundColor: "#08bd80", 
     backgroundColor: "orange", 
    color: "white", 
  };

  console.log({ step1, step2, step3, step4 }); 

  return (
    <Nav className="justify-content-center mb-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "5px", padding: "15px" }}>
      <Nav.Item style={{ flex: 1, textAlign: "center" }}>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link style={completedStepStyle}>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={upcomingStepStyle} disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ flex: 1, textAlign: "center" }}>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link style={completedStepStyle}>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={upcomingStepStyle} disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ flex: 1, textAlign: "center" }}>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link style={completedStepStyle}>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={upcomingStepStyle} disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item style={{ flex: 1, textAlign: "center" }}>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link style={completedStepStyle}>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link style={upcomingStepStyle} disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutStep;
