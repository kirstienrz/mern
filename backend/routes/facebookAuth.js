import express from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';  // Assuming this is the correct import for your user model

const router = express.Router();

// Route to handle Facebook login
router.post('/auth/facebook', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Access token is required' });
  }

  try {
    // Step 1: Verify the access token with Facebook's Graph API
    const fbResponse = await axios.get(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture`
    );

    // Step 2: Destructure the user data from the Facebook response
    const { id, name, email, picture } = fbResponse.data;

    // Step 3: Validate the response data
    if (!id || !name || !email) {
      return res.status(400).json({ success: false, message: 'Incomplete user data from Facebook' });
    }

    // Step 4: Check if the user already exists in your database
    let user = await userModel.findOne({ facebookId: id });

    if (!user) {
      // If the user doesn't exist, register them
      user = new userModel({
        facebookId: id,
        name,
        email,
        profilePicture: picture.data.url,
        password: "",  // Password will be empty for users signing in via Facebook
        cartData: {},  // Empty cart for new users
      });

      // Save the new user in the database
      await user.save();
    }

    // Step 5: Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Step 6: Respond with the user data and the JWT token
    res.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, profilePicture: user.profilePicture },
      token,
    });

  } catch (error) {
    console.error('Error during Facebook authentication:', error);
    res.status(400).json({ success: false, message: 'Invalid Facebook token or other error' });
  }
});

export default router;
