// import validator from "validator";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
// import userModel from "../models/userModel.js";


// const createToken = (id) => {
//     return jwt.sign({ id },process.env.JWT_SECRET)
// }

// const loginUser = async (req,res) => {

//     try {
        
//         const {email,password} = req.body;

//         const user = await userModel.findOne({email});

//         if (!user) {
//             return res.json({success:false, message:"User doesn't exists"})
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {

//             const token = createToken(user._id)
//             res.json({success:true,token})
            
//         }
//         else {
//             res.json({success:false, message: 'Invalid credentials'})
//         }


//     } catch (error) {
//         console.error();
//         res.json({success:false,message:error.message})
//     }


// }

// const registerUser = async (req,res) => {

//     try {

//         const { name, email, password } = req.body;
        
//         //checking if user already exists or no
//         const exists = await userModel.findOne({email});
//         if(exists){
//             return res.json({success:false, message:"User already exists"})
//         }

//         //validating email fomrat and strong pw
//         if (!validator.isEmail(email)) {
//             return res.json({success:false, message:"Please enter a valid email"})
//         }
//         if(password.length < 8){
//             return res.json({success:false, message:"Please enter a strong password"})
//         }

//         //hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password:hashedPassword
//         })

//         const user = await newUser.save()

//         const token = createToken(user._id)

//         res.json({success:true,token})


//     } catch (error) {
//         console.error();
//         res.json({success:false,message:error.message})
//     }


// }

// const adminLogin = async(req,res) => {
//     try {
        
//         const {email,password} = req.body
//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email+password,process.env.JWT_SECRET);
//             res.json({success:true,token})
//         } else {
//             res.json({success:false,message:"invalid credentials"})
//         }
//     } catch (error) {
//         console.error();
//         res.json({success:false,message:error.message})
//     }


// } 

// export { loginUser,registerUser,adminLogin}


// import validator from "validator";
// import bcrypt from "bcrypt"
// import jwt from 'jsonwebtoken'
// import userModel from "../models/userModel.js";


// const createToken = (id) => {
//     return jwt.sign({ id },process.env.JWT_SECRET)
// }

// const loginUser = async (req,res) => {

//     try {
        
//         const {email,password} = req.body;

//         const user = await userModel.findOne({email});

//         if (!user) {
//             return res.json({success:false, message:"User doesn't exists"})
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (isMatch) {

//             const token = createToken(user._id)
//             res.json({success:true,token})
            
//         }
//         else {
//             res.json({success:false, message: 'Invalid credentials'})
//         }


//     } catch (error) {
//         console.error();
//         res.json({success:false,message:error.message})
//     }


// }

// const registerUser = async (req,res) => {

//     try {

//         const { name, email, password } = req.body;
        
//         //checking if user already exists or no
//         const exists = await userModel.findOne({email});
//         if(exists){
//             return res.json({success:false, message:"User already exists"})
//         }

//         //validating email fomrat and strong pw
//         if (!validator.isEmail(email)) {
//             return res.json({success:false, message:"Please enter a valid email"})
//         }
//         if(password.length < 8){
//             return res.json({success:false, message:"Please enter a strong password"})
//         }

//         //hashing user password
//         const salt = await bcrypt.genSalt(10)
//         const hashedPassword = await bcrypt.hash(password,salt)

//         const newUser = new userModel({
//             name,
//             email,
//             password:hashedPassword
//         })

//         const user = await newUser.save()

//         const token = createToken(user._id)

//         res.json({success:true,token})


//     } catch (error) {
//         console.error();
//         res.json({success:false,message:error.message})
//     }


// }

// const adminLogin = async(req,res) => {
//     try {
        
//         const {email,password} = req.body
//         if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//             const token = jwt.sign(email+password,process.env.JWT_SECRET);
//             res.json({success:true,token})
//         } else {
//             res.json({success:false,message:"invalid credentials"})
//         }
//     } catch (error) {
//         console.error();
//         res.json({success:false,message:error.message})
//     }


// } 

// // Fetch user profile
// const getUserProfile = async (req, res) => {
//     try {
//         const user = await userModel.findById(req.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         res.json({ success: true, user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update user profile
// const updateUserProfile = async (req, res) => {
//     try {
//         const { name, email, profilePicture } = req.body;

//         const user = await userModel.findById(req.userId);

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Update fields
//         if (name) user.name = name;
//         if (email) user.email = email;
//         if (profilePicture) user.profilePicture = profilePicture;

//         await user.save();

//         res.json({ success: true, message: "Profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile };

// controllers/userController.js
// import validator from "validator";
// import bcrypt from "bcrypt";
// import jwt from 'jsonwebtoken';
// import userModel from "../models/userModel.js";

// // Helper function to create JWT token
// const createToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET);
// };

// // Login user
// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await userModel.findOne({ email });
        
//         if (!user) {
//             return res.json({ success: false, message: "User doesn't exist" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (isMatch) {
//             const token = createToken(user._id);
//             res.json({ success: true, token });
//         } else {
//             res.json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // Register user
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
        
//         const exists = await userModel.findOne({ email });
//         if (exists) {
//             return res.json({ success: false, message: "User already exists" });
//         }

//         if (!validator.isEmail(email)) {
//             return res.json({ success: false, message: "Please enter a valid email" });
//         }

//         if (password.length < 8) {
//             return res.json({ success: false, message: "Please enter a strong password" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new userModel({ name, email, password: hashedPassword });
//         const user = await newUser.save();

//         const token = createToken(user._id);
//         res.json({ success: true, token });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

// // Fetch user profile
// const getUserProfile = async (req, res) => {
//     try {
//         const user = await userModel.findById(req.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }
//         res.json({ success: true, user });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// // Update user profile
// const updateUserProfile = async (req, res) => {
//     try {
//         const { name, email, profilePicture } = req.body;
//         const user = await userModel.findById(req.userId);

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         if (name) user.name = name;
//         if (email) user.email = email;
//         if (profilePicture) user.profilePicture = profilePicture;

//         await user.save();

//         res.json({ success: true, message: "Profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// export { loginUser, registerUser, getUserProfile, updateUserProfile };
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import validator from "validator";

// Helper function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Password should be at least 8 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        const token = createToken(newUser._id);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { name, email, profilePicture } = req.body;
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        res.json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, getUserProfile, updateUserProfile };
