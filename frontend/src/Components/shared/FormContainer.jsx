// import React, { Children } from 'react'
// import {Container,Row, Col} from "react-bootstrap"

// const FromContainer = ({children}) => {
//   return (
//    <>
//    <Container>
//     <Row className='justify-content-md-center'>
//         <Col xs = {12} md={6}>
//         {children}
//         </Col>
//     </Row>
//    </Container>
//    </>
//   )
// }

// export default FromContainer






import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center align-items-center" style={{ height: '80vh' }}>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
