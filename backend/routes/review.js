// // // routes/review.js

// // import express from 'express';
// // import Review from '../models/Review.js';  // Assuming Review model exists
// // // import { getAllReviews} from '../controllers/reviewController.js'; // The function to get all reviews
// // import adminAuth from '../middleware/adminAuth.js'; // Admin authentication middleware
// // import removeReview from '../controllers/reviewController.js'
// // const router = express.Router();

// // router.post('/remove', removeReview); // For deleting a review

// // // Route to handle review submission
// // router.post('/submit', async (req, res) => {
// //   try {
// //     const { orderId, review } = req.body;

// //     if (!orderId || !review) {
// //       return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
// //     }

// //     const newReview = new Review({
// //       orderId,
// //       review,
// //       date: new Date(),
// //     });

// //     await newReview.save();
// //     return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
// //   } catch (error) {
// //     console.error('Error submitting review:', error);
// //     return res.status(500).json({ success: false, message: 'Internal server error' });
// //   }
// // });
// // // Route to get all reviews (or you can modify to fetch reviews for a specific order)
// // router.post('/list', async (req, res) => {
// //     try {
// //       const reviews = await Review.find(); // Fetch all reviews or add filters here
  
// //       if (reviews.length === 0) {
// //         return res.status(404).json({ success: false, message: 'No reviews found.' });
// //       }
  
// //       return res.status(200).json({ success: true, reviews });
// //     } catch (error) {
// //       console.error('Error fetching reviews:', error);
// //       return res.status(500).json({ success: false, message: 'Internal server error' });
// //     }
// //   });

// //   // Route to fetch all reviews
// // router.get('/all', async (req, res) => {
// //   try {
// //     const reviews = await Review.find(); // You can add filtering or pagination if needed
// //     res.status(200).json({ success: true, reviews });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: 'Error fetching reviews.' });
// //   }
// // });

  

// // export default router;  // Export review routes as the default export
// import express from 'express';
// import Review from '../models/Review.js';  // Assuming Review model exists
// import { removeReview } from '../controllers/reviewController.js'; // Ensure correct import type
// import adminAuth from '../middleware/adminAuth.js'; // Admin authentication middleware

// const router = express.Router();

// // Route to remove a review (requires admin authorization)
// router.post('/remove', adminAuth, removeReview);

// // Route to submit a review
// router.post('/submit', async (req, res) => {
//   try {
//     const { orderId, review } = req.body;

//     if (!orderId || !review) {
//       return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
//     }

//     const newReview = new Review({ orderId, review, date: new Date() });
//     await newReview.save();
//     return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get a list of all reviews (consider changing to GET for clarity)
// router.get('/list', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     if (reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found.' });
//     }
//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews (fetch all without filters)
// router.get('/all', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     res.status(200).json({ success: true, reviews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching reviews.' });
//   }
// });

// export default router;
// import express from 'express';
// import Review from '../models/Review.js';  // Assuming Review model exists
// import adminAuth from '../middleware/adminAuth.js'; // Admin authentication middleware
// import reviewController from '../controllers/reviewController.js'; // Import default export

// const { removeReview } = reviewController; // Destructure removeReview

// const router = express.Router();

// // Route to remove a review (requires admin authorization)
// router.post('/remove', adminAuth, removeReview);

// // Route to submit a review
// router.post('/submit', async (req, res) => {
//   try {
//     const { orderId, review } = req.body;

//     if (!orderId || !review) {
//       return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
//     }

//     const newReview = new Review({ orderId, review, date: new Date() });
//     await newReview.save();
//     return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews
// router.get('/list', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     if (reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found.' });
//     }
//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews (fetch all without filters)
// router.get('/all', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     res.status(200).json({ success: true, reviews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching reviews.' });
//   }
// });

// export default router;
// import express from 'express';
// import Review from '../models/Review.js';  // Assuming Review model exists
// import adminAuth from '../middleware/adminAuth.js'; // Admin authentication middleware
// import { removeReview } from '../controllers/reviewController.js'; // Directly import removeReview

// const router = express.Router();

// // Route to remove a review (requires admin authorization)
// router.post('/remove', adminAuth, removeReview);  // Use removeReview directly

// // Route to submit a review
// router.post('/submit', async (req, res) => {
//   try {
//     const { orderId, review } = req.body;

//     if (!orderId || !review) {
//       return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
//     }

//     const newReview = new Review({ orderId, review, date: new Date() });
//     await newReview.save();
//     return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews
// router.get('/list', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     if (reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found.' });
//     }
//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews (fetch all without filters)
// router.get('/all', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     res.status(200).json({ success: true, reviews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching reviews.' });
//   }
// });

// // export default router;
// import express from 'express';
// import Review from '../models/Review.js';  // Assuming Review model exists
// import adminAuth from '../middleware/adminAuth.js'; // Admin authentication middleware
// import { removeReview } from '../controllers/reviewController.js'; // Correctly import removeReview

// const router = express.Router();

// // Route to remove a review (requires admin authorization)
// router.post('/remove', adminAuth, removeReview);  // Use removeReview directly

// // Route to submit a review
// router.post('/submit', async (req, res) => {
//   try {
//     const { orderId, review } = req.body;

//     if (!orderId || !review) {
//       return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
//     }

//     const newReview = new Review({ orderId, review, date: new Date() });
//     await newReview.save();
//     return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews
// router.get('/list', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     if (reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found.' });
//     }
//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews (fetch all without filters)
// router.get('/all', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     res.status(200).json({ success: true, reviews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching reviews.' });
//   }
// });

// export default router;
// import express from 'express';
// import Review from '../models/Review.js';  // Assuming Review model exists
// import { removeReview, getAllReviews } from '../controllers/reviewController.js'; // Import removeReview and getAllReviews
// import adminAuth from '../middleware/adminAuth.js'; // Admin authentication middleware

// const router = express.Router();

// // Route to remove a review (requires admin authorization)
// router.post('/remove', adminAuth, async (req, res) => {
//   try {
//     const { id } = req.body; // Assuming the review ID is passed in the request body
//     const review = await Review.findByIdAndDelete(id);
//     if (review) {
//       return res.status(200).json({ success: true, message: 'Review deleted successfully' });
//     } else {
//       return res.status(404).json({ success: false, message: 'Review not found' });
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Error deleting review', error });
//   }
// });

// // Route to submit a review
// router.post('/submit', async (req, res) => {
//   try {
//     const { orderId, review } = req.body;

//     if (!orderId || !review) {
//       return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
//     }

//     const newReview = new Review({ orderId, review, date: new Date() });
//     await newReview.save();
//     return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
//   } catch (error) {
//     console.error('Error submitting review:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews
// router.get('/list', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     if (reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found.' });
//     }
//     return res.status(200).json({ success: true, reviews });
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     return res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// // Route to get all reviews (fetch all without filters)
// router.get('/all', async (req, res) => {
//   try {
//     const reviews = await Review.find();
//     res.status(200).json({ success: true, reviews });
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching reviews.' });
//   }
// });

// export default router;
// routes/reviewRoutes.js
import express from 'express';
import { createReview, getAllReviews, getReviewById, updateReview, deleteReview } from '../controllers/reviewController.js';
import Review from '../models/Review.js';  // Assuming Review model exists
import adminAuth from '../middleware/adminAuth.js'; // Admin a

const router = express.Router();

// Route to create a review
router.post('/create', createReview);

// Route to get all reviews
router.get('/', getAllReviews);

// Route to get a review by ID
router.get('/:id', getReviewById);

// Route to update a review by ID
router.put('/:id', updateReview);

// Route to delete a review by ID
router.delete('/:id', deleteReview);

router.post('/submit', async (req, res) => {
  try {
    const { orderId, review } = req.body;

    if (!orderId || !review) {
      return res.status(400).json({ success: false, message: 'Order ID and review are required.' });
    }

    const newReview = new Review({ orderId, review, date: new Date() });
    await newReview.save();
    return res.status(200).json({ success: true, message: 'Review submitted successfully.' });
  } catch (error) {
    console.error('Error submitting review:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
