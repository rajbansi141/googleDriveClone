const multer = require('multer');
const supabaseStorage = require('@supabase/storage-js');
const supabase = require('../config/supabase.config');
const serviceAccount = require('./supabase.json');
const File = require('../models/file.model');

const storage = supabaseStorage({
    credentials: Supabase.credentials.cert(serviceAccount),
    bucketName: 'googleDriveClone'
})

const upload = multer({ 
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5
    // }
    });

// app.post('/upload', verifyJWT, upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;
//     const userId = req.user.id; // From your JWT middleware

//     // 1. Upload to Supabase Storage
//     const fileName = `${userId}/${Date.now()}_${file.originalname}`;
//     const { data, error } = await supabase.storage
//       .from('drive-clone-bucket')
//       .upload(fileName, file.buffer, {
//         contentType: file.mimetype
//       });

//     if (error) throw error;

//     // 2. Save Metadata to MongoDB
//     const newFile = new File({
//       filename: file.originalname,
//       size: file.size,
//       mimetype: file.mimetype,
//       supabasePath: data.path, // The path returned by Supabase
//       owner: userId
//     });

//     await newFile.save();
//     res.status(201).json(newFile);

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
