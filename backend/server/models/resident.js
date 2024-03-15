const mongoose = require('mongoose');

const residentSchema = new mongoose.Schema({
    firstName: {type: String, required: [true, "Unable to continue until you submit a first name"]},
    lastName: {type: String, required: [true, "Unable to continue until you submit a last name"]},
    profilePicture: {type: String, required: [true, "Unable to continue until you upload a profile picture"]},
    street: {type: String, required: [true, "Unable to continue until you submit an address"]},
    physicalFeatures: {
        sex:{
            type: String,
            required: [true, "Unable to continue until you submit a gender"]
        },
        eyeColor:{
            type: String,
            required: [true, "Unable to continue until you submit an eye color"]
        },
        hairColor:{
            type: String,
            required: [true, "Unable to continue until you submit a hair color"]
        },
    },
    occupation: {type: String, required: [true, "Unable to continue until you submit an occupation"]},
}, {timestamps: true})

const Resident = mongoose.model('Resident', residentSchema)

module.exports = {
    Resident: Resident,
    residentSchema: residentSchema
}