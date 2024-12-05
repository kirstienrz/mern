// import React, { useContext, useEffect, useState } from 'react'; // Import useState
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';
// import ProductItem from './ProductItem'; // Assuming ProductItem is a component

// const LatestCollection = () => {

//     const { products } = useContext(ShopContext);
//     const [latestProducts,setLatestProducts] = useState([]);

//     useEffect(() => {
//         setLatestProducts(products.slice(0,10));
//     },[products])
    
//   return ( 
//     <div className='my-10'>
//       <div className='text-center py-8 text-3xl'>
//         <Title text1={'LATEST'} text2={'COLLECTIONS'} />
//         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//         Discover our curated collection of high-quality bags that blend style, practicality, and durability.
//         </p>
//       </div>

//         {/* Rendering products */}
//         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//           {
//             latestProducts.map((item,index)=>(
//               <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
//             ))
//           }
//         </div>
//     </div>
//   )
// }

// export default LatestCollection
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Grid, Typography, Box, Card, CardMedia, CardContent } from '@mui/material';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 12)); // Display the first 10 products
  }, [products]);

  return (
    <Box sx={{ my: 8, px: 4 }}>
      {/* Section Title */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ letterSpacing: 1 }}
        >
          Latest Collections
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          maxWidth="600px"
          mx="auto"
        >
          Discover our curated collection of high-quality bags that blend style,
          practicality, and durability.
        </Typography>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4} justifyContent="center">
        {latestProducts.map((item, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={index}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: 300,
                textAlign: 'center',
                boxShadow: 3,
                borderRadius: 2,
              }}
            >
              {/* Product Image */}
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                sx={{
                  objectFit: 'cover',
                  borderRadius: '8px 8px 0 0',
                }}
              />

              {/* Product Info */}
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{ fontWeight: 'bold', lineHeight: 1.4 }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: 14 }}
                >
                  ${item.price.toFixed(2)} {/* Assuming `price` is a number */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestCollection;
