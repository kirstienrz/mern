// import Review from '../models/Review.js';
// import Product from '../models/productModel.js';

// // Controller to add a review
// const addReview = async (req, res) => {
//   const { productId } = req.params;
//   const { userId, rating, comment } = req.body;

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Create and save the review
//     const newReview = new Review({
//       productId,
//       userId,
//       rating,
//       comment,
//     });

//     await newReview.save();

//     // Send success response
//     res.status(201).json({ message: 'Review submitted successfully', review: newReview });
//   } catch (err) {
//     res.status(500).json({ message: 'Error submitting review', error: err });
//   }
// };

// // Controller to get reviews for a product (including average rating)
// const getReviews = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Get all reviews for the product
//     const reviews = await Review.find({ productId }).populate('userId', 'username');
    
//     // Calculate the average rating
//     const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

//     // Send reviews and average rating
//     res.status(200).json({ reviews, averageRating });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching reviews', error: err });
//   }
// };
// export const getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find()
//       .populate('userId', 'name email') // Optionally populate user info
//       .populate('orderId', 'orderNumber'); // Optionally populate order info

//     if (!reviews || reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found' });
//     }

//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// const removeReview = async (req, res) => {
//   try {
//     const { id } = req.body; // Get the review ID from the request body
//     const review = await Review.findByIdAndDelete(id); // Delete the review by ID
    
//     if (review) {
//       res.json({ success: true, message: 'Review deleted successfully' });
//     } else {
//       res.status(404).json({ success: false, message: 'Review not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };
// // Default export as an object
// export default {
//   addReview,
//   getReviews,
//   getAllReviews,
//   removeReview,
// };


// import Review from '../models/Review.js';
// import Product from '../models/productModel.js';

// // Controller to add a review
// const addReview = async (req, res) => {
//   const { productId } = req.params;
//   const { userId, rating, comment } = req.body;

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Create and save the review
//     const newReview = new Review({
//       productId,
//       userId,
//       rating,
//       comment,
//     });

//     await newReview.save();

//     // Send success response
//     res.status(201).json({ message: 'Review submitted successfully', review: newReview });
//   } catch (err) {
//     res.status(500).json({ message: 'Error submitting review', error: err });
//   }
// };

// // Controller to get reviews for a product (including average rating)
// const getReviews = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }

//     // Get all reviews for the product
//     const reviews = await Review.find({ productId }).populate('userId', 'username');
    
//     // Calculate the average rating
//     const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0;

//     // Send reviews and average rating
//     res.status(200).json({ reviews, averageRating });
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching reviews', error: err });
//   }
// };

// // Controller to get all reviews
// export const getAllReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find()
//       .populate('userId', 'name email') // Optionally populate user info
//       .populate('orderId', 'orderNumber'); // Optionally populate order info

//     if (!reviews || reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found' });
//     }

//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// };

// // Controller to remove a review
// export const removeReview = async (req, res) => {
//   try {
//     const { id } = req.body; // Assuming 'id' is passed in the request body
//     const review = await Review.findByIdAndDelete(id);
//     if (review) {
//       res.json({ success: true, message: 'Review deleted successfully' });
//     } else {
//       res.status(404).json({ success: false, message: 'Review not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error', error });
//   }
// };

// // Export all functions (keep consistent with other code)
// export default {
//   addReview,
//   getReviews,
//   getAllReviews,
//   removeReview
// };
// controllers/reviewController.js

import Review from '../models/Review.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { orderId, review } = req.body;
    const newReview = new Review({ orderId, review, date: new Date() });
    await newReview.save();
    res.status(200).json({ success: true, message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a review by ID
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, message: 'Review updated', review: updatedReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
