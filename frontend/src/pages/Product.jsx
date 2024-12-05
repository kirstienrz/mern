

// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import { Button, Typography, Card, Grid } from '@mui/material'; // Import MUI components

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart } = useContext(ShopContext);
//   const [productData, setProductData] = useState(false);
//   const [image, setImage] = useState('');

//   const fetchProductData = async () => {
//     products.map((item) => {
//       if (item._id === productId) {
//         setProductData(item);
//         setImage(item.image[0]);
//         return null;
//       }
//     });
//   };

//   useEffect(() => {
//     fetchProductData();
//   }, [productId, products]);

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       {/* product data */}
//       <Grid container spacing={4}>
//         {/* product images */}
//         <Grid item xs={12} sm={5}>
//           <Grid container direction="column" spacing={2}>
//             <Grid item xs={12}>
//               <Grid container spacing={2}>
//                 {productData.image.map((item, index) => (
//                   <Grid item key={index}>
//                     <img
//                       onClick={() => setImage(item)}
//                       src={item}
//                       className='cursor-pointer'
//                       alt=""
//                       style={{ width: '100%', height: 'auto', maxWidth: '80px' }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//             </Grid>
//             <Grid item xs={12}>
//               <img
//                 src={image}
//                 alt=""
//                 style={{ width: '100%', height: 'auto' }}
//               />
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Product info */}
//         <Grid item xs={12} sm={7}>
//           <Card elevation={3} className="p-4">
//             <Typography variant="h4" gutterBottom>
//               {productData.name}
//             </Typography>
//             <div className="flex items-center gap-1">
//               {[...Array(4)].map((_, index) => (
//                 <img
//                   key={index}
//                   src={assets.star}
//                   alt=""
//                   className="w-3.5"
//                 />
//               ))}
//               <img
//                 src={assets.star_black}
//                 alt=""
//                 className="w-3.5"
//               />
//               <Typography variant="body2" className='pl-2'>
//                 (122)
//               </Typography>
//             </div>
//             <Typography variant="h5" className="mt-5">
//               {currency}{productData.price}
//             </Typography>
//             <Typography variant="body2" className="mt-3 text-gray-500">
//               {productData.description}
//             </Typography>
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               className="mt-5"
//               onClick={() => addToCart(productData._id)}
//             >
//               ADD TO CART
//             </Button>
//             <hr className='mt-8 sm:w-4/5'/>
//             <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
//               <Typography>100% Quality.</Typography>
//               <Typography>Cash on Delivery is available.</Typography>
//               <Typography>Return and Exchange Policy within 14 days.</Typography>
//             </div>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Description and Review Section */}
//       <div className='mt-20'>
//         <div className='flex'>
//           <Typography variant="button" className='border px-5 py-5 text-sm'>
//             Description
//           </Typography>
//           <Typography variant="button" className='border px-5 py-5 text-sm'>
//             Reviews (122)
//           </Typography>
//         </div>
//         <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
//           <Typography>
//             Bag1 combines elegance with practicality, featuring a timeless design and ample space for all your essentials.
//           </Typography>
//           <Typography>
//             A chic and functional bag designed for the modern woman, offering a spacious interior and a sophisticated look.
//           </Typography>
//         </div>
//       </div>

//       {/* Display related products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   ) : (
//     <div className='opacity-0'></div>
//   );
// };

// export default Product;






import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { Button, Typography, Card, Grid } from '@mui/material'; // Import MUI components

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <Grid container spacing={4}>
        {/* product images */}
        <Grid item xs={12} sm={5}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {productData.image.map((item, index) => (
                  <Grid item key={index}>
                    <img
                      onClick={() => setImage(item)}
                      src={item}
                      className='cursor-pointer'
                      alt=""
                      style={{ width: '100%', height: 'auto', maxWidth: '80px' }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <img
                src={image}
                alt=""
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Product info */}
        <Grid item xs={12} sm={7}>
          <Card elevation={3} className="p-4">
            <Typography variant="h4" gutterBottom>
              {productData.name}
            </Typography>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, index) => (
                <img
                  key={index}
                  src={assets.star}
                  alt=""
                  className="w-3.5"
                />
              ))}
              <img
                src={assets.star_black}
                alt=""
                className="w-3.5"
              />
              <Typography variant="body2" className='pl-2'>
                (122)
              </Typography>
            </div>
            <Typography variant="h5" className="mt-5">
              {currency}{productData.price}
            </Typography>
            <Typography variant="body2" className="mt-3 text-gray-500">
              {productData.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="mt-5"
              onClick={() => addToCart(productData._id)}
            >
              ADD TO CART
            </Button>
            <hr className='mt-8 sm:w-4/5'/>
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <Typography>100% Quality.</Typography>
              <Typography>Cash on Delivery is available.</Typography>
              <Typography>Return and Exchange Policy within 14 days.</Typography>
            </div>
          </Card>
        </Grid>
      </Grid>

      {/* Description and Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <Typography variant="button" className='border px-5 py-5 text-sm'>
            Description
          </Typography>
          <Typography variant="button" className='border px-5 py-5 text-sm'>
            Reviews (122)
          </Typography>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <Typography>
            Bag1 combines elegance with practicality, featuring a timeless design and ample space for all your essentials.
          </Typography>
          <Typography>
            A chic and functional bag designed for the modern woman, offering a spacious interior and a sophisticated look.
          </Typography>
        </div>
      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className='opacity-0'></div>
  );
};

export default Product;




