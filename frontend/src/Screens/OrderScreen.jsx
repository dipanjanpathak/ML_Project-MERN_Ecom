import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Card, Container } from 'react-bootstrap';
import Message from '../Components/shared/Message';
import Loader from '../Components/shared/Loader';
import { getOrderDetails, payOrder } from '../actions/orderaction';
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { clearCart } from '../actions/CartAction';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        const addRazorpayScript = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };


        if (!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.Razorpay) {
                addRazorpayScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, order]);

    //clear Cart
    useEffect(() => {
        if (successPay) {
          dispatch(clearCart());
        }
      }, [dispatch, successPay]);
    


    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    };

    const handleRazorpayPayment = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data: orderData } = await axios.post('/api/orders/razorpay/order', { amount: order.totalPrice }, config);
            
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Abharole.com',
                description: 'Test Transaction',
                order_id: orderData.id,
                handler: async (response) => {
                    const paymentResult = {
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config);
                    successPaymentHandler(paymentResult);
                },
                prefill: {
                    name: order.user.name,
                    email: order.user.email,
                },
                notes: {
                    address: 'Razorpay Corporate Office',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Razorpay Payment Error:', error);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).replace(',', ';');
    };

    if (!loading && order) {
        const itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * (item.offerPrice || 0), 0);
    }

    return (
        <Container className="mt-4">
            {loading ? <Loader />
            : error ? <Message variant="danger">{error}</Message>
            : <>
                <Card className="p-4 shadow-lg rounded-3 mb-4" style={{ transform: "scale(1.03)", backgroundColor: "#f8f9fa" }}>
                    <Card.Body>
                        <Card.Title as="h2" className="text-center mb-4">Order Id:  {order._id}</Card.Title>
                        <Row>
                            <Col md={8}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item className="shadow-sm p-3 mb-3 rounded-3">
                                        <h2>Shipping</h2>
                                        <p><strong>Name:</strong> {order.user.name}</p>
                                        <p><strong>Email:</strong> {order.user.email}</p>
                                        <p>
                                            <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {' '}
                                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ? (<Message variant="success">Delivered on {formatDate(order.deliveredAt)}</Message>
                                        ) : (<Message variant="danger">Not Delivered</Message>)}
                                    </ListGroup.Item>

                                    <ListGroup.Item className="shadow-sm p-3 mb-3 rounded-3">
                                        <h2>Payment Method</h2>
                                        <p>
                                            <strong>Method: </strong>
                                            {order.paymentMethod === 'razorpay' ? 'Razorpay' : order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (<Message variant="success">Paid on {formatDate(order.paidAt)}</Message>
                                        ) : (<Message variant="danger">Not Paid</Message>)}
                                    </ListGroup.Item>

                                    <ListGroup.Item className="shadow-sm p-3 mb-3 rounded-3">
                                        <h2>Order Items</h2>
                                        {order.orderItems.length === 0 ? (
                                            <Message>Your order is empty!</Message>
                                        ) : (
                                            <ListGroup variant="flush">
                                                {order.orderItems.map((item, index) => (
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
                                                                            ₹{item.price ? item.price.toFixed(0) : 'N/A'}/-
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
                                                                        {item.offerPrice ? item.offerPrice.toFixed(0) : "N/A"}/-
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                            <Col md={4} className="d-flex align-items-center justify-content-end">
                                                                {item.qty} x ₹{item.offerPrice ? item.offerPrice.toFixed(0) : 'N/A'} = ₹{item.qty * (item.offerPrice || 0)}
                                                            </Col>
                                                        </Row>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={4}>
                                <Card className="shadow-sm p-3 rounded-3" style={{ backgroundColor: "#f8f9fa" }}>
                                    <Card.Body>
                                        <Card.Title as="h4" className="text-center mb-3">Order Summary</Card.Title>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Items:</Col>
                                                    <Col>₹{order.itemsPrice ? order.itemsPrice.toFixed(2) : 'N/A'}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Shipping:</Col>
                                                    <Col>₹{order.shippingPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Tax (18%):</Col>
                                                    <Col>₹{order.taxPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Total:</Col>
                                                    <Col>₹{order.totalPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                            {!order.isPaid && (
                                                        <ListGroup.Item>
                                                            <Row>
                                                            {loadingPay && <Loader />}
                                                    {!sdkReady ? <Loader /> : (
                                                        <Button
                                                            type="button"
                                                            className="btn-block rounded-2 shadow-sm" style={{backgroundColor: '#08BD80'}}
                                                            onClick={handleRazorpayPayment}
                                                        >
                                                            Pay Now
                                                        </Button>
                                                    )}
                                                            </Row>
                                                   
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </>}
        </Container>
    );
};

export default OrderScreen;



