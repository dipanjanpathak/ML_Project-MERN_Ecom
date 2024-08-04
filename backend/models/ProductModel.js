const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comment: {
    type: String,
    required: false // you can change this to true if you think the user should provide comments.
  }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true
  },
  numReviews: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  offerPrice: {
    type: Number,
    required: true
  },
  sells: {
    type: Number,
    required: true
  },

  countInStock: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product; // Use module.exports for CommonJS modules




























// const mongoose = require('mongoose')

// const reviewSchema = mongoose.Schema({
//     name: {
//         type: String,
//         require: true
//     },
//     rating: {
//         type: Number,
//         require: true
//     },
//     Comment: {
//         type: String,
//         require: false     // you can change the status to 'true' if you think user should give comments.
//     },
// }, { timeStamps: true })


// const productSchema = mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         require: true,
//         ref: 'User',
//     },
//     name: {
//         type: String,
//         require: true,
//     },
//     image: {
//         type: String,
//         require: true
//     },
//     brand: {
//         type: String,
//         require: true
//     },
//     category: {
//         type: String,
//         require: true
//     },
//     description: {
//         type: String,
//         require: true
//     },
//     reviews: [reviewSchema],
//     rating: {
//         type: Number,
//         require: true,
//     },
//     numReviews: {
//         type: Number,
//         require: true
//     },
//     price: {
//         type: Number,
//         require: true
//     },
//     countInStock: {
//         type: Number,
//         require: true
//     }
// }, { timeStamps: true })


// const Product = mongoose.model("Product", productSchema)

// export default Product