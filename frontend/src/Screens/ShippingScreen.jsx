import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../Components/shared/FormContainer";
import { saveShippingAddress } from "../actions/CartAction";
import { useNavigate } from "react-router-dom"; 
import CheckoutStep from "../Components/shared/CheckoutStep";

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress = {} } = cart; 
    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <>
            <CheckoutStep step1 step2 />
            <FormContainer>
                <Card className="p-4 shadow-lg" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h2 className="text-center">Shipping</h2>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="address" className="mb-3">
                            <Form.Label><strong>Address</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="city" className="mb-3">
                            <Form.Label><strong>City</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter City"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="postalcode" className="mb-3">
                            <Form.Label><strong>Postal Code</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Postal Code"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="country" className="mb-3">
                            <Form.Label><strong>Country</strong></Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                                style={{ borderRadius: '10px' }}
                            ></Form.Control>
                        </Form.Group>

                        <div className="d-grid">
                            <Button type="submit" className="btn-block" variant="success" style={{ borderRadius: '10px' }}>
                                Continue
                            </Button>
                        </div>
                    </Form>
                </Card>
            </FormContainer>
        </>
    );
};

export default ShippingScreen;
