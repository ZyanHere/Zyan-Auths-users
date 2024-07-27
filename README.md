```markdown
# User Authentication Backend

This project is a complete user authentication backend using Node.js, Express, and MongoDB. It includes functionalities for user registration, login, password reset, and token management.

## Features

- **User Registration**: Allows users to create an account with a hashed password.
- **User Login**: Authenticates users and issues JWT tokens.
- **Password Reset**: Provides functionality to request a password reset and update the password.
- **Token-Based Authentication**: Secures routes using JWT tokens.

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for handling JWTs.
- **crypto**: Node.js module for generating tokens.
- **nodemailer**: Library for sending emails.
- **dotenv**: Module for environment variable management.

## Setup and Installation

### Prerequisites

- Node.js (v16.0.0 or later)
- MongoDB instance (local or cloud)

### Steps to Set Up

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ZyanHere/Zyan-Auths-users.git
   cd user auth
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` File**

   Copy the `.env.example` file to `.env` and update the environment variables:

   ```bash
   cp .env.example .env
   ```

4. **Generate JWT Secret**

   Use the following command to generate a JWT secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

   Replace `your-jwt-secret` in `.env` with the generated secret.

5. **Configure Email Settings**

   Update the `.env` file with your email provider's SMTP settings.

## Environment Variables

Your `.env` file should include the following variables:

```plaintext
PORT=5000
MONGO_URI=mongodb://your-mongo-uri
JWT_SECRET=your-jwt-secret
EMAIL_HOST=smtp.your-email-provider.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password
EMAIL_FROM=no-reply@yourdomain.com
```

## API Endpoints

### Registration

- **Endpoint**: `POST /api/auth/register`
- **Request Body**: `{ "name": "string", "email": "string", "password": "string" }`
- **Response**: `{ "token": "jwt-token" }`

### Login

- **Endpoint**: `POST /api/auth/login`
- **Request Body**: `{ "email": "string", "password": "string" }`
- **Response**: `{ "token": "jwt-token" }`

### Password Reset Request

- **Endpoint**: `POST /api/auth/reset-password`
- **Request Body**: `{ "email": "string" }`
- **Response**: `{ "message": "Password reset token sent" }`

### Update Password

- **Endpoint**: `PUT /api/auth/update-password`
- **Request Body**: `{ "token": "string", "password": "string" }`
- **Response**: `{ "message": "Password updated successfully" }`

## Running the Application

To start the application in development mode, use:

```bash
npm run dev
```

############
new concept I learnt while making this project:
1. reset password controller funtionality
2. use of nodemailer
3. mongodb query
