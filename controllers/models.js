const express = require("express")
const router = express.Router()

const upload = require("../middlewares/upload")
// Defines the Models schema
const Models = require("../models/models")

// function to redirect the visitor to the log in view if they are not logged in
const isLoggedIn = (req, res, next) => {
    if (!req.session.currentUser) {
        return res.redirect("/login")
    }
    next()
}

router.use(isLoggedIn)

// ROUTES
// Index Route
router.get("/", (req, res) => {
    Models.find()
        .exec()
        .then((models) => {
            res.render("index.ejs", {
                currentUser: req.session.currentUser,
                allModels: models,
                baseUrl: req.baseUrl,
                tabTitle: "Models Index"
            })
        })
})

// New Route
router.get("/new", (req, res) => {
    res.render("new.ejs", {
        currentUser: req.session.currentUser,
        tabTitle: "New Stuff",
        baseUrl: req.baseUrl,
    })
})

// Create Route
router.post("/", upload.single("image"), (req, res) => {
    console.log("post req received")
    console.log(req.body)
    if (req.body.preparedToSell === "on") {
        req.body.preparedToSell = true
    } else {
        req.body.preparedToSell = false
    }
    console.log(req.file)
    // guardian statement for when the user does not upload an image
    if (req.file) {
        req.body.imageURL = req.file.path
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
                currentUser: req.session.currentUser,
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
router.put("/:id", upload.single("image"), (req, res) => {
    console.log("update req received")
    console.log(req.body)
    if (req.body.preparedToSell === "on") {
        req.body.preparedToSell = true
    } else {
        req.body.preparedToSell = false
    }
    console.log(req.file)
    if (req.file) {
        req.body.imageURL = req.file.path
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
                currentUser: req.session.currentUser,
                baseUrl: req.baseUrl,
                model: model,
                tabTitle: "Update: " + model.name,
            })
        })
})

module.exports = router