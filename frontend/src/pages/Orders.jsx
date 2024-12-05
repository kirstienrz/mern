
// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title';
// import axios from 'axios';
// import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper, Modal, TextField } from '@mui/material';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext); 
//   const [orderData, setOrderData] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);  // For collapsible order details
//   const [reviewOpen, setReviewOpen] = useState(false);  // To control review form visibility
//   const [selectedOrder, setSelectedOrder] = useState(null);  // Track the order for review
//   const [reviewText, setReviewText] = useState("");  // Track the review text

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach(order => {
//           order.items.forEach(item => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrdersItem.push(item);
//           })
//         });
//         setOrderData(allOrdersItem.reverse())
//       }
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const cancelOrder = async (orderId) => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } })
//       if (response.data.success) {
//         loadOrderData();  // Refresh orders after canceling
//       } else {
//         console.error('Failed to cancel order');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const handleReviewOpen = (order) => {
//     setSelectedOrder(order);  // Set the order for review
//     setReviewOpen(true);  // Open the review form
//   }

//   const handleReviewClose = () => {
//     setReviewOpen(false);  // Close the review form
//     setReviewText("");  // Clear review text
//   }

//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) {
//       alert("Please enter a review.");
//       return;
//     }

//     try {
//       if (!token || !selectedOrder) return;

//       const response = await axios.post(backendUrl + '/api/review/submit', {
//         orderId: selectedOrder._id,
//         review: reviewText
//       }, { headers: { token } });

//       if (response.data.success) {
//         alert("Review submitted successfully!");
//         handleReviewClose();  // Close the form after submission
//         loadOrderData();  // Refresh orders to reflect the review
//       } else {
//         console.error("Failed to submit review");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   useEffect(() => {
//     loadOrderData()
//   }, [token])

//   return (
//     <Box sx={{ pt: 8, px: 3, backgroundColor: '#F7F9FB' }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', fontFamily: 'Roboto, sans-serif' }}>
//         <Title text1={'My'} text2={'Orders'} />
//       </Typography>
      

//       <TableContainer component={Paper} sx={{ boxShadow: 10, borderRadius: 4 }}>
//         <Table sx={{ minWidth: 650 }} aria-label="orders table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left">Product</TableCell>
//               <TableCell align="left">Price</TableCell>
//               <TableCell align="left">Quantity</TableCell>
//               <TableCell align="left">Status</TableCell>
//               <TableCell align="left">Payment</TableCell>
//               <TableCell align="left">Payment Method</TableCell>
//               <TableCell align="left">Date</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orderData.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <img src={item.image[0]} alt={item.name} style={{ objectFit: 'cover', height: '60px', width: '60px', borderRadius: '8px', marginRight: 10 }} />
//                     <Typography variant="body1">{item.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{currency}{item.price}</TableCell>
//                 <TableCell align="left">{item.quantity}</TableCell>
//                 <TableCell align="left">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.status === 'Delivered' ? 'green' : 'orange', marginRight: 1 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 500, color: item.status === 'Delivered' ? 'green' : 'orange' }}>
//                       {item.status}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{item.payment}</TableCell>
//                 <TableCell align="left">{item.paymentMethod}</TableCell>
//                 <TableCell align="left">{new Date(item.date).toDateString()}</TableCell>
//                 <TableCell align="center">
//                   <Button 
//                     variant="outlined" 
//                     onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
//                     sx={{
//                       textTransform: 'none', 
//                       fontWeight: 500, 
//                       color: '#2C3E50', 
//                       borderColor: '#BDC3C7', 
//                       '&:hover': { 
//                         borderColor: '#3498DB', 
//                         color: '#3498DB' 
//                       }, 
//                       marginBottom: 1,
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       minWidth: '120px'
//                     }}
//                   >
//                     {expandedOrder === index ? 'Hide Details' : 'Show Details'}
//                   </Button>
//                   {item.status === 'Delivered' ? (
//                     <Button 
//                       variant="contained" 
//                       onClick={() => handleReviewOpen(item)}  // Open the review form
//                       size="small" 
//                       sx={{
//                         textTransform: 'none', 
//                         fontWeight: 500, 
//                         backgroundColor: '#2ECC71', 
//                         '&:hover': { 
//                           backgroundColor: '#27AE60' 
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Review
//                     </Button>
//                   ) : (
//                     <Button 
//                       variant="contained" 
//                       onClick={() => cancelOrder(item._id)} 
//                       size="small" 
//                       color="error"
//                       sx={{
//                         textTransform: 'none', 
//                         fontWeight: 500, 
//                         backgroundColor: '#E74C3C', 
//                         '&:hover': { 
//                           backgroundColor: '#C0392B' 
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Cancel Order
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Review Modal */}
//       <Modal
//         open={reviewOpen}
//         onClose={handleReviewClose}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Box sx={{
//           backgroundColor: 'white',
//           padding: 4,
//           borderRadius: 2,
//           width: '400px',
//           boxShadow: 24
//         }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
//             Write a Review for {selectedOrder ? selectedOrder.name : ''}
//           </Typography>
//           <TextField
//             label="Review"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant="outlined" onClick={handleReviewClose} color="secondary">
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleReviewSubmit} color="primary">
//               Submit Review
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   )
// }

// export default Orders;
// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper, Modal, TextField } from '@mui/material';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [reviewOpen, setReviewOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [reviewText, setReviewText] = useState("");

//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach(order => {
//           order.items.forEach(item => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             allOrdersItem.push(item);
//           })
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } });
//       if (response.data.success) {
//         loadOrderData();
//       } else {
//         console.error('Failed to cancel order');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReviewOpen = (order) => {
//     setSelectedOrder(order);
//     setReviewOpen(true);
//   };

//   const handleReviewClose = () => {
//     setReviewOpen(false);
//     setReviewText("");
//   };

//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) {
//       alert("Please enter a review.");
//       return;
//     }

//     try {
//       if (!token || !selectedOrder) return;

//       const response = await axios.post(backendUrl + '/api/review/submit', {
//         orderId: selectedOrder._id,
//         review: reviewText,
//       }, { headers: { token } });

//       if (response.data.success) {
//         alert("Review submitted successfully!");
//         handleReviewClose();
//         loadOrderData();
//       } else {
//         console.error("Failed to submit review");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <Box sx={{ pt: 8, px: 3, backgroundColor: '#F7F9FB' }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', fontFamily: 'Roboto, sans-serif' }}>
//         <Title text1={'My'} text2={'Orders'} />
//       </Typography>

//       <TableContainer component={Paper} sx={{ boxShadow: 10, borderRadius: 4 }}>
//         <Table sx={{ minWidth: 650 }} aria-label="orders table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left">Product</TableCell>
//               <TableCell align="left">Price</TableCell>
//               <TableCell align="left">Quantity</TableCell>
//               <TableCell align="left">Status</TableCell>
//               <TableCell align="left">Payment</TableCell>
//               <TableCell align="left">Payment Method</TableCell>
//               <TableCell align="left">Date</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orderData.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <img src={item.image[0]} alt={item.name} style={{ objectFit: 'cover', height: '60px', width: '60px', borderRadius: '8px', marginRight: 10 }} />
//                     <Typography variant="body1">{item.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{currency}{item.price}</TableCell>
//                 <TableCell align="left">{item.quantity}</TableCell>
//                 <TableCell align="left">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.status === 'Delivered' ? 'green' : 'orange', marginRight: 1 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 500, color: item.status === 'Delivered' ? 'green' : 'orange' }}>
//                       {item.status}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{item.payment}</TableCell>
//                 <TableCell align="left">{item.paymentMethod}</TableCell>
//                 <TableCell align="left">{new Date(item.date).toDateString()}</TableCell>
//                 <TableCell align="center">
//                   <Button 
//                     variant="outlined" 
//                     onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
//                     sx={{
//                       textTransform: 'none', 
//                       fontWeight: 500, 
//                       color: '#2C3E50', 
//                       borderColor: '#BDC3C7', 
//                       '&:hover': { 
//                         borderColor: '#3498DB', 
//                         color: '#3498DB' 
//                       }, 
//                       marginBottom: 1,
//                       padding: '6px 14px',
//                       borderRadius: '20px',
//                       minWidth: '120px'
//                     }}
//                   >
//                     {expandedOrder === index ? 'Hide Details' : 'Show Details'}
//                   </Button>
//                   {item.status === 'Delivered' ? (
//                     <Button 
//                       variant="contained" 
//                       onClick={() => handleReviewOpen(item)} 
//                       size="small" 
//                       sx={{
//                         textTransform: 'none', 
//                         fontWeight: 500, 
//                         backgroundColor: '#2ECC71', 
//                         '&:hover': { 
//                           backgroundColor: '#27AE60' 
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Review
//                     </Button>
//                   ) : (
//                     <Button 
//                       variant="contained" 
//                       onClick={() => cancelOrder(item._id)} 
//                       size="small" 
//                       color="error"
//                       sx={{
//                         textTransform: 'none', 
//                         fontWeight: 500, 
//                         backgroundColor: '#E74C3C', 
//                         '&:hover': { 
//                           backgroundColor: '#C0392B' 
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Cancel Order
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Review Modal */}
//       <Modal
//         open={reviewOpen}
//         onClose={handleReviewClose}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Box sx={{
//           backgroundColor: 'white',
//           padding: 4,
//           borderRadius: 2,
//           width: '400px',
//           boxShadow: 24
//         }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
//             Write a Review for {selectedOrder ? selectedOrder.name : ''}
//           </Typography>
//           <TextField
//             label="Review"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Button variant="outlined" onClick={handleReviewClose} color="secondary">
//               Cancel
//             </Button>
//             <Button variant="contained" onClick={handleReviewSubmit} color="primary">
//               Submit Review
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default Orders;
// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper, Modal, TextField, Rating } from '@mui/material';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [reviewOpen, setReviewOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(0); // Added state for star rating

//   // Load orders data
//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach(order => {
//           order.items.forEach(item => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             item['reviewed'] = item.reviewed || false; // Add reviewed status if not already set
//             item['review'] = item.review || ""; // Add review text if not already set
//             item['rating'] = item.rating || 0; // Add rating if not already set
//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());

//         // Retrieve reviews from localStorage and merge with current data
//         const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         allOrdersItem = allOrdersItem.map(item => {
//           const savedReview = savedReviews.find(r => r.orderId === item._id);
//           if (savedReview) {
//             item.reviewed = true;
//             item.review = savedReview.review;
//             item.rating = savedReview.rating;
//           }
//           return item;
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } });
//       if (response.data.success) {
//         loadOrderData();
//       } else {
//         console.error('Failed to cancel order');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReviewOpen = (order) => {
//     setSelectedOrder(order);
//     setReviewOpen(true);
//   };

//   const handleReviewClose = () => {
//     setReviewOpen(false);
//     setReviewText("");
//     setRating(0); // Reset rating
//   };

//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) {
//       alert("Please enter a review.");
//       return;
//     }

//     try {
//       if (!token || !selectedOrder) return;

//       // Submit review to backend
//       const response = await axios.post(backendUrl + '/api/review/submit', {
//         orderId: selectedOrder._id,
//         review: reviewText,
//         rating, // Include rating in the review
//       }, { headers: { token } });

//       if (response.data.success) {
//         alert("Review submitted successfully!");

//         // Save the review in localStorage for persistence
//         const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         const updatedReviews = savedReviews.filter(r => r.orderId !== selectedOrder._id); // Remove any existing review for this order
//         updatedReviews.push({
//           orderId: selectedOrder._id,
//           review: reviewText,
//           rating: rating,
//         });
//         localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Save updated reviews to localStorage

//         // Update the orderData in the state
//         setOrderData(prevData =>
//           prevData.map(item =>
//             item._id === selectedOrder._id
//               ? { ...item, reviewed: true, review: reviewText, rating } // Update review and rating
//               : item
//           )
//         );

//         handleReviewClose(); // Close the modal after updating the state
//       } else {
//         console.error("Failed to submit review");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <Box sx={{ pt: 8, px: 3, backgroundColor: '#F7F9FB' }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', fontFamily: 'Roboto, sans-serif' }}>
//         <Title text1={'My'} text2={'Orders'} />
//       </Typography>

//       <TableContainer component={Paper} sx={{ boxShadow: 10, borderRadius: 4 }}>
//         <Table sx={{ minWidth: 650 }} aria-label="orders table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left">Product</TableCell>
//               <TableCell align="left">Price</TableCell>
//               <TableCell align="left">Quantity</TableCell>
//               <TableCell align="left">Status</TableCell>
//               <TableCell align="left">Payment</TableCell>
//               <TableCell align="left">Payment Method</TableCell>
//               <TableCell align="left">Date</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orderData.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <img src={item.image[0]} alt={item.name} style={{ objectFit: 'cover', height: '60px', width: '60px', borderRadius: '8px', marginRight: 10 }} />
//                     <Typography variant="body1">{item.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{currency}{item.price}</TableCell>
//                 <TableCell align="left">{item.quantity}</TableCell>
//                 <TableCell align="left">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.status === 'Delivered' ? 'green' : 'orange', marginRight: 1 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 500, color: item.status === 'Delivered' ? 'green' : 'orange' }}>
//                       {item.status}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{item.payment}</TableCell>
//                 <TableCell align="left">{item.paymentMethod}</TableCell>
//                 <TableCell align="left">{new Date(item.date).toDateString()}</TableCell>
//                 <TableCell align="center">
//                   {item.reviewed ? (
//                     <Button
//                       variant="contained"
//                       size="small"
//                       sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         backgroundColor: '#3498DB',
//                         '&:hover': {
//                           backgroundColor: '#2980B9'
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                       onClick={() => handleReviewOpen(item)}
//                     >
//                       View Review
//                     </Button>
//                   ) : item.status === 'Delivered' ? (
//                     <Button
//                       variant="contained"
//                       onClick={() => handleReviewOpen(item)}
//                       size="small"
//                       sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         backgroundColor: '#2ECC71',
//                         '&:hover': {
//                           backgroundColor: '#27AE60'
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Review
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       onClick={() => cancelOrder(item._id)}
//                       size="small"
//                       color="error"
//                       sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         backgroundColor: '#E74C3C',
//                         '&:hover': {
//                           backgroundColor: '#C0392B'
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Cancel Order
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Review Modal */}
//       <Modal
//         open={reviewOpen}
//         onClose={handleReviewClose}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Box sx={{
//           backgroundColor: 'white',
//           padding: 4,
//           borderRadius: 2,
//           width: '400px',
//           boxShadow: 24
//         }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
//             {selectedOrder ? 'View Review' : 'Write a Review'} for {selectedOrder ? selectedOrder.name : ''}
//           </Typography>
//           {selectedOrder?.reviewed ? (
//             <>
//               <Typography variant="body2">Rating: {selectedOrder.rating}</Typography>
//               <Typography variant="body2">{selectedOrder.review}</Typography>
//             </>
//           ) : (
//             <>
//               <Rating
//                 value={rating}
//                 onChange={(event, newValue) => setRating(newValue)}
//                 sx={{ marginBottom: 2 }}
//               />
//               <TextField
//                 label="Review"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 sx={{ marginBottom: 2 }}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button variant="outlined" onClick={handleReviewClose} color="secondary">
//                   Cancel
//                 </Button>
//                 <Button variant="contained" onClick={handleReviewSubmit} color="primary">
//                   Submit Review
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default Orders;

// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from '../components/Title';
// import axios from 'axios';
// import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper, Modal, TextField, Rating } from '@mui/material';

// const Orders = () => {
//   const { backendUrl, token, currency } = useContext(ShopContext);
//   const [orderData, setOrderData] = useState([]);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [reviewOpen, setReviewOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(0); // Added state for star rating

//   // Load orders data
//   const loadOrderData = async () => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
//       if (response.data.success) {
//         let allOrdersItem = [];
//         response.data.orders.forEach(order => {
//           order.items.forEach(item => {
//             item['status'] = order.status;
//             item['payment'] = order.payment;
//             item['paymentMethod'] = order.paymentMethod;
//             item['date'] = order.date;
//             item['reviewed'] = item.reviewed || false; // Add reviewed status if not already set
//             item['review'] = item.review || ""; // Add review text if not already set
//             item['rating'] = item.rating || 0; // Add rating if not already set
//             allOrdersItem.push(item);
//           });
//         });
//         setOrderData(allOrdersItem.reverse());

//         // Retrieve reviews from localStorage and merge with current data
//         const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         allOrdersItem = allOrdersItem.map(item => {
//           const savedReview = savedReviews.find(r => r.orderId === item._id);
//           if (savedReview) {
//             item.reviewed = true;
//             item.review = savedReview.review;
//             item.rating = savedReview.rating;
//           }
//           return item;
//         });
//         setOrderData(allOrdersItem.reverse());
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const cancelOrder = async (orderId) => {
//     try {
//       if (!token) return;

//       const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } });
//       if (response.data.success) {
//         loadOrderData();
//       } else {
//         console.error('Failed to cancel order');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleReviewOpen = (order) => {
//     setSelectedOrder(order);
//     setReviewOpen(true);
//   };

//   const handleReviewClose = () => {
//     setReviewOpen(false);
//     setReviewText("");
//     setRating(0); // Reset rating
//   };

//   const handleReviewSubmit = async () => {
//     if (!reviewText.trim()) {
//       alert("Please enter a review.");
//       return;
//     }

//     try {
//       if (!token || !selectedOrder) return;

//       // Submit review to backend
//       const response = await axios.post(backendUrl + '/api/review/submit', {
//         orderId: selectedOrder._id,
//         review: reviewText,
//         rating, // Include rating in the review
//       }, { headers: { token } });

//       if (response.data.success) {
//         alert("Review submitted successfully!");

//         // Save the review in localStorage for persistence
//         const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
//         const updatedReviews = savedReviews.filter(r => r.orderId !== selectedOrder._id); // Remove any existing review for this order
//         updatedReviews.push({
//           orderId: selectedOrder._id,
//           review: reviewText,
//           rating: rating,
//         });
//         localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Save updated reviews to localStorage

//         // Update the orderData in the state
//         setOrderData(prevData =>
//           prevData.map(item =>
//             item._id === selectedOrder._id
//               ? { ...item, reviewed: true, review: reviewText, rating } // Update review and rating
//               : item
//           )
//         );

//         handleReviewClose(); // Close the modal after updating the state
//       } else {
//         console.error("Failed to submit review");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     loadOrderData();
//   }, [token]);

//   return (
//     <Box sx={{ pt: 8, px: 3, backgroundColor: '#F7F9FB' }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', fontFamily: 'Roboto, sans-serif' }}>
//         <Title text1={'My'} text2={'Orders'} />
//       </Typography>

//       <TableContainer component={Paper} sx={{ boxShadow: 10, borderRadius: 4 }}>
//         <Table sx={{ minWidth: 650 }} aria-label="orders table">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left">Product</TableCell>
//               <TableCell align="left">Price</TableCell>
//               <TableCell align="left">Quantity</TableCell>
//               <TableCell align="left">Status</TableCell>
//               <TableCell align="left">Payment</TableCell>
//               <TableCell align="left">Payment Method</TableCell>
//               <TableCell align="left">Date</TableCell>
//               <TableCell align="center">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orderData.map((item, index) => (
//               <TableRow key={index}>
//                 <TableCell component="th" scope="row">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <img src={item.image[0]} alt={item.name} style={{ objectFit: 'cover', height: '60px', width: '60px', borderRadius: '8px', marginRight: 10 }} />
//                     <Typography variant="body1">{item.name}</Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{currency}{item.price}</TableCell>
//                 <TableCell align="left">{item.quantity}</TableCell>
//                 <TableCell align="left">
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.status === 'Delivered' ? 'green' : 'orange', marginRight: 1 }} />
//                     <Typography variant="body2" sx={{ fontWeight: 500, color: item.status === 'Delivered' ? 'green' : 'orange' }}>
//                       {item.status}
//                     </Typography>
//                   </Box>
//                 </TableCell>
//                 <TableCell align="left">{item.payment}</TableCell>
//                 <TableCell align="left">{item.paymentMethod}</TableCell>
//                 <TableCell align="left">{new Date(item.date).toDateString()}</TableCell>
//                 <TableCell align="center">
//                   {item.reviewed ? (
//                     <Button
//                       variant="contained"
//                       size="small"
//                       sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         backgroundColor: '#3498DB',
//                         '&:hover': {
//                           backgroundColor: '#2980B9'
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                       onClick={() => handleReviewOpen(item)}
//                     >
//                       View Review
//                     </Button>
//                   ) : item.status === 'Delivered' ? (
//                     <Button
//                       variant="contained"
//                       onClick={() => handleReviewOpen(item)}
//                       size="small"
//                       sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         backgroundColor: '#2ECC71',
//                         '&:hover': {
//                           backgroundColor: '#27AE60'
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Review
//                     </Button>
//                   ) : (
//                     <Button
//                       variant="contained"
//                       onClick={() => cancelOrder(item._id)}
//                       size="small"
//                       color="error"
//                       sx={{
//                         textTransform: 'none',
//                         fontWeight: 500,
//                         backgroundColor: '#E74C3C',
//                         '&:hover': {
//                           backgroundColor: '#C0392B'
//                         },
//                         padding: '6px 12px',
//                         borderRadius: '20px',
//                         marginLeft: '8px'
//                       }}
//                     >
//                       Cancel Order
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* HERE EDIT REVIEW */}
//       <Modal
//         open={reviewOpen}
//         onClose={handleReviewClose}
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         <Box sx={{
//           backgroundColor: 'white',
//           padding: 4,
//           borderRadius: 2,
//           width: '400px',
//           boxShadow: 24
//         }}>
//           <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
//             {selectedOrder ? 'View Review' : 'Write a Review'} for {selectedOrder ? selectedOrder.name : ''}
//           </Typography>
//           {selectedOrder?.reviewed ? (
//             <>
//               <Typography variant="body2">Rating: {selectedOrder.rating}</Typography>
//               <Typography variant="body2">{selectedOrder.review}</Typography>
//             </>
//           ) : (
//             <>
//               <Rating
//                 value={rating}
//                 onChange={(event, newValue) => setRating(newValue)}
//                 sx={{ marginBottom: 2 }}
//               />
//               <TextField
//                 label="Review"
//                 variant="outlined"
//                 fullWidth
//                 multiline
//                 rows={4}
//                 value={reviewText}
//                 onChange={(e) => setReviewText(e.target.value)}
//                 sx={{ marginBottom: 2 }}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Button variant="outlined" onClick={handleReviewClose} color="secondary">
//                   Cancel
//                 </Button>
//                 <Button variant="contained" onClick={handleReviewSubmit} color="primary">
//                   Submit Review
//                 </Button>
//               </Box>
//             </>
//           )}
//         </Box>
//       </Modal>
//     </Box>
//   );
// }

// export default Orders;
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, Paper, Modal, TextField, Rating } from '@mui/material';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); // Added state for star rating

  // Load orders data
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } });
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            item['reviewed'] = item.reviewed || false; // Add reviewed status if not already set
            item['review'] = item.review || ""; // Add review text if not already set
            item['rating'] = item.rating || 0; // Add rating if not already set
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());

        // Retrieve reviews from localStorage and merge with current data
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        allOrdersItem = allOrdersItem.map(item => {
          const savedReview = savedReviews.find(r => r.orderId === item._id);
          if (savedReview) {
            item.reviewed = true;
            item.review = savedReview.review;
            item.rating = savedReview.rating;
          }
          return item;
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      if (!token) return;

      const response = await axios.post(backendUrl + '/api/order/cancel', { orderId }, { headers: { token } });
      if (response.data.success) {
        loadOrderData();
      } else {
        console.error('Failed to cancel order');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReviewOpen = (order) => {
    setSelectedOrder(order);
    setReviewText(order.review || ""); // Prepopulate review text
    setRating(order.rating || 0); // Prepopulate rating
    setReviewOpen(true);
  };

  const handleReviewClose = () => {
    setReviewOpen(false);
    setReviewText("");
    setRating(0); // Reset rating
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim()) {
      alert("Please enter a review.");
      return;
    }

    try {
      if (!token || !selectedOrder) return;

      // Submit review to backend
      const response = await axios.post(backendUrl + '/api/review/submit', {
        orderId: selectedOrder._id,
        review: reviewText,
        rating, // Include rating in the review
      }, { headers: { token } });

      if (response.data.success) {
        alert("Review submitted successfully!");

        // Save the review in localStorage for persistence
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        const updatedReviews = savedReviews.filter(r => r.orderId !== selectedOrder._id); // Remove any existing review for this order
        updatedReviews.push({
          orderId: selectedOrder._id,
          review: reviewText,
          rating: rating,
        });
        localStorage.setItem('reviews', JSON.stringify(updatedReviews)); // Save updated reviews to localStorage

        // Update the orderData in the state
        setOrderData(prevData =>
          prevData.map(item =>
            item._id === selectedOrder._id
              ? { ...item, reviewed: true, review: reviewText, rating } // Update review and rating
              : item
          )
        );

        handleReviewClose(); // Close the modal after updating the state
      } else {
        console.error("Failed to submit review");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <Box sx={{ pt: 8, px: 3, backgroundColor: '#F7F9FB' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50', fontFamily: 'Roboto, sans-serif' }}>
        <Title text1={'My'} text2={'Orders'} />
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 10, borderRadius: 4 }}>
        <Table sx={{ minWidth: 650 }} aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Payment</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((item, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={item.image[0]} alt={item.name} style={{ objectFit: 'cover', height: '60px', width: '60px', borderRadius: '8px', marginRight: 10 }} />
                    <Typography variant="body1">{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">{currency}{item.price}</TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
                <TableCell align="left">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.status === 'Delivered' ? 'green' : 'orange', marginRight: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500, color: item.status === 'Delivered' ? 'green' : 'orange' }}>
                      {item.status}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">{item.payment}</TableCell>
                <TableCell align="left">{item.paymentMethod}</TableCell>
                <TableCell align="left">{new Date(item.date).toDateString()}</TableCell>
                <TableCell align="center">
                  {item.reviewed ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        backgroundColor: '#3498DB',
                        '&:hover': {
                          backgroundColor: '#2980B9'
                        },
                        padding: '6px 12px',
                        borderRadius: '20px',
                        marginLeft: '8px'
                      }}
                      onClick={() => handleReviewOpen(item)}
                    >
                      View Review
                    </Button>
                  ) : item.status === 'Delivered' ? (
                    <Button
                      variant="contained"
                      onClick={() => handleReviewOpen(item)}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        backgroundColor: '#2ECC71',
                        '&:hover': {
                          backgroundColor: '#27AE60'
                        },
                        padding: '6px 12px',
                        borderRadius: '20px',
                        marginLeft: '8px'
                      }}
                    >
                      Review
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => cancelOrder(item._id)}
                      size="small"
                      color="error"
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        backgroundColor: '#E74C3C',
                        '&:hover': {
                          backgroundColor: '#C0392B'
                        },
                        padding: '6px 12px',
                        borderRadius: '20px',
                        marginLeft: '8px'
                      }}
                    >
                      Cancel Order
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for review */}
      <Modal
        open={reviewOpen}
        onClose={handleReviewClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          width: '400px',
          boxShadow: 24
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2C3E50' }}>
            {selectedOrder?.reviewed ? 'Edit Review' : 'Write a Review'} for {selectedOrder ? selectedOrder.name : ''}
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Review"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleReviewClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleReviewSubmit} color="primary">
              {selectedOrder?.reviewed ? 'Update Review' : 'Submit Review'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Orders;
