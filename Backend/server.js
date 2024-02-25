// Declaring packages
const express = require('express');
const color = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

//connecting to database
connectDB();

//declaring port
const port = process.env.PORT || 5000;


const app = express();
//initializing middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//initializing routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

//initializing error handler
app.use(errorHandler)


//initializing port
app.listen(port, ()=>console.log(`Server started on port: ${port}`));


