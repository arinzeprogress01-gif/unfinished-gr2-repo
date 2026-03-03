

console.log("PROJECT TEST STARTED");

setInterval(() => {
    console.log("PROJECT STILL RUNNING...");
}, 5001);
// the above code was from ai, am trying to find out why my server is crashing on its own.
//setInterval is used to log a message every 3 seconds to indicate that the server is still running. This can help identify if the server is crashing or if there are any issues with the code. If the server crashes, the message will stop appearing in the console, which can help pinpoint when the issue occurs.

//note:module was used to replace common.js in the package.json file, the "type" aws set to it inorder to allow us to use ES6 import/export syntax in our Node.js application. This means we can use import statements to include modules and export statements to make functions or variables available for use in other files.
import express from "express";

import dotenv from "dotenv";
dotenv.config();


const app = express();

const { json } = express; // This line imports the json middleware from the Express library. The json middleware is used to parse incoming JSON requests and make the data available in the req.body property of the request object.
app.use(express.json()); // This line tells the Express application to use the json middleware for all incoming requests. This allows the server to handle JSON data sent in the request body, making it easier to work with APIs that send and receive JSON data.

import crudRoutes from "./routes/crudRoutes.js"; // This line imports the CRUD routes from the specified file. The CRUD routes will handle the Create, Read, Update, and Delete operations for the API.

app.use("/api", crudRoutes); // This line tells the Express application to use the imported CRUD routes for any requests that start with "/api". This means that any request to an endpoint that starts with "/api" will be handled by the routes defined in the crudRoutes file.

app.use((req, res) => {
    res.status(404).json({ "Error": "NOT FOUND" }); // This will define a middleware function that will be executed for any requests that do not match any of the defined routes. It sends a 404 status code and a JSON response indicating that the requested resource was not found.
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ "Error": "INTERNAL SERVER ERROR" });
});
// This will define an error-handling middleware function that will be executed whenever an error occurs in the application. It logs the error stack trace to the console and sends a 500 status code with a JSON response indicating that an internal server error occurred.


const PORT = process.env.PORT || 5001; //process.env.PORT is used to get the port number from the environment variables. If the PORT environment variable is not set, it defaults to 5001. This allows the server to run on a specified port.

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); //listening on the specified port and logging a message to the console when the server is successfully started. This allows you to know that the server is up and running and on which port it is listening for incoming requests.