const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');


// router.get('/test', (req, res) => {
//     res.send('user test route');
// })

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

        const newUser = await userModel.create ({ username, email, password });
        res.json(newUser);
        
})


module.exports = router;