import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';


export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  let user = await User.findOne({ email });
  if (user) {
    return next(new ApiError(400, 'User already exists'));
  }

  // Creating new user
  user = new User({
    name,
    email,
    password,
  });

  // Hashing passwrd
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();

  // Generate JWT token for the new user
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 360000 },  
    (err, token) => {
      if (err) throw err;
      res.json(new ApiResponse(200, { token }));
    }
  );
});


export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //  if user exists
  let user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, 'Invalid Credentials'));
  }

  // Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ApiError(400, 'Invalid Credentials'));
  }

  // JWT token for the logged-in user
  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: 360000 },  
    (err, token) => {
      if (err) throw err;
      res.json(new ApiResponse(200, { token }));
    }
  );
});

//new concept
export const resetPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError(400, 'User not found'));
    }
  
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
  
    await user.save();
  
    // Send the token via email //chatgpt 
    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${token}`;
    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Token',
        message,
      });
  
      res.json(new ApiResponse(200, 'Password reset token sent'));
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      return next(new ApiError(500, 'Email could not be sent'));
    }
  });


export const updatePassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;

  // user with the valid reset token and not expired
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
    //  $gt is a mongodb query, means greater than.Finds a user with a valid (not expired) reset token. Checks that the expiration time is greater than the current time, indicating the token is still valid.
  });

  if (!user) {
    return next(new ApiError(400, 'Invalid or expired token'));
  }

  // Hash  new passwrd b4 saving
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  res.json(new ApiResponse(200, 'Password updated successfully'));
});
