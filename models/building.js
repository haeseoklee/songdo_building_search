const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true,
        enum: ['songdo', 'chungra'],
        default: 'songdo'
    },
    bunyang: {
        type: String,
        enum: ['bunyangjung', 'imdaeganung', 'bunyangcomplete'],
        default: 'bunyangjung'
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Building', buildingSchema);