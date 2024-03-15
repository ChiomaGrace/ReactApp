const multer = require('multer'); //needed in order to save file uploads
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Created the below function so the image file can have a specifc name - file name + time uploaded)
function formatTime() {
  var date = new Date();
  // console.log("Current date and time:", date);
  var time = date.toLocaleTimeString();
  // console.log("time as a string:", time);
  formattedTime = time.split(' ').join(''); 
  // console.log("Formatted Time:", formattedTime);
  return formattedTime
}
// formatTime();
//Created the above function so the image file can have a specifc name - file name + time uploaded)

const storage =  new CloudinaryStorage({
  cloudinary: cloudinary,
  params:async (request, file) => {
    // console.log("This console log is from multer.js, and it is the file submitted from the form:", file)
    return {
    folder: 'SpongeBob-SqaurePants-Images',    
    allowedFormats: ["jpg", "png"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }],   
    public_id: file.originalname.replace('.png','') + '-' + formatTime(), //renaming the public_id which will be the name at the end of the image url cloudinary creates after it is uploaded
  }},
});
module.exports = multer({storage: storage}); //so the middleware can be used on the routes.js file
