// DEPENDENCIES
const express = require("express")

//CONFIGURATION
const app = express()
const PORT = 3000

// ROUTES
// Index Route
app.get("/", (req, res) => {
    res.send("Index page")
})

// Show Route
app.get("/:id", (req, res) => {
    res.send(`Here is ${req.params.id}`)
})

// LISTENERS
app.listen(PORT, () => {
    console.log("Server running on port: ", PORT);
})