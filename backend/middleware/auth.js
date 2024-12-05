// import jwt from 'jsonwebtoken'

// const authUser = async(req,res,next) => {

//     const {token} = req.headers;

//     if (!token) {
//         return res.json({success: false, message: 'Not Authorized Login Again'});
        
//     }

//     try {

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
        
//     }
// }

// export default authUser

// import jwt from 'jsonwebtoken'
// import userModel from '../models/userModel.js';

// export const authenticateUser = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization')?.replace('Bearer ', '');
//         if (!token) {
//             return res.status(401).json({ success: false, message: "No token, authorization denied" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded.id);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error(error);
//         res.status(401).json({ success: false, message: "Token is not valid" });
//     }
// };

// const authUser = async(req,res,next) => {

//     const {token} = req.headers;

//     if (!token) {
//         return res.json({success: false, message: 'Not Authorized Login Again'});
        
//     }

//     try {

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET)
//         req.body.userId = token_decode.id
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success: false, message: error.message})
        
//     }
// }

// export default authUser
// middleware/auth.js
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

export const authMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ message: 'Access Denied' });
  
    try {
      const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verifiedUser; // Attach user info to the request object
      next();
    } catch (err) {
      res.status(400).json({ message: 'Invalid Token' });
    }
  };
  
  // Middleware to check for admin access
  export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next(); // Proceed if the user is an admin
    } else {
      res.status(403).json({ message: 'Admin access required' });
    }
  };
  


export const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ success: false, message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Token is not valid" });
    }
};

const authUser = async(req,res,next) => {

    const {token} = req.headers;

    if (!token) {
        return res.json({success: false, message: 'Not Authorized Login Again'});
        
    }

    try {

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
}

export default authUser
