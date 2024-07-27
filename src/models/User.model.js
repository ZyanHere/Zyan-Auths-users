import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must not exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [6, 'Password must be at least 6 characters long'],
    maxlength: [128, 'Password must not exceed 128 characters'],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const User = mongoose.model('User', UserSchema);

export default User;
