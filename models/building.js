const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    name: {
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
    imageUrl: {
        type: String,
        required: true
    },
    information: {
        floors: [
            {
                floorId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Floor',
                    require: true
                }
            }
        ]
    }
});

module.exports = mongoose.model('Building', buildingSchema);