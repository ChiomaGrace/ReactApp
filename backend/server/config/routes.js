const express = require('express')
const router = express.Router()
const residentController = require("../controllers/residents"); //links the resident controller which has all the functions
// const upload = require("../utils/multer"); //links the multer file

console.log("This console log is coming from the routes.js file in the backend folder.");

router.get('/', (request, response) => {
    console.log("Root route");
    response.send("This is a test response from the root route in routes.js. If successful, this would display as the html in the browser on port 8000 or when deployed, on the domain url for the backend server.")
});

router.post(
    // `/submitResident`,  
    '/submitResident',  
    // upload.single('file'), //middleware that will take the image, upload it to Cloudinary, and return a request.file object with the file information to the controller
    residentController.createResident,
);


module.exports = router; //helps to achieve module programming. Modular programming refers to separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute only one aspect of the desired functionality.