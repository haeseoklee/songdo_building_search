const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const floorSchema = new Schema({
    buildingName: {
        type: String,
        required: true
    },
    floorNumber: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    bunyang: {
        type: String,
        enum: ['분양중', '임대가능', '분양완료', '미분양'],
        default: '분양중'
    },
    imageUrl: {
        type: String,
        required: true
    },
    buildingId: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: true
    }
})

module.exports = mongoose.model('Floor', floorSchema);