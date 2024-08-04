import React from "react";
import { Row, Col } from "react-bootstrap";

const PriceDisplay_single_product = ({ originalPrice, offerPrice }) => {
  // Calculate the discount percentage
  const discountPercentage =
    ((originalPrice - offerPrice) / originalPrice) * 100;

  return (
    <div className="price-display">
      <Row>
        {/* <Col md={12} className="d-flex align-items-center">
          <p
            style={{
              textDecoration: "line-through",
              color: "red",
              margin: "0 1rem 0 0",
            }}
          >
            <strong>₹{originalPrice.toFixed(2)}</strong>
          </p>

          <p style={{ color: "green", margin: "0 1rem 0 0" }}>
            <strong>₹{offerPrice.toFixed(2)}</strong>
          </p>
          <p style={{ color: "black", margin: "0 1rem 0 0" }}>
            <strong>({discountPercentage.toFixed(2)}% off)</strong>
          </p>
        </Col> */}



        
      <Row>
      <p style={{ color: 'red', margin: '0 0.5rem 0 0', fontSize: '0.9rem' }}>
  M.R.P: <span style={{ textDecoration: 'line-through' }}>₹{originalPrice}/-</span>
</p>


      

        </Row>    
        
        <Col md={12} className="d-flex align-items-center">
        <Col>
        <p style={{ color: 'green', margin: '0 0.5rem 0 0', fontSize: '1.8rem', fontWeight: 'bold', display: 'inline-block' }}>
  <span style={{ fontSize: '1rem', verticalAlign: 'top', marginTop: '-0.5rem' }}>₹</span>{offerPrice}/-
</p>
        </Col>

     
<Col>
<p style={{ color: '#565959', margin: '0', fontSize: '0.9rem', fontWeight: 'bold' }}>
            ({discountPercentage.toFixed(0)}% off)
          </p>
</Col>

          

        </Col>

      </Row>
    </div>
  );
};

export default PriceDisplay_single_product;
