const mongoose = require("mongoose");

const staySchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    rating: Number,
    images: [],
    prices: {
        "1st class": Number,
        "2st class": Number,
        "3st class": Number
    }
});

const StayModel = mongoose.model("Stay", staySchema)

module.exports = StayModel