const mongoose = require("mongoose")

const carsSchema = mongoose.Schema({
    name: String,
    city: String,
    price: Number
})

const CarsModal = mongoose.model("Car", carsSchema)

module.exports = CarsModal;