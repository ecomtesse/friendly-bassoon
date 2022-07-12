// DEPENDENCIES
// Requires the dotenv package to allow people/servers to run the code on different ports.
require("dotenv").config()

// Requires the express package to create a dynamic app.
const express = require("express")
// Requries this mongoose express package to communicate between the mongodb database, our server and the client.
const mongoose = require("mongoose")
// Package required to manipulate the database (edit, create, delete)
const methodOverride = require("method-override")
//
// const session = requrie("express-session")


// CONFIGURATION
// Calls the express function required above.
const app = express()
// Defines the PORT variable as per the local .env file.
const PORT = process.env.PORT
// Defines the URL for the mongodb database.
const dbURL = process.env.MONGODB_URL

const modelsController = require("./controllers/models")

// Middleware
// This uses the urleconded function in express to the URL sting into objects that can be used to query/manipulate data in the database.
app.use(express.urlencoded({ extended: false }))
// Calls the express static function to allow static files (e.g. css) to be run on dynamic pages.
app.use(express.static("public"))
// Calls the method function to allow us to use the create, edit and delete functions.
app.use(methodOverride("_method"))

app.use("/models", modelsController)

// LISTENERS
// Function to connect the server to the monogodb database.
mongoose.connect(dbURL, () => {
    console.log("Connected to models db")
})

// Listen function to tell the server to listen for requests on the defined port.
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})