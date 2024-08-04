import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import Rating from "../Components/Rating/Rating";
import PriceDisplay_single_product from "../Components/Price_display/PriceDisplay_single_product";
import Message from "../Components/shared/Message";
import Loader from "../Components/shared/Loader";
import { listProductsDetails } from '../actions/productActions';

const ProductDetails = () => {
  // State to keep track of selected quantity
  const [qty, setQty] = useState(1);
  
  // Get the product ID from the URL parameters
  const { id } = useParams();

  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const productDetails = useSelector(state => state.productDetails); // Get product details from the Redux store
  const { loading, error, product } = productDetails;

  // State to manage the display of full description
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fetch product details when the component mounts or when the product ID changes
  useEffect(() => {
    dispatch(listProductsDetails(id));
  }, [dispatch, id]);

  // Navigate to cart with selected quantity
  const addToCart = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  // Loading state: Show loader while fetching product details
  if (loading) {
    return <Loader />;
  }

  // Error state: Show error message if there is an error
  if (error) {
    return <Message variant="danger"><strong>"Opps! Something went wrong...This page is in ProductDetails.jsx" </strong></Message>;
  }

  // Product not found or missing description state
  if (!product || !product.description) {
    return <Loader/>;
  }

  // Toggle description display
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Render description based on showFullDescription state
  const renderDescription = () => {
    if (showFullDescription) {
      return (
        <>
          <strong>{product.description}</strong>
          <Button variant="link" onClick={toggleDescription}>
            Show Less
          </Button>
        </>
      );
    }

    return (
      <>
        <strong>{product.description.substring(0, 100)}...</strong>
        <Button variant="link" onClick={toggleDescription}>
          Show More
        </Button>
      </>
    );
  };

  return (
    <>
      {/* "Go back" button */}
      <Link to="/" className="btn btn-light">
        <i className="fa-solid fa-arrow-left"></i> Go Back
      </Link>

      {/* Main product details layout */}
      <Row>
        <Col lg={1}></Col>

        {/* Product image section */}
        <Col md={6} xs={12} lg={4} style={{ display: "flex", justifyContent: "center" }}>
          <Card className="my-3 p-3 rounded" style={{ height: "auto", width: "auto", display: "inline-block" }}>
            <Card.Img
              src={product.image}
              style={{ height: "auto", width: "100%", objectFit: "contain" }}
            />
          </Card>
        </Col>

        {/* Product information section */}
        <Col md={3} xs={12} lg={4} className="my-3 p-3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>{product.name}</h4>
            </ListGroup.Item>

            {/* Rating Display section */}
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>

              {/* Component to display price */}
              <PriceDisplay_single_product originalPrice={product.price} offerPrice={product.offerPrice} />
            </ListGroup.Item>
            <ListGroup.Item>

              {/* Product description */}
              Description: {renderDescription()}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Product actions section */}
        <Col md={3} xs={12} lg={3} className="my-3 p-3">
          
          <ListGroup>

            {/* Product stock status */}
            <ListGroup.Item>
              <Row>
                <Col>Status:</Col>
                <Col>

                  {/* Display product stock status */}
                  <strong
                    style={{
                      backgroundColor: product.countInStock > 0 ? "transparent" : "red",
                      color: product.countInStock > 0 ? "inherit" : "white",
                      padding: product.countInStock > 0 ? "0" : "0.25rem",
                      borderRadius: product.countInStock > 0 ? "0" : "0.25rem",
                    }}
                  >
                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : "Out of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Product brand */}
            <ListGroup.Item>
              <Row>
                <Col>Brand:</Col>
                <Col>
                  {/* Display product brand */}
                  <strong>{product.brand}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Product category */}
            <ListGroup.Item>
              <Row>
                <Col>Category:</Col>
                <Col>
                  {/* Display product category */}
                  <strong>{product.category}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Product total sells */}
            <ListGroup.Item>
              <Row>
                <Col>Total Sells:</Col>
                <Col>
                  {/* Display total sells */}
                  <strong>{product.sells}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            {/* Product quantity selection */}
            {product.countInStock > 0 && (
              <ListGroup.Item>
                <Row>
                  <Col>Quantity:</Col>
                  <Col>
                    {/* Dropdown to select quantity */}
                    <Form.Select value={qty} onChange={(e) => setQty(e.target.value)}>
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
              </ListGroup.Item>
            )}

            {/* Add to cart or notify button based on stock */}
            {product.countInStock > 0 ? (
              <ListGroup.Item>
                <Row>
                  {/* Add to cart button */}
                  <Button className="btn-block rounded" style={{ backgroundColor: "#08BD80" }} type="button" onClick={addToCart}>
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item>
                <Row>
                  {/* Notify when available button */}
                  <Button className="btn-block rounded" style={{ backgroundColor: "red", color: "white" }} type="button">
                    Notify Me When Available
                  </Button>
                </Row>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
