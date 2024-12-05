// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]); // State to hold reviews data
//   const [loading, setLoading] = useState(true); // State for loading status

//   // Fetch reviews from the backend
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/review/all'); // Replace with your actual backend URL
//         if (response.data.success) {
//           setReviews(response.data.reviews);
//         } else {
//           console.error('Failed to fetch reviews');
//         }
//       } catch (error) {
//         console.error('Error fetching reviews', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

//   if (loading) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Reviews
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Review</TableCell>
//               <TableCell>Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reviews.map((review) => (
//               <TableRow key={review._id}>
//                 <TableCell>{review.orderId}</TableCell>
//                 <TableCell>{review.review}</TableCell>
//                 <TableCell>{review.date}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default ReviewList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
// import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications

// const backendUrl = 'http://localhost:4000'; // Your backend URL
// const token = 'your_token_here'; // Replace with the actual token if needed

// // Reused removeProduct function
// const removeProduct = async (id) => {
//   try {
//     const response = await axios.post(
//       `${backendUrl}/api/product/remove`,
//       { id },
//       { headers: { token } }
//     );
//     if (response.data.success) {
//       toast.success(response.data.message);
//       await fetchList(); // Placeholder for fetching product list after deletion
//     } else {
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     console.log(error);
//     toast.error(error.message);
//   }
// };

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]); // State to hold reviews data
//   const [loading, setLoading] = useState(true); // State for loading status

//   // Fetch reviews from the backend
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/api/review/all`);
//         if (response.data.success) {
//           setReviews(response.data.reviews);
//         } else {
//           console.error('Failed to fetch reviews');
//         }
//       } catch (error) {
//         console.error('Error fetching reviews', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, []);

//   // Function to delete a review
//   const removeReview = async (id) => {
//     try {
//       const response = await axios.post(
//         `${backendUrl}/api/review/remove`,
//         { id },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         toast.success(response.data.message);
//         setReviews(reviews.filter((review) => review._id !== id));
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   if (loading) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Reviews
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Review</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reviews.map((review) => (
//               <TableRow key={review._id}>
//                 <TableCell>{review.orderId}</TableCell>
//                 <TableCell>{review.review}</TableCell>
//                 <TableCell>{review.date}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => removeReview(review._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default ReviewList;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
// import { toast } from 'react-toastify';

// const ReviewList = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch reviews when the component mounts
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/review/all'); // Replace with your actual backend URL
//         if (response.data.success) {
//           setReviews(response.data.reviews);
//         } else {
//           console.error('Failed to fetch reviews');
//         }
//       } catch (error) {
//         console.error('Error fetching reviews', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, []);

  // Function to handle review deletion
  // const handleDelete = async (id) => {
  //   try {
  //     // Retrieve the token from localStorage (assuming it is stored there)
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       toast.error('No token found');
  //       return;
  //     }

  //     // Send the POST request to the backend with the token in the header
  //     const response = await axios.post(
  //       'http://localhost:4000/api/review/remove',
  //       { id: id },
  //       { headers: { Authorization: `Bearer ${token}` } } // Send the token as a Bearer token
  //     );

  //     if (response.data.success) {
  //       toast.success('Review deleted successfully');
  //       // Optionally refresh the list of reviews
  //       setReviews(reviews.filter(review => review._id !== id)); // Remove the deleted review from the UI
  //     } else {
  //       toast.error('Failed to delete review');
  //     }
  //   } catch (error) {
  //     console.error('Error deleting review:', error);
  //     toast.error('Error deleting review: ' + error.message);
  //   }
  // };
//   const handleDelete = async (reviewId) => {
//     try {
//       // Retrieve the token from localStorage (assuming it is stored there)
//       const token = localStorage.getItem('token'); 
//       if (!token) {
//         toast.error('No token found');
//         return;
//       }
  
//       // Send the DELETE request to the backend with the token in the header
//       const response = await axios.post(
//         'http://localhost:4000/api/review/remove', // Adjust URL if needed
//         { id: reviewId }, // Send the review ID in the request body
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send the token as a Bearer token
//           },
//         }
//       );
  
//       if (response.data.success) {
//         toast.success('Review deleted successfully');
//         // Optionally refresh the list of reviews
//         fetchReviews(); // You can define your function to fetch and update the list
//       } else {
//         toast.error('Failed to delete review');
//       }
//     } catch (error) {
//       console.error('Error deleting review:', error);
//       toast.error('Error deleting review: ' + error.message);
//     }
//   };
  
//   if (loading) {
//     return <Typography variant="h6">Loading...</Typography>;
//   }

//   return (
//     <div>
//       <Typography variant="h4" gutterBottom>
//         Reviews
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Review</TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {reviews.map((review) => (
//               <TableRow key={review._id}>
//                 <TableCell>{review.orderId}</TableCell>
//                 <TableCell>{review.review}</TableCell>
//                 <TableCell>{review.date}</TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleDelete(review._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// };

// export default ReviewList;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ReviewManager = () => {
//   const [reviews, setReviews] = useState([]);
//   const [orderId, setOrderId] = useState('');
//   const [reviewText, setReviewText] = useState('');
//   const [editReviewId, setEditReviewId] = useState(null);

//   const fetchReviews = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/review');
//       if (response.data.success) {
//         setReviews(response.data.reviews);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Error fetching reviews: ' + error.message);
//     }
//   };

//   const handleCreateReview = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:4000/api/review/create', { orderId, review: reviewText });
//       if (response.data.success) {
//         toast.success('Review created successfully');
//         fetchReviews();  // Refresh the review list after adding a new one
//         setOrderId('');
//         setReviewText('');
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Error creating review: ' + error.message);
//     }
//   };

//   const handleEditReview = async (e) => {
//     e.preventDefault();
//     if (!editReviewId) return;
//     try {
//       const response = await axios.put(`http://localhost:4000/api/review/${editReviewId}`, { review: reviewText });
//       if (response.data.success) {
//         toast.success('Review updated successfully');
//         fetchReviews();  // Refresh the review list after editing
//         setEditReviewId(null);
//         setReviewText('');
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Error editing review: ' + error.message);
//     }
//   };

//   const handleDeleteReview = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000/api/review/${id}`);
//       if (response.data.success) {
//         toast.success('Review deleted successfully');
//         fetchReviews();  // Refresh the review list after deletion
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error('Error deleting review: ' + error.message);
//     }
//   };

//   const handleEditClick = (id, review) => {
//     setEditReviewId(id);
//     setReviewText(review);
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   return (
//     <div>
//       <h2>Manage Reviews</h2>
      
//       <form onSubmit={editReviewId ? handleEditReview : handleCreateReview}>
//         <input
//           type="text"
//           placeholder="Order ID"
//           value={orderId}
//           onChange={(e) => setOrderId(e.target.value)}
//           disabled={editReviewId !== null}  // Disable orderId input when editing
//         />
//         <textarea
//           placeholder="Write your review"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//         />
//         <button type="submit">{editReviewId ? 'Update Review' : 'Create Review'}</button>
//         {editReviewId && <button type="button" onClick={() => { setEditReviewId(null); setReviewText(''); }}>Cancel Edit</button>}
//       </form>

//       <h3>Review List</h3>
//       <ul>
//         {reviews.map((review) => (
//           <li key={review._id}>
//             <p><strong>Order ID:</strong> {review.orderId}</p>
//             <p><strong>Review:</strong> {review.review}</p>
//             <button onClick={() => handleEditClick(review._id, review.review)}>Edit</button>
//             <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ReviewManager;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, TextField, Typography, Container, Box } from '@mui/material'; // Added Material-UI components

const ReviewManager = () => {
  const [reviews, setReviews] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [editReviewId, setEditReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/review');
      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error fetching reviews: ' + error.message);
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/review/create', { orderId, review: reviewText });
      if (response.data.success) {
        toast.success('Review created successfully');
        fetchReviews();  // Refresh the review list after adding a new one
        setOrderId('');
        setReviewText('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error creating review: ' + error.message);
    }
  };

  const handleEditReview = async (e) => {
    e.preventDefault();
    if (!editReviewId) return;
    try {
      const response = await axios.put(`http://localhost:4000/api/review/${editReviewId}`, { review: reviewText });
      if (response.data.success) {
        toast.success('Review updated successfully');
        fetchReviews();  // Refresh the review list after editing
        setEditReviewId(null);
        setReviewText('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error editing review: ' + error.message);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/review/${id}`);
      if (response.data.success) {
        toast.success('Review deleted successfully');
        fetchReviews();  // Refresh the review list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error deleting review: ' + error.message);
    }
  };

  const handleEditClick = (id, review) => {
    setEditReviewId(id);
    setReviewText(review);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Manage Reviews</Typography>

      <form onSubmit={editReviewId ? handleEditReview : handleCreateReview}>
        <TextField
          label="Order ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          disabled={editReviewId !== null}  // Disable orderId input when editing
        />
        <TextField
          label="Write your review"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between" marginTop={2}>
          <Button variant="contained" color="primary" type="submit">
            {editReviewId ? 'Update Review' : 'Create Review'}
          </Button>
          {editReviewId && (
            <Button variant="outlined" color="secondary" onClick={() => { setEditReviewId(null); setReviewText(''); }}>
              Cancel Edit
            </Button>
          )}
        </Box>
      </form>

      <Typography variant="h6" gutterBottom>Review List</Typography>
      <ul>
        {reviews.map((review) => (
          <li key={review._id}>
            <Typography variant="body1"><strong>Order ID:</strong> {review.orderId}</Typography>
            <Typography variant="body2"><strong>Review:</strong> {review.review}</Typography>
            <Box marginTop={1}>
              <Button variant="outlined" color="primary" onClick={() => handleEditClick(review._id, review.review)}>Edit</Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteReview(review._id)} style={{ marginLeft: 10 }}>
                Delete
              </Button>
            </Box>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ReviewManager;
