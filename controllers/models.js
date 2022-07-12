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
                baseUrl: req.baseUrl,
                tabTitle: "Models Index"
            })
        })
})

// New Route
router.get("/new", (req, res) => {
    res.render("new.ejs", {
        tabTitle: "New Stuff",
        baseUrl: req.baseUrl
    })
})

// Create Route
router.post("/", (req, res) => {
    console.log("post req received")
    console.log(req.body)
    if (req.body.preparedToSell === "on") {
        req.body.preparedToSell = true
    } else {
        req.body.preparedToSell = false
    }
    Models.create(req.body)
        .then((newModel) => {
            console.log("New stuff added: ", newModel)
            res.redirect(req.baseUrl)
        })
})

// Show Route
router.get("/:id", (req, res) => {
    Models.findById(req.params.id)
        .exec()
        .then((model) => {
            res.render("show.ejs", {
                model: model,
                baseUrl: req.baseUrl,
                tabTitle: model.name,
            })
        })
})

//  Delete Route
router.delete("/:id", (req, res) => {
    Models.findByIdAndDelete(req.params.id)
        .exec()
        .then((model) => {
            console.log("Deleted model: ", model)
            res.redirect(req.baseUrl)
        })
})

// Update Route
router.put("/:id", (req, res) => {
    console.log("update req received")
    console.log(req.body)
    if (req.body.preparedToSell === "on") {
        req.body.preparedToSell = true
    } else {
        req.body.preparedToSell = false
    }
    Models.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .exec()
        .then((updatedModel) => {
            console.log("Updated model: ", updatedModel)
            res.redirect(req.baseUrl)
        })
})

//  Edit Route
router.get("/:id/edit", (req, res) => {
    Models.findById(req.params.id)
        .exec()
        .then((model) => {
            res.render("edit.ejs", {
                baseUrl: req.baseUrl,
                model: model,
                tabTitle: "Update: " + model.name
            })
        })
})

module.exports = router