
const express = require('express')
const {authController,
    getUserProfile,
    registerUser,
    updateUserProfile
} = require("../controllers/UsersController")
const {protect} = require("../middlewares/authMiddleware")
 


const router = express.Router()

//user registration
router.route('/').post(registerUser)

// Route to fetch a specific product by ID
router.post('/login',authController)


// get user profile Private Route
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)


module.exports = router