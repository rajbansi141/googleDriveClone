const express = require('express');
const app = express(); 
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use('/user', userRouter);

app.listen(3000, () => {
    console.log('server is running on port 3000');
})