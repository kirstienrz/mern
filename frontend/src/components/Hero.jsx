// // import React from 'react'
// // import { assets } from '../assets/assets'

// // const Hero = () => {
// //   return (
// //     <div className='flex flex-col sm:flex-row border border-gray-400'>
// //       {/* Hero Left Side */}
// //       <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
// //         <div className='text-[#414141]'>
// //             <div className='flex items-center gap-2'>
// //                 <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
// //                 <p className='font-medium text-sm md:text-base'>Bestselling Bags</p>
// //             </div>
// //             <h1 className='text-3xl sm:py-3 lg:text-5xl leading-relaxed'> New Arrivals</h1>
// //             <div className='flex items-center gap-2'>
// //                 <p className='font-semibold text-sm md:text-base'>Shop Now</p>
// //                 <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>

// //             </div>
// //         </div>
// //       </div> 
// //       {/* Hero Right Side */}
// //       <img className='w-full sm:w-1/2' src={assets.hero_img} alt="" />
// //     </div>
// //   )
// // }

// // export default Hero
// import React from 'react';
// import { assets } from '../assets/assets';
// import { Button, Typography, Divider, Grid } from '@mui/material';

// const Hero = () => {
//   return (
//     <Grid container className="border border-gray-400" alignItems="center">
//       {/* Hero Left Side */}
//       <Grid item xs={12} sm={6} className="flex justify-center py-10 sm:py-0">
//         <div style={{ color: '#414141', textAlign: 'center' }}>
//           <Divider 
//             orientation="horizontal" 
//             style={{ width: '50px', backgroundColor: '#414141', margin: '0 auto 8px auto' }} 
//           />
//           <Typography variant="subtitle1" style={{ fontWeight: '500', marginBottom: '16px' }}>
//             Bestselling Bags
//           </Typography>
//           <Typography 
//             variant="h3" 
//             style={{ lineHeight: '1.4', fontWeight: '600', marginBottom: '16px' }}
//           >
//             New Arrivals
//           </Typography>
//           <Divider 
//             orientation="horizontal" 
//             style={{ width: '50px', backgroundColor: '#414141', margin: '16px auto' }} 
//           />
//           <Button 
//             variant="text" 
//             style={{ textTransform: 'none', fontWeight: '600', color: '#414141' }}
//           >
//             Shop Now
//           </Button>
//         </div>
//       </Grid>

//       {/* Hero Right Side */}
//       <Grid item xs={12} sm={6}>
//         <img 
//           src={assets.hero_img} 
//           alt="Hero" 
//           style={{ width: '100%', objectFit: 'cover' }} 
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default Hero;


import React from 'react';
import { assets } from '../assets/assets';
import { Button, Card, CardContent, CardMedia, Typography, Box, Grid } from '@mui/material';

const handleShopNowClick = () => {
  navigate('/collection'); // Navigate to the Collection page
};

const Hero = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        backgroundColor: '#f8f9fa',
        padding: 4,
      }}
    >
      <Card 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          maxWidth: '1200px', 
          width: '100%', 
          boxShadow: 3, 
          borderRadius: 3 
        }}
      >
        {/* Hero Right Side - Image */}
        <CardMedia
          component="img"
          image={assets.hero_img}
          alt="New Arrivals"
          sx={{ 
            width: { xs: '100%', sm: '50%' },
            height: { xs: 250, sm: 'auto' },
            objectFit: 'cover',
          }}
        />
        
        {/* Hero Left Side - Content */}
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 4,
            backgroundColor: '#ffffff',
          }}
        >
          <Typography 
            variant="overline" 
            color="textSecondary" 
            sx={{ letterSpacing: 2 }}
          >
            Trending Now
          </Typography>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            sx={{ marginY: 2, color: '#333' }}
          >
            Discover Our Latest Bags
          </Typography>
          <Typography 
            variant="body1" 
            color="textSecondary" 
            sx={{ marginBottom: 3 }}
          >
            Explore our collection of stylish, durable, and elegant bags made for every occasion. Perfect for travel, work, or leisure.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                sx={{ textTransform: 'none', paddingX: 4 }}
              >
                Shop Now
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ textTransform: 'none', paddingX: 4 }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Hero;
