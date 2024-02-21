const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "Please submit a first name"]},
    lastName: {type: String, required: [true, "Please submit a last name"]},
    profilePicture: {type: String, required: [true, "Please upload an image"]},
    street: {type: String, required: [true, "Please submit a street"]},
    physicalFeatures: {
        sex:{
            type: String,
            required: [true, "Please submit a gender"]
        },
        hairColor:{
            type: String,
            required: [true, "Please submit a hair color"]
        },
        eyeColor:{
            type: String,
            required: [true, "Please submit an eye color"]
        },
    },
    occupation: {type: String, required: [true, "Please submit an occupation"]},
}, {timestamps: true})

const Resident = mongoose.model('Resident', residentSchema)

module.exports = {
    Resident: Resident,
    residentSchema: residentSchema
}