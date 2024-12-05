// import express from 'express';
// import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';


// const userRouter = express.Router();

// userRouter.post('/register',registerUser)
// userRouter.post('/login',loginUser)
// userRouter.post('/admin',adminLogin)

// export default userRouter;

// import express from 'express';
// import { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile } from '../controllers/userController.js';
// import { authenticateUser } from '../middleware/auth.js';  // Import the middleware


// const userRouter = express.Router();

// userRouter.post('/register',registerUser)
// userRouter.post('/login',loginUser)
// userRouter.post('/admin',adminLogin)

// userRouter.get('/profile', authenticateUser, getUserProfile);
// userRouter.put('/profile', authenticateUser, updateUserProfile);


// export default userRouter;

// routes/userRouter.js
// import express from 'express';
// import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
// import { authenticateUser } from '../middleware/auth.js';

// const userRouter = express.Router();

// userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/profile', authenticateUser, getUserProfile);
// userRouter.put('/profile', authenticateUser, updateUserProfile);

// export default userRouter;
// import express from 'express';
// import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
// import { authenticateUser } from '../middleware/auth.js';
// import multer from 'multer';
// import { upload } from '../middleware/multer.js'; // Import multer
// import path from 'path';

// // Multer setup for profile picture upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({ storage: storage });

// const userRouter = express.Router();

// userRouter.post('/register', registerUser);
// userRouter.post('/login', loginUser);
// userRouter.get('/profile', authenticateUser, getUserProfile);
// userRouter.put('/profile', authenticateUser, upload.single('profilePicture'), updateUserProfile);

// export default userRouter;
import express from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middleware/auth.js';
import { upload } from '../middleware/multer.js'; // Import upload setup (do not redeclare)

const userRouter = express.Router();

// Define routes for user-related actions
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', authenticateUser, getUserProfile);
userRouter.put('/profile', authenticateUser, upload.single('profilePicture'), updateUserProfile); // Use the imported 'upload'

export default userRouter;
