import React, { useState } from 'react';
import { Form, Button, Col, Card, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/CartAction';
import CheckoutStep from '../Components/shared/CheckoutStep';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <Container className="mt-4">
      <CheckoutStep step1 step2 step3 />
      <Row className="justify-content-md-center">
        <Col xs={12} md={5}>
          <Card className="p-4 shadow-lg rounded-3" style={{ transform: "scale(1.03)", backgroundColor: "#f8f9fa" }}>
            <Card.Body>
              <Card.Title as="h1" className="text-center mb-4">Payment Method</Card.Title>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <Form.Label as="legend" className="mb-3"><strong>Select Payment Method</strong></Form.Label>
                  <Col>
                    <Form.Check
                      type="radio"
                      label="Razorpay"
                      id="Razorpay"
                      name="paymentMethod"
                      value="Razorpay"
                      checked={paymentMethod === 'Razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-2 shadow-sm"
                    />
                    {/* <Form.Check
                      type="radio"
                      label="Stripe"
                      id="stripe"
                      name="paymentMethod"
                      value="stripe"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="shadow-sm"
                    /> */}
                  </Col>
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button type="submit" variant="success" className="rounded-2 shadow-sm">
                    Continue
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentScreen;
