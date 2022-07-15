// Requires the npm mongoose package
const mongoose = require("mongoose")

// Requires the model schema
const Models = require("../models/models.js")
// Requuires the dummy dataset.
const dummyModels = require("./dummy-models")

// Defining the mongodb database url in a variable.
const dbURL = "mongodb://localhost:27017/models"

// Function to wipe any previous data in the collection and seed the dummy data to the mongodb database.
mongoose.connect(dbURL, () => {
    console.log("connected to models db")
    console.log("resetting models collection")
    Models.collection.drop()
        .then(() => {
            console.log("Models collection dropped")
            console.log("inserting seed data")
            return Models.insertMany(dummyModels)
        })
        .then(() => {
            console.log("inserted models seed data")
            mongoose.connection.close();
        })
})