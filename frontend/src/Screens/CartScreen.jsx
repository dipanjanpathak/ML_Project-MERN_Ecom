

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/CartAction";
import Message from "../Components/shared/Message";


const CartScreen = () => {
  const { id: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.offer_price, 0);
  const totalSavings = cartItems.reduce((acc, item) => acc + item.qty * (item.price - item.offer_price), 0);
  const tax = (subtotal * 0.18).toFixed(2);
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const shippingCharges = totalQuantity * 40;
  const finalTotal = (subtotal + parseFloat(tax) + shippingCharges).toFixed(2);
  const total = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);

  return (
    <>
      <Row>
        <Col lg={9} md={12}  sm={12} xs={12} style={{ display: "flex", justifyContent: "center" }} className="my-3 p-3">
          
            <Col md={12}>
              {cartItems.length === 0 ? (
                <Message>
                  Your cart is empty <Link to="/">Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant="flush" >
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product} className="my-3 p-3 rounded" style={{ height: "auto", width: "auto", display: "inline-block", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name}  style={{ width: "auto", height: "100px" }} className="d-flex align-items-center" />
                        </Col>
                        <Col  md={4} className="d-flex align-items-center p-3">
                          <Link to={`/product/${item.product}`}>
                            <strong>{item.name}</strong>
                          </Link>
                        </Col>
                        <Col  md={2} className="d-flex align-items-center" >
                          <div>
                            <p
                              style={{
                                color: "red",
                                margin: "0 0.5rem 0 0",
                                fontSize: "0.9rem",
                              }}
                            >
                              M.R.P:{" "}
                              <span style={{ textDecoration: "line-through" }}>
                                ₹{item.price.toFixed(0)}/-
                              </span>
                            </p>
                            <p
                              style={{
                                color: "green",
                                margin: "0 0.5rem 0 0",
                                fontSize: "1rem",
                                fontWeight: "bold",
                                display: "inline-block",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "1rem",
                                  verticalAlign: "top",
                                  marginTop: "-0.5rem",
                                }}
                              >
                                ₹
                              </span>
                              {item.offer_price.toFixed(0)}/-
                            </p>
                          </div>
                        </Col>
                        <Col md={2} className="d-flex align-items-center justify-content-end">
                          <Form.Select
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(addToCart(item.product, Number(e.target.value)))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Select>
                        </Col>
                        <Col  md={2} className="d-flex align-items-center justify-content-end" >
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                            
                          >
                            <i className="fas fa-trash " style={{ color: 'red' }}></i>
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
         
        </Col>

        <Col md={12}  sm={12} xs={12} lg={3} className="my-3 p-3">
          <strong><h4>Billing Details:</h4></strong>
          <ListGroup >
            <ListGroup.Item> 
              <Row>
                <Col>Total Items:</Col>
                <Col>
                  <strong>{totalQuantity}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>
                  <strong>₹ {total}/-</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Discount:</Col>
                <Col>
                  <strong>-₹ {totalSavings.toFixed(2)}/-</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Sub Total:</Col>
                <Col>
                  <strong>₹ {subtotal.toFixed(2)}/-</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax (18%):</Col>
                <Col>
                  <strong>₹ {tax}/-</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>
                  <strong>₹ {shippingCharges}/-</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Order Total:</Col>
                <Col>
                  <p
                    style={{
                      color: "#a02929",
                      margin: "0 0.5rem 0 0",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      display: "inline-block",
                    }}
                  >
                    <span
                      style={{
                        fontSize: ".9rem",
                        verticalAlign: "top",
                        marginTop: "-0.5rem",
                      }}
                    >
                      ₹
                    </span>
                    {finalTotal}/-
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Button
                  className="btn-block rounded"
                  style={{ backgroundColor: "#08BD80" }}
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
