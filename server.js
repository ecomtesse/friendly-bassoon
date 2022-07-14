// DEPENDENCIES
// Requires the dotenv package to allow people/servers to run the code on different environments/ports.
require("dotenv").config()

// Requires the express package to create a dynamic app.
const express = require("express")
// Requries this mongoose express package to communicate between the mongodb database, our server and the client.
const mongoose = require("mongoose")
// Package required to manipulate the database (edit, create, delete)
const methodOverride = require("method-override")
//
const session = require("express-session")
const flash = require("express-flash")
const mongoDBSession = require("connect-mongodb-session")

// Controllers
const usersController = require("./controllers/users")
const modelsController = require("./controllers/models")
const sessionsController = require("./controllers/sessions")

// CONFIGURATION
// Calls the express function required above.
const app = express()
// Defines the PORT variable as per the local .env file.
const PORT = process.env.PORT
// Defines the URL for the mongodb database.
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: "sessions"
})

// Middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}))

app.use(flash())
// This uses the urleconded function in express to the URL sting into objects that can be used to query/manipulate data in the database.
app.use(express.urlencoded({ extended: false }))
// Calls the express static function to allow static files (e.g. css) to be run on dynamic pages.
app.use(express.static("public"))
// Calls the method function to allow us to use the create, edit and delete functions.
app.use(methodOverride("_method"))


app.use("/", (req, res) => {
    res.redirect("/login")
})

app.use("/", sessionsController)
app.use("/users", usersController)
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