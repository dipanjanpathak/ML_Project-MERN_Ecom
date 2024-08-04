import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Card, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Components/shared/Message";
import Loader from "../Components/shared/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import { listMyOrders } from "../actions/orderaction";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const userLogin = useSelector((state) => state.userLogin);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const orderListMy = useSelector((state) => state.orderListMy);

  const { loading, error, user } = userDetails;
  const { userInfo } = userLogin;
  const { success } = userUpdateProfile;
  const { loading: loadingOrders, orders = [], error: errorOrders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || userInfo._id !== user._id) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(getUserDetails("profile"));
      setMessage("");
    }
  }, [success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card className="p-4 shadow-lg rounded-3" style={{ transform: "scale(1.03)" }}>
          <h1 className="text-center">Update Information</h1>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated Successfully!</Message>}
          {loading && <Loader />}
          {message && <Message variant="danger">{message}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label><strong>Name</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-2 shadow-sm"
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label><strong>Email Address</strong></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-2 shadow-sm"
              />
            </Form.Group>
            <Form.Group controlId="password" className="mb-3">
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-2 shadow-sm"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label><strong>Confirm Password</strong></Form.Label>
              <Form.Control
                type="password"
                placeholder="Re-Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-2 shadow-sm"
              />
            </Form.Group>
            <div className="d-grid">
              <Button type="submit" variant="success" className="rounded-2 shadow-sm">
                Update
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
      <Col md={8} className="my-2">
        <Card className="p-4 shadow-lg rounded-3" style={{ transform: "scale(1.03)" }}>
          <h1 className="text-center">My Orders</h1>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="shadow-sm rounded">
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className="fas fa-times" style={{ color: "red" }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="light" className="shadow-sm rounded" style={{ backgroundColor: '#08bd80', color: '#fff' }}>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
