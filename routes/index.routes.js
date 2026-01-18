const express = require('express');
const router = express.Router();
const userRouter = require('./user.routes');
const upload = require('../config/multer.config');
const supabase = require('../config/supabase.config');
const fileModel = require('../models/file.model');
const authMiddleware = require('../middlewares/auth');


router.get('/home', authMiddleware, async (req, res) => {

    const userFiles = await fileModel.find({
        user: req.user.userId
    });

    console.log(userFiles);

    res.render('home', {
        files: userFiles
    });

});

router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { data, error } = await supabase.storage
            .from('googleDriveClone') // make sure this bucket exists in your supabase project
            .upload(Date.now() + '_' + file.originalname, file.buffer, {
                contentType: file.mimetype,
                upsert: false // optional, true if you want to overwrite file
            })

        if (error) {
            console.error('Supabase upload error:', error);
            return res.status(500).json({ error: 'Failed to upload file to Supabase', details: error.message });
        }

        console.log('Upload successful:', data);

        //===============================

        const newFile = await fileModel.create({
            filename: req.file.originalname,
            originalname: req.file.originalname,
            path: data.path, // Use the path from Supabase upload response
            user: req.user.userId,
        });

        res.json(newFile);
    } catch (err) {
        console.error('Upload error:', err);
        res.status(500).json({ error: err.message });
    }

})
router.get('/download/:path', authMiddleware, async(req, res) => {
    try {
        //to check if the file belongs to the logged in user
        const loggedInUserId = req.user.userId;
        const path = decodeURIComponent(req.params.path); // Decode URL-encoded path

        const file = await fileModel.findOne({
            user: loggedInUserId,
            path: path
        });
            
        if(!file){
            return res.status(404).json({ message: 'File not found' });
        }

        const { data: signedUrls, error } = await supabase.storage
            .from('googleDriveClone')
            .createSignedUrls([file.path], 60); // Expiration in seconds (60 = 1 minute, 3600 = 1 hour)

        if (error) {
            console.error('Supabase signed URL error:', error);
            return res.status(500).json({ error: 'Failed to generate download URL', details: error.message });
        }

        if (!signedUrls || signedUrls.length === 0 || !signedUrls[0].signedUrl) {
            return res.status(500).json({ error: 'Failed to generate download URL' });
        }

        // Redirect to the signed URL from Supabase
        res.redirect(signedUrls[0].signedUrl);
    } catch (err) {
        console.error('Download error:', err);
        res.status(500).json({ error: err.message });
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/user/login');
})

module.exports = router;