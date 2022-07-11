const express = require("express")
const router = express.Router()

// Defines the Models schema
const Models = require("../models/models")


// ROUTES
// Index Route
router.get("/", (req, res) => {
    Models.find()
        .exec()
        .then((models) => {
            res.render("index.ejs", {
                allModels: models,
                // baseUrl: req.baseUrl,
                tabTitle: "Models Index"
            })
        })
})

// Show Route
router.get("/models/:id", (req, res) => {
    Models.findById(req.params.id)
        .exec()
        .then((model) => {
            res.send(model[req.params.id])
        })
})

module.exports = router