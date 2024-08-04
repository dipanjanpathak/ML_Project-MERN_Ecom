import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../css/product.css";

const PriceDisplay = ({ originalPrice, offerPrice }) => {



  // Calculate the discount percentage
  const discountPercentage =
    ((originalPrice - offerPrice) / originalPrice) * 100;

  return (
    <div className="price-display">
      <Row>
        <Col md={12} className="d-flex align-items-center">





          {/* Actual Price section */}
          <Row>
            <p
              style={{
                color: "red",
                margin: "0 0.5rem 0 0",
                fontSize: "0.9rem",
              }}
            >
              M.R.P:{" "}
              <span style={{ textDecoration: "line-through" }}>
                ₹{originalPrice}
              </span>
            </p>
          </Row>





          {/* Offer Price Seection */}
        </Col>
        <Col md={12} className="d-flex align-items-center">
          <p
            style={{
              color: "green",
              margin: "0 0.5rem 0 0",
              fontSize: "1.1rem",
              fontWeight: "bold",
              display: "inline-block",
            }}
          >
            <span
              style={{
                fontSize: ".8rem",
                verticalAlign: "top",
                marginTop: "-0.5rem",
              }}
            >
              ₹
            </span>
            {offerPrice}/-
          </p>
          {/* Percentage Off Section */}
          <p
            style={{
              color: "#565959",
              margin: "0",
              fontSize: "0.7rem",
              fontWeight: "bold",
            }}
          >
            ({discountPercentage.toFixed(0)}% off)
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default PriceDisplay;
