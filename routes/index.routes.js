const express = require('express');
const router = express.Router();
const userRouter = require('./user.routes');
const upload = require('../config/multer.config');






router.get('/home', (req, res) => {
    res.render('home');
    
});

router.post('/upload', )












module.exports = router;