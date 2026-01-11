const mongoose = require('mongoose');

//genetated and suggested via windsurf
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1); 
//     }
// };

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;