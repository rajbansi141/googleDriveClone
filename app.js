const express = require('express');
const app = express(); 
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/user', userRouter);

// for error handling (Global error handling) //it is the last hope of the server or error handling// not good to use it in production inseted use try catch block
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // process.exit(1); will stop the server 
})



app.listen(3000, () => {
    console.log('server is running on port 3000');
})

// 3:14:52