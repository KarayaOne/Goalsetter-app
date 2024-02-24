// Declaring packages
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

//declaring port
const port = process.env.PORT || 5000;


const app = express();
//initializing middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//initializing routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandler)


//initializing port
app.listen(port, ()=>console.log(`Server started on port: ${port}`));


