const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Floor = require('./floor');

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

buildingSchema.methods.addFloors = async function(building, floors) {
    
    const newFloors = floors.map(async (floor) => {
        const curFloor = new Floor({
            buildingName: building.name,
            floorNumber: floor.floorNumber,
            price: floor.price,
            bunyang: floor.bunyang,
            imageUrl: floor.imageUrl,
            buildingId: building._id
        });
        try {
            const newFloor = await curFloor.save();
            return newFloor;
        } catch (err) {
            console.log(err);
        }
        
    });
    try {
        const results =  await Promise.all(newFloors);
        this.information.floors = results.map(floor => {
            return {
                floorId: floor._id
            };
        })
        return this.save();
    } catch (err) {
        console.log(err);
    }
}

module.exports = mongoose.model('Building', buildingSchema);