const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: [true, 'Path is required']
    },
    originalname: {
        type: String,
        required: [true, 'Original name is required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User is required']
    },
    // filename: {
    //     type: String,
    //     required: [true, 'Filename is required']
    // },
    // size: {
    //     type: Number,
    //     required: [true, 'Size is required']
    // },
    // mimetype: {
    //     type: String,
    //     required: [true, 'Mimetype is required']
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // updatedAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // bucketRef: {
    //     type: String,
    //     required: [true, 'Bucket ref is required']
    // }

});

const file = mongoose.model('file', fileSchema);

module.exports = file;
