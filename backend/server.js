const express = require('express');
const { errorHandler } = require('./middlewares/ErrorMiddleware');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/config');
const productRoutes = require('./routes/productsRoute');
const userRoutes = require('./routes/UsersRoute');
const orderRoutes = require('./routes/orderRoute');
require('colors');

dotenv.config();
connectDb();

const PORT = 8080;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) => {
  res.send( process.env.PAYPAL_CLIENT_ID)
})

// Error handling
app.use(errorHandler);

// Start server
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT || PORT}`.inverse);
});
