import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import CheckoutStep from '../Components/shared/CheckoutStep';
import Message from '../Components/shared/Message';
import { createOrder } from '../actions/orderaction';
import { removeFromCart } from '../actions/CartAction';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingAddress, paymentMethod } = cart;

  // Calculations
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.offer_price, 0);
  const shippingPrice = cartItems.reduce((acc, item) => acc + item.qty * 40, 0);
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      console.log('Order success:', order, "this is in PlaceOrder.jsx");
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success, order]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product,
          offerPrice: item.offer_price  // use offer_price directly from item
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      })
    );
  };

  const deleteItemHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col lg={9} md={12} sm={12} xs={12} style={{ display: "flex", justifyContent: "center" }} className="my-3 p-3">
          <Col md={12}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Items</h2>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item, index) => (
                      <ListGroup.Item key={index} className="my-3 p-3 rounded" style={{ height: "auto", display: "inline-block", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
                        <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} style={{ width: "auto", height: "100px" }} className="d-flex align-items-center" />
                          </Col>
                          <Col md={4} className="d-flex align-items-center p-3">
                            <Link to={`/product/${item.product}`}>
                              <strong>{item.name}</strong>
                            </Link>
                          </Col>
                          <Col md={2} className="d-flex align-items-center">
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
                            {item.qty} x ₹{item.offer_price} = ₹{item.qty * item.offer_price}
                          </Col>
                          <Col md={2} className="d-flex align-items-center justify-content-end">
                            <Button
                              type="button"
                              variant="light"
                              onClick={() => deleteItemHandler(item.product)}
                            >
                              <i className="fas fa-trash" style={{ color: 'red' }}></i>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>

              <ListGroup.Item className="my-3 p-3 rounded" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
                <h2>Shipping</h2>
                <p>
                  <strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city},{' '}
                  {shippingAddress.postalCode}, {shippingAddress.country}
                </p>
                <Row>
                  <Col>
                    <Button className="btn-block rounded" variant="success" onClick={() => navigate('/shipping')} style={{ backgroundColor: '#08BD80', padding: '3px 15px' }}>
                      Edit
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="my-3 p-3 rounded" style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)" }}>
                <h2>Payment Method</h2>
                <strong>Method: </strong>
                {paymentMethod === 'Razorpay' ? 'Razorpay Payment Gateway' : paymentMethod}
                <Row>
                  <Col>
                    <Button variant="success" className="btn-block rounded" onClick={() => navigate('/payment')} style={{ backgroundColor: '#08BD80', padding: '3px 15px' }}>
                      Edit
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Col>

        <Col md={12} sm={12} xs={12} lg={3} className="my-3 p-3">
          <strong><h4>Order Summary</h4></strong>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>₹{itemsPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>₹{shippingPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax(18%)</Col>
                <Col>₹{taxPrice.toFixed(2)}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>₹{totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {error && (
              <ListGroup.Item>
                <Message variant="danger">{error}</Message>
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <Row>
                <Button
                  className="btn-block rounded"
                  style={{ backgroundColor: "#08BD80" }}
                  type="button"
                  disabled={cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;

