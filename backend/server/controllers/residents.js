const {response} = require('express');
const {Resident} = require('../models/resident');
const {cloudinary} = require('../utils/cloudinary'); //needed in order for the function to access the cloudinary acoount to upload image

console.log("This console log is from the controller, resident.js, file in the backend folder.")

const createResident = (request, response) => {
    console.log("This console log is from the createResident function in the controller.");
    // console.log("The data from the form submitted in the CreatResident component that is in the frontend","Request.body:", request.body, "Request.file:", request.file);
    submittedResident= new Resident()
        submittedResident.firstName = request.body.firstName;
        submittedResident.lastName = request.body.lastName;
        submittedResident.profilePicture = request.file;
        submittedResident.street = request.body.street;
        submittedResident.physicalFeatures.sex = request.body.physicalFeaturesSex;
        submittedResident.physicalFeatures.hairColor = request.body.physicalFeaturesHairColor;
        submittedResident.physicalFeatures.eyeColor = request.body.physicalFeaturesEyeColor;
        // for ( let physicalFeature of Object.values(submittedResident.physicalFeatures) ) {
        //     console.log(physicalFeature);
        // }
        submittedResident.occupation = request.body.occupation;
        if (request.file) { //otherwise an undefined reading path error will occur
            submittedResident.profilePicture = request.file.path;
            // console.log("Profile Picture:", submittedResident.profilePicture);
        }
        submittedResident.save()
            .then(submittedResidentData => {
                // console.log("This is the .then of the createResident function in the controller saving the data:", submittedResidentData);
                response.json(submittedResidentData)
            })
            .catch(errors => {
                console.log("This is the .catch of the createResident function in the controller, meaning there was an error in saving the data:", errors);
                response.json(errors)
            })    
}

const displayAllResidents = (request, response) => {
    Resident.find()
    .then(allResidentsData => {
        // console.log("The displayallResidents function in the controller that shows all the submitted data from the createResident function", allResidentsData)
        response.json(allResidentsData)
    })
    .catch(errors => {
        console.log("This is the .catch of the displayAllResidents function in the controller, meaning there was an error in saving the data:", errors);
        response.json(errors)
    })
}

const specificResident = (request, response) => {
    console.log("This console log is from the specificResident function in the controller.");
    Resident.findOne({_id: request.params.id}) //this is doing a search within the database model titled, Resident
    .then(specificResidentData => {
        console.log("This is the .then of specific Resident function in the controller that retrieves the Resident just selected by the user from the database model:", specificResidentData)
        response.json(specificResidentData)
    })
    .catch(errors => {
        console.log("This is the .catch of the specificResident function in the controller, meaning there was an error in saving the data:", errors);
        response.json(errors)
    })
}

const updateResident = (request, response) => {
    console.log("This console log is from the updateResident function in the controller.");
    console.log("Response:", request.body);
    Resident.findOne({_id: request.params.id}) //this is doing a search of the database model Resident
    .then(updateSpecificResidentData => {
        console.log("The data to be updated:", updateSpecificResidentData, updateSpecificResidentData.firstName);
        if ( request.body.firstName) {
            updateSpecificResidentData.firstName = request.body.firstName;
            console.log("Updated First Name:", updateSpecificResidentData.firstName);
        }
        if ( request.body.lastName) {
            updateSpecificResidentData.lastName = request.body.lastName;
            console.log("Updated Last Name:", updateSpecificResidentData.lastName);
        }
        if (request.file) { //otherwise an undefined reading path error will occur
            updateSpecificResidentData.profilePicture = request.file.path;
            console.log("Updated Resident Image:", updateSpecificResidentData.profilePicture);
        }
        if ( request.body.street) {
            updateSpecificResidentData.street = request.body.street;
            console.log("Updated Street:", updateSpecificResidentData.street);
        }
        if ( request.body.physicalFeaturesSex) {
            updateSpecificResidentData.physicalFeatures.sex = request.body.physicalFeaturesSex;
            console.log("Updated Physical Feature(sex):", updateSpecificResidentData.physicalFeatures.sex);
        }
        if ( request.body.physicalFeaturesEyeColor) {
            updateSpecificResidentData.physicalFeatures.eyeColor = request.body.physicalFeaturesEyeColor;
            console.log("Updated Physical Feature(eyeColor):", updateSpecificResidentData.physicalFeatures.eyeColor);
        }
        if ( request.body.physicalFeaturesHairColor) {
            updateSpecificResidentData.physicalFeatures.hairColor = request.body.physicalFeaturesHairColor;
            console.log("Updated Physical Feature(hairColor):", updateSpecificResidentData.physicalFeatures.hairColor);
        }
        // for ( let physicalFeature of Object.values(submittedResident.physicalFeatures) ) {
            //     console.log(physicalFeature);
        // }
        if ( request.body.occupation) {
            updateSpecificResidentData.occupation = request.body.occupation;
            console.log("Updated Occupation:", updateSpecificResidentData.occupation);
        }
        updateSpecificResidentData.save() 
            .then(updateSpecificResidentData => { 
                console.log("The saved updated data:", updateSpecificResidentData)
                response.json(updateSpecificResidentData)
            })
            .catch(errors => { 
                console.log("This is the .catch of the updateResident function in the controller, meaning there was an error in saving the data:", errors);
                response.json(errors)
            })
    })
    .catch(errors => {
        console.log("errors", errors)
        response.json(errors)
    })
}

const deleteResident = (request, response) => {
    console.log("This console log is from the deleteResident function in the controller.");
    Resident.findOne({_id: request.params.id})
    .then(deleteSpecificResidentData => {
        deleteSpecificResidentData.deleteOne()
        .then(ResidentData => {
            console.log("Resident Data being deleted:", ResidentData)
            response.json(ResidentData)
        })
        .catch(errors => { 
            console.log("errors", errors)
            response.json(errors)
        })
    })
    .catch(errors => {
        console.log("errors", errors)
        response.json(errors)
    })
}



module.exports = {createResident, displayAllResidents, specificResident, updateResident, deleteResident}