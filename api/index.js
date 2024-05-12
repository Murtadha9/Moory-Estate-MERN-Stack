import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'


const app= express();
dotenv.config()
app.use(express.json())
app.use(cookieParser())



app.listen(3000,()=>{
    console.log('server is running on port 3000');
});


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('connected to mongodb');
}).catch((error)=>{console.log(error)})

//Endpoints
app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

//MiddleWare
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

