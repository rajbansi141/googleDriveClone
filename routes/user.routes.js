const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// router.get('/test', (req, res) => {
//     res.send('user test route');
// })


//routes for register
router.get('/register', (req, res) => {
    res.render('register');

})

router.post('/register',
    // Validation usnig middleware from site 'https://express-validator.github.io/docs/guides/getting-started'
    body('email').trim().isEmail().isLength({min: 13}),
    body('password').isLength({ min: 5 }),
    body('username').trim().isLength({ min: 3 }),

    async(req, res) =>{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'Validation Failed' });
        }

        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); //here 10 means 10 rounds of hashing; 
        const newUser = await userModel.create ({ username, email, password: hashedPassword });
        // res.json(newUser);
        res.redirect('/user/login');
        
})


//routes for login
router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login',
    body('username').trim().isLength({min: 3}),
    body('password').isLength({ min: 5 }),
    
    
    async(req, res) => {


    const errors = validationResult(req);
        
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(), message: 'Invalid Data' });
    }

    const { username, password } = req.body;
    const user = await userModel.findOne({
        username: username
    });

    if (!user){
        return res.status(400).json({ message: 'Username or Password Invalid' });
    }

    //comparing the password
    const isMatch = await bcrypt.compare(password, user.password); //password is the plain text password received in req.body and user.password is the hashed password

    if (!isMatch){
        return res.status(400).json({ message: 'Username or Password Invalid' });
    }

    //token grneration (jsonwebtoken) (in terminal type 'npm install jsonwebtoken')
    const token = jwt.sign({ 
        userId: user._id,
        username: user.username,
        email: user.email
     }, 
        process.env.JWT_SECRET, 
    );
        res.cookie('token', token);
        // res.send('Login Successfull');
        res.redirect('/home');

    




})


module.exports = router;