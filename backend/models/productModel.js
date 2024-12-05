// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true},
//     description: {type: String, required: true},
//     price: {type: Number, required: true},
//     image: {type: Array, required: true},
//     category: {type: String, required: true},
//     subCategory: {type: String, required: true},
//     bestSeller: {type: Boolean},
//     date: {type: Number, required: true}
// })

// const productModel = mongoose.models.product || mongoose.model("product",productSchema)

// export default productModel


import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  createdAt: { type: Date, default: Date.now },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    // subCategory: {type: String, required: true},
    subCategory: {type: String, default:''},
    bestSeller: {type: Boolean},
    date: {type: Number, required: true},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    rating: { type: Number, default: 0 }, // Store average rating

  })


const productModel = mongoose.models.product || mongoose.model("product",productSchema)

export default productModel

