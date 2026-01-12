const express = require('express');
const router = express.Router();
const userRouter = require('./user.routes');




router.get('/home', (req, res) => {
    res.render('home');
    
});












module.exports = router;