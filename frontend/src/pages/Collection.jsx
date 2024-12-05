// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/assets'
// import Title from '../components/Title';
// import ProductItem from '../components/ProductItem';

// const Collection = () => {

//   const { products, search, showSearch } = useContext(ShopContext);
//   const[showFilter,setShowFilter] = useState(false);
//   const [filterProducts,setFilterProducts] = useState([]);
//   const [category,setCategory] = useState([]);
//   const [subCategory,setSubCategory] = useState([]);
//   const [sortType,setSortType] = useState(['relevant']);

//   const toggleCategory = (e) => {


//     if(category.includes(e.target.value)) {
//       setCategory(prev=> prev.filter(item => item !== e.target.value))
//     }
//     else {
//       setCategory(prev => [...prev,e.target.value])
//     }
//   }

//   const toggleSubCategory = (e) => {
//   if(subCategory.includes(e.target.value)) {
//     setSubCategory(prev=> prev.filter(item => item !== e.target.value))
//   }
//   else {
//     setSubCategory(prev => [...prev,e.target.value])
//   }
// }

// const applyFilter = () => {

//   let productsCopy = products.slice();

//   if(showSearch && search) {
//     productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
//   }

//   if(category.length > 0) {
//     productsCopy = productsCopy.filter(item => category.includes(item.category));
//   }

//   if(subCategory.length > 0) {
//     productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
//   }

//   setFilterProducts(productsCopy)
// }


// const sortProduct = () => {
//   let fpCopy = filterProducts.slice();

//   switch (sortType) {
//     case 'low-high':
//       setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
//       break;
//     case 'high-low':
//       setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
//       break;

//     default:
//       applyFilter();
//       break;
//   }
// }

//   useEffect(()=>{
//     applyFilter();
//   },[category,subCategory,search,showSearch,products])

//   useEffect(()=>{
//     sortProduct()
//   },[sortType])


//   return (
//     <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
     
//       {/* Filter options */}
//       <div className='min-w-60'>
//         <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
//           <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
//         </p>
      

      
//       {/* category */}
//       <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
//         <p className='mb-3 text-sm font-medium'>Categories</p>
//         <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//           <p className='flex gap-2'>
//           <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
//           </p>
//           <p className='flex gap-2'>
//           <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory}/> Men
//           </p>
//           <p className='flex gap-2'>
//           <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
//           </p>
//         </div>
//       </div>

//       {/* Category filter */}
//       <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
//         <p className='mb-3 text-sm font-medium'>Brands</p>
//         <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
//           <p className='flex gap-2'>
//           <input className='w-3' type="checkbox" value={'Louis Vuitton'} onChange={toggleSubCategory}/> Louis Vuitton
//           </p>
//           <p className='flex gap-2'>
//           <input className='w-3' type="checkbox" value={'Chanel'} onChange={toggleSubCategory} /> Chanel
//           </p>
//           <p className='flex gap-2'>
//           <input className='w-3' type="checkbox" value={'Gucci'} onChange={toggleSubCategory} /> Gucci
//           </p>
//         </div>
//       </div>
//     </div>

//     {/* Right Side */}
//     <div className='flex-1'>
//       <div className='flex justify-between text-base sm:text mb-4'>
//         <Title text1={'All'} text2={'Collections'}/>
//         {/* Product Sort */}
//         <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
//           <option value="relevant">Sort by: Relevant</option>
//           <option value="low-high">Sort by: Low to High</option>
//           <option value="high-low">Sort by: High to Low</option>
//           </select>
//       </div>

//       {/* Map Products */}
//       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
//         {
//           filterProducts.map((item,index)=>(
//             <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
//           ))
//         }
//       </div>

//     </div>

//     </div>
//   )
// }

// export default Collection

// import React, { useContext, useEffect, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import Title from '../components/Title';
// import ProductItem from '../components/ProductItem';
// import {
//   Box,
//   Checkbox,
//   FormControl,
//   FormControlLabel,
//   MenuItem,
//   Select,
//   Typography,
//   Button,
//   Grid,
//   Divider,
// } from '@mui/material';

// -----------------------------------

// const Collection = () => {
//   const { products, search, showSearch } = useContext(ShopContext);
//   const [showFilter, setShowFilter] = useState(false);
//   const [filterProducts, setFilterProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [subCategory, setSubCategory] = useState([]);
//   const [sortType, setSortType] = useState(['relevant']);

//   const toggleCategory = (e) => {
//     if (category.includes(e.target.value)) {
//       setCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const toggleSubCategory = (e) => {
//     if (subCategory.includes(e.target.value)) {
//       setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
//     } else {
//       setSubCategory((prev) => [...prev, e.target.value]);
//     }
//   };

//   const applyFilter = () => {
//     let productsCopy = products.slice();

//     if (showSearch && search) {
//       productsCopy = productsCopy.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     if (category.length > 0) {
//       productsCopy = productsCopy.filter((item) => category.includes(item.category));
//     }

//     if (subCategory.length > 0) {
//       productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
//     }

//     setFilterProducts(productsCopy);
//   };

//   const sortProduct = () => {
//     let fpCopy = filterProducts.slice();

//     switch (sortType) {
//       case 'low-high':
//         setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
//         break;
//       case 'high-low':
//         setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
//         break;
//       default:
//         applyFilter();
//         break;
//     }
//   };

//   useEffect(() => {
//     applyFilter();
//   }, [category, subCategory, search, showSearch, products]);

//   useEffect(() => {
//     sortProduct();
//   }, [sortType]);

//   return (
//     <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} pt={2} borderTop={1}>
//       {/* Filter Options */}
//       <Box minWidth="200px">
//         <Typography
//           variant="h6"
//           onClick={() => setShowFilter(!showFilter)}
//           style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
//         >
//           Filters
//         </Typography>

//         {/* Categories */}
//         <Box mt={2} display={showFilter || { sm: 'block' }} p={2} border={1}>
//           <Typography variant="subtitle2">Categories</Typography>
//           {['Women', 'Men', 'Kids'].map((cat) => (
//             <FormControlLabel
//               key={cat}
//               control={
//                 <Checkbox
//                   value={cat}
//                   onChange={toggleCategory}
//                   checked={category.includes(cat)}
//                 />
//               }
//               label={cat}
//             />
//           ))}
//         </Box>

//         {/* Brands */}
//         <Box mt={2} display={showFilter || { sm: 'block' }} p={2} border={1}>
//           <Typography variant="subtitle2">Brands</Typography>
//           {['Louis Vuitton', 'Chanel', 'Gucci'].map((brand) => (
//             <FormControlLabel
//               key={brand}
//               control={
//                 <Checkbox
//                   value={brand}
//                   onChange={toggleSubCategory}
//                   checked={subCategory.includes(brand)}
//                 />
//               }
//               label={brand}
//             />
//           ))}
//         </Box>
//       </Box>

//       {/* Right Side */}
//       <Box flex={1}>
//         <Box display="flex" justifyContent="space-between" mb={2}>
//           <Title text1="All" text2="Collections" />
//           <FormControl size="small">
//             <Select
//               value={sortType}
//               onChange={(e) => setSortType(e.target.value)}
//               displayEmpty
//             >
//               <MenuItem value="relevant">Sort by: Relevant</MenuItem>
//               <MenuItem value="low-high">Sort by: Low to High</MenuItem>
//               <MenuItem value="high-low">Sort by: High to Low</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Product List */}
//         <Grid container spacing={2}>
//           {filterProducts.map((item, index) => (
//             <Grid item xs={6} sm={4} md={3} key={index}>
//               <ProductItem name={item.name} id={item._id} price={item.price} image={item.image} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Collection;
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  Grid,
  Divider,
} from '@mui/material';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12; // Customize number of items per page

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
    setTotalPages(Math.ceil(productsCopy.length / itemsPerPage)); // Calculate total pages
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Handle Page Change
  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Paginate the filtered products based on the current page
  const paginatedProducts = filterProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} pt={2} borderTop={1}>
      {/* Filter Options */}
      <Box minWidth="200px">
        <Typography
          variant="h6"
          onClick={() => setShowFilter(!showFilter)}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          Filters
        </Typography>

        {/* Categories */}
        <Box mt={2} display={showFilter || { sm: 'block' }} p={2} border={1}>
          <Typography variant="subtitle2">Categories</Typography>
          {['Women', 'Men', 'Kids'].map((cat) => (
            <FormControlLabel
              key={cat}
              control={
                <Checkbox
                  value={cat}
                  onChange={toggleCategory}
                  checked={category.includes(cat)}
                />
              }
              label={cat}
            />
          ))}
        </Box>

        {/* Brands */}
        <Box mt={2} display={showFilter || { sm: 'block' }} p={2} border={1}>
          <Typography variant="subtitle2">Brands</Typography>
          {['YSL', 'Chanel', 'Tatak'].map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  value={brand}
                  onChange={toggleSubCategory}
                  checked={subCategory.includes(brand)}
                />
              }
              label={brand}
            />
          ))}
        </Box>
      </Box>

      {/* Right Side */}
      <Box flex={1}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Title text1="All" text2="Collections" />
          <FormControl size="small">
            <Select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              displayEmpty
            >
              <MenuItem value="relevant">Sort by: Relevant</MenuItem>
              <MenuItem value="low-high">Sort by: Low to High</MenuItem>
              <MenuItem value="high-low">Sort by: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Product List */}
        <Grid container spacing={2}>
          {paginatedProducts.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <ProductItem name={item.name} id={item._id} price={item.price} image={item.image} />
            </Grid>
          ))}
        </Grid>

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="center" mt={2}>
          <Button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography variant="body1" sx={{ mx: 2 }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Collection;
