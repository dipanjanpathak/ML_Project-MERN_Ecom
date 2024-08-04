import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductScreen from './ProductScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../Components/shared/Loader';
import Message from '../Components/shared/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [] } = productList; // Default products to an empty array

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        Array.isArray(products) && (
          <Row>
            {products.map((product) => (
              <Col sm={6} md={12} lg={6} xl={4} key={product._id}>
                <ProductScreen product={product} />
              </Col>
            ))}
          </Row>
        )
      )}
    </>
  );
};

export default HomeScreen;




// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import { Row, Col } from 'react-bootstrap'
// import ProductScreen from './ProductScreen'


// const HomeScreen = () => {
    
//    const [products, setProducts] = useState([])
//     const dispatch = useDispatch()
//     useEffect(() => {
//         const fetchProducts = async () => {
//             const { data } = await axios.get('/api/products')
//             setProducts(data)
//         }
//         fetchProducts()        
//     }, [])
//     return (
//         <>

//             <Row>
//                 {
//                     products.map(product => (
//                         <Col  sm={6} md={12} lg={6} xl={4} key={product._id}>
//                             <ProductScreen product={product} />
//                         </Col>

//                     ))
//                 }
//             </Row>

//         </>
//     )
// }

// export default HomeScreen