const {response} = require('express');
const {Resident} = require('../models/resident');
// const {cloudinary} = require('../utils/cloudinary'); //needed in order for the function to access the cloudinary acoount to upload image

console.log("This console log is from the controller, resident.js, file in the backend folder.")

const createResident = (request, response) => {
    console.log("This console log is from the createResident function in the controller, and it contains the data from the form submitted in the CreatResident component that is in the frontend:", "Request.body:", request.body);
    submittedResident= new Resident()
        submittedResident.firstName = request.body.firstName;
        // submittedResident.lastName = request.body.lastName;
        // submittedResident.profilePicture = request.file;
        // submittedResident.street = request.body.street;
        // submittedResident.physicalFeatures = request.body.physicalFeatures;
        // submittedResident.occupation = request.body.occupation;
        // if (request.file) { //otherwise an undefined reading path error will occur
        //     submittedResident.profilePicture = request.file.path;
        // }
        submittedResident.save()
            .then(submittedResidentData => {
                console.log("This is the .then of the createResident function in the controller saving the data:", submittedResidentData);
                response.json(submittedResidentData)
            })
            .catch(errors => {
                console.log("This is the .catch of the createResident in the controller, meaning there was an error in saving the data:", errors);
                response.json(errors)
            })    
}

module.exports = {createResident}