// import React from 'react'
// import Title from '../components/Title'
// import { assets } from '../assets/assets'
// import News from '../components/News'
// const About = () => {
//   return (
//     <div>
//       <div className='text-2xl text-center pt-8 border-t'>
//         <Title text1={'About'} text2={'Us'}/>
//       </div>

//       <div className='my-10 flex flex-col md:flex-row gap-16'>
//         <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
//         <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
//             <p>At BagIT, we believe in the perfect blend of fashion, function, and convenience. Our collection of stylish and durable bags is designed to cater to the modern lifestyle, whether you're heading to work, traveling, or simply looking for a reliable companion for your daily activities.</p>
//             <p>With a focus on quality materials, expert craftsmanship, and thoughtful design, we ensure that every bag serves not only as an accessory but as a long-lasting investment in your everyday life.</p>
//             <b className='text-gray-800'>Our Mission</b>
//             <p>Our mission is to provide our customers with bags that meet their needs while offering a touch of sophistication. From backpacks and totes to travel bags and accessories, each product in our range is crafted with attention to detail and comfort. </p>
//         </div>
//       </div>

//       <div className='text-xl py-4'>
//         <Title text1={'High Quality'} text2={'Collections'} />
//       </div>

//       <div className='flex flex-col md:flex-row text-sm mb-20'>
//         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
//           <b>Quality Assurance:</b>
//           <p>Assure that comes from International or Original</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
//           <b>Convenience:</b>
//           <p>Assure that comes from International or Original</p>
//         </div>
//         <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
//           <b>Quality Assurance:</b>
//           <p>Assure that comes from International or Original</p>
//         </div>
//       </div>
//       <News />
//     </div>
//   )
// }

// export default About
import React from 'react';
import { Typography, Box, Grid, Card, CardContent, Paper } from '@mui/material';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import News from '../components/News';

const About = () => {
  return (
    <div>
      {/* About Title */}
      <Box sx={{ textAlign: 'center', paddingTop: 8, borderTop: '1px solid #ddd' }}>
        <Title text1={'About'} text2={'Us'} />
      </Box>

      {/* About Content */}
      <Grid container spacing={4} sx={{ marginY: 5 }}>
        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <img className='w-full' src={assets.about_img} alt="About Us" style={{ maxWidth: '450px', width: '100%' }} />
        </Grid>

        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
            <Typography variant="body1" color="text.secondary">
              At BagIT, we believe in the perfect blend of fashion, function, and convenience. Our collection of stylish and durable bags is designed to cater to the modern lifestyle, whether you're heading to work, traveling, or simply looking for a reliable companion for your daily activities.
            </Typography>
            <Typography variant="body1" color="text.secondary">
              With a focus on quality materials, expert craftsmanship, and thoughtful design, we ensure that every bag serves not only as an accessory but as a long-lasting investment in your everyday life.
            </Typography>
            <Typography variant="h6" color="text.primary">
              Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Our mission is to provide our customers with bags that meet their needs while offering a touch of sophistication. From backpacks and totes to travel bags and accessories, each product in our range is crafted with attention to detail and comfort.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* High Quality Collections */}
      <Box sx={{ textAlign: 'center', paddingY: 4 }}>
        <Title text1={'High Quality'} text2={'Collections'} />
      </Box>

      {/* Quality Assurance Cards */}
      <Grid container spacing={4} sx={{ marginBottom: 20 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ border: '1px solid #ddd', padding: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Quality Assurance:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assure that comes from International or Original
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ border: '1px solid #ddd', padding: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Convenience:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assure that comes from International or Original
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ border: '1px solid #ddd', padding: 3 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Quality Assurance:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Assure that comes from International or Original
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* News Section */}
      <News />
    </div>
  );
}

export default About;
