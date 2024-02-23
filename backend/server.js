const express = require('express'); 
//a routing and middleware (middle way is a function that has access to request/response objects) web framework that has minimal functionality of its own and is essentially a series of middleware function calls. must require('express') to use the package before attempting to invoke it,otherwise an error 'express is not defined' will occur
const app = express(); //this is the function that then invokes express
const mongoose = require('mongoose'); //needed in order to connect a database
const routes = require('./server/config/routes'); //links the routes.js file that's located in server/config
const port = process.env.PORT || 8000; //declares the port number
const cors = require("cors"); //needed in order to setup local and deployed environments. stands for cross-origin resource sharing
const dotenv = require("dotenv"); //needed in order to use .env for database
dotenv.config();


const connectDatabase =  async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            //must add in order to not get any error messages:
            useUnifiedTopology:true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
    }catch(error){
        console.error(`Error: ${error} `)
        process.exit(1) //passing 1 - will exit the process with error
    }
}  
console.log("Mongo Database is connected! Mongo URL:", process.env.MONGO_URL);

app.use(cors({
  origin: [process.env.REACT_APP_FRONTEND_URL, "http://127.0.0.1:3000", "http://localhost:3000"],
}));
console.log("Frontend URL:", process.env.REACT_APP_FRONTEND_URL);

// const corsOptions = {
//   origin: [`${process.env.REACT_APP_FRONTEND_URL}`],
//   methods: "GET,HEAD,PUT,OPTIONS,POST,DELETE",
//   allowedHeaders: [
//     "Access-Control-Allow-Headers",
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Authorization",
//     "token",
//     "Access-Control-Request-Method",
//     "Access-Control-Request-Headers",
//     "Access-Control-Allow-Credentials",
//   ],
//   credentials: true,
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };
// app.use(cors(corsOptions));

app.use(express.json()); // middleware that parses incoming requests with JSON payloads (HTTP post, put, patch requests) and is based on body-parser aka so you can see/work with form data

app.use(express.urlencoded({ extended: true })); // middleware that parses incoming requests with URL-ecnoded payloads (HTTP post, put, patch requests) and is based on body-parser aka so you can see/work with form data (the extended true part gets rid of the deprication warning in the terminal)

app.use('/', routes);  //this invokes the routes.js file

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

