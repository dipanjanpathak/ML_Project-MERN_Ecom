import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Rating from "../Components/Rating/Rating";
import PriceDisplay from "../Components/Price_display/PriceDisplay";
import { LinkContainer } from "react-router-bootstrap";
// import "../css/product.css";
// import {Link} from 'react-router-dom'

const ProductScreen = ({ product }) => {
  return (
    // <LinkContainer to={`/product/${product._id}`}>
    <LinkContainer to={`/product/${product._id}`} >
      <Card 
        className="my-3 p-2 rounded product-card"
        style={{ border: "1px solid #ddd" }}
      >
        <Row className="g-0">
          <Col xs={4} className="d-flex align-items-center justify-content-center">
            <Card.Img
              src={product.image}
              style={{ width: "auto", height: "100px" }}
            />
          </Col>
          <Col xs={8}>
            <Card.Body>
              <Card.Title
                as="div"
                style={{
                  color: "black",
                  margin: "0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontSize: "1rem",
                }}
              >
                <strong>{product.name}</strong>

                <Row>
                  <Col>
                    Brand:
                    <strong>{product.brand}</strong>
                  </Col>
                </Row>



              </Card.Title>
              <Card.Text as="div" style={{ fontSize: "0.9rem" }}>
                <Rating value={product.rating} text={`${product.numReviews}`} />
              </Card.Text>


              <Card.Text as="div">
                <PriceDisplay
                  originalPrice={product.price}
                  offerPrice={product.offerPrice}
                />
              </Card.Text>
    
            </Card.Body> 
          </Col>
        </Row>
      </Card>
    </LinkContainer>
  );
};

export default ProductScreen;
