// import React from 'react'
// import Hero from '../components/Hero'
// import LatestCollection from '../components/LatestCollection'
// import BestSeller from '../components/BestSeller'
// import OurPolicy from '../components/OurPolicy'
// import News from '../components/News'

// const Home = () => {
//   return (
//     <div>
//       <Hero /> 
//       <LatestCollection/>
//       <BestSeller />
//       <OurPolicy />
//       <News />
//     </div>
//   )
// }

// export default Home
import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import News from '../components/News';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#f4f4f4', padding: '20px 0' }}>
        <Hero />
      </Box>

      {/* Latest Collection Section */}
      <Container maxWidth="lg" sx={{ marginY: 5 }}>
        <LatestCollection />
      </Container>

      {/* Best Seller Section */}
      <Box sx={{ backgroundColor: '#fff', padding: '40px 0' }}>
        <Container maxWidth="lg">
          <BestSeller />
        </Container>
      </Box>

      {/* Our Policy Section */}
      <Box sx={{ backgroundColor: '#f4f4f4', padding: '20px 0' }}>
        <Container maxWidth="md">
          <OurPolicy />
        </Container>
      </Box>

      {/* News Section */}
      <Container maxWidth="lg" sx={{ marginY: 5 }}>
        <News />
      </Container>
    </div>
  );
};

export default Home;
