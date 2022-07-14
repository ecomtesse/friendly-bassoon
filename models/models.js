const mongoose = require("mongoose")

const Schema = mongoose.Schema

const modelsSchema = new Schema (
    {
        name: {type: String, required: true},
        brand: {type: String},
        imageURL: {type:String, default: "https://loremflickr.com/600/600/car"},
        manufacturer: String,
        model: String,
        yearOfProduction: { type: Number, default: 0},
        purchasePrice: {type: Number, min: 0, default: 0},
        currentValue: {type: Number, min: 0, default: 0},
        preparedToSell: {type: Boolean, default: true},
        soldPrice: {type: Number, min: 0, default: 0},
        qty: {type: Number, min: 0, default: 0},
        otherInfo: String
    },
    {timestamps: true}
)

const Models = mongoose.model("Models", modelsSchema)

module.exports = Models