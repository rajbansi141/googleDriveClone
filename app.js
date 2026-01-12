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



app.listen(3000, () => {
    console.log('server is running on port 3000');
})

// 3:14:52