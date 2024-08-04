import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Components/shared/Message';
import Loader from '../Components/shared/Loader';
import { login } from '../actions/userAction';
import FormContainer from '../Components/shared/FormContainer';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Card className="p-4 shadow-lg" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 className="text-center">Welcome Back!</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email' className="mb-3">
            <Form.Label><strong>Email Address</strong></Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: '10px' }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className="mb-3">
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: '10px' }}
            ></Form.Control>
          </Form.Group>

          <div className="d-grid">
            <Button type='submit' variant='success' style={{ borderRadius: '10px' }}>
              Log In
            </Button>
          </div>
        </Form>

        <Row className="py-3">
          <Col className="text-center">
            <span>New Customer?{' '}
              <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} style={{ color: 'blue' }}>
                Register
              </Link>
            </span>
          </Col>
        </Row>
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;
