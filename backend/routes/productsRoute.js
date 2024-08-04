
const express = require('express')
const {getProduct,getProducts} = require("../controllers/productsController")


const router = express.Router()




// Route to fetch all products
router.route("/all-products").get(getProducts)
// router.route("/").get(getProducts)


// Route to fetch a specific product by ID
router.route('/product/:id').get(getProduct)


module.exports = router