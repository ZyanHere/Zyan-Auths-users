import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import User from '../Models/User.model.js';


export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token; 

  if (!token) {
    return next(new ApiError(401, 'User Not Authorized'));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.user.id);

  if (!req.user) {
    return next(new ApiError(404, 'User not found'));
  }

  next();
});
