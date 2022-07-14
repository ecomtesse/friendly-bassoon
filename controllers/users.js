const express = require("express")
const bcrypt = require("bcrypt")

const User = require("../models/users")

const userRouter = express.Router()

//localhost:3000/users/signup
userRouter.get("/signup", (req, res) => {
    res.render("users/signup.ejs", {
        currentUser: req.session.currentUser,
        baseUrl: req.baseUrl,
        tabTitle: "myStuff Sign Up"
    })
})

userRouter.post("/", (req, res) => {
    // overwrite user password with hashed password, then pass that into the database
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync()
    )

    User.create(req.body)
    .then((newUser) => {
        console.log("created user is: ", newUser)
        res.redirect("/models")
    })
    .catch(() => {
        req.flash("info", "Username already exists")
        res.redirect(req.baseUrl + "/signup")
        console.log("error")
    })
})

module.exports = userRouter