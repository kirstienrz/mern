// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'
// import facebookAuthRoutes from './routes/facebookAuth.js';  // Import Facebook Auth routes


// //App config

// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// //MIDDLEWARES

// app.use(express.json())
// app.use(cors())


// //api endpoints

// app.use('/api/user',userRouter)
// app.use('/api/product',productRouter)
// app.use('/api/cart',cartRouter)
// app.use('/api/order',orderRouter)
// // Use the Facebook authentication routes
// app.use('/api', facebookAuthRoutes);


// app.get('/',(req,res)=>{
//     res.send("API Working")
// })

// app.listen(port, ()=> console.log('Server started on PORT : ' + port))


import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';  // Import dotenv

import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import facebookAuthRoutes from './routes/facebookAuth.js';  // Facebook Authentication routes
import path from 'path';  // <-- Add this line
import { fileURLToPath } from 'url';  // Import fileURLToPath to get __dirname equivalent
import reviewRoutes from './routes/review.js';

dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 4000;
// Get the directory name in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads'))); // Static folder for uploaded files


app.use('/api/review', reviewRoutes);

// API Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api', facebookAuthRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Start server
app.listen(port, () => console.log('Server started on PORT : ' + port));
