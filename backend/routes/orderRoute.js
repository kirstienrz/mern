import express from 'express'
import {placeOrder, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import Order from '../models/orderModel.js'; // Replace with your Order model

const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//payment 
orderRouter.post('/place',authUser,placeOrder)


//user feature
orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter


