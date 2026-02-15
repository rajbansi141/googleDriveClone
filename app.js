const path = require('path');
const express = require('express');
const app = express(); 
const userRouter = require('./routes/user.routes');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is required');
    process.exit(1);
}

const connectDB = require('./config/db');
connectDB();
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index.routes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

app.get('/', (req, res) => {
    res.redirect('/user/login');
});

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res) => {
    res.status(404).redirect('/user/login');
});

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Something went wrong!');
});

// for error handling (Global error handling) //it is the last hope of the server or error handling// not good to use it in production inseted use try catch block
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

// 3:14:52