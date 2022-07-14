const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Why doesn't the below need to be new Schema
const userSchema = Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

const User = mongoose.model("User", userSchema)

module.exports = User