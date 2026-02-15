const mongoose = require('mongoose');

function connectDB(){
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined in environment variables');
        return;
    }
    
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.error('DB Connection Error:', err));
}

module.exports = connectDB;