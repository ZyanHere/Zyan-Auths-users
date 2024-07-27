import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'; 
import { errorMiddleware } from './middleware/errorHandler.middleware.js';
import { connectDB } from './database/dbConnection.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(bodyParser.json());
app.use(cookieParser());  

app.use('/api/auth', authRoutes);

connectDB();  

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
