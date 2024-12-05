// import React from 'react'
// import { assets } from '../assets/assets'

// const Footer = () => {
//   return (
//     <div>
//         <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
//             <div> 
//                 <img src={assets.HBD} className='mb-5 w-32' alt="" />
//                 <p className='w-full md:w-2/3 text-gray-600'>
//                 The platform aims to provide a seamless shopping experience with a wide range of stylish and durable bags suited for different occasions and preferences. 
//                 </p>
//             </div>

//             <div>
//                 <p className='text-xl font-medium mb-5'>Company, Inc.</p>
//                 <ul className='flex flex-col gap-1 text-gray-600'>
//                     <li>Home</li>
//                     <li>About Us</li>
//                     <li>Delivery</li>
//                     <li>Privacy Policy</li>
//                 </ul>
//             </div>

//             <div>
//                 <p className='text-xl font-medium mb-5'>Get in Touch with Us!</p>
//                 <ul className='flex flex-col gap-1 text-gray-600'>
//                     <li>Facebook</li>
//                     <li>+629 2323 89238</li>
//                     <li>bagit@professional.com</li>
//                 </ul>
//             </div>
//         </div>
//         <hr/>
//         <p className='py-5 text-sm text-center'> Copyright 2024@ BagIt.com - All Right Reserved.</p>
//     </div>
//   )
// }

// export default Footer
import React from 'react';
import { Box, Grid, Typography, Divider } from '@mui/material';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <Box sx={{ marginY: 10, textAlign: 'center' }}>
        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={assets.HBD} className='mb-5 w-32' alt="Logo" />
              <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', maxWidth: '80%' }}>
                The platform aims to provide a seamless shopping experience with a wide range of stylish and durable bags suited for different occasions and preferences.
              </Typography>
            </Box>
          </Grid>

          {/* Middle Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>Company, Inc.</Typography>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li><Typography variant="body2" color="textSecondary">Home</Typography></li>
              <li><Typography variant="body2" color="textSecondary">About Us</Typography></li>
              <li><Typography variant="body2" color="textSecondary">Delivery</Typography></li>
              <li><Typography variant="body2" color="textSecondary">Privacy Policy</Typography></li>
            </ul>
          </Grid>

          {/* Right Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>Get in Touch with Us!</Typography>
            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
              <li><Typography variant="body2" color="textSecondary">Facebook</Typography></li>
              <li><Typography variant="body2" color="textSecondary">+629 2323 89238</Typography></li>
              <li><Typography variant="body2" color="textSecondary">bagit@professional.com</Typography></li>
            </ul>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ marginY: 2 }} />
      
      <Typography variant="body2" color="textSecondary" align="center" sx={{ paddingY: 2 }}>
        Copyright 2024@ BagIt.com - All Rights Reserved.
      </Typography>
    </div>
  );
};

export default Footer;
