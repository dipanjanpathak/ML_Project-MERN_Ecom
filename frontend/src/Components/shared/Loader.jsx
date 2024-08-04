import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Spinner animation="grow" role="status" variant="success" style={{ width: '100px', height: '100px' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
