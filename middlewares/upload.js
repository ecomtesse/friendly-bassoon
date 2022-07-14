require("dotenv").config

const multer = require("multer")
const cloudinary = require("cloudinary").v2
const CloudinaryStorage = require("multer-storage-cloudinary").CloudinaryStorage

// Tells server to look for cludinary URL in files
cloudinary.config()

// Upload middleware
const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: "myStuff"
        }
    })
})

module.exports = upload
